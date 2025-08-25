import React from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
    const { state } = useLocation();
    const { userType, action, propertyType, subType, phone, city } = state || {};

    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                <li>User Type: {userType}</li>
                <li>Action: {action}</li>
                <li>Property Type: {propertyType}</li>
                <li>Sub-Type: {subType}</li>
                <li>Phone: {phone}</li>
                <li>City: {city}</li>
            </ul>
        </div>
    );
};

export default Dashboard;
