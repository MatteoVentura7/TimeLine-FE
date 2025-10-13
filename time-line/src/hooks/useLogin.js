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
        localStorage.setItem("role", response.data.role); // Salva il ruolo
        console.log("Login successful, " + response.data.token + " role: " + response.data.role);

      
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

  return { emailRef, passwordRef, loginResult, login, isLoading };
}
