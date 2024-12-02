// Importowanie potrzebnych modułów
const express = require('express');
const server = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require('cookie-parser');
//Importowanie funkcji dla zadań i użytkownika
const loginToPage = require('./modules/user_validation/loginToPage');
const registerToPage = require('./modules/user_validation/registerToPage');
const createTask = require("./modules/task_modules/addTaskToDatabase");
const editTask = require('./modules/task_modules/editTask');
const getTasksFromDatabase = require("./modules/task_modules/getTasksFromDatabase");
const changeStatusOfTask = require("./modules/task_modules/changeStatusOfTask");
const deleteTasksFromDatabase = require(("./modules/task_modules/deleteTasksFromDatabase"));
const verifyJWT = require('./modules/JWT/verifyJWT');
const removeRefreshToken = require("./modules/JWT/removeRefreshToken");
const changePassword = require('./modules/user_validation/changePassword');
// Zmienna przechowująca dane zalogowanego użytkownika
let user={
    username:"",
    password:"",
};
// Zmienna przechowująca uri do bazy danych 
const mongooseURI ="mongodb+srv://bartoszmisilo:KFLzclMG4ginzMwH@cluster0.sxaaw.mongodb.net/?retryWrites=true&dbName=aplicationUsers";
// Użycie corsa w celu możliwości wejścia na serwer z przeglądarki
const corsOptions = {
    credentials:true,
    origin:(origin,callback) =>{
        if(origin == "http://localhost:3000" || "undefined" || "http://localhost:3500"){
            return callback(null,true)
        }
        return callback(new Error("Not allowed by cors"))
    }
}
server.use(cors(corsOptions));
// Ustawienie limitu parametrów dla requestów
server.use(express.urlencoded({extended:true,parameterLimit:7,limit:200000}));
// Zastosowanie cookie parsera dla ustawiania cookies
server.use(cookieParser());
// Zmienna przechowująca port na którym działa serwer
const PORT = process.env.PORT||3500;
// Udostępnienie dla serwera plików CSS,zdjęć i frontendowego javascripta
server.use(express.static(path.join(__dirname,'..','RESOURCES')));
server.use(express.static(path.join(__dirname,'..','CSS')));
server.use(express.static(path.join(__dirname,'..','FRONTEND')));
// Zezwolenie na przesyłanie obiektów JSON w requestach 
server.use(express.json())
// GET METHODS
// Ścieżka do strony głównej 
server.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","HTML","glownaStrona.html"));
});
// Ścieżka do strony z formularzem logowania
server.get('/login',(req,res) =>{
    res.sendFile(path.join(__dirname,'..','HTML','logowanie.html'));
});
// Ścieżka do zalogowania użytkownika
server.get('/loginToPage',async(req,res)=>{
    const ifLogged = await loginToPage(mongooseURI,user);
    if(ifLogged.status==200){
        res.cookie("jwt",ifLogged.accessToken,{httpOnly:true,maxAge:new Date().getMilliseconds()+1000*60*15});
    }
    res.status(ifLogged.status).json({message:ifLogged.message});
});
// Ścieżka do wysłania strony po zalogowaniu
server.get('/logged',(req,res) =>{
    res.redirect("http://localhost:3000");
});
// Ścieżka do wylogowywania użytkownika
server.get("/logout",async(req,res)=>{
        const ifRemovedRefreshToken = removeRefreshToken(mongooseURI,user.username);
        res.clearCookie("jwt");
        user={username:"",password:"",accessToken:""}
        res.sendStatus(200);
});
// Ścieżka do strony z formularzem rejestracji
server.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","HTML","rejestracja.html"));
});
// Ścieżka do strony z formularzem zmiany hasła
server.get("/changePassword",(req,res)=>{
    // Sprawdzenie czy token dostępu użytkownika nie wygasł
    const ifValidAccessToken = verifyJWT(req.cookies.jwt);
    // Spełnia się jeżeli wygasł
    if(ifValidAccessToken.status !== 200){
        return res.status(ifValidAccessToken.status).json({message:ifValidAccessToken.message});
    }
    res.sendFile(path.join(__dirname,"..","HTML","zmianaHasla.html"));
});
// Ściezka do wysyłania nicku użytkownika do strony z listą zadań
server.get("/api",(req,res)=>{
    res.json({username:user.username});
});
// Ścieżka do wysłania zadań z bazy danych 
server.get('/getTasks',async(req,res)=>{
     // Sprawdzenie czy token dostępu użytkownika nie wygasł
     const ifValidAccessToken = verifyJWT(req.cookies.jwt);
     console.log(ifValidAccessToken);
     // Spełnia się jeżeli wygasł
     if(ifValidAccessToken.status !== 200){
         return res.status(ifValidAccessToken.status).json({message:ifValidAccessToken.message});
     }
        const tasks = await getTasksFromDatabase(mongooseURI,user.username);
        res.status(200).json({tasks:tasks});
    
});
// POST METHODS
// Ścieżka do zarejestrowania użytkownika
server.post('/registerToPage',async(req,res)=>{
    console.log('request');
    const ifRegistered = await registerToPage(mongooseURI,user);
    if(ifRegistered.status == 200){
        res.status(200).json({message:"User successfully created"});
    }else{
        res.status(ifRegistered.status).json({message:ifRegistered.message});
    }
});
// Ścieżka do zmiany hasła użytkownika
server.post("/changeUserPassword",async(req,res)=>{
    const passwords = await JSON.parse(req.body.passwords);
    const response = await changePassword(mongooseURI,user.username,passwords[0],passwords[1]);
    res.status(response.status).json({message:response.message});
});;
// Ścieżka do usunięcia wykonanych zadań
server.post('/deleteTasks',async(req,res)=>{
     // Sprawdzenie czy token dostępu użytkownika nie wygasł
     const ifValidAccessToken = verifyJWT(req.cookies.jwt);
     // Spełnia się jeżeli wygasł
     if(ifValidAccessToken.status !== 200){
         return res.status(ifValidAccessToken.status).json({message:ifValidAccessToken.message});
     }
    const tasks = await JSON.parse(req.body.tasks);
    const response = await deleteTasksFromDatabase(mongooseURI,tasks);
     res.status(response.status).json({message:response.message});
});
// Ścieżka do utworzenia zadania 
server.post('/createTask',async(req,res)=>{
    console.log(req.cookies);
    // Sprawdzenie czy token dostępu użytkownika nie wygasł
    const ifValidAccessToken = verifyJWT(req.cookies.jwt);
    // Spełnia się jeżeli wygasł
    if(ifValidAccessToken.status !== 200){
        return res.status(ifValidAccessToken.status).json({message:ifValidAccessToken.message});
    }
    const requestData = await req.body; 
    const responseData = await createTask(mongooseURI,requestData);
    res.status(responseData.status).json({message:responseData.message});
  
});
// Ścieżka do edytowania zadania
server.post('/editTask',async(req,res)=>{
    const {oldTaskTitle,newTaskTitle,newDeadlineDate,newDescription,newTaskPriority} =JSON.parse(req.body.editedData);
    const ifEdited =await editTask(mongooseURI,oldTaskTitle,newTaskTitle,newDeadlineDate,newDescription,newTaskPriority);
    res.status(ifEdited.status).json({message:ifEdited.message});
})
// Ścieżka do zmiany statusu zadaania
server.post("/changeStatus",async(req,res)=>{
    // Sprawdzenie czy token dostępu użytkownika nie wygasł
    const ifValidAccessToken = verifyJWT(req.cookies.jwt);
    // Spełnia się jeżeli wygasł
    if(ifValidAccessToken.status !== 200){
        return res.status(ifValidAccessToken.status).json({message:ifValidAccessToken.message});
    }
    const taskTitle =await req.body;
    const response = await changeStatusOfTask(mongooseURI,taskTitle);
    if(response){
        res.status(200).json({message:"Status changed successfully"});
    }else{
        res.status(409).json({
            message:"Cannot change status of task"
        })
  
    }
});
// Ściezka do wysłania danych zarejestrowanego użytkownika 
server.post('/userData',async(req,res)=>{
    const {username,password} = await req.body
    user = {
        username:username,
        password:password
    }
    res.json({ifSend:true});
});

server.listen(3500,()=>console.log("Server working on port:" + PORT));
