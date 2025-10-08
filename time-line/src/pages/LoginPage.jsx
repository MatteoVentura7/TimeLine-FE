import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import Layout from "../layout/layout";

export default function LoginPage() {
  const { emailRef, passwordRef, login, loginResult, isLoading } = useLogin();
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: "", isError: false });

  useEffect(() => {
    if (loginResult) {
      setMessage({
        text: loginResult,
        isError:
          loginResult === "Invalid credentials. Please try again.",
      });
    }
  }, [loginResult]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div>
      <Layout>
    <form onSubmit={handleSubmit}>
      {message.text && (
        <div
          className={`mb-4 p-2 rounded bg-red-100 text-red-700 ${
            message.isError
             
          }`}
        >
          {message.text}
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          autoComplete="username"
          onChange={(e) => (emailRef.current = e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="password"
          className="block text-gray-700 font-medium mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          onChange={(e) => (passwordRef.current = e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>
      <div className="mb-3">
        <a
          href=""
          className="text-blue-500 hover:underline"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </a>
      </div>

      <button
        type="submit"
        className={` mb-2 w-full bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
          isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Login"}
      </button>
      
    </form>
    </Layout>
    </div>
  );
}
