import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/sidebar";
import useDetails from "../hooks/useDetails";
import useEditProfile from "../hooks/useEditProfile";
import { useEffect } from "react";
import axios from "axios";

export default function UserDetailsPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user, loading, error } = useDetails(userId);
  const {
    editingUser,
    editedEmail,
    editedIsConfirmed,
    editedName,
    editedSurname,
    editedRole,
    statusMessage,
    handleEdit,
    handleSave,
    handleCancelEdit,
    setEditedEmail,
    setEditedIsConfirmed,
    setEditedName,
    setEditedSurname,
    setEditedRole,
  } = useEditProfile();

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

  const handleEmailChange = (e) => {
    setEditedEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setEditedSurname(e.target.value);
  };

  const handleRoleChange = (e) => {
    setEditedRole(e.target.value);
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
                    handleEdit(
                      user.id,
                      user.email,
                      user.isConfirmed,
                      user.name,
                      user.surname,
                      user.role
                    )
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
              <strong>Name:</strong>{" "}
              {editingUser === user.id ? (
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  required
                  value={editedName}
                  onChange={handleNameChange}
                  className="border border-gray-300 rounded-md px-2 py-1"
                />
              ) : (
                user.name
              )}
            </p>
            <p>
              <strong>Surname:</strong>{" "}
              {editingUser === user.id ? (
                <input
                  type="text"
                  id="Surname"
                  name="Surname"
                  required
                  value={editedSurname}
                  onChange={handleSurnameChange}
                  className="border border-gray-300 rounded-md px-2 py-1"
                />
              ) : (
                user.surname
              )}
            </p>
            <p>
              <strong>Email:</strong>{" "}
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
              <strong>Role:</strong>{" "}
              {editingUser === user.id ? (
                <select
                  value={editedRole}
                  onChange={handleRoleChange}
                  className="border border-gray-300 rounded-md px-2 py-1"
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Guest">Guest</option>
                </select>
              ) : (
                user.role
              )}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}