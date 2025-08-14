import { FaTooth, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

export default function DentalTipCard({ question, answer }) {
  const cleanAnswer = answer.replace(/\*{1,2}(.*?)\*{1,2}/g, "$1");

  const steps = cleanAnswer
    .split(/\d+\.\s+/)
    .filter(
      (s) =>
        s.trim() !== "" &&
        !s.toLowerCase().includes("bleeding persists") &&
        !s.toLowerCase().includes("seek") &&
        !s.toLowerCase().includes("consult")
    );

  const warningMatch = cleanAnswer.match(/(if .*|seek .*|consult .*)/i);
  const warning = warningMatch ? warningMatch[0] : null;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 border border-teal-200">
      {/* Question */}
      {question && (
        <>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            💬 Question:
          </h3>
          <p className="text-gray-900 italic">{question}</p>
        </>
      )}

      {/* Answer */}
      <h3 className="mt-6 text-lg font-semibold text-teal-600 flex items-center gap-2">
        <FaTooth /> Dentie:
      </h3>

      {/* Steps */}
      <ul className="mt-3 space-y-3 text-gray-800">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-2">
            <FaCheckCircle className="text-green-500 mt-1" />
            <span>{step.trim()}</span>
          </li>
        ))}
      </ul>

      {/* Warning */}
      {warning && (
        <div className="mt-5 flex items-start gap-2 bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
          <FaExclamationTriangle className="text-yellow-500 mt-1" />
          <p className="text-sm text-gray-700">{warning}</p>
        </div>
      )}
    </div>
  );
}
