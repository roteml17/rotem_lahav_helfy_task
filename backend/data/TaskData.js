
//in memory data
let tasks = [];

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
    if (index === -1)
        return false;
    else {
    const task = tasks[index];

    if (data.title !== undefined) {
      task.title = data.title;
    }
    if (data.description !== undefined) {
      task.description = data.description;
    }
    if (data.completed !== undefined) {
      task.completed = data.completed;
    }
    if (data.priority !== undefined) {
      task.priority = data.priority;
    }
  
    return true;
  }
}

function ToggleTaskCompletionStatus(taskId) {
    const numericId = Number(taskId);
    const index  = tasks.findIndex(t => t.id === numericId);
    if (index === -1)
        return false;
    else
    {
        const task = tasks[index];
        if (task.completed === false)
            task.completed = true;
        else
            task.completed = false;

            return true;
    }
}

module.exports = {
    getAllTasks,
    createANewTask,
    deleteTask,
    updateTask,
    ToggleTaskCompletionStatus,
};