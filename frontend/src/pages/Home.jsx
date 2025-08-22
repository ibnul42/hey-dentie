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
      <div className="flex-1 py-1 md:py-3 lg:py-5 w-full max-w-[1440px] mx-auto">
        {/* Hero Section */}
        <section className="py-5">
          <div className="max-w-full mx-auto grid grid-cols-12 items-center gap-2 justify-between px-3 md:px-6">
            {/* Left Content */}
            <div className="col-span-7 md:col-span-6 text-left space-y-1 lg:space-y-5">
              <h1 className="text-xl md:text-2xl lg:text-4xl font-extrabold text-teal-700 space-y-2 leading-tight flex flex-col gap-1">
                <span>Your AI</span>
                <span className="-mt-3">Dental Coach</span>
              </h1>
              <p className="text-sm text-gray-700">
                Get Answers, Tips & Health Tracking in One Place
              </p>
              <Chat border={false} title={false} rounded="rounded-md" />
              {/* <div className="max-w-7xl mx-auto bg-white border border-teal-200 rounded-lg shadow-md p-5 mb-8">
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
              </div> */}
            </div>

            {/* Hero Image */}
            <div className="col-span-5 h-full md:col-span-6 mt-10 md:mt-0 flex items-center justify-center px-5 md:px-10 lg:px-20">
              <div className="h-full max-h-[280px] w-full flex justify-center">
                <img
                src={logo}
                alt="Hey Dentie Logo"
                className="h-full w-auto object-contain"
              />
              </div>
            </div>
          </div>
        </section>

        <div
          ref={dailyTipRef}
          className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6 xl:gap-8 px-2 md:px-6"
        >
          <button
            onClick={() => setActiveComponent("chat")}
            className={`w-full aspect-square md:aspect-auto flex flex-col items-center justify-center px-1 py-2 md:py-3 lg:py-5 xl:py-6 md:px-4 rounded-xl font-semibold transition duration-300 shadow-md cursor-pointer space-y-1 ${
              activeComponent === "chat"
                ? "bg-teal-600 text-white"
                : "bg-white text-teal-600 hover:bg-teal-50"
            }`}
          >
            <FaBrain className="text-lg md:text-xl lg:text-2xl xl:text-3xl" />
            <span className="text-xs md:text-lg lg:text-xl xl:text-2xl font-extrabold whitespace-nowrap">
              Ask Dentie
            </span>
            <span className="text-[8px] md:text-sm lg:text-base text-center font-normal leading-tight">
              Get answers to your dental questions
            </span>
          </button>
          <button
            onClick={() => setActiveComponent("tip")}
            className={`w-full aspect-square md:aspect-auto flex flex-col items-center justify-center px-1 py-2 md:py-3 lg:py-5 xl:py-6 md:px-4 rounded-xl font-semibold transition duration-300 shadow-md cursor-pointer space-y-1 ${
              activeComponent === "tip"
                ? "bg-teal-600 text-white"
                : "bg-white text-teal-600 hover:bg-teal-50"
            }`}
          >
            <FaLeaf className="text-lg md:text-xl lg:text-2xl xl:text-3xl" />
            <span className="text-xs md:text-lg lg:text-xl xl:text-2xl font-extrabold whitespace-nowrap">
              Daily Tip
            </span>
            <span className="text-[8px] md:text-sm lg:text-base text-center font-normal leading-tight">
              Receive dental health advice every day
            </span>
          </button>
          <button
            onClick={() => setActiveComponent("track")}
            className={`w-full aspect-square md:aspect-auto flex flex-col items-center justify-center px-1 py-2 md:py-3 lg:py-5 xl:py-6 md:px-4 rounded-xl font-semibold transition duration-300 shadow-md cursor-pointer space-y-1 ${
              activeComponent === "track"
                ? "bg-teal-600 text-white"
                : "bg-white text-teal-600 hover:bg-teal-50"
            }`}
          >
            <FaChartLine className="text-lg md:text-xl lg:text-2xl xl:text-3xl" />
            <span className="text-[10px] md:text-lg lg:text-xl xl:text-2xl font-extrabold whitespace-nowrap">
              Track My Health
            </span>
            <span className="text-[8px] md:text-sm lg:text-base text-center font-normal leading-tight">
              Monitor your brushing and flossing habits
            </span>
          </button>
        </div>

        {/* Render Selected Component */}
        <div className="py-5 px-4">{renderComponent()}</div>
      </div>
      {/* Additional Sections */}
      <div className="py-0 md:py-1 lg:py-5">
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
