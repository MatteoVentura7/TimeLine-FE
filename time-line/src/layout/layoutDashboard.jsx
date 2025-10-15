import { useEffect, useState } from "react";

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
  
    return (
         <header className="w-full text-black py-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center px-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <img className="w-48" src="/LOGO_ARGOMEDIA.png" alt="" />
            <div className="flex space-x-4 items-center">
              <span className="text-gray-700">{welcomeMessage}</span>
              <span >
                <i className="fa-solid fa-user text-2xl"></i>
              </span>
            </div>
          </div>
        </header>
    );
}