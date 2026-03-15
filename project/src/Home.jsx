import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

import { AiFillExclamationCircle } from "react-icons/ai";
import { GoHomeFill } from "react-icons/go";
import { BsCart3 } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";
import { MdOutlineLogin } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa6";


function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return;

    const user = JSON.parse(userStr);
    if (user.banned) {
      alert("You are banned by admin");
      navigate("/Ban");
    }
  }, [navigate]);

  
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserName(user.name || "");
    }
  }, []);

  
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  
  const addToCart = async (product) => {
    if (!isLoggedIn) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    const res = await fetch(
      `/api/cart?userEmail=${user.email}&productId=${product.id}`
    );
    const existing = await res.json();

    if (existing.length > 0) {
      await fetch(`/api/cart/${existing[0].id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qty: existing[0].qty + 1 }),
      });
    } else {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user.email,
          productId: product.id,
          name: product.name,
          price: product.price,
          qty: 1,
          inch: product.inch,
          image: product.image,
        }),
      });
    }

    alert(`${product.name} Added to Cart`);
  };

  
  const handleLogin = () => {
    if (isLoggedIn) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUserName("");
      navigate("/Login");
    } else {
      navigate("/Login");
    }
  };

  
  const filter = (category) =>
    products.filter(
      (p) =>
        p.category === category &&
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
        <div className="container-fluid">
          <span className="navbar-brand">
            {userName ? userName : "AlloyCraft"}
          </span>

          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <span className="nav-link" onClick={() => navigate("/")}>
                <GoHomeFill /> Home
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link" onClick={() => navigate("/Cart")}>
                <BsCart3 /> Cart
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link">
                <AiFillExclamationCircle /> About
                </span>
            </li>
          </ul>

          <div className="search-container mx-auto">
            <CiSearch className="search-icon" />
            <input
              type="text"
              className="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="logout-btn" onClick={handleLogin}>
            {isLoggedIn ? (<> <MdOutlineLogout />Logout</> ): (<><MdOutlineLogin />Login</>)}
          </button>
        </div>
      </nav>

     
      <div className="hero-video">
        <video autoPlay loop muted playsInline className="hero-video-tag">
          <source src="/video/main.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay">
          <h1 className="hero-title">Premium Alloy Wheels</h1>
          <p className="hero-sub">Performance • Style • Precision</p>
        </div>
      </div>

      
      <div className="container mt-4">
        <h2 className="product-head">Advan Wheels</h2>
        <div className="row g-3">
          
          {filter("Advan").map((p) => (
            <ProductCard key={p.id} p={p} addToCart={addToCart} />
          ))}
        </div>

        <h2 className="product-head mt-4">BBS Wheels</h2>
        <div className="row g-3">
          {filter("BBS").map((p) => (
            <ProductCard key={p.id} p={p} addToCart={addToCart} />
          ))}
        </div>

        <h2 className="product-head mt-4">Volk Racing</h2>
        <div className="row g-3">
          {filter("Volk").map((p) => (
            <ProductCard key={p.id} p={p} addToCart={addToCart} />
          ))}
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <h3 className="footer-logo">Alloy Craft</h3>

          <p className="footer-text">
            Alloy Craft provides premium alloy wheels crafted for performance,
            durability, and style.
          </p>

          <p className="footer-since">
            Established since <strong>2025</strong>
          </p>

          <p className="footer-copy">
            © {new Date().getFullYear()} Alloy Craft. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

function ProductCard({ p, addToCart }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 card-wrap">
      <div className="card product-card">
        <img src={p.image} className="card-img-top" alt={p.name} />
        <div className="card-body text-center">
          <h5>{p.name}</h5>
          <p>Inch: {p.inch}</p>
          <h6>Price: ${p.price}</h6>
          <button className="button-card" onClick={() => addToCart(p)}>
            <FaCartArrowDown />

            Add
          </button>
        </div>
      </div>
    </div>

    
  );
}

export default Home;


