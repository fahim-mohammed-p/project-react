// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Adlogin.css";

// function Adlogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//     const login=()=>{
//         fetch("http://localhost:5000/admin")
//         .then((res)=>res.json())
//         .then(admin=>{
//           const admins= admin.find(
//             a=>a.email === email && a.password ===password
//           )
//           if(admin){
//             localStorage.setItem("isAdmin","true")
//             localStorage.setItem("adminEmail", "admin.email")
//             navigate("/AdHome")
//           }else{
//             alert("Invalid Details")
//           }
//         })
//         .catch(()=>{
//           alert("Please Run Server")
//         })
//     }
//   return (
//     <div className="admin-login">
//       <h2 className="admin-title">Admin Login</h2>

//       <input
//         className="admin-input"
//         type="email"
//         placeholder="Enter Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         className="admin-input"
//         type="password"
//         placeholder="Enter Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button
//         className="admin-btn"
//         type="button"
//         onClick={login}
//       >
//         Login
//       </button>
//     </div>
//   );
// }

// export default Adlogin;
// ---------------
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Adlogin.css";

function Adlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    fetch("http://localhost:5000/admin")
      .then((res) => res.json())
      .then((admins) => {
        const matchedAdmin = admins.find(
          (a) => a.email === email && a.password === password
        );

        if (matchedAdmin) {
          localStorage.setItem("isAdmin", "true");
          localStorage.setItem("adminEmail", matchedAdmin.email);
          navigate("/AdHome");
        } else {
          alert("Invalid Details");
        }
      })
      .catch(() => {
        alert("Please run json-server");
      });
  };

  return (
    <div className="admin-login">
      <h2 className="admin-title">Admin Login</h2>

      <input
        className="admin-input"
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="admin-input"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="admin-btn" type="button" onClick={login}>
        Login
      </button>
    </div>
  );
}

export default Adlogin;



