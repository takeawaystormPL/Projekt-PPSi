// Funkcja wysyłająca request o zalogowanie do strony
export default async function loginUser(){
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
