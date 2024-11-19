export default function resetInputValues(stateSetter){
    stateSetter({
        "taskTitle":"",
        "taskDescription":"",
        "taskDate":""
    });
    document.querySelector("#taskTitle").value="";
    document.querySelector("#taskDescription").value="";
    document.querySelector("#taskDate").value="";
}