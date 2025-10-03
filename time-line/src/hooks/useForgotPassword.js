import { useState, useRef } from "react";
import axios from "axios";

export default function useForgotPassword() {
  const emailRef = useRef(null);
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    setMessage("");

    // Validazione dell'email
    const email = emailRef.current.value;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Inserisci un'email valida.");
      return { success: false };
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/users/reset-password",
        { email }
      );
      setMessage("Password reset link sent! Check your email.");
      return { success: true };
    } catch (error) {
      if (error.response) {
        setMessage("User not found with this email.");
      } else {
        setMessage("An error occurred. Please try again later.");
      }
      return { success: false };
    }
  };

  return { emailRef, message, handleForgotPassword };
}
