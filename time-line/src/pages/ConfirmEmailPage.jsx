import { useRef } from "react";
import { useConfirmEmail } from "../hooks/useConfirmEmail";

export default function ConfirmEmailPage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { message, confirmEmail } = useConfirmEmail();

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmEmail(emailRef.current.value, passwordRef.current.value);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Conferma Email</h1>
      {message && <p className="mb-4 text-center text-gray-700">{message}</p>}
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
            ref={emailRef}
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
            ref={passwordRef}
            required
            autoComplete="current-password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Conferma
        </button>
      </form>
    </div>
  );
}
