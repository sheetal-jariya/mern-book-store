import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "./toastService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });
console.log(res.data,"================")
      const token = res?.data?.data?.token;
const role = res?.data?.data?.role;
console.log(role,"-----")
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        toast.success("✅ Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("❌ " + (res.data.msg || "Invalid credentials"));
      }
    } catch (error) {
      toast.error("❌ Something went wrong during login!");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-orange-200"
      >
        <h2 className="text-2xl font-bold text-orange-500 text-center mb-6">Login</h2>

        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-semibold py-2 rounded-md hover:bg-orange-600 transition"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/" className="text-orange-500 font-medium hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-sm mt-2 text-right">
  <Link to="/forgot-password" className="text-blue-500 hover:underline">
    Forgot Password?
  </Link>
</p>
      </form>
    </div>
  );
};

export default Login;
