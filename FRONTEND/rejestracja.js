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
// Funkcja wysyłająca dane do rejestracji do serwera
async function sendUserDataToServer(){
    // Zmienna z referencją do formularza rejestracji
    const form = document.querySelector('form');
    // Konwersja danych z formularza
    const formData = new FormData(form);
    const fd = new URLSearchParams(formData);
    // Wysłanie requesta z danymi użytkownika do rejestracji 
    const res = await fetch('http://localhost:3500/userData',{
        method:"POST",
        body:fd,
        headers:{
            'Content-type':'application/x-www-form-urlencoded'
         }
    });
    // Spełnia się jeżeli jest coś nie tak z requestem
    if(!res.ok || res.status !== 200){
        console.log("Couldn't complete fetch");
    }
    // Konwersja odpowiedzi na obiekt JSON
        const responseData = await res.json();
    // Zwrócenie odpowiedzi
    return responseData;
}     
async function registerUser(){
    // Zmienna przechowująca paragraf z klasą error
    const errorParagraph = document.querySelector('.error');
    // Wysłanie requesta o zarejestrowanie uzytkownika
    const response= await fetch('http://localhost:3500/registerToPage',{
    method:"POST",
    headers:{
        'Content-type':'application/x-www-form-urlencoded'
    }
});
// Spełnia się jezeli jest coś nie tak z requestem
if(!response.ok){
    return console.log("Couldn't complete fetch");
}
// Konwersja odpowiedzi na obiekt JSON
const {message} = await response.json();
// Jeżeli kod HTTP odpowiedzi nie będzie równy 200
if(response.status!== 200){
    return errorParagraph.innerText = message;
}
// Przeniesienie do strony z formularzem logowania 
    return window.location.href="http://localhost:3500/login";
}  