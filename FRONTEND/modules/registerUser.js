// Funkcja rejestrująca użytkownika 
export default async function registerUser(){
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
if(!response.status == 200 ||  !response.status == 400 || !response.status==400){
    return console.log("Couldn't complete fetch");
}
// Konwersja odpowiedzi na obiekt JSON
const {message} = await response.json();
// Jeżeli kod HTTP odpowiedzi nie będzie równy 200
if(response.status !== 200){
    return errorParagraph.innerText = message;
}
 return window.location.href="http://localhost:3500/login"
}  