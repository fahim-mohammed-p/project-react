import React, { useEffect, useState } from "react";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    fetch("/api/orders")
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div className="order-container">
      <h2 className="order-heading">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="order-card">
            <p><b>Order ID:</b> {order.id}</p>
            <p><b>User Email:</b>{order.userEmail}</p>
            <p><b>Date:</b> {new Date(order.orderDate).toLocaleString()}</p>
            <p><b>Payment:</b> {order.paymentMethod}</p>
            <p><b>Status:</b> {order.paymentStatus}</p>
            <p><b>Total:</b> ${order.totalPrice}</p>

            <hr />

            {order.items.map(item => (
              <div key={item.id}>
                {item.name} * {item.qty}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
