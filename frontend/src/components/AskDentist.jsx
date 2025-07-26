import React, { useState } from "react";

const AskDentist = () => {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Optional: integrate with backend or email API
    setSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-teal-50 border-2 border-teal-400 rounded-lg text-left">
      <h2 className="text-xl font-semibold text-center mb-4">
        🧑‍⚕️ Ask a Real Dentist
      </h2>

      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <textarea
        placeholder="Describe your dental concern..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        rows={4}
      />

      <button
        onClick={handleSubmit}
        className="w-full py-2 bg-teal-500 text-white rounded hover:bg-teal-600 cursor-pointer"
      >
        Submit
      </button>

      {submitted && (
        <p className="text-green-600 mt-4 text-center">
          ✅ Your question has been submitted to a dental expert!
        </p>
      )}
    </div>
  );
};

export default AskDentist;
