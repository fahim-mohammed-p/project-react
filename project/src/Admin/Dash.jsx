import React,{useState,useEffect} from 'react'
import "./Dash.css"
 function Dash() {
    const [userCount,setUserCount]= useState(0);
    const [productCount, setProductCount]= useState(0);
    const [orderCount, setOrderCount]= useState(0);
    const [totalRevenue, setTotalRevenue]= useState(0);

      useEffect(()=>{
          fetchDashboard();
      },[])
        const fetchDashboard= async()=>{
          try{
            const [usersRes, productsRes, ordersRes] = await Promise.all([
              fetch("http://localhost:5000/users"),
              fetch("http://localhost:5000/products"),
              fetch("http://localhost:5000/orders"),
            ]);
            const users= await usersRes.json();
            const products= await productsRes.json();
            const orders=await ordersRes.json();

            setUserCount (users.length);
            setProductCount(products.length);
            setOrderCount(orders.length);


            const revenue= orders.reduce((sum,order)=> sum + Number (order.totalPrice || 0),0);
            setTotalRevenue(revenue);
          }catch(err){
            console.log("Fetch Error", err)
          }
        }
  return (
    <div className='dash-wrapper'>
      <h2 className="dash-heading">Dashboard</h2>

      <div className="dash-cards">
        <div className="dash-card green">
          <h4>Total Users</h4>
          <p>{userCount}</p>
        </div>

        <div className="dash-card orange">
          <h4>Total Orders</h4>
          <p>{orderCount}</p>
        </div>

        <div className="dash-card revenue">
          <h4>Total Revenue</h4>
          <p>${totalRevenue}</p>
        </div>
      </div>
    </div>
  )
}
export default Dash
