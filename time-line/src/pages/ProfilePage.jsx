import Sidebar from "../components/sidebar";
import LayoutDashboard from "../layout/layoutDashboard";

const ProfilePage = () => {
  const name = localStorage.getItem("name") || "";
  const surname = localStorage.getItem("surname") || "";
  const email = localStorage.getItem("email") || "";
  const role = localStorage.getItem("role") || "";

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

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
              <span className="text-gray-700">{capitalize(name)}</span>
            </p>
            <p className="mb-4">
              <strong>Surname:</strong>{" "}
              <span className="text-gray-700">{capitalize(surname)}</span>
            </p>
            <p className="mb-4">
              <strong>Email:</strong>{" "}
              <span className="text-gray-700">{email}</span>
            </p>
            <p className="mb-4">
              <strong>Role:</strong>{" "}
              <span className="text-gray-700">{role}</span>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
