import { useState } from "react";

export const useDeleteUser = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteUser = async (userId) => {
    setIsDeleting(true);
    try {
      
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Errore nella cancellazione utente");
      return true;
    } catch (error) {
      console.error("Errore:", error);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteUser, isDeleting };
};