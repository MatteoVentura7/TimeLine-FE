import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useRegister() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");
  const [isLoading, setIsLoading] = useState(false); // Stato per gestire il caricamento
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "La password deve contenere almeno 8 caratteri.";
    }
    if (!/[A-Z]/.test(password)) {
      return "La password deve contenere almeno una lettera maiuscola.";
    }
    if (!/[0-9]/.test(password)) {
      return "La password deve contenere almeno un numero.";
    }
    return "";
  };

  const handlePasswordChange = (password) => {
    const validationMessage = validatePassword(password);
    setPasswordValidationMessage(validationMessage);
    passwordRef.current = password;
  };

  const register = () => {
    if (isLoading) return; // Evita richieste multiple

    setIsLoading(true); // Imposta lo stato di caricamento

    const email = emailRef.current;
    const password = passwordRef.current;
    const confirmPassword = confirmPasswordRef.current;

    const validationMessage = validatePassword(password);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      setIsLoading(false); // Reimposta lo stato di caricamento
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Le password non corrispondono.");
      setIsLoading(false); // Reimposta lo stato di caricamento
      return;
    }

    axios
      .post("http://localhost:3000/users", { email, password })
      .then((response) => {
        console.log("User created successfully:", response.data);
        setSuccessMessage(
          "Register successfully! Redirecting to login page..."
        );
        setErrorMessage("");
        setTimeout(() => {
          setIsLoading(false); // Reimposta lo stato di caricamento dopo il reindirizzamento
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.error === "Email già esistente"
        ) {
          setErrorMessage("L'email fornita è già registrata.");
        } else {
          console.error("Error creating user:", error);
          setErrorMessage(
            "Errore durante la registrazione. Riprova più tardi."
          );
        }
        setIsLoading(false); // Reimposta lo stato di caricamento in caso di errore
      });
  };

  return {
    emailRef,
    passwordRef,
    confirmPasswordRef,
    successMessage,
    errorMessage,
    passwordValidationMessage,
    handlePasswordChange,
    register,
    isLoading, // Esporta lo stato di caricamento
  };
}
