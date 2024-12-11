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
    return formattedTaskTitle;
  }
  function filterTasks(task) {
    const {
      filterTitle,
      filterByCategory,
      filterByDeadlineDate,
      filterByPriority,
    } = props.filterData;
    if (
      filterTitle == "" &&
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
          const formattedTaskTitle = formatTaskTitle(task.taskTitle);
          return (
            <Task
              id={formattedTaskTitle}
              name={task.taskTitle}
              description={task.taskDescription}
              dateAdded={task.dateAdded}
              deadlineDate={task.deadlineDate}
              taskPriority={task.taskPriority}
              taskStatus={task.taskStatus}
              taskCategory={task.taskCategory}
              ifShowing={task.ifShowing}
              key={formattedTaskTitle}
              changeTaskList={props.changeTaskList}
            />
          );
        })}
    </div>
  );
}
