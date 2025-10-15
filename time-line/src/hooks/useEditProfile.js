import { useState, useEffect } from "react";
import axios from "axios";

const useEditProfile = () => {
  const [editingUser, setEditingUser] = useState(null);
  const [editedEmail, setEditedEmail] = useState("");
  const [editedIsConfirmed, setEditedIsConfirmed] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedSurname, setEditedSurname] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);
   const [passwordPopup, setPasswordPopup] = useState({
    visible: false,
    userId: null,
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");



  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEdit = (userId, currentEmail, currentIsConfirmed, currentName, currentSurname, currentRole) => {
    setEditingUser(userId);
    setEditedEmail(currentEmail);
    setEditedIsConfirmed(currentIsConfirmed);
    setEditedName(currentName);
    setEditedSurname(currentSurname);
    setEditedRole(currentRole);
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
          role: editedRole,
        }
      );
      setStatusMessage({ type: "success", text: response.data.message });
      setEditingUser(null); // Reset editing state after saving
      setEditedEmail("");
      setEditedIsConfirmed(false);
      setEditedName("");
      setEditedSurname("");
      setEditedRole("");
      return {
        userId: editingUser,
        email: editedEmail,
        isConfirmed: editedIsConfirmed,
        name: editedName,
        surname: editedSurname,
        role: editedRole,
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
    setEditedRole("");
  };

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

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

  return {
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
  };
};

export default useEditProfile;