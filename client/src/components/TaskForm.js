import React, { useState } from "react";
import { addTask } from "../services/taskService";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addTask({
        title,
        description,
        status,
      });

      alert("Task Added Successfully!");

      setTitle("");
      setDescription("");
      setStatus("pending");

      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Error adding task");
    }
  };

  return (
    <div className="card p-3 mb-4">
      <h3>Add Task</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="form-control mb-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">pending</option>
          <option value="in-progress">in-progress</option>
          <option value="completed">completed</option>
        </select>

        <button type="submit" className="btn btn-success">
          Save Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;