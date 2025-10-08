import { useEffect } from "react";
import { useConfirmEmail } from "../hooks/useConfirmEmail";
import PropagateLoader from "react-spinners/PropagateLoader";
import Layout from "../layout/layout";

export default function ConfirmEmailPage() {
  const { message, confirmEmail, tokenValid, error } = useConfirmEmail();

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
    </Layout>
  );
}
