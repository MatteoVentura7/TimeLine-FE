import { useEffect, useState, useRef } from "react";
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
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    LogoutFunction();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full text-black py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="w-48"></h1>
        <img className="w-48" src="/LOGO_ARGOMEDIA.png" alt="" />
        <div className="flex space-x-4 items-center">
          <span className="text-gray-700">{welcomeMessage}</span>
          <div className="relative" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="cursor-pointer text-2xl focus:outline-none focus:ring-2 focus:ring-stone-700 bg-stone-500 text-white px-2 py-2 rounded-3xl shadow-md hover:bg-stone-600 ">
              <i className="fa-solid fa-circle-user"></i>
            </button>
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
