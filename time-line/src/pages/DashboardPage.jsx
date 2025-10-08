import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutFunction } from "../components/LogoutFunction";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { Navigate } from "react-router-dom";


export default function DashboardPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [popup, setPopup] = useState({ visible: false, userId: null });
  const { deleteUser, isDeleting } = useDeleteUser();
  const [editingUser, setEditingUser] = useState(null);
  const [editedEmail, setEditedEmail] = useState("");


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

  const handleEdit = (userId, currentEmail) => {
    setEditingUser(userId);
    setEditedEmail(currentEmail);
  };

  const handleSave = async () => {
    if (!editingUser) return;

    try {
      await axios.put(`http://localhost:3000/users/update-email/${editingUser}`, {
        email: editedEmail,
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser ? { ...user, email: editedEmail } : user
        )
      );
      setEditingUser(null);
      setEditedEmail("");
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditedEmail("");
  };

  const confirmDelete = (userId) => {
    setPopup({ visible: true, userId });
  };

  const handleDelete = async () => {
    const { userId } = popup;
    const success = await deleteUser(userId);
    if (success) {
      setUsers(users.filter((user) => user.id !== userId));
    }
    setPopup({ visible: false, userId: null });
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
        <div className="flex justify-end">  
          <button
          onClick={handleCreateUser}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mb-5"
        >
          Create New User
        </button></div>
      

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
                  <td className="px-4 py-2 border border-gray-300">
                    {editingUser === user.id ? (
                         
                      <input
                       type="text"
                        id="email"
                        name="email"
                        required
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                        className="border border-gray-300 rounded-md px-2 py-1"
                      />
                   
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <div className="flex justify-end">
                      {editingUser === user.id ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mr-2"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-300 text-black py-1 px-3 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(user.id, user.email)}
                            className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-2"
                          >
                            <i className="fa-solid fa-pencil"></i> Edit
                          </button>
                          <button
                            onClick={() => confirmDelete(user.id)}
                            className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                          >
                            <i className="fa-solid fa-trash"></i> Delete
                          </button>
                        </>
                      )}
                    </div>
                
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
            <p className="mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Confirm
              </button>
              <button
                onClick={closePopup}
                className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      
              
    </div>
  );
}
