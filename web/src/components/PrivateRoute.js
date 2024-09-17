/* eslint-disable prettier/prettier */
import React from "react";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children, roles}) => {
    const user = JSON.parse(localStorage.getItem('user'))

    if(!user){
        return <Navigate to="/login" replace/>
    }
    // eslint-disable-next-line react/prop-types
    if(roles && !roles.includes(user.role)){
        return <Navigate to="/404" replace/>
    }

    return children
}

export default PrivateRoute