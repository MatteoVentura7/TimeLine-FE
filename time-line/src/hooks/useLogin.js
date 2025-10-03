import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
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
      })
      .then((response) => {
        setLoginResult(response.data.message);
        localStorage.setItem("token", response.data.token); // Salva il token

        setTimeout(() => {
          setIsLoading(false); // Reimposta lo stato di caricamento dopo il reindirizzamento
          navigate("/dashboard");
        }, 2000);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            setLoginResult("Credenziali non valide. Riprova.");
          } else {
            setLoginResult(error.response.data.error);
          }
        } else {
          console.error("Errore di rete:", error);
          alert("Errore di rete. Riprova più tardi.");
        }
        setIsLoading(false); // Reimposta lo stato di caricamento in caso di errore
      });
  };

  return { emailRef, passwordRef, loginResult, login, isLoading };
}
