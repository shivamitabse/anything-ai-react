import "./Dashboard.css";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <h2>Dashboard</h2>
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
}
