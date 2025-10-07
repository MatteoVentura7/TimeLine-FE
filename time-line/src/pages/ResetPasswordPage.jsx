import { useResetPassword } from "../hooks/useResetPassword";

export default function ResetPasswordPage() {
  const {
    tokenValid,
    error,
    newPasswordRef,
    confirmPasswordRef,
    handleSubmit,
    message
  } = useResetPassword();

  if (error) {
    return <div>{error}</div>;
  }

  if (!tokenValid) {
    return <div>Verifica del token in corso...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
         <h1 className="text-2xl font-bold mb-6">Change Password</h1>
      {message && <p className="mb-4 text-center text-red-700 bg-red-100 p-2 rounded">{message}</p>}
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
    
      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          ref={newPasswordRef}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          ref={confirmPasswordRef}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="cursor-pointer w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Update Password
      </button>
    </form>
    </div>
  );
}