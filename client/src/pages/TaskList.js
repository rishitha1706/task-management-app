import React from "react";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";

function TaskList() {

  const tasks = [
    {
      id: 1,
      title: "Complete Project",
      description: "Finish React UI",
      status: "pending"
    }
  ];

  return (
    <div className="container mt-4">

      <TaskForm />

      <h2 className="mb-3">
        My Tasks
      </h2>

      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
        />
      ))}
    </div>
  );
}

export default TaskList;