import { useState } from "react";

const SendTipModal = ({ isOpen, onClose, onSend, user }) => {
  const [subject, setSubject] = useState(
    "🦷 Your Daily Dental Tip from Hey Dentie"
  );
  const [message, setMessage] = useState(
    "Brush your teeth twice a day for 2 minutes!"
  );
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    const success = await onSend({ user, subject, message });
    setLoading(false);

    if (success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Send Tip to {user.name}</h3>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full mb-2 border border-gray-300 rounded p-2"
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full mb-4 border border-gray-300 rounded p-2 h-32"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Tip"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendTipModal;
