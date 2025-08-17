import React, { useContext, useEffect, useRef } from "react";
import "./Home.css";
import logo from "../assets/dentie_logo.png";
import heroImage from "/assets/hero-dental.jpg"; // <-- Add a new hero illustration here
import Chat from "../components/Chat";
import DailyTip from "../components/DailyTip";
import TrackHealth from "../components/TrackHealth";
import { AuthContext } from "../lib/AuthContext";
import DentieRecommends from "../components/DentieRecommends";
import StreakTracker from "../components/StreakTracker";
import Testimonials from "../components/Testimonials";
import PricingSection from "../components/PricingSection";
import { FaBrain, FaLeaf, FaChartLine } from "react-icons/fa";

const Home = () => {
  const { activeComponent, setActiveComponent, user } = useContext(AuthContext);
  const dailyTipRef = useRef(null);
  const premiumRef = useRef(null);

  console.log(user);

  const renderComponent = () => {
    switch (activeComponent) {
      case "chat":
        return <Chat />;
      case "tip":
        return <DailyTip />;
      case "track":
        return <TrackHealth />;
      default:
        return null;
    }
  };

  const handleHeroButton = (val) => {
    if (val === "tip") {
      setActiveComponent("tip");
      if (dailyTipRef.current) {
        dailyTipRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      if (premiumRef.current) {
        premiumRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="bg-teal-50 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-extrabold text-teal-700 mb-4 leading-tight">
              Your AI Dental Coach – <br /> Smart Tips, Healthy Smile!
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              Get expert dental advice, daily tips, and personalized health
              tracking – all in one app.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start mb-6">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleHeroButton("tip");
                }}
                className="bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition cursor-pointer"
              >
                🌿 Get Free Tips
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleHeroButton("subscribe");
                }}
                className="bg-white border-2 border-teal-500 text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-teal-100 transition cursor-pointer"
              >
                ⭐ Try Dentie Pro
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <img
              src={logo}
              alt="Hey Dentie Logo"
              className="w-56 md:w-72 mx-auto md:mx-0 mb-4"
            />
          </div>
        </div>
      </section>

      {/* <div className="max-w-7xl mx-auto bg-white border border-teal-200 rounded-lg shadow-md p-5 mb-8">
        <h3 className="text-lg font-semibold mb-3 text-teal-700 text-center">
          👀 See How Dentie Helps Instantly
        </h3>
        <div className="bg-teal-50 border border-teal-100 rounded-md p-4 mb-3">
          <p className="text-gray-800 text-sm">
            <strong>You:</strong> “My gums bleed when brushing. What should I
            do?”
          </p>
          <p className="text-teal-700 text-sm mt-2">
            <strong>Dentie:</strong> That’s a common sign of{" "}
            <strong>gingivitis</strong>. Here’s what you can do:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-sm mt-2">
            <li>Brush gently with a soft-bristled toothbrush.</li>
            <li>Floss daily to remove plaque between teeth.</li>
            <li>Use an antibacterial mouthwash.</li>
          </ul>
          {!user?.isPremium && (
            <p className="text-teal-600 text-sm mt-3 font-medium">
              👉 Want full personalized guidance?{" "}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleHeroButton("subscribe");
                }}
                className="underline font-semibold cursor-pointer hover:text-teal-800"
              >
                Upgrade to Pro
              </button>
            </p>
          )}
        </div>
      </div> */}

      <div
        ref={dailyTipRef}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-5 max-w-4xl mx-auto"
      >
        {/* Ask Dentie */}
        <button
          onClick={() => setActiveComponent("chat")}
          className={`flex flex-col items-center justify-center p-6 rounded-xl font-semibold transition duration-300 border border-teal-200 shadow-md min-h-[160px] cursor-pointer ${
            activeComponent === "chat"
              ? "bg-teal-600 text-white"
              : "bg-white text-teal-600 hover:bg-teal-50"
          }`}
        >
          <FaBrain className="text-3xl mb-3" />
          Ask Dentie
        </button>

        {/* Daily Tip */}
        <button
          onClick={() => setActiveComponent("tip")}
          className={`flex flex-col items-center justify-center p-6 rounded-xl font-semibold transition duration-300 border border-teal-200 shadow-md min-h-[160px] cursor-pointer ${
            activeComponent === "tip"
              ? "bg-teal-600 text-white"
              : "bg-white text-teal-600 hover:bg-teal-50"
          }`}
        >
          <FaLeaf className="text-3xl mb-3" />
          Daily Tip
        </button>

        {/* Track My Health */}
        <button
          onClick={() => setActiveComponent("track")}
          className={`flex flex-col items-center justify-center p-6 rounded-xl font-semibold transition duration-300 border border-teal-200 shadow-md min-h-[160px] cursor-pointer ${
            activeComponent === "track"
              ? "bg-teal-600 text-white"
              : "bg-white text-teal-600 hover:bg-teal-50"
          }`}
        >
          <FaChartLine className="text-3xl mb-3" />
          Track My Health
        </button>
      </div>

      {/* Render Selected Component */}
      <div className="py-5 px-4">{renderComponent()}</div>

      {/* Additional Sections */}
      <div className="bg-blue-100 py-5 space-y-8">
        <StreakTracker />
        <DentieRecommends />
        <Testimonials />
      </div>
      {!user?.isPremium && <PricingSection premiumRef={premiumRef} />}
    </div>
  );
};

export default Home;
