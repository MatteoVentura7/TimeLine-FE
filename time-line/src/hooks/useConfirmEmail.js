import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export function useConfirmEmail() {
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const confirmEmail = () => {
    const token = searchParams.get("token");

    axios
      .post("http://localhost:3000/users/confirm-email", { token })
      .then((response) => {
        setMessage(response.data.message);
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.error);
        } else {
          setMessage("Errore di rete. Riprova più tardi.");
        }
      });
  };

  return { message, confirmEmail };
}