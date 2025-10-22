import { useNavigate } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import Sidebar from "../components/sidebar";
import LayoutDashboard from "../layout/layoutDashboard";
import { useEffect } from "react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const {
    emailRef,
    passwordRef,
    confirmPasswordRef,
    roleRef, // Aggiunto per il riferimento del ruolo
    errorMessage,
    setErrorMessage,
    passwordValidationMessage,
    handlePasswordChange,
    register,
    isLoading, // Importa lo stato di caricamento
    nameRef, // Added for name field
    surnameRef, // Added for surname field
  } = useRegister();

 

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };

    useEffect(() => {
      if (errorMessage) {
        const timer = setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
  
        return () => clearTimeout(timer);
      }
    }, [errorMessage]);

  return (
    <div>
       <div className="min-h-screen bg-gray-100 relative flex">
            <Sidebar title="Create User" />
            <div className="flex-1 flex flex-col">
              <LayoutDashboard />
              <main>
        <div className="max-w-md mx-auto mt-10">
          <h1 className="text-2xl font-bold mb-6">Create New User</h1>
       
          {errorMessage && (
            <div className="mb-4  bg-red-100 text-red-700 rounded-md fixed bottom-10 right-10 w-fit p-3">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => (nameRef.current = e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="surname"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Surname
                </label>
                <input
                  type="text"
                  id="surname"
                  onChange={(e) => (surnameRef.current = e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  autoComplete="username"
                  onChange={(e) => (emailRef.current = e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="role"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Role
                </label>
                <select
                  id="role"
                  onChange={(e) => (roleRef.current = e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled selected hidden>Select a role</option>
                  <option value="Guest">Guest</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => handlePasswordChange(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {passwordValidationMessage && (
                <p className="text-red-600 text-sm mt-1">
                  {passwordValidationMessage}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                onChange={(e) => (confirmPasswordRef.current = e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className={`cursor-pointer w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading} // Disabilita il pulsante durante il caricamento
            >
              {isLoading ? "Loading..." : "Create new user"}{" "}
              {/* Mostra "Loading..." durante il caricamento */}
            </button>
          </form>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Return to the dashboard
          </button>
        </div>
      
      </main>
      </div>
      </div>
    </div>
  );
}
