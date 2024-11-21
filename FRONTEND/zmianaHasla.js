const form = document.querySelector("form");
const errorParagraphs = document.querySelectorAll(".error")
form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const previousPassword = document.querySelector("#previous_password").value;
    const newPassword = document.querySelector("#new_password").value;
    const confirmPassword = document.querySelector("#confirm_password").value;
    const arePasswordsBlank = checkIfNotBlank(previousPassword,newPassword,confirmPassword);
    if(arePasswordsBlank) return false;
    if(newPassword !== confirmPassword){
        let errorParagraph=""; 
       errorParagraphs.forEach(el =>el.id == "confirm_password_error"?errorParagraph=el:el.innerText="");
        console.log(errorParagraph);
        return errorParagraph.innerText = "Hasła nie pasują do siebie";
    }
    const response = await fetch("http://localhost:3500/changeUserPassword",{
        method:"POST",
        body:new URLSearchParams({passwords:JSON.stringify([previousPassword,newPassword])}),
        headers:{
            'Content-type':'application/x-www-form-urlencoded'
         }
    });
    const data = await response.json();
    if(response.status!==200){
        let errorParagraph;
        switch(response.status){
            case 406:{
               return  errorParagraphs.forEach(el =>el.id == "confirm_password_error"?errorParagraph=el:el.innerText="");
            }
            case 404:{
                return errorParagraphs.forEach(el =>el.id == "new_password_error"?errorParagraph=el:el.innerText="");
            }
        }
        return errorParagraph.innerText=data.message;
    }
    const response2 = await fetch("http://localhost:3500/logout");
    if(!response2.status == 200){
        return console.log(await response2.json());
    }
    return window.location.href="http://localhost:3500/login";
});


function checkIfNotBlank(previousPassword,newPassword,confirmPassword){
    if(previousPassword.length == 0){
        let errorParagraph;
       errorParagraphs.forEach(el =>el.id == "previous_password_error"?errorParagraph=el:el.innerText="");
        errorParagraph.innerText = "Wprowadz haslo";
        return true;
    }
    if(newPassword.length == 0){
        let errorParagraph;
       errorParagraphs.forEach(el =>el.id == "new_password_error"?errorParagraph=el:el.innerText="");
        errorParagraph.innerText = "Wprowadz haslo";
        return true;
    }
    if(confirmPassword.length == 0){
        let errorParagraph;
       errorParagraphs.forEach(el =>el.id == "confirm_password_error"?errorParagraph=el:el.innerText="");
        errorParagraph.innerText = "Potwierdź haslo";
        return true;
    }
    return false;
}