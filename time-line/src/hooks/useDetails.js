import { useEffect, useState } from "react";
import BackendServiceInstance from "../service/BackendService";

export default function useDetails(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    BackendServiceInstance
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
