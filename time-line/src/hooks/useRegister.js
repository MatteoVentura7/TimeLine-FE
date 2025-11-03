import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackendServiceInstance from "../service/BackendService";

export default function useRegister() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const roleRef = useRef(""); // Riferimento per il ruolo
  const nameRef = useRef(""); // Riferimento per il nome
  const surnameRef = useRef(""); // Riferimento per il cognome
  const confirmPasswordRef = useRef("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");
  const [isLoading, setIsLoading] = useState(false); // Stato per gestire il caricamento
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "The password must have at least eight characters.";
    }
    if (!/[A-Z]/.test(password)) {
      return "The password must have at least one capital letter.";
    }
    if (!/[0-9]/.test(password)) {
      return "The password must have at least one number.";
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
    const role = roleRef.current; // Ottieni il ruolo
    const name = nameRef.current; // Ottieni il nome
    const surname = surnameRef.current; // Ottieni il cognome

    const validationMessage = validatePassword(password);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      setIsLoading(false); // Reimposta lo stato di caricamento
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("The passwords do not match.");
      setIsLoading(false); // Reimposta lo stato di caricamento
      return;
    }

    BackendServiceInstance
      .register({ email, password, role, name, surname })
      .then((response) => {
        console.log("User created successfully:", response.data);
        setSuccessMessage(
          "Registration successful! Redirecting to the dashboard..."
        );
        setErrorMessage("");
        setTimeout(() => {
          setIsLoading(false); // Reimposta lo stato di caricamento dopo il reindirizzamento
          navigate("/dashboard", {
            state: { successMessage: "Registration successful!" },
          });
        }, 1000);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.error === "Email già esistente"
        ) {
          setErrorMessage("The provided email is already registered.");
        } else {
          console.error("Error creating user:", error);
          setErrorMessage("Error during registration. Please try again later.");
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
    roleRef, // Esporta il riferimento del ruolo
    nameRef, // Export name reference
    surnameRef, // Export surname reference
    setErrorMessage,
  };
}
