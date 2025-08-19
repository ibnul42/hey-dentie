import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../lib/AuthContext";

const DailyTip = () => {
  const { user, token } = useContext(AuthContext);
  const [tip, setTip] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchTip = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/dailytip`);
      const data = await response.json();
      setTip(data.tip || "No tip available.");
    } catch (err) {
      setError(true);
      setTip("Failed to load tip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch on first load
  useEffect(() => {
    fetchTip();
  }, []);

  return (
    <div className="max-w-full mx-auto mt-5 p-6 bg-teal-50 border-2 border-teal-400 rounded-lg text-center shadow">
      <h2 className="text-xl font-semibold mb-4">🌿 Daily Dental Tip</h2>

      {user ? (
        loading ? (
          <p className="text-gray-600 animate-pulse">Fetching today’s tip...</p>
        ) : (
          <>
            <p className="text-base text-gray-800">{tip}</p>
            {error && (
              <button
                onClick={fetchTip}
                className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                Retry
              </button>
            )}
          </>
        )
      ) : (
        <p className="text-center text-gray-600">
          🔐 Please log in to get dental tip.
        </p>
      )}
    </div>
  );
};

export default DailyTip;
