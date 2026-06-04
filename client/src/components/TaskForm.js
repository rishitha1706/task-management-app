import React from "react";

function TaskForm() {
  return (
    <div className="card p-3 mb-4">
      <h3>Add Task</h3>

      <input
        className="form-control mb-2"
        placeholder="Task Title"
      />

      <textarea
        className="form-control mb-2"
        placeholder="Description"
      />

      <select className="form-control mb-2">
        <option>pending</option>
        <option>in-progress</option>
        <option>completed</option>
      </select>

      <button className="btn btn-success">
        Save Task
      </button>
    </div>
  );
}

export default TaskForm;