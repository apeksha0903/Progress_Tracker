import { useEffect } from "react";
import TaskCard from "./TaskCard";
import "../styles/TaskList.css";
import { fetchTasks, updateTaskStatusAPI } from "../api/taskApi";

function TaskList({ tasks, setTasks }) {
  // 🔹 Replace these with actual user IDs from your DB
  const myUserId = "69e7a5d2c16c421154bb73e3";
  const partnerUserId = "69e7a5c6c16c421154bb73e2";

  // 🔄 Convert backend status → UI status
  const mapStatus = (status) => {
    if (status === "pending") return "Pending";
    if (status === "in-progress") return "In Progress";
    return "Done";
  };

  // 🔄 Fetch tasks for BOTH users
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const [myData, partnerData] = await Promise.all([
          fetchTasks(myUserId),
          fetchTasks(partnerUserId),
        ]);
        // console.log(myData, partnerData);
        // const formatted = [
        //   ...myData.map((t) => ({
        //     id: t._id,
        //     task_name: t.task_name,
        //     assignedTo: "me",
        //     status: mapStatus(t.task_status),
        //   })),
        //   ...partnerData.map((t) => ({
        //     id: t._id,
        //     task_name: t.task_name,
        //     assignedTo: "partner",
        //     status: mapStatus(t.task_status),
        //   })),
        // ];

        setTasks([...myData, ...partnerData]);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    loadTasks();
  }, []);

  const myTasks = tasks.filter((t) => t.user_id === myUserId);
  console.log(myTasks);
const partnerTasks = tasks.filter((t) => t.user_id === partnerUserId);

  // 🔄 Update task status (frontend + backend)
const updateStatus = async (id) => {
  const task = tasks.find((t) => t._id === id);

  let newStatus;
  if (task.task_status === "pending") newStatus = "in-progress";
  else if (task.task_status === "in-progress") newStatus = "completed";
  else newStatus = "pending";

  try {
    await updateTaskStatusAPI(id, newStatus);

    setTasks(
      tasks.map((t) =>
        t._id === id
          ? { ...t, task_status: newStatus }
          : t
      )
    );
  } catch (err) {
    console.error(err);
  }
};
  return (
    <div className="sectionCard">
      <h2 className="sectionTitle">2. All Tasks</h2>
      <div className="tasksSection">
        <div className="column">
          <div className="columnHeader">
            <h3>Apeksha's Tasks</h3>
            <span>{myTasks.length}</span>
          </div>
          {myTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onClick={() => updateStatus(task._id)}
              type="Apeksha"
            />
          ))}
        </div>

        <div className="column">
          <div className="columnHeader orangeHeader">
            <h3>Avaneesh's Tasks</h3>
            <span>{partnerTasks.length}</span>
          </div>
          {partnerTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onClick={() => updateStatus(task._id)}
              type="Apeksha"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskList;