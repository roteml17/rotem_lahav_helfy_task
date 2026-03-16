
//in memory data
let tasks = [
    {
      id: 1,
      title: "Finish React carousel",
      description: "Implement infinite scrolling and connect to backend",
      completed: false,
      createdAt: new Date(),
      priority: "high",
    },
    {
      id: 2,
      title: "Write backend tests",
      description: "Cover all task endpoints with tests",
      completed: false,
      createdAt: new Date(),
      priority: "medium",
    },
    {
      id: 3,
      title: "Polish UI",
      description: "Improve spacing and colors of the carousel",
      completed: false,
      createdAt: new Date(),
      priority: "low",
    },
  ];

function getAllTasks() {
    return tasks;
}

function createANewTask(data) {
    const newTask = {
        id: Date.now(),
        title: data.title,
        description: data.description,
        completed: false,
        createdAt: new Date(),
        priority: data.priority || 'medium',
    };

    tasks.push(newTask);
    return newTask;
}

function deleteTask(taskId) {
    const numericId = Number(taskId);
    const index  = tasks.findIndex(t => t.id === numericId);
    if (index === -1)
        return false;
    else{
        tasks.splice(index,1)[0];
        return true;
    }
}

function updateTask(taskId, data) {
    const numericId = Number(taskId);
    const index  = tasks.findIndex(t => t.id === numericId);
    if (index === -1) return null;
  const task = tasks[index];

  if (data.title !== undefined) task.title = data.title;
  if (data.description !== undefined) task.description = data.description;
  if (data.completed !== undefined) task.completed = data.completed;
  if (data.priority !== undefined) task.priority = data.priority;

  return task;
}

function ToggleTaskCompletionStatus(taskId) {
  const numericId = Number(taskId);
  const index = tasks.findIndex(t => t.id === numericId);
  if (index === -1) return null;

  const task = tasks[index];
  task.completed = !task.completed;

  return task;
}

module.exports = {
    getAllTasks,
    createANewTask,
    deleteTask,
    updateTask,
    ToggleTaskCompletionStatus,
};