import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("user"));
    if (!stored) {
      alert("No user found. Please signup first.");
      return;
    }
    if (stored.email === user.email && stored.password === user.password) {
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("loggedInUser", JSON.stringify({ email: user.email }));
      alert("Login successful!");
      navigate("/shop");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login 🌿</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input type="email" placeholder="Email" value={user.email} onChange={e => setUser({...user, email: e.target.value})} required />
        <input type="password" placeholder="Password" value={user.password} onChange={e => setUser({...user, password: e.target.value})} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Signup</Link></p>
    </div>
  );
};

export default Login;
