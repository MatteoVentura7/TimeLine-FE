import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function useChangePassword() {
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  // Leggi il token dalla query string
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setMessage("Token non valido o mancante.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password === confirmPassword) {
      try {
        const response = await axios.put(
          "http://localhost:3000/users/update-password",
          {
            token, // Invia il token
            newPassword: password,
          }
        );

        setMessage(response.data.message || "Password changed successfully");
      } catch (error) {
        console.error("Error:", error);
        setMessage(error.response?.data?.error || "Failed to change password");
      }
    } else {
      setMessage("Passwords do not match");
    }
  };

  return { passwordRef, confirmPasswordRef, message, handleSubmit };
}

export { useChangePassword };
