export default async function getTasksFromDatabase() {
  const response = await fetch("http://localhost:3500/getTasks", {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok || response.status !== 200) {
    const response2 = await fetch("http://localhost:3500/logout", {
      credentials: "include",
    });
    if (response2.status == 200) {
      return (window.location.href = "http://localhost:3500/");
    }
  }
  const tasks = await response.json();
  return tasks.tasks.map((task) => {
    return {
      taskTitle: task.taskTitle,
      taskDescription: task.taskDescription,
      dateAdded: task.dateAdded,
      deadlineDate: task.deadlineDate,
      taskPriority: task.taskPriority,
      taskCategory: task.taskCategory,
      taskStatus: task.taskStatus,
      ifShowing: false,
    };
  });
}
