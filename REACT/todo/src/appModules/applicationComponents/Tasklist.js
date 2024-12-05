import Task from "./Task";
export default function Tasks(props) {
  function formatTaskTitle(taskTitle) {
    let formattedTaskTitle = taskTitle.replaceAll(" ", "_");
    formattedTaskTitle = taskTitle
      .replaceAll(" ", "_")
      .replaceAll("ą", "a")
      .replaceAll("ę", "e")
      .replaceAll("ć", "c")
      .replaceAll("ź", "z")
      .replaceAll("ó", "o")
      .replaceAll("ł", "l");
    console.log(formattedTaskTitle);
    return formattedTaskTitle;
  }

  return (
    <div id="taskContainer">
      {props.taskList.sort(props.sortMethod).map((task, index) => {
        const formattedTaskTitle = formatTaskTitle(task.taskTitle);
        console.log(formattedTaskTitle);
        return (
          <Task
            id={formattedTaskTitle}
            name={task.taskTitle}
            description={task.taskDescription}
            dateAdded={task.dateAdded}
            deadlineDate={task.deadlineDate}
            taskPriority={task.taskPriority}
            taskStatus={task.taskStatus}
            ifShowing={task.ifShowing}
            key={formattedTaskTitle}
            changeTaskList={props.changeTaskList}
          />
        );
      })}
    </div>
  );
}
