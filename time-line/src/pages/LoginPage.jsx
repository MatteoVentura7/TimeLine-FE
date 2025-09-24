import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img className="w-52" src="./public/LOGO_ARGOMEDIA.png" alt="Logo" />
        </div>
        <LoginForm/>
      </div>
    </div>
  );
}
