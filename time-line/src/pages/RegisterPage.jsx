import useRegister from "../hooks/useRegister";
import Layout from "../layout/layout";

export default function RegisterPage() {
  const {
    emailRef,
    passwordRef,
    confirmPasswordRef,
    successMessage,
    errorMessage,
    passwordValidationMessage,
    handlePasswordChange,
    register,
    isLoading, // Importa lo stato di caricamento
  } = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };

  return (
    <div>
      <Layout>
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      {successMessage && (
        <div className="mb-4 p-4 text-green-800 bg-green-200 rounded-md">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-4 text-red-800 bg-red-200 rounded-md">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
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
          {isLoading ? "Loading..." : "Register"}{" "}
          {/* Mostra "Loading..." durante il caricamento */}
        </button>
      </form>
    </div>
    </Layout>
    </div>
  );
}
