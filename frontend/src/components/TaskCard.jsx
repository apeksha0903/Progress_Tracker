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
    task.status === "Done"
      ? "doneStatus"
      : task.status === "In Progress"
      ? "progressStatus"
      : "pendingStatus";

  const createdOn = formatDate(task.createdDate || task.date);
  const dueOn = formatDate(task.dueDate || task.date);

  return (
    <div
      className="taskCard"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="taskMain">
        <span className={`dot ${type === "me" ? "blue" : "orange"}`} />
        <div>
          <p>{task.title}</p>
          <small className="taskMeta">Created: {createdOn}</small>
          <small className="taskMeta">Due: {dueOn}</small>
        </div>
      </div>
      <div className="taskRight">
        <span className={`statusBadge ${statusClass}`}>{task.status}</span>
        <span className="moreIcon">⋮</span>
      </div>
    </div>
  );
}

export default TaskCard;