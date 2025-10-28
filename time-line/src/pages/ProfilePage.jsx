import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import LayoutDashboard from "../layout/layoutDashboard";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    role: "",
  });

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:3000/users/user-info", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("Failed to fetch user info");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 relative flex">
      <Sidebar title="Profile" />
      <div className="flex-1 flex flex-col">
        <LayoutDashboard />
        <main className="px-6 bg-gray-50">
          <div className="bg-white  p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
              Profile
            </h2>
            <p className="mb-4">
              <strong>Name:</strong>{" "}
              <span className="text-gray-700">{capitalize(user.name)}</span>
            </p>
            <p className="mb-4">
              <strong>Surname:</strong>{" "}
              <span className="text-gray-700">
                {capitalize(user.surname)}
              </span>
            </p>
            <p className="mb-4">
              <strong>Email:</strong>{" "}
              <span className="text-gray-700">{user.email}</span>
            </p>
            <p className="mb-4">
              <strong>Role:</strong>{" "}
              <span className="text-gray-700">{user.role}</span>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
