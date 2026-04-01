import { useState, useEffect } from "react";
import "./TaskForm.css";
import { createTask } from "../services/api";

export default function TaskForm({ update }) {
  const [title, setTitle] = useState("");
  const [description, changeDescription] = useState("");
  const [userId, changeUserId] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const [count, setCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask({ title, description, userId });
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    update(count);
  }, [count]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("https://testmysite.in/api/v1/auth/me", {
          credentials: "include", // 🔥 REQUIRED
        });

        const data = await res.json();
	console.log(data.user);
	console.log("the value received from fetch is", data);
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
