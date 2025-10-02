import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loginResult, setLoginResult] = useState(null);
  const navigate = useNavigate();

  const login = () => {
    axios
      .post("http://localhost:3000/users/login", {
        email: emailRef.current,
        password: passwordRef.current,
      })
      .then((response) => {
        setLoginResult(response.data.message);
        localStorage.setItem("token", response.data.token); // Salva il token

        setTimeout(() => navigate("/dashboard"), 3000);
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
      });
  };

  return { emailRef, passwordRef, loginResult, login };
}
