const Task = require("../models/Task");


// ✅ Create Task
// POST /api/tasks
const createTask = async (req, res) => {
  try {
    const {
      task_name,
      task_start_date,
      task_due_date,
      user_id,
    } = req.body;

    if (!task_name || !task_start_date || !task_due_date || !user_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const task = await Task.create({
      task_name,
      task_start_date,
      task_due_date,
      user_id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ Update Task Name
// PUT /api/tasks/:id/name
const updateTaskName = async (req, res) => {
  try {
    const { task_name } = req.body;

    if (!task_name) {
      return res.status(400).json({ message: "Task name required" });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { task_name },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ Get All Tasks of a User
// GET /api/tasks/user/:userId
const getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.params.userId });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ Get Overdue Tasks
// GET /api/tasks/overdue/:userId
const getOverdueTasks = async (req, res) => {
  try {
    const today = new Date();

    const tasks = await Task.find({
      user_id: req.params.userId,
      task_due_date: { $lt: today },
      task_status: { $ne: "completed" },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ Update Task Status
// PUT /api/tasks/:id/status
const updateTaskStatus = async (req, res) => {
  try {
    const { task_status } = req.body;

    const allowed = ["pending", "in-progress", "completed"];

    if (!allowed.includes(task_status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { task_status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createTask,
  updateTaskName,
  getUserTasks,
  getOverdueTasks,
  updateTaskStatus,
};