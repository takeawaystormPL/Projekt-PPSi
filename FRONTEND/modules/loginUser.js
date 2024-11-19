export default  async function loginUser(){
    const errorParagraph = document.querySelector('.error');
    const response = await fetch('http://localhost:3500/loginToPage');
    if(!response.ok){
        return "Couldn't complete fetch";
    }
    console.log(response);
    const data = await response.json();
    if(response.status !== 200){
        return errorParagraph.innerText = data.message;
    }
    return window.location.href = "http://localhost:3000";
}
