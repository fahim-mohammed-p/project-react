import React, {useState} from "react"
import { useNavigate } from "react-router-dom"
import "./pay.css";

function Pay(){
    const [method,setMethod]=useState("")
    const [upiId, setUpiId]=useState("")
    const [cardNumber, setCardNumber]=useState("")
    const [cardExp, setCardExp]=useState("")
    const navigate= useNavigate()

const orderPay = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  try {
   
    const cartRes = await fetch(
      `http://localhost:5000/cart?userEmail=${user.email}`
    );
    const cartItems = await cartRes.json();

    if (cartItems.length === 0) {
      console.log("Cart empty");
      return;
    }

    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const order = {
      userEmail: user.email,
      items: cartItems,
      totalPrice,
      paymentStatus: "paid",
      paymentMethod: method,
      orderDate: new Date().toISOString(),
    };

   
    const orderRes = await fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (!orderRes.ok) throw new Error("Order not saved");

    console.log("Order stored successfully");


    for (let item of cartItems) {
      await fetch(`http://localhost:5000/cart/${item.id}`, {
        method: "DELETE",
      });
    }

  } catch (err) {
    console.error("Order failed:", err);
  }
};

    const handlePay= async()=>{
        if(method.length===0){
            alert("Select a Payment Method")
           
        }

        if(method === "upi" && !upiId){
            alert("Enter UPI ID")
            return;
        }
        if(method === "card" && (!cardNumber || !cardNumber)){
            alert("Complete Card Details")
            return;
        }
        await orderPay();
    
    
    
    alert(`Payment recieved`);
  
     navigate("/Cart")
    }
    return(
        <div className="payment-container">
            <h2 className="payment-heading">Payment Section</h2>

            <div className="payment-option">
                <label>
                    <input
                    type="radio"
                    name="payment"
                    value="upi"
                    onChange={(e)=>setMethod(e.target.value)}/>
                        UPI
                </label> 
            </div>

            <div className="payment-option">
                <label>
                    <input
                    type="radio"
                    name="payment"
                    value="cod"
                    onChange={(e)=>setMethod(e.target.value)}/>
                        Cash On Delivery(COD)
                </label> 
            </div>

            <div className="payment-option">
                <label>
                    <input
                    type="radio"
                    name="payment"
                    value="card"
                    onChange={(e)=>setMethod(e.target.value)}/>
                        Debit / Credit Card
                </label> 
            </div>

            {method === "upi" &&(
                <div className="payment-details">
                    <input
                    type="text"
                    placeholder="Enter UPI ID"
                    value={upiId}
                    onChange={(e)=>setUpiId(e.target.value)}
                    />
                </div>
            )}

            {method === "card" &&(
                <div className="payment-details">
                    <input
                    type="text"
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={(e)=>setCardNumber(e.target.value)}
                    />

                    <input
                    type="text"
                    placeholder="Expiry MM/DD/YY"
                    value={cardExp}
                    onChange={(e)=>setCardExp(e.target.value)}
                    />
                </div>
            )}

            <button className="payment-btn" onClick={handlePay}>
                Place Order
            </button>
        </div>
    )  
}
export default Pay

