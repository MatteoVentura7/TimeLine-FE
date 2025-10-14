import { useNavigate } from 'react-router-dom';
import { LogoutFunction } from "../components/LogoutFunction";

export default function HomePage() {
  const navigate = useNavigate();

    const handleLogout = () => {
      LogoutFunction();
      navigate("/");
    };

  return (
    <div>
      <header className=" text-black py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Home</h1>
          <img className="w-48" src="./public/LOGO_ARGOMEDIA.png" alt="" />
          <div className="flex space-x-4">
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
  );
}
