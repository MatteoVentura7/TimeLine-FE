import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function useResetPassword() {
  const [searchParams] = useSearchParams();
  const [tokenValid, setTokenValid] = useState(false);
  const [error, setError] = useState("");
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    // Verifica il token
    axios
      .get(`http://localhost:3000/users/verify-reset-token?token=${token}`)
      .then(() => setTokenValid(true))
      .catch(() => setError("The request is no longer valid or has expired."));
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    axios
      .put("http://localhost:3000/users/update-password", {
        token,
        newPassword,
      })
      .then((response) => {
        setMessage(response.data.message || "Password changed successfully");
        navigate("/"); // Redirect to login page
      })
      .catch((error) => {
        setMessage(error.response?.data?.error || "Failed to change password");
      });
  };

  return {
    tokenValid,
    error,
    newPasswordRef,
    confirmPasswordRef,
    handleSubmit,
    message,
  };
}
