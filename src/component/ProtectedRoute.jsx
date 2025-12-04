// src/component/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.token) {
        return <Navigate to="/sign-in" replace />;
    }

    return <Outlet />; // allow nested routes
};

export default ProtectedRoute;
