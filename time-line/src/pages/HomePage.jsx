import { useNavigate } from 'react-router-dom';
import { LogoutFunction } from "../components/LogoutFunction";
import Sidebar from '../components/sidebar';
import { useEffect, useState } from 'react';

export default function HomePage() {

  const [welcomeMessage, setWelcomeMessage] = useState("");

  const navigate = useNavigate();

    const handleLogout = () => {
      LogoutFunction();
      navigate("/");
    };

    useEffect(() => {
        const name = localStorage.getItem("name") || "";
        const surname = localStorage.getItem("surname") || "";
    
        const capitalize = (str) =>
          str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    
        setWelcomeMessage(`Hello, ${capitalize(name)} ${capitalize(surname)}`);
      }, []);
    

  return (
    <div className="min-h-screen bg-gray-100 relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
      <header className=" text-black py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Home</h1>
          <img className="w-48" src="./public/LOGO_ARGOMEDIA.png" alt="" />
          <div className="flex space-x-4 items-center">
            <span className="text-gray-700">{welcomeMessage}</span>
            <button  onClick={handleLogout}
              className="bg-red-500  text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
              Logout
            </button>
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => navigate('/profile')}
            >
              <i className="fa-solid fa-user"></i>
              
            </button>
          </div>
        </div>
      </header>
    </div>
    </div>
  );
}
