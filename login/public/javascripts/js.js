document.addEventListener('DOMContentLoaded',function(){
const hello= document.querySelector(".hello");
const form = document.querySelector(".form-lg");


hello.addEventListener("click",function(){
    this.classList.add("unserver");
    form.style.opacity=1;

})

})