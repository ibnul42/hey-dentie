import React, { useContext } from "react";
import { AuthContext } from "../lib/AuthContext";

const Footer = () => {
  const { setActiveComponent } = useContext(AuthContext);

  return (
    <footer className="bg-teal-600 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h1 className="text-xl font-bold">Hey Dentie</h1>
          <p className="text-sm">Your friendly dental assistant 🦷</p>
        </div>
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <button
            onClick={() => setActiveComponent("chat")}
            className="hover:underline cursor-pointer"
          >
            Ask Dentie
          </button>
          <button
            onClick={() => setActiveComponent("tip")}
            className="hover:underline cursor-pointer"
          >
            Daily Tip
          </button>
          <button
            onClick={() => setActiveComponent("track")}
            className="hover:underline cursor-pointer"
          >
            Tracker
          </button>
        </div>

        <div className="text-center md:text-right text-sm">
          <p>© {new Date().getFullYear()} Hey Dentie. All rights reserved.</p>
          <p className="mt-1">Made with ❤️ for healthy smiles</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
