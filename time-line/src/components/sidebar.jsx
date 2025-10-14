export default function Sidebar() {
  return (
   <div class="hidden md:flex flex-col w-64 bg-gray-800 h-screen">
        <div class="flex items-center justify-center h-31 bg-gray-900">
            <span class="text-white font-bold uppercase">Sidebar</span>
        </div>
        <div class="flex flex-col flex-1 overflow-y-auto">
            <nav class="flex-1 px-2 py-4 bg-gray-800">
                <a href="#" class="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                    <i class="fa-solid fa-bars"></i>
                    <span class="mx-4 font-medium">Dasboard</span>
                </a>
                <a href="#" class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                      <i class="fa-solid fa-envelope"></i>
                    <span class="mx-4 font-medium">Message</span>
                </a>
                <a href="#" class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                      <i class="fa-solid fa-gear"></i>
                    <span class="mx-4 font-medium">Settings</span>
                </a>
            </nav>
        </div>
    </div>
  );
}
