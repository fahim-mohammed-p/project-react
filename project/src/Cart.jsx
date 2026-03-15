import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"))
  useEffect(()=>{
    if(!user){
    alert("Please login first")
    navigate("/login")
   }else{
    fetchCart()
   }
  },[])
   

  const fetchCart= async ()=>{

  const res= await  fetch(`/api/cart?userEmail=${user.email}`)
  const data= await res.json();

  setCartItems(data);
  }

  useEffect(() => {
      fetchCart();
  },[])

  const handleIncrease= async (item) =>{
        await fetch(`/api/cart/${item.id}`,{
          method:"PATCH",
          headers: {"content-Type" : "application/json"},
          body :JSON.stringify({qty:item.qty+ 1}),
        })
        fetchCart();
  }

  const handleDecrease= async (item) =>{
    if(item.qty>1){
        await fetch(`/api/cart/${item.id}`,{
          method:"PATCH",
          headers: {"content-Type" : "application/json"},
          body :JSON.stringify({qty:item.qty - 1}),
        })
        fetchCart();
  }
}

  const handleRemove= async(item)=>{
          await fetch(`/api/cart/${item.id}`,{method:"delete"})
          fetchCart();
  }

  const handleBuy= async (item)=>{
    navigate("/Pay")
    await fetch(`/api/cart/${item.id}`,{method:"delete"})
          fetchCart();
  }

    const totalPrice= cartItems.reduce(
      (sum,item)=>sum + Number (item.price) * item.qty,0
    )

    const handleCheckout=()=>{
      navigate("/Pay")
    }

  return (
    <div className="cart-container mt-5">
      <div className="cart-header">
        <h2>Your Shopping Cart</h2>
        <button className="cart-back-btn" onClick={() => navigate("/")}>
          ← Back to Store
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {cartItems.map((item, index) => (
              <div key={item.id} className="cart-item-card">
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <h5>{item.name}</h5>
                  <p>Size: {item.inch}</p>
                  <p className="price">
                    ${Number(item.price) * item.qty}
                  </p>

                  <div className="qty-controls">
                    <button onClick={() => handleDecrease(item)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => handleIncrease(item)}>+</button>
                  </div>
                </div>
                <button 
                className="buy-btn" 
                onClick={()=> handleBuy(item)}
                >
                  Buy
                  </button>

                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <div className="cart-summary-card">
              <h4>Order Summary</h4>
              <hr />
              <p>Total Items: {cartItems.length}</p>
              <h5>Total: ${totalPrice.toFixed(2)}</h5>

              <button
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;



