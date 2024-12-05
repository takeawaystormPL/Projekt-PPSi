// Funkcja zmieniająca status zadania
export default async function changeTaskStatus(
  taskTitle,
  changeTaskState,
  changeTasklistState
) {
  // Wysłanie do serwera requestu o zmiane statusu zadania
  const response = await fetch("http://localhost:3500/changeStatus", {
    method: "POST",
    body: new URLSearchParams({ title: taskTitle }),
    credentials: "include",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
  });
  // Spełnia się jeżeli coś było nie tak z requestem
  if (!response.ok) {
    return console.log("Couldn't complete fetch");
  }
  // Konwersja odpowiedzi na obiekt JSON
  const data = await response.json();
  // Spełnia się jeżeli kod HTTP odpowiedzi nie jest równy 200
  if (response.status !== 200) {
    return console.log(data.message);
  }
  // Zmiana statusu zadania w stacie zadania
  changeTaskState((prevTaskState) => {
    return {
      ...prevTaskState,
      taskStatus: !prevTaskState.taskStatus,
    };
  });
  changeTasklistState((prevTaskListState) => {
    const newList = prevTaskListState.filter(
      (task) => task.taskTitle !== taskTitle
    );
    const editedTask = prevTaskListState.find(
      (task) => task.taskTitle === taskTitle
    );
    return [...newList, { ...editedTask, taskStatus: !editedTask.taskStatus }];
  });

  return true;
}
