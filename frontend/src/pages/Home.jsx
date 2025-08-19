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
        return (
          <Chat
            placeholder="e.g. Why do my gums bleed when I brush?"
            buttonText="Get my Answer Now"
          />
        );
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
    <div className="">
      <div className="flex-1 py-10 container mx-auto">
        {/* Hero Section */}
        <section className="py-5 md:py-10">
          <div className="max-w-full mx-auto flex flex-col sm:flex-row items-center gap-2 justify-between px-6">
            {/* Left Content */}
            <div className="w-full md:w-1/2 text-left order-2 sm:order-1">
              <h1 className="text-2xl md:text-4xl font-extrabold text-teal-700 mb-4 leading-tight">
                Your AI Dental Coach
              </h1>
              <p className="text-gray-700 text-lg mb-6">
                Get Answers, Tips & Health Tracking in One Place
              </p>
              <Chat border={false} title={false} />
              <div className="max-w-7xl mx-auto bg-white border border-teal-200 rounded-lg shadow-md p-5 mb-8">
                <h3 className="text-lg font-semibold mb-3 text-teal-700 text-center">
                  👀 See How Dentie Helps Instantly
                </h3>
                <div className="bg-teal-50 border border-teal-100 rounded-md p-4 mb-3">
                  <p className="text-gray-800 text-sm">
                    <strong>You:</strong> “My gums bleed when brushing. What
                    should I do?”
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
              </div>
            </div>

            {/* Hero Image */}
            <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center order-1 sm:order-2 px-5 md:px-10 lg:px-20">
              <img
                src={logo}
                alt="Hey Dentie Logo"
                className="w-full h-auto mx-auto md:mx-0 mb-4"
              />
            </div>
          </div>
        </section>

        <div
          ref={dailyTipRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-5 max-w-full mx-auto px-6"
        >
          {/* Ask Dentie */}
          <button
            onClick={() => setActiveComponent("chat")}
            className={`flex flex-col items-center justify-center p-6 rounded-xl font-semibold transition duration-300 border border-teal-200 shadow-md min-h-[160px] cursor-pointer space-y-2 ${
              activeComponent === "chat"
                ? "bg-teal-600 text-white"
                : "bg-white text-teal-600 hover:bg-teal-50"
            }`}
          >
            <FaBrain className="text-3xl" />
            <span className="text-xl font-extrabold whitespace-nowrap overflow-hidden text-ellipsis block">
              Ask Dentie
            </span>
            <span className="text-xs font-normal">
              Get answers to your dental questions
            </span>
          </button>

          {/* Daily Tip */}
          <button
            onClick={() => setActiveComponent("tip")}
            className={`flex flex-col items-center justify-center p-6 rounded-xl font-semibold transition duration-300 border border-teal-200 shadow-md min-h-[160px] cursor-pointer space-y-2 ${
              activeComponent === "tip"
                ? "bg-teal-600 text-white"
                : "bg-white text-teal-600 hover:bg-teal-50"
            }`}
          >
            <FaLeaf className="text-3xl" />
            <span className="text-xl font-extrabold whitespace-nowrap overflow-hidden text-ellipsis block">
              Daily Tip
            </span>
            <span className="text-xs font-normal">
              Receive dental health advice every day
            </span>
          </button>

          {/* Track My Health */}
          <button
            onClick={() => setActiveComponent("track")}
            className={`flex flex-col items-center justify-center p-6 rounded-xl font-semibold transition duration-300 border border-teal-200 shadow-md min-h-[160px] cursor-pointer space-y-2 ${
              activeComponent === "track"
                ? "bg-teal-600 text-white"
                : "bg-white text-teal-600 hover:bg-teal-50"
            }`}
          >
            <FaChartLine className="text-3xl mb-3" />
            <span className="text-xl font-extrabold whitespace-nowrap overflow-hidden text-ellipsis block">
              Track my health
            </span>
            <span className="text-xs font-normal">
              Monitor your brushing and flossing habits
            </span>
          </button>
        </div>

        {/* Render Selected Component */}
        <div className="pt-5 pb-5 md:pb-10 lg:pb-16 px-4">
          {renderComponent()}
        </div>
      </div>
      {/* Additional Sections */}
      <div className="bg-blue-100 py-5 md:py-10 lg:py-16">
        <div className="container mx-auto space-y-8 md:space-y-12 lg:space-y-20">
          <StreakTracker />
          <DentieRecommends />
          <Testimonials />
        </div>
      </div>
      {!user?.isPremium && <PricingSection premiumRef={premiumRef} />}
    </div>
  );
};

export default Home;
