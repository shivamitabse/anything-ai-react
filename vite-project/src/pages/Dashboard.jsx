import "./Dashboard.css";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <TaskForm />
      <TaskList />
    </div>
  );
}
