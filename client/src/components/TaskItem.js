import React from "react";

function TaskItem({ task }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5>{task.title}</h5>

        <p>{task.description}</p>

        <span className="badge bg-primary">
          {task.status}
        </span>

        <div className="mt-3">
          <button className="btn btn-warning me-2">
            Edit
          </button>

          <button className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;