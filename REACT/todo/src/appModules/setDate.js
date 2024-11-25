// Funkcja ustawiająca dzisiejszą date
export default async function setDate(){
    // Zmienna przechowująca paragraf z id date
    const dateParagraph = document.querySelector("#date");
    // Zmienne przechowujące dzisiejszą datę
    const date = new Date();
    const day = date.getDate();
    const month = convertMonth(date.getMonth());
    const year = date.getFullYear();
    // Zwrócenie dzisiejszej daty
    return dateParagraph.innerText = `${day} ${month} ${year}`;  
}
// Funkcja konwertująca miesiąc na wartość tekstową
function convertMonth(month){
    switch(month){
        case 0:return "Stycznia";
        case 1:return "Lutego";
        case 2:return "Marca";
        case 3:return "Kwietnia";
        case 4:return "Maja";
        case 5:return "Czerwca";
        case 6:return "Lipca";
        case 7:return "Sierpnia";
        case 8:return "Września";
        case 9:return "Października";
        case 10:return "Listopada";
        case 11:return "Grudnia";
        default:console.log("Nie ma takiego miesiaca");
    }
}
