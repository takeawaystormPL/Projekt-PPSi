import Task from "./Task";
export default function Tasks(props) {
  function generateRandomID() {
    let randomID = "";
    const characters = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",  
      "l",
      "m",
      "n",
      "o",
      "p",
      "r",
      "s",
      "t",
      "u",
      "w",
      "y",
      "z",
      "_",
      "-",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
    for (let i = 0; i < characters.length; i++) {
      randomID += characters[Math.floor(Math.random() * characters.length)];
    }
    return randomID;
  }
  function filterTasks(task) {
    const {
      filterTitle,
      filterByCategory,
      filterByDeadlineDate,
      filterByPriority,
      filterByDescription,
    } = props.filterData;
    if (
      filterTitle == "" &&
      filterByDescription == "" &&
      filterByCategory == "" &&
      filterByDeadlineDate == "" &&
      filterByPriority == ""
    ) {
      return task;
    }
    if (
      filterTitle !== "" &&
      !task.taskTitle.toLowerCase().includes(filterTitle.toLowerCase())
    ) {
      return false;
    }
    if (
      filterByDescription !== "" &&
      !task.taskDescription
        .toLowerCase()
        .includes(filterByDescription.toLowerCase())
    ) {
      return false;
    }
    if (
      filterByDeadlineDate !== "" &&
      !task.deadlineDate.includes(filterByDeadlineDate)
    ) {
      console.log("ds");
      return false;
    }
    if (filterByCategory !== "" && task.taskCategory !== filterByCategory) {
      return false;
    }
    if (filterByPriority !== "" && task.taskPriority !== filterByPriority) {
      return false;
    }
    return task;
  }
  return (
    <div id="taskContainer">
      {props.taskList
        .filter((task) => filterTasks(task))
        .sort(props.sortMethod)
        .map((task, index) => {
          const generatedID = generateRandomID();
          return (
            <Task
              id={generatedID}
              name={task.taskTitle}
              description={task.taskDescription}
              dateAdded={task.dateAdded}
              deadlineDate={task.deadlineDate}
              taskPriority={task.taskPriority}
              taskStatus={task.taskStatus}
              taskCategory={task.taskCategory}
              ifShowing={task.ifShowing}
              key={generatedID}
              changeTaskList={props.changeTaskList}
            />
          );
        })}
    </div>
  );
}
