import { useState, useRef } from "react";
import axios from "axios";

export default function useForgotPassword() {
  const emailRef = useRef(null);
  const [message, setMessage] = useState("");

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setMessage("");

    // Validazione dell'email
    const email = emailRef.current.value;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Inserisci un'email valida.");
      return;
    }

    axios
      .post("http://localhost:3000/users/reset-password", { email })
      .then((response) => {
        setMessage("Un link per il reset è stato inviato alla tua email.");
      })
      .catch((error) => {
        if (error.response) {
          setMessage("Utente non trovato con questa email.");
        } else {
          setMessage("Si è verificato un errore. Riprova più tardi.");
        }
      });
  };

  return { emailRef, message, handleForgotPassword };
}