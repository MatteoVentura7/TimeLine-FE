import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/sidebar";
import useDetails from "../hooks/useDetails";
import useEditProfile from "../hooks/useEditProfile";
import LayoutDashboard from "../layout/layoutDashboard";
import PropagateLoader from "react-spinners/PropagateLoader";

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
  const [isSaving, setIsSaving] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const handleFieldChange = (setter) => (e) => {
    setter(e.target.value);
    setIsModified(true);
  };

  const handleEmailChange = handleFieldChange(setEditedEmail);
  const handleNameChange = handleFieldChange(setEditedName);
  const handleSurnameChange = handleFieldChange(setEditedSurname);
  const handleRoleChange = handleFieldChange(setEditedRole);

  const handleSaveWithoutRedirect = async () => {
    if (!isModified) return;
    console.log("Inizio salvataggio profilo...");
    setIsSaving(true);
    const saveResult = await handleSave();

    console.log("Risultato salvataggio:", saveResult);
    console.log("StatusMessage corrente:", statusMessage);

    if (saveResult && saveResult.success) {
      console.log("Salvataggio riuscito.");
      setIsModified(false);
    } else {
      console.error(
        "Errore durante il salvataggio: ",
        saveResult?.message || "Errore sconosciuto"
      );
    }
    setIsSaving(false);
  };

  const handleSaveAndRedirect = async () => {
    if (!isModified) return;
    console.log("Inizio salvataggio profilo...");
    setIsSaving(true);
    const saveResult = await handleSave();

    console.log("Risultato salvataggio:", saveResult);
    console.log("StatusMessage corrente:", statusMessage);

    if (saveResult && saveResult.success) {
      console.log("Salvataggio riuscito, reindirizzamento alla dashboard...");
      
        navigate("/dashboard", {
          state: {
            successMessage: statusMessage?.text || "Profile updated successfully!",
          },
        });
        setIsSaving(false);
       
      setIsModified(false);
    } else {
      console.error(
        "Errore durante il salvataggio: ",
        saveResult?.message || "Errore sconosciuto"
      );
      setIsSaving(false);
    }
  };

  const handleCancelAndRedirect = async () => {
    setIsSaving(true);
    await handleCancelEdit();
    navigate("/dashboard");
    setIsSaving(false);
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
    return (
      <div className="flex justify-center items-center h-screen">
        <PropagateLoader />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 relative flex">
      <Sidebar title="User Edit" />
      <div className="flex-1 flex flex-col">
        <LayoutDashboard />
        <main className=" px-6 bg-gray-50 ">
          <div className="bg-white  p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
              User Information
            </h2>
            {statusMessage && (
              <div
                className={` fixed bottom-10 right-10 w-fit p-3  shadow-md  rounded-md mb-4 ${
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
                  onClick={handleSaveWithoutRedirect}
                  disabled={isSaving || !isModified}
                  className={`bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mr-2 ${
                    isSaving || !isModified ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleSaveAndRedirect}
                  disabled={isSaving || !isModified}
                  className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 ${
                    isSaving || !isModified ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSaving ? "Saving..." : "Save and Back"}
                </button>
                <button
                  onClick={handleCancelAndRedirect}
                  disabled={isSaving}
                  className={`bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                    isSaving ? "opacity-50 cursor-not-allowed" : ""
                  }`}
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
                    disabled={isSaving}
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
                    disabled={isSaving}
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
                  <>
                    <input
                      type="email"
                      id="email"
                      disabled={isSaving}
                      name="email"
                      required
                      value={editedEmail}
                      onChange={handleEmailChange}
                      className="border border-gray-300 rounded-md px-2 py-1"
                    />
                    {statusMessage && statusMessage.type === "error" && (
                      <p className="text-red-500 text-sm mt-1">
                        {statusMessage.text}
                      </p>
                    )}
                  </>
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
                    disabled={isSaving}
                    onChange={(e) =>
                      setEditedIsConfirmed(e.target.value === "true")
                    }
                    className="border border-gray-300 rounded-md px-2 py-1"
                  >
                    <option value={user.isConfirmed}>
                      {user.isConfirmed ? "Yes" : "No"}
                    </option>
                    <option value={!user.isConfirmed}>
                      {!user.isConfirmed ? "Yes" : "No"}
                    </option>
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
                    disabled={isSaving}
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
