import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/sidebar";
import useDetails from "../hooks/useDetails";
import LayoutDashboard from "../layout/layoutDashboard";

export default function UserDetailsPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user, loading, error } = useDetails(userId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <LayoutDashboard />
        
        <main className=" py-12 px-6 bg-gray-50 ">
          <div className="bg-white p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">User Information</h2>
            <p className="text-gray-700 mb-2 text-lg"><strong>ID:</strong> {user.id}</p>
            <p className="text-gray-700 mb-2 text-lg"><strong>Name:</strong> {user.name.charAt(0).toUpperCase() + user.name.slice(1)}</p>
            <p className="text-gray-700 mb-2 text-lg"><strong>Surname:</strong> {user.surname.charAt(0).toUpperCase() + user.surname.slice(1)}</p>
            <p className="text-gray-700 mb-2 text-lg"><strong>Email:</strong> {user.email}</p>
            <p className="text-gray-700 mb-2 text-lg"><strong>Email Confirmed:</strong> {user.isConfirmed ? "Yes" : "No"}</p>
            <p className="text-gray-700 mb-2 text-lg"><strong>Role:</strong> {user.role}</p>
          </div>
        </main>
      </div>
    </div>
  );
}