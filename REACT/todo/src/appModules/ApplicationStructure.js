import React from "react";
import Taskinterface from "./applicationStructureModules/Taskinterface.js";
function ApplicationStructure(props){
    return (
        <div id="container">
        <header>
            <span id="date"></span>
           <AccountWindow username={props.username}  changeUserData={props.changeUserData}/>
        </header>
        <article>
            <section>
                <h2>Zadania do wykonania</h2>
            </section>
           <Taskinterface username={props.username}/>
        </article>
    </div>
    );
}

function AccountWindow(props){
    function changeVisibility(){
        const accountDetails = document.querySelector("#accountDetails");
        accountDetails.classList.toggle("invisible");
    }
    async function logOut(){
        const response = await fetch("http://localhost:3500/logout");
        if(!response.ok || response.status!== 200){
            const data = await response.json();
            return console.log(data.message);
        }
       props.changeUserData("");
       window.location.href="http://localhost:3500/";
    }
    async function changePassword(){
        return window.location.href="http://localhost:3500/changePassword";
    }
    return(
        <div id="account" >
        <span onClick={changeVisibility}>Zobacz konto</span>
        <div id="accountDetails" className="invisible">
            <p>Username:{props.username}</p>
            <div>
                <p onClick={changePassword}>Zmień hasło</p>
                <p onClick={logOut}>Wyloguj się</p>
                <p onClick={changeVisibility}>Zamknij okno</p>
            </div>
        </div>
        </div>
    )
}
export default ApplicationStructure;