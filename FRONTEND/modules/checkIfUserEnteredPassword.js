// Funkcja sprawdzająca czy użytkownik nie pozostawił pustych pól z hasłami
export default function checkIfUserEnteredPassword(previousPassword,newPassword,confirmPassword){
    const errorParagraphs = document.querySelectorAll(".error");
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