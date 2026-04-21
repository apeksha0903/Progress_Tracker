const express = require("express");
const router = express.Router();

const {
  createTask,
  updateTaskName,
  getUserTasks,
  getOverdueTasks,
  updateTaskStatus,
} = require("../controllers/taskController");

// Create task
router.post("/", createTask);

// Update task name
router.put("/:id/name", updateTaskName);

// Get all tasks of a user
router.get("/user/:userId", getUserTasks);

// Get overdue tasks
router.get("/overdue/:userId", getOverdueTasks);

// Update status
router.put("/:id/status", updateTaskStatus);

module.exports = router;