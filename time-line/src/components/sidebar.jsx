export default function Sidebar() {
  return (
   <div className="hidden md:flex flex-col w-64 bg-gray-800 h-screen">
        <div className="flex items-center justify-center h-31 bg-gray-900">
            <span className="text-white font-bold uppercase">Sidebar</span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-800">
                <a href="#" className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                    <i className="fa-solid fa-bars"></i>
                    <span className="mx-4 font-medium">Dasboard</span>
                </a>
                <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                      <i className="fa-solid fa-envelope"></i>
                    <span className="mx-4 font-medium">Message</span>
                </a>
                <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                      <i className="fa-solid fa-gear"></i>
                    <span className="mx-4 font-medium">Settings</span>
                </a>
            </nav>
        </div>
    </div>
  );
}
