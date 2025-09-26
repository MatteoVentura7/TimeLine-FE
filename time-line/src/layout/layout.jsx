import { useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img
            onClick={() => navigate('/')}
            className="w-52 cursor-pointer"
            src="./public/LOGO_ARGOMEDIA.png"
            alt="Logo"
          />
        </div>
        {children}
      </div>
    </div>
  );
}