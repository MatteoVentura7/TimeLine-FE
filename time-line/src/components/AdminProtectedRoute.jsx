import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
  const IsAdmin = localStorage.getItem("IsAdmin") === "true"; // Confronto con il valore booleano salvato come stringa

  console.log("Ruolo Utente:", IsAdmin); // Log per il debug

  if (!IsAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminProtectedRoute;
