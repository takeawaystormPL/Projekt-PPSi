// Funkcja sprawdzająca czy dane wprowadzone przez użytkownika są poprawne
export default function checkInputData(div, taskTitle, deadlineDate) {
  // Zmienna przechowująca referencję do paragrafu z klasą error
  const errorParagraph = div.querySelector(".error");
  // Spełnia się jeżeli użytkownik nie wprowadził tytułu zadania
  if (
    taskTitle.length === 0 ||
    taskTitle === "undefined" ||
    taskTitle === undefined ||
    taskTitle === null
  ) {
    // Ustawienie wiadomości z błędem
    errorParagraph.innerText = "Tytuł musi zawierać conajmniej jedną literę";
    return "error";
  }
  // Spełnia się jeżeli użytkownik nie wprowadzil daty
  if (deadlineDate.length < 10) {
    // Ustawienie wiadomości z błędem
    errorParagraph.innerText = "Niepoprawna data";
    return "error";
  }
  //Zmienna przechowująca date wprowadzoną przez użytkownika
  const date = new Date(deadlineDate);
  //   Zmienna przechowująca dzisiejszą datę
  const todayDate = new Date(Date.now()).setHours(0, 0, 0);
  if (date < todayDate) {
    errorParagraph.innerText = "Nie można podać daty z przeszłości";
    return "error";
  }
  errorParagraph.innerText = "";
  return null;
}
