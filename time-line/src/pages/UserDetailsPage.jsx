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
        
        <main className="w-full container mx-auto py-8 px-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Surname:</strong> {user.surname}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Email Confirmed:</strong> {user.isConfirmed ? "Yes" : "No"}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        </main>
      </div>
    </div>
  );
}