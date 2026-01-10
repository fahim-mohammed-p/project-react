import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API = "http://localhost:5000";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    const e = email.trim();

    if (!e) {
      setError("Enter Email");
      return;
    }

    if (!password) {
      setError("Enter Password");
      return;
    }

    setLoading(true);

    try {
      
      const res = await fetch(
        `${API}/users?email=${encodeURIComponent(e)}`
      );
      const users = await res.json();

      if (users.length === 0) {
        setError("Email not found. Please Sign Up.");
        setLoading(false);
        return;
      }

      const user = users[0];

      if (user.password !== password) {
        setError("Password mismatch. Try again.");
        setLoading(false);
        return;
      }
      if(user.banned=== "true"){
        alert("You are banned by admin,")
        navigate("/Ban")
        return;
      }

      
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(user));

      setLoading(false);
      navigate("/");

    } catch (err) {
      console.error("Login error:", err);
      setError("Server not running");
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-heading">Login</h1>

        <div className="form-group">
          <input
            className="input-field"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            className="input-field"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="actions">
          <button
            className="btn-primary"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </div>

        <div className="error-text">
          {error}
        </div>

        <div className="signup-row">
          <small>
            New here?{" "}
            <button
              className="btn-link"
              onClick={() => navigate("/sign")}
              type="button"
            >
              Sign Up
            </button>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;
