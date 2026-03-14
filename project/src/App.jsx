import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";
import Login from "./Login";
import Sign from "./Sign";
import Pay from "./Pay";

import Adlogin from "./Admin/Adlogin";
import Adhome from "./Admin/AdHome";
import Product from "./Admin/Product";
import Users from "./Admin/Users";
import Orders from "./Admin/Orders";
import Dash from "./Admin/Dash";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pay" element={<Pay />} />

        <Route path="/Adlogin" element={<Adlogin />} />

        <Route path="/Adhome" element={<Adhome />}>
          <Route index element={<Dash />} />
          <Route path="product" element={<Product />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="dash" element={<Dash />} />
        </Route>

        <Route path="*" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;