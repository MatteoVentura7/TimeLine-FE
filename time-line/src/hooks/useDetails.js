import { useEffect, useState } from "react";
import axios from "axios";

export default function useDetails(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${userId}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch user details.");
        setLoading(false);
      });
  }, [userId]);

  return { user, setUser, loading, error };
}