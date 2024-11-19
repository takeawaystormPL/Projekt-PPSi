const loginButton = document.querySelector('#zalogujSie');
const registerButton = document.querySelector('#zarejestrujSie');
loginButton.addEventListener('click',async()=>{
    window.location.href='http://localhost:3500/login';
   
}); 
registerButton.addEventListener('click',async()=>{
    window.location.href='http://localhost:3500/register';
});