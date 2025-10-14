import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in (example logic, replace with actual authentication check)
    const token = localStorage.getItem('token'); // Updated to match the correct key
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img
            onClick={() => {
              if (!isLoggedIn) {
                navigate('/');
              }
            }}
            className="w-52 cursor-pointer"
            src="/LOGO_ARGOMEDIA.png"
            alt="Logo"
          />
        </div>
        {children}
      </div>
    </div>
  );
}