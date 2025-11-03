import { useState } from "react";
import BackendServiceInstance from "../service/BackendService";

export const useDeleteUser = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteUser = async (userId) => {
    setIsDeleting(true);
    try {
      await BackendServiceInstance.deleteUser(userId);
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
