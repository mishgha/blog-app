import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { isLoggedIn } from '../authorization';

const PrivateRoute = () => {

    let logIn = isLoggedIn();
    return logIn ? <Outlet /> : <Navigate to = {"/login"} />

}

export default PrivateRoute