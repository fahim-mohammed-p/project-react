import React from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Adhome.css";

import { MdOutlineLogout } from "react-icons/md";
import { MdOutlineReviews } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { FaBoxOpen } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { FaTags } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

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
        <h3><CgProfile />Admin</h3>
        <ul>
          <li className="nav-item">
            <Link className="nav-link" to="product"><FaTags />Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="users"><HiUsers />Users</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="orders"><FaBoxOpen />Orders</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="dash"><RiDashboardFill />Dashboard</Link>
          </li>
        </ul>

        <button className="admin-btn" onClick={handleLogout}><MdOutlineLogout />Logout</button>
        <button onClick={handleUI}><MdOutlineReviews />UI</button>
      </div>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Adhome;

