import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/dentie_logo.png";
import { AuthContext } from "../lib/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md border-b">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="Dentie Logo" className="h-10" />
        <span className="font-bold text-lg text-teal-600">Hey Dentie</span>
      </div>

      {user ? (
        <div className="flex gap-2 items-center">
          {user?.name && (
            <p className="text-xl font-bold text-teal-800">
              Hello, {user.name}
            </p>
          )}
          <button
            onClick={() => logout()}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Login
        </button>
      )}
    </header>
  );
};

export default Header;
