import React, { useEffect, useState } from "react";
import { getAllTasks, toggleTaskOnServer, deleteTaskOnServer, updateTaskOnServer } from "../services/DataService";
import { TaskItem } from "./TaskItem";
import "../styles/TaskList.css";


const CARD_WIDTH = 280;
const SCROLL_SPEED = 0.5;

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [offset, setOffset] = useState(0);

  const handleToggleTask = async (id) => {
    const updated = await toggleTaskOnServer(id);
    setTasks(prev =>
      prev.map(t => (t.id === id ? updated : t))
    );
  };
  
  const handleDeleteTask = async (id) => {
    await deleteTaskOnServer(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };
  
  const handleUpdateTask = async (id, data) => {
    await updateTaskOnServer(id, data);
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };

    fetchTasks();
  }, []);


  useEffect(() => {
    if (tasks.length === 0) return;

    let animationFrameId;

    const animate = () => {
      setOffset((prev) => {
        const next = prev - SCROLL_SPEED;
        const resetPoint = -CARD_WIDTH * tasks.length;
        return next <= resetPoint ? 0 : next;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [tasks.length]);

  if (tasks.length === 0) {
    return <p>No tasks yet.</p>;
  }

  const loopedTasks = [...tasks, ...tasks];

  return (
  <div className="task-carousel-window">
    <div
      className="task-carousel-track"
      style={{ transform: `translateX(${offset}px)` }}
    >
      {loopedTasks.map((task, index) => (
        <TaskItem
          key={`${task.id}-${index}`}
          task={task}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
        />
      ))}
    </div>
  </div>
);
};

export default TaskList;