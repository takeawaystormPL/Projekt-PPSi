export default function updateInputData(event,changeInputData){
    changeInputData(oldState=>({
        ...oldState,
        [event.target.id]:event.target.value
    }));
}