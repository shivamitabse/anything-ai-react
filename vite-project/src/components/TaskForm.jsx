import { useState, useEffect } from "react";
import "./TaskForm.css";
import { createTask } from "../services/api";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, changeDescription] = useState("");
  const [userId, changeUserId] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask({ title, description, userId });
    console.log(userId);

    alert("Task Added");
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/auth/me", {
          credentials: "include", // 🔥 REQUIRED
        });

        const data = await res.json();
        setIsAdmin(data.user.email);
      } catch (err) {
        console.log(err);
      }
    };

    checkAuth();
  }, []);

  return (
    <div>
      {isAdmin == "admin" ? (
        <form className="task-form" onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
          />
          <input
            value={description}
            onChange={(e) => changeDescription(e.target.value)}
            placeholder="Task Description"
          />
          <input
            value={userId}
            onChange={(e) => changeUserId(e.target.value)}
            placeholder="User Id"
          />
          <button type="submit">Add</button>
        </form>
      ) : null}
    </div>
  );
}
