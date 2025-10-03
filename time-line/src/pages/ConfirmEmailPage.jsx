import { useConfirmEmail } from "../hooks/useConfirmEmail";

export default function ConfirmEmailPage() {
  const { message, confirmEmail } = useConfirmEmail();

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmEmail();
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Confirm Email</h1>
      {message && <p className="mb-4 text-center text-gray-700">{message}</p>}
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="cursor-pointer w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Confirm Email
        </button>
      </form>
    </div>
  );
}
