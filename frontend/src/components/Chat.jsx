import React, { useState } from 'react';

const Chat = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer('');

    try {
      const response = await fetch('http://localhost:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      console.log('🧠 OpenAI response:', data);

      const aiReply = data.answer;
      setAnswer(aiReply || 'Sorry, Dentie is confused.');
    } catch (error) {
      console.error('❌ Error from OpenAI or Backend:', error);
      setAnswer('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-teal-50 border-2 border-teal-400 rounded-lg text-center">
      <h2 className="text-xl font-semibold mb-4">🧠 Ask Dentie</h2>

      <input
        type="text"
        placeholder="Type your dental question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-teal-400"
      />

      <button
        onClick={handleAsk}
        disabled={loading || !question.trim()}
        className={`px-4 py-2 rounded-md text-white font-medium text-base transition-colors ${
          loading || !question.trim()
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-teal-500 hover:bg-teal-600 cursor-pointer'
        }`}
      >
        {loading ? 'Thinking...' : '🦷 Ask Dentie'}
      </button>

      {answer && (
        <div className="mt-6 text-left">
          <p>
            <strong>Dentie:</strong> {answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default Chat;
