// Importowanie modułów

const loginButton = document.querySelector('.toOther');
loginButton.addEventListener('click',(e)=>{
    window.location.href = "http://localhost:3500/login";
})
const registerButton = document.querySelector('#zarejestrujSie');
registerButton.addEventListener('click',async(e)=>{
    e.preventDefault();
    const data = await sendUserDataToServer();
    if(data.ifSend){
       registerUser();
}});

async function sendUserDataToServer(){
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const fd = new URLSearchParams(formData);
    console.log("cos");
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
        const data = await res.json();
        return data;
}     
async function registerUser(){
    const errorParagraph = document.querySelector('.error');
    const response= await fetch('http://localhost:3500/registerToPage',{
    method:"POST",
    headers:{
        'Content-type':'application/x-www-form-urlencoded'

    }
});
if(!response.ok){
    return console.log("Couldn't complete fetch");
}
const {status,message} = await response.json();
if(status!== 200){
    return errorParagraph.innerText = message;
}
return window.href.location="http://localhost:3500/logged";
}  