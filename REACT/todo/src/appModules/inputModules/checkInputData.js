// Funkcja sprawdzająca czy dane wprowadzone przez użytkownika są poprawne
export default function checkInputData(div,taskTitle,deadlineDate){
    // Zmienna przechowująca referencję do paragrafu z klasą error
    const errorParagraph = div.querySelector('.error');
    console.log(deadlineDate);
    // Spełnia się jeżeli użytkownik nie wprowadził tytułu zadania
    if(taskTitle.length ===0 || taskTitle == "undefined" || undefined || null){
        // Ustawienie wiadomości z błędem
       errorParagraph.innerText = "Tytuł musi zawierać conajmniej jedną literę";
       return "error";
   }
    // Spełnia się jeżeli użytkownik nie wprowadzil daty
   if(deadlineDate.length < 10){
    // Ustawienie wiadomości z błędem
       errorParagraph.innerText = "Niepoprawna data";
       return "error";
   }
    //Zmienna przechowująca date wprowadzoną przez użytkownika    
   const date = new Date(deadlineDate);
    //Zmienna przechowująca dzisiejszą datę    
   const todayDate = new Date();
    //Spełnia się jeżeli użytkownik podał datę z przeszłości    
   if(date.getFullYear() < 2024 || date.getMonth() < todayDate.getMonth() || (date.getMonth() === todayDate.getMonth() && date.getDate() < todayDate.getDate())){
        // Ustawienie wiadomości z błędem 
        errorParagraph.innerText = "Nie mozna podać daty z przeszłości";
       return "error";
   }
   errorParagraph.innerText="";
   return null;
}