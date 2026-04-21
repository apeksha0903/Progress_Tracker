import { useState } from "react";
import "./AddTask.css";

const getTodayDate = () => new Date().toISOString().split("T")[0];

function AddTask({ tasks, setTasks }) {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("me");
  const [dueDate, setDueDate] = useState(getTodayDate());

  const addTask = () => {
    if (!title) return;

    const newTask = {
      id: Date.now(),
      title,
      assignedTo,
      status: "Pending",
      createdDate: getTodayDate(),
      dueDate,
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setDueDate(getTodayDate());
  };

  return (
    <div className="sectionCard">
      <h2 className="sectionTitle">1. Add Task</h2>
      <div className="addTask">
        <input
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="me">Me</option>
          <option value="partner">Avaneesh</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          aria-label="Select due date"
        />

        <button onClick={addTask}>+ Add Task</button>
      </div>
    </div>
  );
}

export default AddTask;