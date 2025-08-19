import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../lib/AuthContext";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import DentalTipCard from "./DentalTipCard";
import GradientButton from "./GradientButton";

const Chat = ({
  border = true,
  title = true,
  placeholder = "Type your dental question...",
  buttonText = "🦷 Ask Dentie",
}) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const inputRef = useRef(null);

  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.warn("Speech recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setQuestion(finalTranscript.trim());
        setIsListening(false);
      }
    };

    recognition.onend = () => {
      if (isListening) recognition.start();
    };

    recognitionRef.current = recognition;
  }, []);

  // Load chat history from localStorage
  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("dentieHistory")) || [];
    setHistory(savedHistory);
  }, []);

  // Focus input on mount and after submission
  useEffect(() => {
    inputRef.current?.focus();
  }, [loading === false]);

  const saveToHistory = (q, a) => {
    const newEntry = { question: q, answer: a };
    const updatedHistory = [newEntry, ...history.slice(0, 9)]; // Max 10
    setHistory(updatedHistory);
    localStorage.setItem("dentieHistory", JSON.stringify(updatedHistory));
  };

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }), // add token if available
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 429) {
          toast.error(data.message || "Something went wrong.");
          return;
        }
      }

      let finalAnswer = "";
      finalAnswer = data.answer || "Sorry, Dentie is confused.";
      setAnswer(finalAnswer);
      saveToHistory(question, finalAnswer);
      setQuestion("");
    } catch {
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAsk();
  };

  const clearHistory = () => {
    localStorage.removeItem("dentieHistory");
    setHistory([]);
  };

  const handleMicClick = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  return (
    <div
      className={`max-w-full mx-auto bg-teal-50 rounded-lg text-center py-5 ${
        border && "border-2 border-teal-400 px-3 md:px-6 lg:px-8"
      }`}
    >
      {title && (
        <div className="px-10">
          <div className="flex items-center justify-center gap-3">
            <p className="text-lg md:text-xl">
              AI Dental Insights Backed by{" "}
              <span className="font-bold">Research</span>
            </p>
            <img
              src="/assets/doctor.jpg"
              className="w-20 h-20 md:w-28 md:h-28 object-cover object-center rounded-full"
              alt="Doctor"
            />
          </div>
          <h2 className="text-4xl font-semibold mb-4">Ask Dentie</h2>
        </div>
      )}

      <div className="relative flex items-center gap-2 mb-4">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full py-3 px-4 border border-gray-300 rounded-md text-lg placeholder:text-base md:placeholder:text-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        />

        {/* Mic Button */}
        <button
          type="button"
          onClick={handleMicClick}
          title={isListening ? "Stop Listening" : "Start Voice Input"}
          className={`absolute right-2 text-gray-500 hover:text-teal-600 cursor-pointer ${
            isListening ? "text-red-500 animate-pulse" : ""
          }`}
        >
          {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
        </button>
      </div>

      <div className="relative w-full mb-4">
        <GradientButton>
          <button
            onClick={handleAsk}
            disabled={loading || !question.trim() || !user}
            aria-disabled={loading || !question.trim() || !user}
            className={`w-full py-3 rounded-full overflow-hidden font-semibold text-base transition-colors
    ${
      loading || !question.trim() || !user
        ? "text-teal-300 cursor-not-allowed"
        : "text-white cursor-pointer"
    }`}
          >
            {loading ? "Thinking..." : buttonText}
          </button>
        </GradientButton>

        {/* Tooltip when input is empty */}
        {!loading && (
          <>
            {question.trim().length === 0 && (
              <p className="absolute top-full mt-1 text-xs text-gray-600 text-center w-full animate-pulse py-1 font-semibold">
                Start typing to enable the button
              </p>
            )}
            {question.trim().length > 0 && !user && (
              <p className="absolute top-full mt-1 text-xs text-red-500 text-center w-full animate-pulse py-1 font-semibold">
                Please log in to ask Dentie.
              </p>
            )}
          </>
        )}
      </div>

      {answer && (
        <div className="mt-8 text-left bg-white p-3 rounded-md border border-teal-200 shadow-sm">
          <DentalTipCard answer={answer} />
        </div>
      )}

      {/* History Section */}
      {history.length > 0 && (
        <div className="mt-6 text-left">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">🕓 Past Questions</h3>
            <button
              onClick={clearHistory}
              className="text-sm text-red-500 hover:underline cursor-pointer"
            >
              Clear History
            </button>
          </div>

          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {history.map((item, index) => (
              <li
                key={index}
                className="p-3 bg-white border border-teal-100 rounded"
              >
                <DentalTipCard question={item.question} answer={item.answer} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Chat;
