import React from "react";

export function TaskItem({ task, onToggle, onDelete, onUpdate }) {
  const handleToggle = () => {
    onToggle(task.id);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const handlePriorityChange = (event) => {
    const newPriority = event.target.value;
    onUpdate(task.id, {
      title: task.title,
      description: task.description,
      priority: newPriority,
      completed: task.completed,
    });
  };

  return (
    <div className="task-card">
      <h3 className="task-title">{task.title}</h3>
      <p className="task-desc">{task.description}</p>

      <div className="task-meta">
        <span className={`task-priority task-priority-${task.priority}`}>
          {task.priority}
        </span>
        <span className="task-status">
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="task-actions">
        <button onClick={handleToggle}>
          {task.completed ? "Mark as pending" : "Mark as done"}
        </button>
        <button onClick={handleDelete}>Delete</button>
        <select value={task.priority} onChange={handlePriorityChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
}