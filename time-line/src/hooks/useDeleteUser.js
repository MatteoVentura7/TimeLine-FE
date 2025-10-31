import { useState } from "react";
import backendService from "../service/backendService";

export const useDeleteUser = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteUser = async (userId) => {
    setIsDeleting(true);
    try {
      await backendService.deleteUser(userId);
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
