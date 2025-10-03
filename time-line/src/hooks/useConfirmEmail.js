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
        setMessage("Email confirmed successfully! Redirecting to login page...");
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.error);
        } else {
          setMessage("Network error. Please try again later.");
        }
      });
  };

  return { message, confirmEmail };
}
