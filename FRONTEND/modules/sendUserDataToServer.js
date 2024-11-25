// Funkcja wysyłająca dane użytkownika do serwera
export default async function sendUserDataToServer(){
    // Zmienna z referencją do formularza
    const form = document.querySelector('form');
    // Konwersja danych z formularza w celu wysłania ich do serwera
    const formData = new FormData(form);
    const fd = new URLSearchParams(formData);
    // Wysłanie requesta do serwera z danymi uzytkownika
    const res = await fetch('http://localhost:3500/userData',{
        method:"POST",
        body:fd,
        headers:{
            'Content-type':'application/x-www-form-urlencoded'
         }
    });
    // Spełnia się jeżeli coś jest nie tak z odpowiedzią
        if(!res.ok || res.status !== 200){
            console.log("Couldn't complete fetch");
        }
        // Zwrócenie obiektu JSON odpowiedzi
        return await res.json();
}     