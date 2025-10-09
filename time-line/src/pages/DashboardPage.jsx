import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutFunction } from "../components/LogoutFunction";
import { useDeleteUser } from "../hooks/useDeleteUser";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [popup, setPopup] = useState({ visible: false, userId: null });
  const { deleteUser, isDeleting } = useDeleteUser();
  const [editingUser, setEditingUser] = useState(null);
  const [editedEmail, setEditedEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);
  const [passwordPopup, setPasswordPopup] = useState({
    visible: false,
    userId: null,
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = async () => {
    if (!editingUser) return;

    if (!validateEmail(editedEmail)) {
      setStatusMessage({ type: "error", text: "Insert a valid email." });
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/users/update-email/${editingUser}`,
        {
          email: editedEmail,
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser ? { ...user, email: editedEmail } : user
        )
      );
      setEditingUser(null);
      setEditedEmail("");
      setStatusMessage({ type: "success", text: response.data.message });
    } catch (error) {
      if (error.response) {
        setStatusMessage({ type: "error", text: error.response.data.error });
      } else {
        setStatusMessage({ type: "error", text: "Errore imprevisto." });
      }
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

  const handleEmailChange = (e) => {
    setEditedEmail(e.target.value);
    setStatusMessage(null); // Rimuove il messaggio di errore mentre l'utente digita
  };

  const handleChangePassword = (userId) => {
    setPasswordPopup({ visible: true, userId });
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "The password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "The password must contain at least one uppercase letter.";
    }
    if (!/[0-9]/.test(password)) {
      return "The password must contain at least one number.";
    }
    return "";
  };

  const handleSavePassword = async () => {
    const { userId } = passwordPopup;

    const validationMessage = validatePassword(newPassword);
    if (validationMessage) {
      setStatusMessage({ type: "error", text: validationMessage });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatusMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/users/change-password/${userId}`,
        {
          newPassword,
          confirmPassword,
          id: userId,
        }
      );
      setStatusMessage({ type: "success", text: response.data.message });
      setPasswordPopup({ visible: false, userId: null });
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error.response) {
        setStatusMessage({ type: "error", text: error.response.data.error });
      } else {
        setStatusMessage({ type: "error", text: "Errore imprevisto." });
      }
    }
  };

  const closePasswordPopup = () => {
    setPasswordPopup({ visible: false, userId: null });
    setNewPassword("");
    setConfirmPassword("");
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
        {statusMessage && (
          <div
            className={`fixed top-50 left-52 w-fit p-2 rounded-md shadow-md text-white z-50 ${
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
                <th className="px-4 py-2 border border-gray-300 text-left">
                  ID
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left">
                  Email
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
                    {editingUser === user.id ? (
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={editedEmail}
                        onChange={handleEmailChange}
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
                            onClick={() => handleChangePassword(user.id)}
                            className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                          >
                            <i className="fa-solid fa-key"></i> Change Password
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

      {passwordPopup.visible && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h3 className="mb-4 text-lg font-semibold">Change Password</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Impedisce l'invio del form
                handleSavePassword(); // Chiama la funzione per salvare la password
              }}
            >
              <input
                type="password"
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 mb-4 w-full"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 mb-4 w-full"
              />
              <div className="flex justify-center space-x-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Save
                </button>
                <button
                  onClick={closePasswordPopup}
                  className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
