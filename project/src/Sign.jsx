import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign.css";

const API = "http://localhost:5000";

function Sign() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSign = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      
      const res = await fetch(`${API}/users?email=${email}`);
      const users = await res.json();

      if (users.length > 0) {
        setError("Email already registered");
        setLoading(false);
        return;
      }

      
      await fetch(`${API}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      setLoading(false);
      navigate("/login");

    } catch (err) {
      setError("Server not running");
      setLoading(false);
    }
  };

  const disabled =
    !name.trim() || !email.trim() || password.length < 6 || loading;

  return (
    <div className="sign-page">
      <div className="sign-card">
        <h1 className="sign-heading">Sign up</h1>

        <form className="sign-form" onSubmit={handleSign}>
          <div className="form-row">
            <input
              className="input-field"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-row">
            <input
              className="input-field"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-row">
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
              type="submit"
              disabled={disabled}
            >
              {loading ? "Please wait..." : "Sign Up"}
            </button>
          </div>
        </form>

        {error && <div className="error-text">{error}</div>}

        <div className="signup-row">
          <small>
            Already signed up?{" "}
            <button
              className="btn-link"
              type="button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Sign;
