import Sidebar from "../components/sidebar";
import LayoutDashboard from "../layout/layoutDashboard";
import { useEffect } from "react";
import useDetails from "../hooks/useDetails";

const ProfilePage = () => {
  const Id = localStorage.getItem("id");
  const { user, loading, error } = useDetails(Id);

  useEffect(() => {
    if (error) {
      console.error("Errore nel recupero dei dettagli utente:", error);
    }
  }, [error]);

  if (loading) {
    return <div>Caricamento...</div>;
  }

  if (!user) {
    return <div>Nessun utente trovato.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 relative flex">
      <Sidebar title="Profile" />
      <div className="flex-1 flex flex-col">
        <LayoutDashboard />
        <main className="px-6 bg-gray-50">
          <div className="bg-white  p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
              Profile
            </h2>
            <p className="mb-4">
              <strong>Nome:</strong> {user.name}
            </p>
            <p className="mb-4">
              <strong>Cognome:</strong> {user.surname}
            </p>
            <p className="mb-4">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="mb-4">
              <strong>Ruolo:</strong> {user.role}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
