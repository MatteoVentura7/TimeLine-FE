import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const roleRef = useRef(""); // Riferimento per il ruolo
  const nameRef = useRef(""); // Riferimento per il nome
  const surnameRef = useRef(""); // Riferimento per il cognome
  const [loginResult, setLoginResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Stato per gestire il caricamento
  const navigate = useNavigate();

  const login = () => {
    if (isLoading) return; // Evita richieste multiple

    setIsLoading(true); // Imposta lo stato di caricamento

    axios
      .post("http://localhost:3000/users/login", {
        email: emailRef.current,
        password: passwordRef.current,
        role: roleRef.current, // Includi il ruolo nella richiesta
        name: nameRef.current, // Includi il nome nella richiesta
        surname: surnameRef.current, // Includi il cognome nella richiesta  
      })
      .then((response) => {
        setLoginResult(response.data.message);
        localStorage.setItem("token", response.data.token); // Salva il token
        localStorage.setItem("role", response.data.role); // Salva il ruolo
        localStorage.setItem("id", response.data.id); // Salva l'ID utente
        localStorage.setItem("name", response.data.name); // Salva il nome
        localStorage.setItem("surname", response.data.surname); // Salva il cognome
        console.log("Login successful, " + response.data.token + " role: " + response.data.role + " id: " + response.data.id + " name: " + response.data.name + " surname: " + response.data.surname);

      
          setIsLoading(false); // Reimposta lo stato di caricamento dopo il reindirizzamento
          navigate("/dashboard");
        
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            setLoginResult("Invalid credentials. Please try again.");
          } else {
            setLoginResult(error.response.data.error);
          }
        } else {
          console.error("Network error:", error);
          alert("Network error. Please try again later.");
        }
        setIsLoading(false); // Reimposta lo stato di caricamento in caso di errore
      });
  };

  return { emailRef, passwordRef, loginResult, login, isLoading, roleRef};
}
