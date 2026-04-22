import "../styles/Progress.css";

function Progress({ tasks }) {
  const myTasks = tasks.filter((t) => t.assignedTo === "Apeksha");
  const partnerTasks = tasks.filter((t) => t.assignedTo === "partner");

  const getProgress = (list) => {
    if (list.length === 0) return 0;
    const done = list.filter((t) => t.status === "Done").length;
    return Math.round((done / list.length) * 100);
  };

  const getCounts = (list) => ({
    done: list.filter((t) => t.status === "Done").length,
    inProgress: list.filter((t) => t.status === "In Progress").length,
    pending: list.filter((t) => t.status === "Pending").length,
  });

  const myCounts = getCounts(myTasks);
  const partnerCounts = getCounts(partnerTasks);

  return (
    <div className="sectionCard progressSection">
      <h2 className="sectionTitle">3. Progress</h2>
      <div className="progressGrid">
        <div className="progressPanel">
          <div className="panelTitle blueLabel">My Progress</div>
          <div className="progressRow">
            <div className="bar">
              <div
                className="fill blue"
                style={{ width: `${getProgress(myTasks)}%` }}
              />
            </div>
            <span>{getProgress(myTasks)}%</span>
          </div>
          <div className="statsRow">
            <div className="statCard">
              <label>Done</label>
              <strong>{myCounts.done}</strong>
            </div>
            <div className="statCard">
              <label>In Progress</label>
              <strong>{myCounts.inProgress}</strong>
            </div>
            <div className="statCard">
              <label>Pending</label>
              <strong>{myCounts.pending}</strong>
            </div>
          </div>
        </div>

        <div className="progressPanel">
          <div className="panelTitle orangeLabel">Avaneesh's Progress</div>
          <div className="progressRow">
            <div className="bar">
              <div
                className="fill orange"
                style={{ width: `${getProgress(partnerTasks)}%` }}
              />
            </div>
            <span>{getProgress(partnerTasks)}%</span>
          </div>
          <div className="statsRow">
            <div className="statCard">
              <label>Done</label>
              <strong>{partnerCounts.done}</strong>
            </div>
            <div className="statCard">
              <label>In Progress</label>
              <strong>{partnerCounts.inProgress}</strong>
            </div>
            <div className="statCard">
              <label>Pending</label>
              <strong>{partnerCounts.pending}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;