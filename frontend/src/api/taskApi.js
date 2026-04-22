import axios from "axios";

const BASE_URL = "http://localhost:5000/api/tasks";

// Get all tasks of a user
export const fetchTasks = async (userId) => {
  const res = await axios.get(`${BASE_URL}/user/${userId}`);
  return res.data;
};

// Update status
export const updateTaskStatusAPI = async (taskId, status) => {
  const res = await axios.put(`${BASE_URL}/${taskId}/status`, {
    task_status: status,
  });
  return res.data;
};