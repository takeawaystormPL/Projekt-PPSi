const express = require('express');
const server = express();
const path = require("path");
const cors = require("cors");
//Moduły
const loginToPage = require('./modules/user_validation/loginToPage');
const registerToPage = require('./modules/user_validation/registerToPage');
const mongooseURI ="mongodb+srv://bartoszmisilo:KFLzclMG4ginzMwH@cluster0.sxaaw.mongodb.net/?retryWrites=true&dbName=aplicationUsers";
const createTask = require("./modules/task_modules/addTaskToDatabase");
const getTasksFromDatabase = require("./modules/task_modules/getTasksFromDatabase");
const changeStatusOfTask = require("./modules/task_modules/changeStatusOfTask");
const deleteTasksFromDatabase = require(("./modules/task_modules/deleteTasksFromDatabase"));
const verifyJWT = require('./modules/JWT/verifyJWT');
const cookieParser = require('cookie-parser');
const removeRefreshToken = require("./modules/JWT/removeRefreshToken");
const changePassword = require('./modules/user_validation/changePassword');
let user={
    username:"",
    password:"",
    accessToken:""
};
server.use(cors());
server.use(express.urlencoded({extended:true,parameterLimit:6,limit:200000}));
server.use(cookieParser());
const PORT = process.env.PORT||3500;
server.use(express.static(path.join(__dirname,'..','RESOURCES')));
server.use(express.static(path.join(__dirname,'..','CSS')));
server.use(express.static(path.join(__dirname,'..','FRONTEND')));
server.use(express.json())
// GET METHODS
server.get('/login',(req,res) =>{
    res.sendFile(path.join(__dirname,'..','HTML','logowanie.html'));
});
server.get("/logout",async(req,res)=>{
    const ifRemovedRefreshToken = await removeRefreshToken(mongooseURI,user.username);
    if(ifRemovedRefreshToken.status!== 204){
        return res.status(ifRemovedRefreshToken.status).json({message:ifRemovedRefreshToken.message});
    }
    user={username:"",password:"",accessToken:""}
    res.sendStatus(200);
});
server.get("/changePassword",(req,res)=>{
    const ifValidAccessToken = verifyJWT(user.accessToken);
    if(ifValidAccessToken.status !==200){
        return res.status(ifValidAccessToken.status).json({message:ifValidAccessToken.message});
    }
    res.sendFile(path.join(__dirname,"..","HTML","zmianaHasla.html"));
});
server.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","HTML","rejestracja.html"));
});
server.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","HTML","glownaStrona.html"));
});
server.get('/logged',(req,res) =>{
     res.redirect("http://localhost:3000");
});
server.get("/api",(req,res)=>{
    res.json({username:user.username});
});
server.get('/loginToPage',async(req,res)=>{
    const data = await loginToPage(mongooseURI,user);
    if(data.status==200){
        res.cookie("jwt",data.refreshToken,{httpOnly:true,maxAge:1000*60*60*24});
        user = {...user,accessToken:data.accessToken}
    }
    res.status(data.status).json({message:data.message});
});
server.get('/getTasks',async(req,res)=>{
    const ifValidAccessToken = verifyJWT(user.accessToken);
    if(ifValidAccessToken.status !==200){
        return res.status(ifValidAccessToken.status).json({message:ifValidAccessToken.message});
    }
        const getTaskFromDatabase = await getTasksFromDatabase(mongooseURI,user.username);
        res.status(200).json({tasks:getTaskFromDatabase});
    
});
// POST METHODS
server.post('/registerToPage',async(req,res)=>{
    const data = await registerToPage(mongooseURI,user);
    if(data.status == 200){
        console.log("redirecting");
        res.status(200).json({message:"User successfully created"});
    }else{
        res.json(data);
    }
});
server.post("/changeUserPassword",async(req,res)=>{
    const passwords = await JSON.parse(req.body.passwords);
    const response = await changePassword(mongooseURI,user.username,passwords[0],passwords[1]);
    res.status(response.status).json({message:response.message});
})
server.post('/deleteTasks',async(req,res)=>{
    const ifValidAccessToken = verifyJWT(user.accessToken);
    if(ifValidAccessToken.status !== 200){
        return res.status(ifValidAccessToken.status).json({message:ifValidAccessToken.message});
    }
    const tasks = await JSON.parse(req.body.tasks);
    console.log(req.body);
    const response = await deleteTasksFromDatabase(mongooseURI,tasks);
    console.log(response);
     res.status(response.status).json({message:response.message});
})
server.post('/createTask',async(req,res)=>{
    const ifValidAccessToken = verifyJWT(user.accessToken);
    if(ifValidAccessToken.status !== 200){
        return res.status(ifValidAccessToken.status).json({message:ifValidAccessToken.message});
    }
    const requestData = await req.body; 
    const responseData = await createTask(mongooseURI,requestData);
    res.status(responseData.status).json({message:responseData.message});
  
});
server.post("/changeStatus",async(req,res)=>{
    const ifValidAccessToken = verifyJWT(user.accessToken);
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
server.post('/userData',async(req,res)=>{
    const {username,password} = await req.body
    user = {
        username:username,
        password:password
    }
    res.json({ifSend:true});
});

server.listen(3500,()=>console.log("Server working on port:" + PORT));
