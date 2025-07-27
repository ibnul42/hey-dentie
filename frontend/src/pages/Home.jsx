import React, { useContext } from "react";
import "./Home.css";
import logo from "../assets/dentie_logo.png";
import Chat from "../components/Chat";
import DailyTip from "../components/DailyTip";
import TrackHealth from "../components/TrackHealth";
import AskDentist from "../components/AskDentist";
import { AuthContext } from "../lib/AuthContext";
import DentieRecommends from "../components/DentieRecommends";
import StreakTracker from "../components/StreakTracker";
import Testimonials from "../components/Testimonials";

const Home = () => {
  const { activeComponent, setActiveComponent } = useContext(AuthContext);

  const renderComponent = () => {
    switch (activeComponent) {
      case "chat":
        return <Chat />;
      case "tip":
        return <DailyTip />;
      case "track":
        return <TrackHealth />;
      // case "dentist":
      //   return <AskDentist />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 py-10 px-3 h-full">
      <header className="header text-center">
        <img src={logo} alt="Hey Dentie Logo" className="logo mx-auto mb-4" />
        <h1 className="text-2xl md:text-4xl font-extrabold text-teal-700 leading-tight">
          Hey Dentie – Your AI Dental Friend
        </h1>
        <p className="text-gray-600 my-3 text-sm md:text-lg">
          Helping you smile naturally with friendly AI and daily tips 🌿
        </p>

        <p className="text-sm md:text-base text-teal-900 font-medium max-w-xl mx-auto mb-4">
          Instant answers, personalized tracking, and smart tips to keep your
          teeth strong – all in one AI-powered assistant.
        </p>
      </header>

      <div className="flex justify-center gap-4 my-6 flex-wrap">
        <button
          onClick={() => setActiveComponent("chat")}
          className={`px-6 py-3 text-base rounded-lg font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer ${
            activeComponent === "chat"
              ? "bg-teal-600 text-white"
              : "bg-teal-500 text-white hover:bg-teal-600"
          }`}
        >
          🧠 Ask Dentie
        </button>

        <button
          onClick={() => setActiveComponent("tip")}
          className={`px-6 py-3 text-base rounded-lg font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer ${
            activeComponent === "tip"
              ? "bg-teal-600 text-white"
              : "bg-teal-500 text-white hover:bg-teal-600"
          }`}
        >
          🌿 Daily Tip
        </button>

        <button
          onClick={() => setActiveComponent("track")}
          className={`px-6 py-3 text-base rounded-lg font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer ${
            activeComponent === "track"
              ? "bg-teal-600 text-white"
              : "bg-teal-500 text-white hover:bg-teal-600"
          }`}
        >
          📈 Track My Health
        </button>
      </div>

      <div className="mt-8">{renderComponent()}</div>
      <StreakTracker />
      <DentieRecommends />
      <Testimonials />
    </div>
  );
};

export default Home;
