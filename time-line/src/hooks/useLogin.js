import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const loginResultRef = useRef(null);
  const navigate = useNavigate();

  const login = () => {
    axios
      .post("http://localhost:3000/users/login", {
        email: emailRef.current,
        password: passwordRef.current,
      })
      .then((response) => {
        loginResultRef.current = response.data.message;
        localStorage.setItem("token", response.data.token); // Salva il token
        alert("Login effettuato con successo!");
        navigate("/dashboard"); // Naviga alla pagina dashboard
      })
      .catch((error) => {
        if (error.response) {
          loginResultRef.current = error.response.data.error;
          alert("Errore: " + error.response.data.error);
        } else {
          console.error("Errore di rete:", error);
          alert("Errore di rete. Riprova più tardi.");
        }
      });
  };

  return { emailRef, passwordRef, loginResultRef, login };
}
