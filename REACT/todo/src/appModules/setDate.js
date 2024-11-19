async function setDate(){
    const dateParagraph = document.querySelector("#date");
    const date = new Date();
    const day = date.getDate();
    const month = convertMonth(date.getMonth());
    const year = date.getFullYear();
    return dateParagraph.innerText = `${day} ${month} ${year}`;  
}
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
export default setDate;