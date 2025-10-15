import { useState } from "react";
import axios from "axios";

const useEditProfile = () => {
  const [editingUser, setEditingUser] = useState(null);
  const [editedEmail, setEditedEmail] = useState("");
  const [editedIsConfirmed, setEditedIsConfirmed] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedSurname, setEditedSurname] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEdit = (userId, currentEmail, currentIsConfirmed, currentName, currentSurname) => {
    setEditingUser(userId);
    setEditedEmail(currentEmail);
    setEditedIsConfirmed(currentIsConfirmed);
    setEditedName(currentName);
    setEditedSurname(currentSurname);
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
          isConfirmed: editedIsConfirmed,
          name: editedName,
          surname: editedSurname,
        }
      );
      setStatusMessage({ type: "success", text: response.data.message });
      setEditingUser(null); // Reset editing state after saving
      setEditedEmail("");
      setEditedIsConfirmed(false);
      setEditedName("");
      setEditedSurname("");
      return {
        userId: editingUser,
        email: editedEmail,
        isConfirmed: editedIsConfirmed,
        name: editedName,
        surname: editedSurname,
      };
    } catch (error) {
      if (error.response) {
        setStatusMessage({ type: "error", text: error.response.data.error });
      } else {
        setStatusMessage({ type: "error", text: "Unexpected error." });
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditedEmail("");
    setEditedIsConfirmed(false);
    setEditedName("");
    setEditedSurname("");
  };

  return {
    editingUser,
    editedEmail,
    editedIsConfirmed,
    editedName,
    editedSurname,
    statusMessage,
    handleEdit,
    handleSave,
    handleCancelEdit,
    setEditedEmail,
    setEditedIsConfirmed,
    setEditedName,
    setEditedSurname,
  };
};

export default useEditProfile;