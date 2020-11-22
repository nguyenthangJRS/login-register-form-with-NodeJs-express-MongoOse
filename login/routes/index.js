var express = require('express');
var router = express.Router();
var User= require('../moder/moder')
var bcrypt=require('bcryptjs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' ,data:{}});
});

router.post('/login',function(req,res){
  var userName= req.body;
  if(userName.email.trim().length==0){
    res.render('login',{data:{err:"Please enter your email"}});
  }
  else if(userName.password.trim().length==0){
    res.render('login',{data:{err:"Please enter your Password"}});
  }
  else{
    var checkLogin = User.findOne({email:userName.email});
    if(checkLogin){
      checkLogin.then(data=>{
        if(userName.email==data.email){
          const valid_password= bcrypt.compare(userName.password,data.password);
          if(!valid_password){
            res.render('login',{data:{err:"Password Wrong"}});
          }else{
            // HOME PAGE  //////////////////////////////////////////////////////////////
            res.redirect('/')
          }
        }
      })
      .catch(err=>{
          
    res.render('login',{data:{err:"User is not found"}});
      })
    }
  }
})








/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express',data:{} });
});
router.post('/register',function(req,res){
  var enterUser = req.body;
  if(enterUser.email.trim().length==0){
    res.render('register',{data:{err:"Please enter your Email"}})
  }
  else if(enterUser.password.trim().length==0){
    res.render('register',{data:{err:"Please enter your Password"}})
  }
  else if(enterUser.password!=enterUser.repassword&& enterUser.password.trim().length!=0){
    res.render('register',{data:{err:"Password is not Match"}});
  }else{
    const check = User.findOne({email:enterUser.email});
    if(check){
      check.then(data=>{
        if(enterUser.email==data.email){
          res.render('register',{data:{err:"Acount is allread"}});
        }  
      })
      .catch(err=>{
       console.log(err);
       var salt=bcrypt.genSaltSync(10);
       const hash_pass = bcrypt.hashSync(enterUser.password,salt)
       var newUser= new User({
        name:req.body.name,
        email:req.body.email,
        password:hash_pass
      })
      newUser.save();
      res.redirect('login');
      })
    }
  }
})
module.exports = router;
