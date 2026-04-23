import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { fetchTasks } from "../api/taskApi";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/AddTask.css";

const getTodayDate = () => new Date().toISOString().split("T")[0];

const myUserId = "69e7a5d2c16c421154bb73e3";
const partnerUserId = "69e7a5c6c16c421154bb73e2";

function AddTask({ tasks, setTasks }) {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("Apeksha");
  const [dueDate, setDueDate] = useState(new Date());
  const addTask = async () => {
    if (!title) return;

    try {
      const res = await axios.post("http://localhost:5000/api/tasks", {
        task_name: title,
        task_start_date: getTodayDate(),
        task_due_date: dueDate,
        user_id: assignedTo === "Apeksha" ? "69e7a5d2c16c421154bb73e3" : "69e7a5c6c16c421154bb73e2", // map as needed
      });

      const backendTask = res.data;

      const newTask = {
        id: backendTask._id,
        title: backendTask.task_name,
        assignedTo,
        status: backendTask.task_status || "Pending",
        createdDate: backendTask.task_start_date,
        dueDate: backendTask.task_due_date,
      };

      setTasks([...tasks, newTask]);

      setTitle("");
      setDueDate(getTodayDate());

      const myTasks = await fetchTasks(myUserId);
      const partnerTasks = await fetchTasks(partnerUserId);
      setTasks([...myTasks, ...partnerTasks]);
    
    } catch (error) {
      console.error("Error creating task:", error);
    }
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
          <option value="Apeksha">Apeksha</option>
          <option value="Avaneesh">Avaneesh</option>
        </select>

        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          minDate={new Date()}
          dateFormat="dd-MM-yyyy"
          className="customDatePicker"
        />

        <button onClick={addTask}>+ Add Task</button>
      </div>
    </div>
  );
}

export default AddTask;