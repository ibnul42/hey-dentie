import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../lib/AuthContext";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token, data.user);
        toast.success(`Welcome ${data.user.name || "👋"}!`);
        navigate("/");
      } else {
        setErrorMsg(data.message || "Invalid credentials");
      }
    } catch (err) {
      setErrorMsg("Something went wrong.");
    }
  };

  const goolgeLoginHandler = async (res) => {
    console.log(res);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/google-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: res.credential }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        login(data.token, data.user);
        toast.success(`Welcome ${data.user.name || "👋"}!`);
        navigate("/");
      } else {
        toast.error(data.message || "Google login failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong during Google login.");
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center px-3">
      <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-md border border-gray-200 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center text-teal-600">
          🔐 Login to Hey Dentie
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded cursor-pointer"
          >
            Login
          </button>
        </form>

        <div className="my-4 text-center text-gray-500 text-sm">or</div>

        <div className="w-full flex justify-center mb-2">
          <GoogleLogin
            onSuccess={goolgeLoginHandler}
            onError={() => toast.error("Google login failed.")}
            auto_select
          />
        </div>

        <p className="mt-4 text-sm text-center">
          Don&apos;t have an account?{" "}
          <span
            className="text-teal-600 hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
