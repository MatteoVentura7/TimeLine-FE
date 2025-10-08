import { useEffect } from "react";
import { useConfirmEmail } from "../hooks/useConfirmEmail";
import PropagateLoader from "react-spinners/PropagateLoader";
import Layout from "../layout/layout";
import { useNavigate } from "react-router-dom";

export default function ConfirmEmailPage() {
  const { message, confirmEmail, tokenValid, error } = useConfirmEmail();
  const navigate = useNavigate();

  useEffect(() => {
    confirmEmail();
  }, [confirmEmail]);

  return (
    <Layout>
      {error && (
        <div className="text-red-700 text-center font-bold bg-red-100 mb-4 p-2 rounded">
          {error}
        </div>
      )}

      {!error && !tokenValid && <div>Verifica del token in corso...</div>}

      {!error && tokenValid && (
        <div className="max-w-md mx-auto mt-10 mb-10">
          <p className="flex justify-center">
            <PropagateLoader />
          </p>
        </div>
      )}
    <div className="flex justify-center">
      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Torna indietro
      </button>
    </div>
      
    </Layout>
  );
}
