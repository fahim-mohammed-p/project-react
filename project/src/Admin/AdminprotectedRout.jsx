import React, { Children } from "react";
import { Navigate } from "react-router-dom";

const adminProtect=({Children})=>{
    const isAdmin=localStorage.getItem("isAdmin")

    if(!isAdmin==="true"){
        return <navigate to="/Adlogin" replace/>
    }
    return Children;
}
export default adminProtect


