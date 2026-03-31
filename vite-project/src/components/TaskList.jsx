import { useEffect, useState } from "react";
import "./TaskList.css";
import { getTasks } from "../services/api";

export default function TaskList({ updatedTimes }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getTasks();
      setTasks(data);
    }
    fetchData();
  }, [updatedTimes]);

  useEffect(() => {
    // fetch tasks again
    console.log("Refetching tasks...");
  }, [updatedTimes]);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id} className="task">
          {task.title}
          {" : "} {task.description}
          {" : : Assigned to UserId - "} {task.user_id}
        </div>
      ))}
    </div>
  );
}
