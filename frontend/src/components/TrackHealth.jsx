import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../lib/AuthContext";

const TrackHealth = () => {
  const { user, token } = useContext(AuthContext);

  const [form, setForm] = useState({
    brushed: false,
    flossed: false,
    painLevel: 0,
    bleeding: false,
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [logs, setLogs] = useState([]);

  // Fetch logs on mount or on submit
  useEffect(() => {
    const fetchLogs = async () => {
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/tracker", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setLogs(data.logs);
        } else {
          setErrorMsg(data.error || "Failed to fetch logs.");
        }
      } catch (err) {
        // console.error("Error fetching logs:", err);
      }
    };

    fetchLogs();
  }, [token, submitted]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    setSubmitted(false);
    setErrorMsg("");

    if (!token) {
      setErrorMsg("You must be logged in to track your health.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/tracker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setForm({
          brushed: false,
          flossed: false,
          painLevel: 0,
          bleeding: false,
          notes: "",
        });
      } else if (res.status === 409) {
        setErrorMsg("You’ve already submitted today’s log.");
      } else {
        setErrorMsg(data.error || "Failed to submit log.");
      }
    } catch (err) {
      setErrorMsg("Something went wrong.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-teal-50 border-2 border-teal-400 rounded-lg text-left">
      <h2 className="text-xl font-semibold text-center mb-4">
        📊 Track My Dental Health
      </h2>

      {user ? (
        <>
          {/* FORM */}
          <label className="block my-2">
            <input
              type="checkbox"
              name="brushed"
              checked={form.brushed}
              onChange={handleChange}
              className="mr-2"
            />
            Brushed Teeth
          </label>

          <label className="block my-2">
            <input
              type="checkbox"
              name="flossed"
              checked={form.flossed}
              onChange={handleChange}
              className="mr-2"
            />
            Flossed
          </label>

          <label className="block my-2">
            Pain Level (0–10):
            <input
              type="number"
              name="painLevel"
              value={form.painLevel}
              onChange={handleChange}
              className="ml-2 border px-2 py-1 rounded w-16"
              min={0}
              max={10}
            />
          </label>

          <label className="block my-2">
            <input
              type="checkbox"
              name="bleeding"
              checked={form.bleeding}
              onChange={handleChange}
              className="mr-2"
            />
            Gum Bleeding
          </label>

          <textarea
            name="notes"
            placeholder="Any notes..."
            value={form.notes}
            onChange={handleChange}
            className="w-full mt-2 p-2 border rounded"
          ></textarea>

          <button
            onClick={handleSubmit}
            className="w-full mt-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 cursor-pointer"
          >
            Submit
          </button>

          {submitted && (
            <p className="text-green-600 mt-4 text-center">
              ✔️ Tracked successfully!
            </p>
          )}

          <p
            className={`min-h-[1.25rem] mt-4 text-center transition-all duration-300 ${
              errorMsg ? "text-red-500 opacity-100" : "opacity-0"
            }`}
          >
            {errorMsg}
          </p>

          {/* LOGS */}
          <h3 className="text-lg font-semibold mt-8 mb-2 text-teal-700">
            📅 My Logs
          </h3>
          {logs.length === 0 ? (
            <p className="text-gray-600">No logs yet.</p>
          ) : (
            <ul className="space-y-3">
              {logs.map((log) => (
                <li
                  key={log._id}
                  className="p-3 border rounded bg-white shadow-sm text-sm"
                >
                  <p className="font-medium text-gray-800">
                    📅 {new Date(log.date).toLocaleDateString()}
                  </p>
                  <p>🪥 Brushed: {log.brushed ? "Yes" : "No"}</p>
                  <p>🧵 Flossed: {log.flossed ? "Yes" : "No"}</p>
                  <p>🩹 Pain Level: {log.painLevel}</p>
                  <p>🩸 Bleeding: {log.bleeding ? "Yes" : "No"}</p>
                  {log.notes && <p>📝 Notes: {log.notes}</p>}
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p className="text-center text-gray-600">
          🔐 Please log in to track your dental health.
        </p>
      )}
    </div>
  );
};

export default TrackHealth;
