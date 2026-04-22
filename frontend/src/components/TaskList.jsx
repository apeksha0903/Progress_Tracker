import TaskCard from "./TaskCard";
import "../styles/TaskList.css";

function TaskList({ tasks, setTasks }) {
  const myTasks = tasks.filter((t) => t.assignedTo === "me");
  const partnerTasks = tasks.filter((t) => t.assignedTo === "partner");

  const updateStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "Pending"
                  ? "In Progress"
                  : task.status === "In Progress"
                  ? "Done"
                  : "Pending",
            }
          : task
      )
    );
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
              key={task.id}
              task={task}
              onClick={() => updateStatus(task.id)}
              type="me"
            />
          ))}
        </div>

        <div className="column">
          <div className="columnHeader orangeHeader">
            <h3>Avaneesh's Tasks</h3>
            <span>{partnerTasks.length}</span>
          </div>
          {partnerTasks.map((task) => (
            <TaskCard key={task.id} task={task} type="partner" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskList;