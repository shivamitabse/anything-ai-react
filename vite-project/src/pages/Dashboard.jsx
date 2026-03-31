import "./Dashboard.css";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [updatedTimes, setUpdatedTimes] = useState(0);

  useEffect(() => {
    console.log(updatedTimes);
  });

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <h2>Dashboard</h2>
        <TaskForm update={setUpdatedTimes} />
        <TaskList updatedTimes={updatedTimes} />
      </div>
    </div>
  );
}
