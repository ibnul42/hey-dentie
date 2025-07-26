import React, { useState } from "react";

const DailyTip = () => {
  const [tip, setTip] = useState("");
  const [loading, setLoading] = useState(false);

  const getTip = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/dailytip");
      const data = await response.json();
      setTip(data.tip);
    } catch (err) {
      console.error("Error fetching tip:", err);
      setTip("Failed to load tip. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-teal-50 border-2 border-teal-400 rounded-lg text-center">
      <h2 className="text-xl font-semibold mb-4">🌿 Daily Dental Tip</h2>
      <button
        onClick={getTip}
        className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md cursor-pointer"
      >
        {loading ? "Loading..." : "Get Tip"}
      </button>
      {tip && <p className="mt-4 text-left">{tip}</p>}
    </div>
  );
};

export default DailyTip;
