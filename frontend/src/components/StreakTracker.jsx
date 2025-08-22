import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../lib/AuthContext";

const StreakTracker = () => {
  const { token } = useContext(AuthContext);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      // Reset streak and loading state when logged out
      setStreak(0);
      setLoading(false);
      return;
    }

    const fetchStreak = async () => {
      setLoading(true); // Start loading when fetching new streak
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/tracker/streak`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setStreak(data.streak);
      } catch (err) {
        console.error("Failed to fetch streak", err);
        setStreak(0); // fallback if error occurs
      } finally {
        setLoading(false);
      }
    };

    fetchStreak();
  }, [token]);

  return (
    <section className="max-w-full mx-auto px-3 md:px-6 flex flex-col gap-2 lg:gap-5">
      <h2 className="text-xl text-center md:text-2xl font-bold text-teal-700 mb-4">
        📅 Your Brushing Streak
      </h2>

      <div className="bg-white rounded-xl py-6 px-2 md:px-4 shadow-md text-center">
        <h3 className="text-xl md:text-2xl font-bold text-orange-600 mb-2 flex items-center justify-center gap-1">
          🔥 Brushing Streak
        </h3>

        {loading ? (
          <p className="text-sm text-gray-500">Checking your progress...</p>
        ) : (
          <div className="text-3xl md:text-5xl font-extrabold text-orange-500 mb-2 transition-all duration-300 ease-out">
            {streak}{" "}
            <span className="text-xl">day{streak > 1 ? "'s" : ""}</span>
          </div>
        )}

        <p className="text-sm text-gray-700 font-medium">
          {token
            ? "Keep maintaining your dental habits daily to keep your streak and smile healthy! 😁"
            : "Log in to start tracking your dental health habits and build a healthy smile!"}
        </p>
      </div>
    </section>
  );
};

export default StreakTracker;
