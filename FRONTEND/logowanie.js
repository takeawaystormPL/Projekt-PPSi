// Importowanie potrzebnych modułów
import loginUser from "./modules/loginUser.js";
import sendUserDataToServer from "./modules/sendUserDataToServer.js";
// Wyłączenie możliwości wrocenia się do strony po zalogowaniu
window.history.forward();
function noBack() {
    window.history.forward();
}
setInterval(noBack(),0)
// Zmienna z referencją do przycisku potwierdzającego wysłanie formularza
const loginButton = document.querySelector('#zalogujSie');
// Zmienna z referencją do przycisku przenoszącego do strony z formularzem rejestracji
const toRegisterPageButton = document.querySelector('.toOther');
// Przypisanie zdarzenia do przycisku z linkiem do strony z formularzem rejestracji
toRegisterPageButton.addEventListener('click',()=>{
    window.location.href = "http://localhost:3500/register";
});
// Przypisanie zdarzenia do przycisku potwierdzającego wysłanie formularza
loginButton.addEventListener('click',async(e)=>{
    // Zapobiegnięcie automatycznemu odświeżeniu strony
    e.preventDefault();
    // Wysłanie danych z formularza do serwera
    const ifSend = await sendUserDataToServer();
    console.log(ifSend);
    // Spełnia się jeżeli dane zostały poprawnie wysłane 
    if(ifSend){
        loginUser();
    }
});
