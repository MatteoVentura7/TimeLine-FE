import Sidebar from '../components/sidebar';
import LayoutDashboard from '../layout/layoutDashboard';

export default function HomePage() {

  return (
    <div className="min-h-screen bg-gray-100 relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <LayoutDashboard />
      </div>
    </div>
  );
}
