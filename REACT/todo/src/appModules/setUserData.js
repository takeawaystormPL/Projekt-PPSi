async function setUserData(stateFunction){
    const response = await fetch("http://localhost:3500/api");
    if(!response.ok || response.status !== 200){
        return console.log("Cannot complete userData fetch");
    }
    const data = await response.json();
    const {username} = data;
    return stateFunction({username:username})
}
export default setUserData;