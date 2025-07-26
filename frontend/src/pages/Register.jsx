import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  // Check token validity on page load, redirect if valid
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/verify-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok && data.user) {
          localStorage.setItem("token", data.token); // refresh token if needed
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/"); // Redirect to homepage
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        // Stay on register page if token invalid
      }
    };

    checkToken();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // Save token and user info returned from backend
        // localStorage.setItem("token", data.token);
        // localStorage.setItem("user", JSON.stringify(data.user));

        // Navigate to home page on successful registration
        navigate("/login");
      } else {
        // Show backend error message or fallback
        setErrorMsg(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setErrorMsg("Something went wrong.");
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-md border border-gray-200 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center text-teal-600">
          📝 Register for Hey Dentie
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded cursor-pointer"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <span
            className="text-teal-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
