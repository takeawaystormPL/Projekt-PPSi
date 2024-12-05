import React from "react";
import Taskinterface from "./applicationComponents/Taskinterface.js";
function ApplicationStructure(props) {
  return (
    <div id="container">
      <header>
        <span id="date"></span>
        <AccountWindow
          username={props.username}
          changeUserData={props.changeUserData}
        />
      </header>
      <article>
        <section>
          <h2>Zadania do wykonania</h2>
        </section>
        <Taskinterface username={props.username} />
      </article>
    </div>
  );
}
// Okno z danymi użytkownika
function AccountWindow(props) {
  // Funkcja włączająca,wyłączająca widoczność okna
  function changeVisibility() {
    // Zmienna przechowująca referencje do paragrafu po którego kliknięciu pojawia się/znika okienko
    const accountDetails = document.querySelector("#accountDetails");
    // Dodanie/usunięcie klasy invisible
    accountDetails.classList.toggle("invisible");
  }
  // Funkcja wylogowywująca użytkownika
  async function logOut() {
    // Wysłanie do serwera requesta o wylogowanie ze strony
    const response = await fetch("http://localhost:3500/logout", {
      credentials: "include",
    });
    // Spełnia się jezeli coś jest nie tak z requestem
    if (!response.ok || response.status !== 200) {
      const data = await response.json();
      return console.log(data.message);
    }
    // Zmiana nicku zalogowanego użytkownika na pusty łańcuch
    props.changeUserData("");
    // Przeniesienie uzytkownika do strony głównej
    window.location.href = "http://localhost:3500/";
  }
  // Funkcja przenosząca użytkownika do strony z formularzem zmiany hasła
  async function changePassword() {
    return (window.location.href = "http://localhost:3500/changePassword");
  }
  return (
    <div id="account">
      <span onClick={changeVisibility}>{props.username}</span>
      <div id="accountDetails" className="invisible">
        <div>
          <p onClick={changePassword}>Zmień hasło</p>
          <p onClick={logOut}>Wyloguj się</p>
          <p onClick={changeVisibility}>Zamknij okno</p>
        </div>
      </div>
    </div>
  );
}
export default ApplicationStructure;
