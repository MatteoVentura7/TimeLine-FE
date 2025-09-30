import { useNavigate } from "react-router-dom";
import { LogoutFunction } from "../utils/LogoutFunction";

export default function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    LogoutFunction(); // Usa la funzione di logout
    navigate("/login"); // Reindirizza alla pagina di login
  };

  return (
    <div className="dashboard">
      <h1>Benvenuto nella Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Logout
      </button>
    </div>
  );
}
