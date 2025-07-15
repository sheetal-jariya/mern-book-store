
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../login/login.css"
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
const navigation=useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      const res = await axios.post('http://localhost:8080/api/login', {
        email,
        password
      });
      if (res?.data?.data?.token) {
        const token = res.data.data.token;
        console.log(token,"=====token")
      localStorage.setItem("token", token);
        setMsg("✅ Login successful!");
        navigation('/dashboard')
      } else {
        navigation('/login')
        setMsg("❌ " + res.data.msg);
      }
    } catch (error) {
      setMsg("❌ Something went wrong!");
      console.error(error);
    }
  };

  return (
   <div className="login-container">
  <form onSubmit={handleLogin} className="login-form">
    <h2 className="login-title">Login</h2>

    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="login-input"
      required
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="login-input"
      required
    />

    <button type="submit" className="login-button">
      Login
    </button>

    {msg && <p className="login-message">{msg}</p>}

    <p className="form-footer">
      Don't have an account? <Link to="/">Signup</Link>
    </p>
  </form>
</div>


  );
};
;

export default Login;
