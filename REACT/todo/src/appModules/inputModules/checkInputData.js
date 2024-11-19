export default function checkInputData(taskState){
    const {taskTitle,taskDate} = taskState;
    const errorParagraph = document.querySelector('.error');
    if(taskTitle.length ===0 || taskTitle == "undefined" || undefined || null){
       errorParagraph.innerText = "Tytuł musi zawierać conajmniej jedną literę";
       return "error";
   }else if(taskDate.length < 10){
       errorParagraph.innerText = "Niepoprawna data";
       return "error";
   }
   const date = new Date(taskState.taskDate);
   const todayDate = new Date();
   if(date.getFullYear() < 2024 || date.getMonth() < todayDate.getMonth() || (date.getMonth() === todayDate.getMonth() && date.getDate() < todayDate.getDate())){
       errorParagraph.innerText = "Nie mozna podać daty z przeszłości";
       return "error";
   }
   return null;
}