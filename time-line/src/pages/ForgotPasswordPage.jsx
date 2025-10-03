import { useRef } from "react";
import useForgotPassword from "../hooks/useForgotPassword";

export default function ForgotPasswordPage() {
  const { emailRef, message, handleForgotPassword } = useForgotPassword();

  return (
    <form onSubmit={handleForgotPassword}>
      <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          ref={emailRef}
          autoComplete="username"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>
      <button
        type="submit"
        className="cursor-pointer w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Invia Link di Reset
      </button>
      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </form>
  );
}
