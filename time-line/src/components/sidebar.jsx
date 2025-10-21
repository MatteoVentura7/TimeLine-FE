export default function Sidebar({ title = "Sidebar" }) {
  return (
    <div className="flex flex-col w-64 bg-gray-800 min-h-screen">
      <div className="flex items-center justify-center h-31 bg-gray-900">
        <span className="text-white font-bold uppercase">{title}</span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 bg-gray-800">
          <a
            href="/dashboard"
            className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
          >
            <i className="fa-solid fa-bars"></i>
            <span className="mx-4 font-medium">Dasboard</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
