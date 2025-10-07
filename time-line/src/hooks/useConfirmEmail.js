import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export function useConfirmEmail() {
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tokenValid, setTokenValid] = useState(false);
  const [error, setError] = useState("");

  const token = searchParams.get("token");

  useEffect(() => {
    // Verifica il token
    axios
      .get(`http://localhost:3000/users/verify-email-token?token=${token}`)
      .then(() => setTokenValid(true))
      .catch(() => setError("The request is no longer valid or has expired."));
  }, [token]);

  const confirmEmail = () => {
    if (!tokenValid) {
      setMessage("Token non valido o scaduto.");
      return;
    }

    console.log("Token being sent:", token); // Debug log for token

    axios
      .post("http://localhost:3000/users/confirm-email", { token })
      .then((response) => {
        console.log("Server response:", response.data); // Debug log for server response
        setMessage("Email confirmed successfully! Redirecting to login page...");
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((error) => {
        console.error("Error during email confirmation:", error); // Debug log for error
        if (error.response) {
          setMessage(error.response.data.error);
        } else {
          setMessage("Network error. Please try again later.");
        }
      });
  };

  return { message, confirmEmail, tokenValid, error };
}
