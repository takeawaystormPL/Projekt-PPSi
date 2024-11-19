async function setFetchData(uri,stateFunction){
    const response = await fetch(uri);
    if(!response.ok || response.status !== 200){
        return window.location.href="http://localhost:3500/login";
    }
    const data = await response.json();
    return stateFunction(data);
}
export default setFetchData;