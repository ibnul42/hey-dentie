import React, { useContext } from "react";
import { AuthContext } from "../lib/AuthContext";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  const { setActiveComponent } = useContext(AuthContext);

  return (
    <footer className="text-teal-600 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-12 gap-8">
        {/* Brand & About */}
        <div className="col-span-12 lg:col-span-4 space-y-2">
          <div className="flex items-center gap-2">
            <img src="/logo.png" className="w-10 h-auto" alt="" />
            <p className="text-2xl xl:text-4xl font-bold mb-2">Hey Dentie</p>
          </div>
          <p className="text-sm xl:text-base leading-relaxed">
            Dentie helps you take control of your smile with daily tips,
            personalized insights, and smarter health tracking - trusted by
            2000+ people every day.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="col-span-6 md:col-span-6 lg:col-span-2">
          <h2 className="text-lg xl:text-2xl font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => setActiveComponent("chat")}
                className="hover:underline xl:text-lg"
              >
                Ask Dentie
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent("tip")}
                className="hover:underline xl:text-lg"
              >
                Daily Tip
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent("track")}
                className="hover:underline xl:text-lg"
              >
                Tracker
              </button>
            </li>
          </ul>
        </div>

        {/* Resources Links */}
        <div className="col-span-6 md:col-span-6 lg:col-span-2">
          <h2 className="text-lg xl:text-2xl font-semibold mb-3">Legal</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/privacy-policy" className="hover:underline xl:text-lg">
                Blog
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline xl:text-lg">
                FAQs
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline xl:text-lg">
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="col-span-6 md:col-span-6 lg:col-span-2">
          <h2 className="text-lg xl:text-2xl font-semibold mb-3">Legal</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/privacy-policy" className="hover:underline xl:text-lg">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline xl:text-lg">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline xl:text-lg">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="col-span-6 md:col-span-6 lg:col-span-2">
          <h2 className="text-lg xl:text-2xl font-semibold mb-3">Follow Us</h2>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-xl xl:text-3xl hover:text-yellow-400 transition" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-xl xl:text-3xl hover:text-yellow-400 transition" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-xl xl:text-3xl hover:text-yellow-400 transition" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-xl xl:text-3xl hover:text-yellow-400 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-teal-500 mt-8 pt-4 text-center text-sm">
        <p className="xl:text-lg">© {new Date().getFullYear()} Hey Dentie. All rights reserved.</p>
        <p className="xl:text-md mt-1">Made with ❤️ for healthy smiles</p>
      </div>
    </footer>
  );
};

export default Footer;
