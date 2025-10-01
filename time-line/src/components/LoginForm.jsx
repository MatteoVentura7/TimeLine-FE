import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

export default function LoginForm() {
  const { emailRef, passwordRef, login } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
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
        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
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
      <div className='mb-3'><a href="" className="text-blue-500 hover:underline" onClick={() => navigate('/forgot-password')}>Forgot Password?</a></div>
      
      <button
        type="submit"
        className="w-full bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
      >
        Login
      </button>
      <button
        type="button"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer mt-4"
        onClick={() => navigate('/create-user')}
      >
       Register
      </button>
    
    </form>
  );
}