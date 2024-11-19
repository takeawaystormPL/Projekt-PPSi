const loginButton = document.querySelector('#zalogujSie');
const registerButton = document.querySelector('.toOther');
// Wyłączenie możliwości wrocenia się do strony po zalogowaniu
window.history.forward();
function noBack() {
    window.history.forward();
}
registerButton.addEventListener('click',()=>{
    window.location.href = "http://localhost:3500/register";
});
loginButton.addEventListener('click',async(e)=>{
    e.preventDefault();
    const ifSend = await sendUserDataToServer();
    if(ifSend){
        loginUser();
    }
});
async function loginUser(){
    const errorParagraph = document.querySelector('.error');
    const response = await fetch('http://localhost:3500/loginToPage');
    console.log(response);
    if(!response.ok){
        return "Couldn't complete fetch";
    }
    const data = await response.json();
    if(response.status !== 200){
        return errorParagraph.innerText = data.message;
    }
    return window.location.href = "http://localhost:3000";
}
async function sendUserDataToServer(){
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const fd = new URLSearchParams(formData);
    const res = await fetch('http://localhost:3500/userData',{
        method:"POST",
        body:fd,
        headers:{
            'Content-type':'application/x-www-form-urlencoded'
         }
    });
        if(!res.ok || res.status !== 200){
            console.log("Couldn't complete fetch");
        }
        return await res.json();
    }     
   
