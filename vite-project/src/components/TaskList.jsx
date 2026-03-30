import { useEffect, useState } from "react";
import "./TaskList.css";
import { getTasks } from "../services/api";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getTasks();
      setTasks(data);
    }
    fetchData();
  }, []);

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
