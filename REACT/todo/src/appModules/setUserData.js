// Funkcja pobierająca dane użytkownika
export default async function setUserData(stateFunction){
    // Wysłanie requesta o dane użytkownika
    const response = await fetch("http://localhost:3500/api");
    // Spełnia się jeżeli serwer nie mógł wykonać requesta
    if(!response.ok || response.status !== 200){
        return console.log("Cannot complete userData fetch");
    }
    // Konwersja odpowiedzi na obiekt JSON
    const data = await response.json();
    // Pobranie z odpowiedzi nazwy użytkownika
    const {username} = data;
    console.log(username);
    // Ustawienie nazwy użytkownika na tą pobraną z odpowiedzi
    return stateFunction({username:username})
}
