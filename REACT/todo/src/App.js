import "./CSS/App.css";
import { useState, useEffect } from "react";
import AplicationStructure from "./appModules/ApplicationStructure.js";
import setDate from "./appModules/setDate.js";
import setUserData from "./appModules/setUserData";
function App() {
  // Wyłączenie mozliwości wrócenia się do strony po wylogowaniu
  // State przechowujący nick użytkownika i funkcja zmieniająca nick
  const [userData, changeUserData] = useState({});
  useEffect(() => {
    setDate();
    setUserData(changeUserData);
  }, []);
  return (
    <AplicationStructure
      username={userData.username}
      changeUserData={changeUserData}
    />
  );
}
export default App;
