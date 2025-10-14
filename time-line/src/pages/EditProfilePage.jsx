import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/sidebar";
import useDetails from "../hooks/useDetails";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserDetailsPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user, loading, error } = useDetails(userId);
  const [editingUser, setEditingUser] = useState(null);
  const [editedEmail, setEditedEmail] = useState("");
  const [editedIsConfirmed, setEditedIsConfirmed] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [users, setUsers] = useState([]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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

  /* Gestione della modifica della email durante l'editing */
  const handleEmailChange = (e) => {
    setEditedEmail(e.target.value);
    setStatusMessage(null); // Rimuove il messaggio di errore mentre l'utente digita
  };

  return (
    <div className="min-h-screen bg-gray-100 relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="w-full text-black py-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center px-4">
            <h1 className="text-2xl font-bold">Edit User Profile</h1>
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Back
            </button>
          </div>
        </header>
        <main className="w-full container mx-auto py-8 px-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            {statusMessage && (
              <div
                className={`p-4 rounded-md mb-4 ${
                  statusMessage.type === "error"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {statusMessage.text}
              </div>
            )}
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
                    handleEdit(user.id, user.email, user.isConfirmed)
                  }
                  className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-2"
                >
                  <i className="fa-solid fa-pencil"></i> Edit
                </button>
              </>
            )}
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Surname:</strong> {user.surname}
            </p>
            <p>
                <strong>Email:</strong> 
              {" "}
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
            </p>
            <p>
                <strong>Confirmed email:</strong>{" "}
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
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}