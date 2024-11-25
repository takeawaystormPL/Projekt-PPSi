// Importowanie potrzebnych modułów
import checkIfUserEnteredPassword from "./modules/checkIfUserEnteredPassword.js";
// Zmienne przechowujące referencje do formularza i paragrafów z klasą error
const form = document.querySelector("form");
const errorParagraphs = document.querySelectorAll(".error");
// Dzieje się jeżeli użytkownik zatwierdzi formularz
form.addEventListener('submit',async(e)=>{
    // Zapobiegnięcie automatycznemu odświeżeniu strony
    e.preventDefault();
    // Pobranie wartości z pól z hasłami
    const previousPassword = document.querySelector("#previous_password").value;
    const newPassword = document.querySelector("#new_password").value;
    const confirmPassword = document.querySelector("#confirm_password").value;
    // Sprawdzenie czy użytkownik nie pozostawił pustych pól
    const arePasswordsBlank = checkIfUserEnteredPassword(previousPassword,newPassword,confirmPassword);
    // Spełnia się jeżeli zostawił
    if(arePasswordsBlank) return false;
    // Spełnia się jeżeli nowe hasło i potwierdzenie nowego hasła się nie zgadzają
    if(newPassword !== confirmPassword){
        // Zmienna przechowująca paragraf,do którego ma zostać wysłana wiadomość z błędem
        let errorParagraph=""; 
        // Ustawienie zmiennej z paragrafem 
       errorParagraphs.forEach(el =>el.id == "confirm_password_error"?errorParagraph=el:el.innerText="");
        // Ustawienie wiadomości
        return errorParagraph.innerText = "Hasła nie pasują do siebie";
    }
    // Wysłanie requesta do serwera w celu zmiany hasła użytkownika
    const response = await fetch("http://localhost:3500/changeUserPassword",{
        method:"POST",
        body:new URLSearchParams({passwords:JSON.stringify([previousPassword,newPassword])}),
        headers:{
            'Content-type':'application/x-www-form-urlencoded'
         }
    });
    // Konwersja odpowiedzi w obiekt JSON
    const responseData = await response.json();
    // Spełnia się jeżeli kod HTTP odpowiedzi nie będzie równy 200
    if(response.status!==200){
        // Zmienna przechowująca paragraf,do którego ma zostać wysłana wiadomość z błędem
        let errorParagraph; 
        // Ustawienie zmiennej z paragrafem
        switch(response.status){
            case 400:{
                errorParagraphs.forEach(el =>el.id == "confirm_password_error"?errorParagraph=el:el.innerText="");
                break;
            }
            case 404:{
                errorParagraphs.forEach(el => el.id == "previous_password_error"?errorParagraph=el:el.innerText="");
                break;
            }
        }
        // Ustawienie wiadomości 
        console.log(errorParagraph);
        return errorParagraph.innerText=responseData.message;
    }
    // Wysłanie requesta do serwera w celu wylogowania użytkownika
    const response2 = await fetch("http://localhost:3500/logout");
    // Spełnia się jeżeli kod HTTP odpowiedzi nie będzie równy 200
    if(!response2.status == 200){
        return console.log(await response2.json());
    }
    // Przeniesienie użytkownika do strony z formularzem logowania 
    return window.location.href="http://localhost:3500/login";
});
