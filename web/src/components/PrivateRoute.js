/* eslint-disable prettier/prettier */
import React from "react";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
    const token = localStorage.getItem('token') // Verifica también el token

    if(!token){
        return <Navigate to="/login" replace/>
    }

    return children
}

export default PrivateRoute