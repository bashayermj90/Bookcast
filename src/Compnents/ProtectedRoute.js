import React, { useContext } from 'react';
import LoginContext from '../Context/LoginContext';
import { Navigate } from 'react-router-dom';


function ProtectedRoute({ children }) {
    const {isLoggedIn} = useContext(LoginContext); 
    if (!isLoggedIn) {
        return <Navigate to="/" replace/>;
    }
    return children;
}

export default ProtectedRoute