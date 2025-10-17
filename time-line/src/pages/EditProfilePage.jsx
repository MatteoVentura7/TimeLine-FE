import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/sidebar";
import useDetails from "../hooks/useDetails";
import useEditProfile from "../hooks/useEditProfile";
import LayoutDashboard from "../layout/layoutDashboard";

export default function EditProfilePage() {
  const { userId } = useParams();
  const { user, loading, error, setUser } = useDetails(userId);

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
  } = useEditProfile((updatedUser) => {
    // Aggiorna lo stato locale con i dati aggiornati
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUser,
    }));
  });

  const navigate = useNavigate();

  const handleSaveAndRedirect = async () => {
    console.log("Inizio salvataggio profilo...");
    const saveResult = await handleSave();

    console.log("Risultato salvataggio:", saveResult);
    console.log("StatusMessage corrente:", statusMessage);

    if (saveResult && saveResult.success) {
      console.log("Salvataggio riuscito, reindirizzamento alla dashboard...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      console.error(
        "Errore durante il salvataggio: ",
        saveResult?.message || "Errore sconosciuto"
      );
    }
  };

  const handleCancelAndRedirect = async () => {
    await handleCancelEdit();
    navigate("/dashboard");
  };

  useEffect(() => {
    if (user) {
      handleEdit(
        user.id,
        user.email,
        user.isConfirmed,
        user.name,
        user.surname,
        user.role
      );
    }
  }, [user]);

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
      <Sidebar title="User Edit" />
      <div className="flex-1 flex flex-col">
        <LayoutDashboard />
        <main className="py-12 px-6 bg-gray-50 ">
          <div className="bg-white  p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
              User Information
            </h2>
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
            <div className="flex justify-end">
              <>
                <button
                  onClick={handleSaveAndRedirect}
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelAndRedirect}
                  className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Back
                </button>
              </>
            </div>
            <div className="mt-3 mb-3 text-gray-700 ">
              <p className="text-lg">
                <strong>ID</strong>
              </p>
              <span className="text-xl ">{user.id}</span>
            </div>
            <div className="mt-3 mb-3 text-gray-700">
              <p className="text-lg">
                <strong>Name</strong>{" "}
              </p>
              <span className="text-xl">
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
                  user.name.charAt(0).toUpperCase() + user.name.slice(1)
                )}
              </span>
            </div>
            <div className="mt-3 mb-3 text-gray-700">
              <p className="text-lg">
                <strong>Surname</strong>{" "}
              </p>
              <span className="text-xl">
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
                  user.surname.charAt(0).toUpperCase() + user.surname.slice(1)
                )}
              </span>
            </div>
            <div className="mt-3 mb-3 text-gray-700">
              <p className="text-lg">
                <strong>Email</strong>{" "}
              </p>
              <span className="text-xl">
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
              </span>
            </div>

            <div className="mt-3 mb-3 text-gray-700">
              <p className="text-lg">
                <strong>Confirmed email</strong>{" "}
              </p>

              <span className="text-xl">
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
              </span>
            </div>

            <div className="mt-3 mb-3 text-gray-700">
              <p className="text-lg">
                <strong>Role</strong>{" "}
              </p>
              <span className="text-xl">
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
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
