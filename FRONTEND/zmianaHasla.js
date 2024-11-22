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
    const arePasswordsBlank = checkIfNotBlank(previousPassword,newPassword,confirmPassword);
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
            case 406:{
               return  errorParagraphs.forEach(el =>el.id == "confirm_password_error"?errorParagraph=el:el.innerText="");
            }
            case 404:{
                return errorParagraphs.forEach(el =>el.id == "new_password_error"?errorParagraph=el:el.innerText="");
            }
        }
        // Ustawienie wiadomości 
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
// Funkcja sprawdzająca czy użytkownik nie pozostawił pustych pól z hasłami
function checkIfNotBlank(previousPassword,newPassword,confirmPassword){
    // Zmienna przechowująca paragraf,do którego ma zostać wpisana wiadomośc z błędem
    let errorParagraph;
    // Spełnia się jeżeli uzytkownik zostawił puste pole z aktualnym hasłem
    if(previousPassword.length == 0){
        // Ustawienie zmiennej z paragrafem
       errorParagraphs.forEach(el =>el.id == "previous_password_error"?errorParagraph=el:el.innerText="");
        // Ustawienie wiadomości
        errorParagraph.innerText = "Wprowadz haslo";
        return true;
    }
    // Spełnia się jeżeli użytkownik zostawił puste pole z nowym hasłem
    if(newPassword.length == 0){
        // Ustawienie zmiennej z paragrafem
       errorParagraphs.forEach(el =>el.id == "new_password_error"?errorParagraph=el:el.innerText="");
        // Ustawienie wiadomości
        errorParagraph.innerText = "Wprowadz haslo";
        return true;
    }
    // Spełnia sie jeżeli użytkownik zostawił puste pole z potwierdzeniem nowego hasła
    if(confirmPassword.length == 0){
        // Ustawienie zmiennej z paragrafem
       errorParagraphs.forEach(el =>el.id == "confirm_password_error"?errorParagraph=el:el.innerText="");
        // Ustawienie wiadomości
        errorParagraph.innerText = "Potwierdź haslo";
        return true;
    }
    // Zwracane jeżeli żaden z powyższych warunków się nie spełni
    return false;
}