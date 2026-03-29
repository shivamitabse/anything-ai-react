import { useState } from "react";
import "./TaskForm.css";
import { createTask } from "../services/api";

export default function TaskForm() {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask({ title });
    alert("Task Added");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Task"
      />
      <button>Add</button>
    </form>
  );
}
