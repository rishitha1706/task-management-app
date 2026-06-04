import React, { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";
import { getTasks, deleteTask } from "../services/taskService";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTask(id);

      setTasks(
        tasks.filter((task) => task._id !== id)
      );

      alert("Task Deleted Successfully!");
    } catch (error) {
      console.log(error);
      alert("Error deleting task");
    }
  };

  let filteredTasks = [...tasks];

  // Search
  filteredTasks = filteredTasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  // Filter
  if (filter !== "all") {
    filteredTasks = filteredTasks.filter(
      (task) => task.status === filter
    );
  }

  // Sort
  if (sort === "newest") {
    filteredTasks.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  if (sort === "oldest") {
    filteredTasks.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }

  if (loading) {
    return (
      <h3 className="text-center mt-5">
        Loading...
      </h3>
    );
  }

  return (
    <div className="container mt-4">

      <TaskForm />

      <h2 className="mb-3">
        My Tasks
      </h2>

      <div className="row mb-3">

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search Tasks..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-control"
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <option value="all">
              All Tasks
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="in-progress">
              In Progress
            </option>

            <option value="completed">
              Completed
            </option>
          </select>
        </div>

        <div className="col-md-4">
          <select
            className="form-control"
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >
            <option value="newest">
              Newest First
            </option>

            <option value="oldest">
              Oldest First
            </option>
          </select>
        </div>

      </div>

      {filteredTasks.length === 0 ? (
        <h5>No Results Found</h5>
      ) : (
        filteredTasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onDelete={handleDelete}
          />
        ))
      )}

    </div>
  );
}

export default TaskList;