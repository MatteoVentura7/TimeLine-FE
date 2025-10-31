import { useEffect, useState } from "react";
import axios from "axios";
import backendService from "../service/backendService";

export default function useDetails(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    backendService
      .userDetails(userId)
      .then((response) => {
        setUser(response.data);
        localStorage.setItem("id", response.data.id); // Salva l'ID utente
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch user details.");
        setLoading(false);
      });
  }, [userId]);

  return { user, setUser, loading, error };
}
