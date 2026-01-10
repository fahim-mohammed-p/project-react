import React from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Adhome.css";

function Adhome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/Adlogin");
  };

  const handleUI = () => {
    navigate("/");
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h3>Admin,</h3>
        <ul>
          <li className="nav-item">
            <Link className="nav-link" to="product">Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="users">Users</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="orders">Orders</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="dash">Dash</Link>
          </li>
        </ul>

        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleUI}>UI</button>
      </div>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Adhome;

