import React, { useState } from "react";

const TrackHealth = () => {
  const [form, setForm] = useState({
    brushed: false,
    flossed: false,
    painLevel: 0,
    bleeding: false,
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await fetch("http://localhost:5000/tracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting tracker:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-teal-50 border-2 border-teal-400 rounded-lg text-left">
      <h2 className="text-xl font-semibold text-center mb-4">
        📊 Track My Dental Health
      </h2>

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
    </div>
  );
};

export default TrackHealth;
