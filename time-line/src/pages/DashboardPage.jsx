import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutFunction } from "../components/LogoutFunction";
import { useDeleteUser } from "../hooks/useDeleteUser";
import Sidebar from "../components/sidebar";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [popup, setPopup] = useState({ visible: false, userId: null });
  const { deleteUser, isDeleting } = useDeleteUser();
  const [editingUser, setEditingUser] = useState(null);
  const [editedEmail, setEditedEmail] = useState("");
  const [editedIsConfirmed, setEditedIsConfirmed] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [passwordPopup, setPasswordPopup] = useState({
    visible: false,
    userId: null,
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");

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

  useEffect(() => {
    const name = localStorage.getItem("name") || "";
    const surname = localStorage.getItem("surname") || "";

    const capitalize = (str) =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    setWelcomeMessage(`Hello, ${capitalize(name)} ${capitalize(surname)}`);
  }, []);

  /* Gestione del logout */

  const handleLogout = () => {
    LogoutFunction();
    navigate("/");
  };

  /* Gestione della creazione di un nuovo utente */
  const handleCreateUser = () => {
    navigate("/dashboard/create-user");
  };

  /* Gestione della modifica di un utente */
  const handleEdit = (
    userId,
    currentEmail,
    currentIsConfirmed
  ) => {
    setEditingUser(userId);
    setEditedEmail(currentEmail);
    setEditedIsConfirmed(currentIsConfirmed);
  };

  /* Validazione dell'email */
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /* Salvataggio delle modifiche */
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
          isConfirmed: editedIsConfirmed,
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser
            ? {
                ...user,
                email: editedEmail,
                isConfirmed: editedIsConfirmed,
              }
            : user
        )
      );
      setEditingUser(null);
      setEditedEmail("");
      setEditedIsConfirmed(false);
      setStatusMessage({ type: "success", text: response.data.message });
    } catch (error) {
      if (error.response) {
        setStatusMessage({ type: "error", text: error.response.data.error });
      } else {
        setStatusMessage({ type: "error", text: "Errore imprevisto." });
      }
    }
  };

  /* Annullamento della modifica */
  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditedEmail("");
    setEditedIsConfirmed(false);
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

  /* Gestione della modifica della email durante l'editing */
  const handleEmailChange = (e) => {
    setEditedEmail(e.target.value);
    setStatusMessage(null); // Rimuove il messaggio di errore mentre l'utente digita
  };

  /* Gestione della modifica della password */
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

  /* Salvataggio della nuova password */
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

  /* Gestione del popup di modifica della password */
  const closePasswordPopup = () => {
    setPasswordPopup({ visible: false, userId: null });
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-100 relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="w-full text-black py-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center px-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <img className="w-48" src="./public/LOGO_ARGOMEDIA.png" alt="" />
            <div className="flex space-x-4 items-center">
              <span className="text-gray-700">{welcomeMessage}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={!!editingUser}
              >
                Logout
              </button>
            </div>
          </div>
        </header>
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
              disabled={!!editingUser}
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
                      {editingUser === user.id ? (
                        <select
                          value={editedIsConfirmed}
                          onChange={(e) =>
                            setEditedIsConfirmed(e.target.value === "true")
                          }
                          className="border border-gray-300 rounded-md px-2 py-1"
                        >
                          <option value="false">No</option>
                          <option value="true">Yes</option>
                        </select>
                      ) : user.isConfirmed ? (
                        "Yes"
                      ) : (
                        "No"
                      )}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {user.role}
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
                              onClick={() => handleChangePassword(user.id)}
                              className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                              disabled={!!editingUser}
                            >
                              <i className="fa-solid fa-key"></i> Change Password
                            </button>
                            <button
                              onClick={() => confirmDelete(user.id)}
                              className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                              disabled={!!editingUser}
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
