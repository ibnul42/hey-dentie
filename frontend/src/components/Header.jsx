import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/dentie_logo.png";
import { AuthContext } from "../lib/AuthContext";
import { googleLogout } from "@react-oauth/google";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const baseMenuItems = [
    { name: "Home", path: "/" },
    { name: "Tracker", path: "/tracker" },
    { name: "Ask Dentie", path: "/ask" },
    { name: "Tips", path: "/tips" },
  ];

  const menuItems =
    user?.role === "admin"
      ? [...baseMenuItems, { name: "Admin", path: "/admin/users" }]
      : baseMenuItems;

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-md px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => {
          navigate("/");
          setMenuOpen(false);
        }}
      >
        <img src={logo} alt="Dentie Logo" className="h-10" />
        <span className="font-bold text-lg text-teal-600 whitespace-nowrap">
          Hey Dentie
        </span>
      </div>

      {/* ✅ Desktop menu items */}
      <div className="hidden md:flex items-center gap-6">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className="text-gray-700 hover:text-teal-600 font-medium cursor-pointer"
          >
            {item.name}
          </button>
        ))}

        {user ? (
          <>
            {/* <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-teal-800 whitespace-nowrap">
                Hello, {user.name}
              </span>
              {user.isPremium && (
                <span className="px-2 py-0.5 text-xs bg-yellow-500 text-white rounded-full">
                  PRO
                </span>
              )}
            </div> */}
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
                googleLogout();
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
              setMenuOpen(false);
            }}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md transition cursor-pointer"
          >
            Login
          </button>
        )}
      </div>

      {/* Hamburger icon */}
      <button
        className="md:hidden flex items-center justify-center p-2 rounded-md text-teal-600 hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* ✅ Mobile menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-full right-4 mt-2 w-72 bg-white rounded-md shadow-lg border border-gray-200 md:hidden z-50"
        >
          <div className="flex flex-col p-4 gap-3">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setMenuOpen(false);
                }}
                className="text-left text-gray-700 hover:text-teal-600"
              >
                {item.name}
              </button>
            ))}

            {user ? (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-teal-800 font-semibold">
                    Hello, {user.name}
                  </p>
                  {user.isPremium && (
                    <span className="px-2 py-0.5 text-xs bg-yellow-500 text-white rounded-full">
                      PRO
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md transition cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-md transition cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
