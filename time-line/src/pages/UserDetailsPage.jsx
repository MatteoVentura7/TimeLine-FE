import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/sidebar";
import useDetails from "../hooks/useDetails";
import useEditProfile from "../hooks/useEditProfile";
import LayoutDashboard from "../layout/layoutDashboard";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function UserDetailsPage() {
  const { userId } = useParams();
  const { user, loading, error, setUser } = useDetails(userId);
  const [isSaving, setIsSaving] = useState(false);
  const [isModified, setIsModified] = useState(false);

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
    passwordPopup,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleChangePassword,
    handleSavePassword,
    closePasswordPopup,
  } = useEditProfile((updatedUser) => {
    // Aggiorna lo stato locale con i dati aggiornati
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUser,
    }));
  });

  const handleFieldChange = (setter) => (e) => {
    setter(e.target.value);
    setIsModified(true);
  };

  const handleEmailChange = handleFieldChange(setEditedEmail);
  const handleNameChange = handleFieldChange(setEditedName);
  const handleSurnameChange = handleFieldChange(setEditedSurname);
  const handleRoleChange = handleFieldChange(setEditedRole);

  const handleSaveWithState = async () => {
    if (!isModified) return;
    setIsSaving(true);
    await handleSave();
    setIsSaving(false);
    setIsModified(false);
  };

  const handleCancelWithState = async () => {
    setIsSaving(true);
    await handleCancelEdit();
    setIsSaving(false);
  };

  const handleSavePasswordWithState = async (e) => {
    e.preventDefault(); // Impedisce l'invio del form
    setIsSaving(true);
    await handleSavePassword();
    setIsSaving(false);
  };

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
      <Sidebar title="User Details" />
      <div className="flex-1 flex flex-col">
        <LayoutDashboard />
        <main className=" px-6 bg-gray-50 ">
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
              {editingUser === user.id ? (
                <>
                  <button
                    onClick={handleSaveWithState}
                    disabled={isSaving || !isModified}
                    className={`bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mr-2 ${
                      isSaving || !isModified
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={handleCancelWithState}
                    disabled={isSaving}
                    className={`bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                      isSaving ? "opacity-50 cursor-not-allowed" : ""
                    }`}
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
                    className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-2"
                  >
                    <i className="fa-solid fa-pencil"></i> Edit
                  </button>
                  <button
                    onClick={() => handleChangePassword(user.id)}
                    className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                  >
                    <i className="fa-solid fa-key"></i> Change Password
                  </button>
                </>
              )}
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
                    name="Surname"
                    disabled={isSaving}
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
                    disabled={isSaving}
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
                    disabled={isSaving}
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
            {passwordPopup.visible && (
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-md text-center">
                  <h3 className="mb-4 text-lg font-semibold">
                    Change Password
                  </h3>
                  <form onSubmit={handleSavePasswordWithState}>
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
                        disabled={isSaving}
                        className={`bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                          isSaving ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {isSaving ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={closePasswordPopup}
                        disabled={isSaving}
                        className={`bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                          isSaving ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
