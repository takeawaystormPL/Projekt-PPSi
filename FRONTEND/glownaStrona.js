// Przycisk przenoszący do strony z formularzem logowania
const loginButton = document.querySelector('#zalogujSie');
// Przycisk przenoszący do strony z formularzem rejestracji 
const registerButton = document.querySelector('#zarejestrujSie');
// Ustawienie przenoszenia na strone z formularzem logowania 
loginButton.addEventListener('click',async()=>{
    window.location.href='http://localhost:3500/login';
}); 
// Ustawienie przenoszenia na strone z formularzem rejestracji
registerButton.addEventListener('click',async()=>{
    window.location.href='http://localhost:3500/register';
});