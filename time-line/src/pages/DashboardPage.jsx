import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutFunction } from "../components/LogoutFunction";


export default function DashboardPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [popup, setPopup] = useState({ visible: false, userId: null });


  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleLogout = () => {
    LogoutFunction(); // Usa la funzione di logout
    navigate("/login"); // Reindirizza alla pagina di login
  };

  const handleCreateUser = () => {
    navigate("/create-user"); // Reindirizza alla pagina di creazione utente
  };

  const handleEdit = (userId) => {
    console.log("Edit user with ID:", userId);
    // Implementa la logica di modifica qui
  };

  const confirmDelete = (userId) => {
    setPopup({ visible: true, userId });
  };

  const handleDelete = async () => {
    const { userId } = popup;
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Errore nella cancellazione utente");
      // Aggiorna la lista degli utenti dopo l'eliminazione
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Errore:", error);
    } finally {
      setPopup({ visible: false, userId: null });
    }
  };

  const closePopup = () => {
    setPopup({ visible: false, userId: null });
  };

  

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <header className=" text-black py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <img className="w-48" src="./public/LOGO_ARGOMEDIA.png" alt="" />
          <div className="flex space-x-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <h2 className="text-xl font-semibold mb-4">User List</h2>
        <button
          onClick={handleCreateUser}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mb-5"
        >
          Create New User
        </button>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border border-gray-300 text-left">ID</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Email</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">{user.id}</td>
                  <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(user.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {popup.visible && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p className="mb-4">Sei sicuro di voler eliminare questo utente?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Conferma
              </button>
              <button
                onClick={closePopup}
                className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}

      
              
    </div>
  );
}
