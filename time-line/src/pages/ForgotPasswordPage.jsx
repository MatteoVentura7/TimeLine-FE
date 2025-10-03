import { useRef, useState } from "react";
import useForgotPassword from "../hooks/useForgotPassword";

export default function ForgotPasswordPage() {
  const { emailRef, message, handleForgotPassword } = useForgotPassword();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleForgotPassword();

    if (result.success) {
      setIsButtonDisabled(true);
      setTimer(120); // 2 minuti

      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setIsButtonDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        className="cursor-pointer w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isButtonDisabled}
      >
        {isButtonDisabled ? `Resend in ${timer}s` : "Send Reset Link"}
      </button>
      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </form>
  );
}
