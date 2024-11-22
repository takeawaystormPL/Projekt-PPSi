// Wyłączenie możliwości wrocenia się do strony po zalogowaniu
window.history.forward();
function noBack() {
    window.history.forward();
}
// Zmienna z referencją do przycisku potwierdzającego wysłanie formularza
const loginButton = document.querySelector('#zalogujSie');
// Zmienna z referencją do przycisku przenoszącego do strony z formularzem rejestracji
const toRegisterPageButton = document.querySelector('.toOther');
// Przypisanie zdarzenia do przycisku z linkiem do strony z formularzem rejestracji
registerButton.addEventListener('click',()=>{
    window.location.href = "http://localhost:3500/register";
});
// Przypisanie zdarzenia do przycisku potwierdzającego wysłanie formularza
loginButton.addEventListener('click',async(e)=>{
    // Zapobiegnięcie automatycznemu odświeżeniu strony
    e.preventDefault();
    // Wysłanie danych z formularza do serwera
    const ifSend = await sendUserDataToServer();
    // Spełnia się jeżeli dane zostały poprawnie wysłane 
    if(ifSend){
        loginUser();
    }
});
// Funkcja wysyłająca request o zalogowanie do strony
async function loginUser(){
    // Zmienna przechowująca referencję do paragrafu ze zmienną
    const errorParagraph = document.querySelector('.error');
    // Wysłanie requesta o zalogowanie do strony 
    const response = await fetch('http://localhost:3500/loginToPage');
    // Spełnia sie jeżeli kod HTTP odpowiedzi nie jest równy 401,403 albo 200
    if(response.status !== 401 && response.status !==403 &&response.status!==200){
        return console.log("Couldn't complete fetch");
    }
    // Konwersja odpowiedzi na obiekt JSON
    const responseData = await response.json();
    console.log(responseData);
    // Spełnia się jeżeli kod HTTP odpowiedzi nie jest równy 200
    if(response.status !== 200){
        // Ustawienie wiadomości z błedem
        return errorParagraph.innerText = responseData.message;
    }
    // Przeniesienie do strony z listą zadań
    return window.location.href = "http://localhost:3000";
}
// Funkcja wysyłająca dane użytkownika do serwera
async function sendUserDataToServer(){
    // Zmienna z referencją do formularza
    const form = document.querySelector('form');
    // Konwersja danych z formularza w celu wysłania ich do serwera
    const formData = new FormData(form);
    const fd = new URLSearchParams(formData);
    // Wysłanie requesta do serwera z danymi uzytkownika
    const res = await fetch('http://localhost:3500/userData',{
        method:"POST",
        body:fd,
        headers:{
            'Content-type':'application/x-www-form-urlencoded'
         }
    });
    // Spełnia się jeżeli coś jest nie tak z odpowiedzią
        if(!res.ok || res.status !== 200){
            console.log("Couldn't complete fetch");
        }
        // Zwrócenie obiektu JSON odpowiedzi
        return await res.json();
    }     
   
