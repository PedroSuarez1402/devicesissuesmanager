/* eslint-disable prettier/prettier */
import React from "react";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children, roles}) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token') // Verifica también el token

    if(!user || !token){
        return <Navigate to="/login" replace/>
    }
    // eslint-disable-next-line react/prop-types
    if(roles && !roles.includes(user.role)){
        return <Navigate to="/404" replace/>
    }

    return children
}

export default PrivateRoute