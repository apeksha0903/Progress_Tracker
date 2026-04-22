import "../styles/TaskCard.css";

const formatDate = (value) => {
  if (!value) return "Not set";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Not set";

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function TaskCard({ task, onClick, type }) {
  const statusClass =
    task.task_status === "completed"
      ? "doneStatus"
      : task.task_status === "in-progress"
      ? "progressStatus"
      : "pendingStatus";

  const createdOn = formatDate(task.task_start_date || task.task_start_date);
  const dueOn = formatDate(task.task_due_date || task.task_due_date);

  return (
    <div
      className="taskCard"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="taskMain">
        <span className={`dot ${type === "Apeksha" ? "blue" : "orange"}`} />
        <div>
          <p>{task.task_name}</p>
          <small className="taskMeta">Created: {createdOn}</small>
          <small className="taskMeta">Due: {dueOn}</small>
        </div>
      </div>
      <div className="taskRight">
        <span className={`statusBadge ${statusClass}`}>{task.task_status}</span>
        <span className="moreIcon">⋮</span>
      </div>
    </div>
  );
}

export default TaskCard;