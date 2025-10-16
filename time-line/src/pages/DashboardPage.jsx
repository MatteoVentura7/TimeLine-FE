import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteUser } from "../hooks/useDeleteUser";
import Sidebar from "../components/sidebar";
import LayoutDashboard from "../layout/layoutDashboard";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [popup, setPopup] = useState({ visible: false, userId: null });
  const { deleteUser, isDeleting } = useDeleteUser();
  const [statusMessage, setStatusMessage] = useState(null);
  

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

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  /* Gestione della creazione di un nuovo utente */
  const handleCreateUser = () => {
    navigate("/dashboard/create-user");
  };

 
   const handleEdit = (userId) => {
    navigate(`/dashboard/edit-profile/${userId}`);
  };

 
  /* Gestione della cancellazione di un utente */
  const confirmDelete = (userId) => {
    setPopup({ visible: true, userId });
  };

  const handleDelete = async () => {
    const { userId } = popup;
    try {
      const success = await deleteUser(userId);
      if (success) {
        setUsers(users.filter((user) => user.id !== userId));
        setStatusMessage({ type: "success", text: "User deleted successfully." });
      } else {
        setStatusMessage({ type: "error", text: "Failed to delete user." });
      }
    } catch (error) {
      setStatusMessage({ type: "error", text: "An unexpected error occurred." });
    }
    setPopup({ visible: false, userId: null });
  };

  const closePopup = () => {
    setPopup({ visible: false, userId: null });
  };


  /* Gestione della visualizzazione dei dettagli dell'utente */
  const handleViewDetails = (userId) => {
    navigate(`/dashboard/user-details/${userId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 relative flex">
      <Sidebar title = "Dashboard" />
      <div className="flex-1 flex flex-col">
        <LayoutDashboard />
        <main className="w-full container mx-auto py-8 px-4">
          <h2 className="text-xl font-semibold mb-4">User List</h2>
          {statusMessage && (
            <div
              className={`fixed bottom-10 right-10 w-fit p-3  shadow-md text-white z-50 ${
                statusMessage.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          <div className="flex justify-end items-center ">
            <button
              onClick={handleCreateUser}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mb-5"
              
            >
              Create New User
            </button>
          </div>

          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border border-gray-300 text-left">ID</th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Name
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Surname
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Email
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Email Confirmed
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Role
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border border-gray-300">
                      {user.id}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {user.surname.charAt(0).toUpperCase() + user.surname.slice(1)}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {user.email}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">

                      {user.isConfirmed ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {user.role}
                    </td>
                    
                    <td className="px-4 py-2 border border-gray-300">
                      
                      <div className="flex justify-end">
                         
                        
                          <>
                            <button
                              onClick={() =>
                                handleEdit(
                                  user.id,
                                  user.email,
                                  user.isConfirmed
                                )
                              }
                              className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-2"
                            >
                              <i className="fa-solid fa-pencil"></i> Edit
                            </button>
                            <button
                              onClick={() => handleViewDetails(user.id)}
                              className="bg-purple-500 mr-2 text-white py-1 px-3 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                              <i className="fa-solid fa-eye"></i> View Details
                            </button>
                            <button
                              onClick={() => confirmDelete(user.id)}
                              className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mr-2"
                              
                            >
                              <i className="fa-solid fa-trash"></i> Delete
                            </button>
                           
                          </>
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

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
      {isDeleting && (
        <div className="fixed bottom-10 right-10 w-fit p-2 text-white z-50">
          <div className="bg-amber-400 p-2  text-center">
            <p>Deleting user...</p>
          </div>
        </div>
      )}
    </div>
  );
}
