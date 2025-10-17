import { useEffect, useState } from "react";
import { LogoutFunction } from "../components/LogoutFunction";
import { useNavigate } from "react-router-dom";

export default function LayoutDashboard() {
  const navigate = useNavigate();

  const [welcomeMessage, setWelcomeMessage] = useState("");
  useEffect(() => {
    const name = localStorage.getItem("name") || "";
    const surname = localStorage.getItem("surname") || "";

    const capitalize = (str) =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    setWelcomeMessage(`Hello, ${capitalize(name)} ${capitalize(surname)}`);
  }, []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    LogoutFunction();
    navigate("/");
  };

  return (
    <header className="w-full text-black py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold"></h1>
        <img className="w-48" src="/LOGO_ARGOMEDIA.png" alt="" />
        <div className="flex space-x-4 items-center">
          <span className="text-gray-700">{welcomeMessage}</span>
          <div className="relative">
            <span onClick={toggleDropdown} className="cursor-pointer">
              <i className="fa-solid fa-user text-2xl"></i>
            </span>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
                <ul>
                  <li
                    onClick={() => navigate("/profile")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    My Profile
                  </li>
                  <li
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
