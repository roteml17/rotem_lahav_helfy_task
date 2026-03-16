const SERVER_URL = "http://localhost:4000";

//GET
export const getAllTasks = async () => {
  const response = await fetch(`${SERVER_URL}/tasks`);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await response.json();
  return data;
};

//PATCH
export const toggleTaskOnServer = async (id) => {
  const response = await fetch(`${SERVER_URL}/tasks/${id}/toggle`, {
    method: "PATCH",
  });
  if (!response.ok) {
    throw new Error("Failed to toggle task");
  }
  const data = await response.json();
  return data;
};

//DELETE
export const deleteTaskOnServer = async (id) => {
  const response = await fetch(`${SERVER_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  if (!response.ok && response.status !== 204) {
    throw new Error("Failed to delete task");
  }
  return true;
};

//PUT
export const updateTaskOnServer = async (id, data) => {
  const response = await fetch(`${SERVER_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update task");
  }
};