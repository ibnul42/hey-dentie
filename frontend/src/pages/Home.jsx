import React, { useState } from "react";
import "./Home.css";
import logo from "../assets/dentie_logo.png";
import Chat from "../components/Chat";
import DailyTip from "../components/DailyTip";
import TrackHealth from "../components/TrackHealth";
import AskDentist from "../components/AskDentist";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState("chat");

  const renderComponent = () => {
    switch (activeComponent) {
      case "chat":
        return <Chat />;
      case "tip":
        return <DailyTip />;
      case "track":
        return <TrackHealth />;
      case "dentist":
        return <AskDentist />;
      default:
        return null;
    }
  };

  return (
    <div className="home">
      <header className="header text-center">
        <img src={logo} alt="Hey Dentie Logo" className="logo mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-teal-700">
          Hey Dentie – Your AI Dental Friend
        </h1>
        <p className="text-gray-600">
          Helping you smile naturally with friendly AI and daily tips 🌿
        </p>
      </header>

      <div className="features flex justify-center gap-4 my-6 flex-wrap">
        <button
          onClick={() => setActiveComponent("chat")}
          className={`px-4 py-2 rounded ${
            activeComponent === "chat"
              ? "bg-teal-600 text-white"
              : "bg-teal-400 text-white hover:bg-teal-500"
          }`}
        >
          🧠 Ask Dentie
        </button>
        <button
          onClick={() => setActiveComponent("tip")}
          className={`px-4 py-2 rounded ${
            activeComponent === "tip"
              ? "bg-teal-600 text-white"
              : "bg-teal-400 text-white hover:bg-teal-500"
          }`}
        >
          🌿 Daily Tip
        </button>
        <button
          onClick={() => setActiveComponent("track")}
          className={`px-4 py-2 rounded ${
            activeComponent === "track"
              ? "bg-teal-600 text-white"
              : "bg-teal-400 text-white hover:bg-teal-500"
          }`}
        >
          📈 Track My Health
        </button>
        <button
          onClick={() => setActiveComponent("dentist")}
          className={`px-4 py-2 rounded ${
            activeComponent === "dentist"
              ? "bg-teal-600 text-white"
              : "bg-teal-400 text-white hover:bg-teal-500"
          }`}
        >
          👨‍⚕️ Ask a Dentist
        </button>
      </div>

      <div className="mt-8">{renderComponent()}</div>
    </div>
  );
};

export default Home;
