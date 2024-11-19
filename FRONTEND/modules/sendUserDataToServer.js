async function sendUserDataToServer(){
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const fd = new URLSearchParams(formData);
    console.log("cos");
    const res = await fetch('http://localhost:3500/userData',{
        method:"POST",
        body:fd,
        headers:{
            'Content-type':'application/x-www-form-urlencoded'
         }
    });
        if(!res.ok || res.status !== 200){
            console.log("Couldn't complete fetch");
        }
        const data = await res.json();
        return data;
    }     
