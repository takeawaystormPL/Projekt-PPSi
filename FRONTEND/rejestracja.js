// Importowanie potrzebnych modułów
import sendUserDataToServer from "./modules/sendUserDataToServer.js";
import registerUser from "./modules/registerUser.js";
// Zmienna przechowująca referencję do przycisku z linkiem do strony z formularzem logowania 
const toLoginPageButton = document.querySelector('.toOther');
// Zmienna przechowująca referencję do przycisku zatwiedzającego rejestrację
const registerButton = document.querySelector('#zarejestrujSie');
// Ustawienie przenoszenia do strony z formularzem logowania po naciśnięciu przycisku
toLoginPageButton.addEventListener('click',(e)=>{
    window.location.href = "http://localhost:3500/login";
});
// Ustawienie wydarzenia dla przycisku zatwierdzającego rejestrację
registerButton.addEventListener('click',async(e)=>{
    // Zapobiegnięcie automatycznemu odświeżeniu strony
    e.preventDefault();
   
    // Zmienna przechowująca informacje czy dane zostały wysłane do serwera
    const data = await sendUserDataToServer();
    // Spełnia się jeżeli zostały wysłane
    if(data.ifSend){
       registerUser();
}});
