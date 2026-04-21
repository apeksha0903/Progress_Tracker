import { useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import Progress from "./components/Progress";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Finish React UI",
      assignedTo: "me",
      status: "In Progress",
      createdDate: "2026-04-21",
      dueDate: "2026-04-24",
    },
    {
      id: 2,
      title: "Study DSA",
      assignedTo: "me",
      status: "Done",
      createdDate: "2026-04-20",
      dueDate: "2026-04-23",
    },
    {
      id: 3,
      title: "Prepare for Interview",
      assignedTo: "me",
      status: "Pending",
      createdDate: "2026-04-21",
      dueDate: "2026-04-26",
    },
    {
      id: 4,
      title: "Fix Backend Bug",
      assignedTo: "partner",
      status: "In Progress",
      createdDate: "2026-04-21",
      dueDate: "2026-04-24",
    },
    {
      id: 5,
      title: "Write API Docs",
      assignedTo: "partner",
      status: "Done",
      createdDate: "2026-04-19",
      dueDate: "2026-04-23",
    },
    {
      id: 6,
      title: "Deploy to Production",
      assignedTo: "partner",
      status: "Pending",
      createdDate: "2026-04-22",
      dueDate: "2026-04-26",
    },
  ]);

  return (
    <div className="container dashboardShell">
      <div className="topBar">
        <h1>Progress Tracker</h1>
        <div className="userPills">
          <span className="pill pillBlue">A</span>
          <span>Apeksha (You)</span>
          <span className="pill pillOrange">A</span>
          <span>Avaneesh</span>
        </div>
      </div>
      <AddTask tasks={tasks} setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
      <Progress tasks={tasks} />
    </div>
  );
}

export default App;