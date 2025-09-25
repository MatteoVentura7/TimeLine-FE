import SignInForm from "../components/SignInForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img className="w-52" src="./public/LOGO_ARGOMEDIA.png" alt="Logo" />
        </div>
      <SignInForm/>
      </div>
    </div>
  );
}