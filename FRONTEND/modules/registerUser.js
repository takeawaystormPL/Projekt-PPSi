export default async function registerUser(){
    const errorParagraph = document.querySelector('.error');
    const response= await fetch('http://localhost:3500/registerToPage',{
    method:"POST",
    headers:{
        'Content-type':'application/x-www-form-urlencoded'

    }
});
if(!response.ok){
    return console.log("Couldn't complete fetch");
}
const {status,message} = await response.json();
if(status!== 200){
    return errorParagraph.innerText = message;
}
}