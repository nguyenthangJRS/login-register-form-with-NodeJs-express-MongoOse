const mongoose = require('mongoose');
const User=new mongoose.Schema({
    name:{type:String,
        required:true,
        max:100,
        min:6
    },
    email:{type:String,
        required:true,
        max:100,
        min:6
    },
    password:{type:String,
        required:true,
        max:100,
        min:6
    }
});
module.exports=mongoose.model('userxes ',User);