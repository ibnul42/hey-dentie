import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const session = urlParams.get("session_id");
    if (session) setSessionId(session);
  }, []);

  return (
    <div className="max-w-xl mx-auto py-20 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        ✅ Payment Successful!
      </h1>
      <p className="text-gray-700 mb-4">
        Thank you for upgrading to Dentie Pro. Your access will be activated
        shortly.
      </p>

      {sessionId && (
        <div className="text-sm text-gray-500">
          Stripe Session ID: <code>{sessionId}</code>
        </div>
      )}
    </div>
  );
}
