import React from "react";
import { FaHome, FaList, FaUser, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";


const Sidebar = () => {
    return (
        <div className="sidebar d-flex flex-column p-3 bg-dark text-white">
            {/* Logo */}
            <h2 className="fs-4 text-center mb-5">🏠 PropDash</h2>

            {/* Navigation */}
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link text-white sidebar-link">
                        <FaHome className="me-2" /> Home
                    </Link>
                </li>
                <li>
                    <Link to="/listings" className="nav-link text-white sidebar-link">
                        <FaList className="me-2" /> Listings
                    </Link>
                </li>
                <li>
                    <Link to="/users" className="nav-link text-white sidebar-link">
                        <FaUser className="me-2" /> Users
                    </Link>
                </li>
                <li>
                    <Link to="/settings" className="nav-link text-white sidebar-link">
                        <FaCog className="me-2" /> Settings
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
