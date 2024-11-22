import './App.css';
import {useState,useEffect} from 'react';
import AplicationStructure from "./appModules/ApplicationStructure.js";
import setDate from './appModules/setDate.js';
import setUserData from './appModules/setUserData';
function App() {
  // Wyłączenie mozliwości wrócenia się do strony po wylogowaniu
  function preventBack() {
    window.history.forward(); 
  }
setTimeout(preventBack(), 0);
window.addEventListener('unload',(e)=>{
  return null;
})
  const [userData,changeUserData] = useState({});
  useEffect(()=>{
    setDate();
    setUserData(changeUserData);
  },[]);
  return (
    <AplicationStructure username={userData.username} changeUserData={changeUserData}/>
  );
}
export default App;
