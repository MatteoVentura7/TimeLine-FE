import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDeleteUser } from "../hooks/useDeleteUser";
import Sidebar from "../components/sidebar";
import LayoutDashboard from "../layout/layoutDashboard";

export default function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [popup, setPopup] = useState({ visible: false, userId: null });
  const { deleteUser, isDeleting } = useDeleteUser();
  const [statusMessage, setStatusMessage] = useState(
    location.state?.successMessage
      ? { type: "success", text: location.state.successMessage }
      : null
  );

  // 🔹 stati per paginazione lato server
  const [currentPage, setCurrentPage] = useState(0); // parte da 0 per React
  const [totalPages, setTotalPages] = useState(0);
  const usersPerPage = 7;

  // 🔹 stato di caricamento
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 Ottieni utenti dalla API con paginazione server-side
  useEffect(() => {
    setIsLoading(true); // inizio caricamento
    axios
      .get(
        `http://localhost:3000/users?page=${currentPage + 1}&limit=${usersPerPage}`
      )
      .then((response) => {
        setUsers(response.data.data); // riceve solo gli utenti della pagina corrente
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        setIsLoading(false); // fine caricamento
      });
  }, [currentPage]);

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const handleCreateUser = () => navigate("/dashboard/create-user");
  const handleEdit = (userId) => navigate(`/dashboard/edit-profile/${userId}`);
  const handleViewDetails = (userId) =>
    navigate(`/dashboard/user-details/${userId}`);

  const confirmDelete = (userId) => setPopup({ visible: true, userId });

  const handleDelete = async () => {
    const { userId } = popup;
    try {
      const success = await deleteUser(userId);
      if (success) {
        // ricarico la pagina corrente dopo la cancellazione
        setIsLoading(true);
        axios
          .get(
            `http://localhost:3000/users?page=${
              currentPage + 1
            }&limit=${usersPerPage}`
          )
          .then((response) => {
            setUsers(response.data.data);
            setTotalPages(response.data.totalPages);
          })
          .finally(() => setIsLoading(false));

        setStatusMessage({
          type: "success",
          text: "User deleted successfully.",
        });
      } else {
        setStatusMessage({ type: "error", text: "Failed to delete user." });
      }
    } catch (error) {
      setStatusMessage({ type: "error", text: "An unexpected error occurred." });
    }
    setPopup({ visible: false, userId: null });
  };

  const closePopup = () => setPopup({ visible: false, userId: null });

  // 🔹 funzioni paginazione
  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (index) => setCurrentPage(index);

  return (
    <div className="min-h-screen bg-gray-100 relative flex">
      <Sidebar title="Dashboard" />
      <div className="flex-1 flex flex-col">
        <LayoutDashboard />
        <main className="w-full container mx-auto py-8 px-4">
          <h2 className="text-xl font-semibold mb-4">User List</h2>

          {statusMessage && (
            <div
              className={`fixed bottom-10 right-10 w-fit p-3 z-50 ${
                statusMessage.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          <div className="flex justify-end items-center">
            <button
              onClick={handleCreateUser}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mb-5"
            >
              Create New User <i className="fa-solid fa-plus"></i>
            </button>
          </div>

          {/* 🔹 LOADING SPINNER */}
          {isLoading ? (
            <div className="flex justify-center items-center my-10">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-3 text-gray-600 text-sm">Loading users...</p>
              </div>
            </div>
          ) : (
            <>
              {/* 🔹 TABELLA UTENTI */}
              <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 border border-gray-300 text-left">
                        ID
                      </th>
                      <th className="px-4 py-2 border border-gray-300 text-left">
                        Name
                      </th>
                      <th className="px-4 py-2 border border-gray-300 text-left">
                        Surname
                      </th>
                      <th className="px-4 py-2 border border-gray-300 text-left">
                        Email
                      </th>
                      <th className="px-4 py-2 border border-gray-300 text-left">
                        Email Confirmed
                      </th>
                      <th className="px-4 py-2 border border-gray-300 text-left">
                        Role
                      </th>
                      <th className="px-4 py-2 border border-gray-300 text-left">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-100">
                        <td className="px-4 py-2 border border-gray-300">
                          {user.id}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {user.name?.charAt(0).toUpperCase() +
                            user.name?.slice(1)}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {user.surname?.charAt(0).toUpperCase() +
                            user.surname?.slice(1)}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {user.email}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {user.isConfirmed ? "Yes" : "No"}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {user.role}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <div className="flex justify-end">
                            <button
                              onClick={() => handleEdit(user.id)}
                              className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-2"
                            >
                              <i className="fa-solid fa-pencil"></i> Edit
                            </button>
                            <button
                              onClick={() => handleViewDetails(user.id)}
                              className="bg-blue-500 mr-2 text-white py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                              <i className="fa-solid fa-eye"></i> View Details
                            </button>
                            <button
                              onClick={() => confirmDelete(user.id)}
                              className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mr-2"
                            >
                              <i className="fa-solid fa-trash"></i> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 🔹 PAGINAZIONE */}
              <div className="flex justify-center mt-4 space-x-2">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 0}
                  className={`py-1 px-3 rounded-full text-sm shadow-md transition-all duration-300 ${
                    currentPage === 0
                      ? "bg-gray-300"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageClick(index)}
                    className={`py-1 px-3 rounded-full text-sm shadow-md transition-all duration-300 ${
                      currentPage === index
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                  className={`py-1 px-3 rounded-full text-sm shadow-md transition-all duration-300 ${
                    currentPage === totalPages - 1
                      ? "bg-gray-300"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </main>
      </div>

      {/* POPUP */}
      {popup.visible && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p className="mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Confirm
              </button>
              <button
                onClick={closePopup}
                className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleting && (
        <div className="fixed bottom-10 right-10 w-fit p-2 text-white z-50">
          <div className="bg-amber-400 p-2 text-center">
            <p>Deleting user...</p>
          </div>
        </div>
      )}
    </div>
  );
}
