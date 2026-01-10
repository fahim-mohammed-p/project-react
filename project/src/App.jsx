import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";
import Login from "./Login";
import Sign from "./Sign";
import Pay from "./Pay";
import Adlogin from "./Admin/Adlogin";
import Adhome from "./Admin/AdHome";
import Product from "./Admin/Product";
import Users from "./Admin/Users"
import Orders from "./Admin/Orders"
import Dash from "./Admin/Dash";
import AdminprotectedRout from "./Admin/AdminprotectedRout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/Adlogin" element={<Adlogin />}/>
        <Route path="/Adhome" element={<Adhome />}>
        <Route path="product" element={<Product />}/>
        <Route path="Users" element={<Users />}/>
        <Route path="Orders" element={<Orders />}/>
        <Route path="Dash" element={<Dash />}/>
        <Route path="Admin/products" element={
          <AdminprotectedRout>
            <Product/>
          </AdminprotectedRout>
        }/>



        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


