import Sidebar from '../components/sidebar';
import LayoutDashboard from '../layout/layoutDashboard';

export default function HomePage() {

  return (
    <div className="min-h-screen bg-gray-100 relative flex">
      <Sidebar title="Home" />
      <div className="flex-1 flex flex-col">
        <LayoutDashboard />
      </div>
    </div>
  );
}
