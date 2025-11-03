import Sidebar from "../components/sidebar";
import LayoutDashboard from "../layout/layoutDashboard";
import BackendServiceInstance from "../service/BackendService";

import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Nessun token trovato. Effettua il login.");
      return;
    }

    BackendServiceInstance
      .userInfo(token)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Errore nel recupero dati:", err);
        setError(err.response?.data?.error || "Errore imprevisto");
      });
  }, []);

  if (error) return <p> {error}</p>;
  if (!user) return <Sidebar title="Profile" />;

  return (
    <div className="min-h-screen bg-gray-100 relative flex">
      <Sidebar title="Profile" />
      <div className="flex-1 flex flex-col">
        <LayoutDashboard />
        <main className="p-10 bg-gray-50">
          <h1 className="text-2xl font-bold mb-6">My Profile</h1>
          <p className="mb-3">
            <strong>Name : </strong>
            {user.name}
          </p>
          <p className="mb-3">
            <strong>Surname : </strong>
            {user.surname}
          </p>
          <p className="mb-3">
            <strong>Email : </strong>
            {user.email}
          </p>
          <p className="mb-3">
            <strong>Role : </strong>
            {user.role}
          </p>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
