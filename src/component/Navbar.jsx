// src/components/Navbar.js
import React, { useState } from "react";
import logo from "../assets/image/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-3">
            {/* Logo */}
            <Link className="navbar-brand d-flex align-items-center" to="/">
                <img src={logo} alt="Logo" style={{ width: "100px" }} />
            </Link>

            {/* Toggle Button (Mobile) */}
            <button
                className="navbar-toggler"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </button>

            {/* Navbar Links */}
            <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/listings" className="nav-link">Listings</Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/postproperty" className="nav-link">Post Property</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/profile" className="nav-link">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/sign-in"
                            className="nav-link"
                            onClick={() => {
                                localStorage.removeItem("user");
                            }}
                        >
                            Log Out
                        </Link>
                    </li>
                </ul>

            </div>
        </nav>
    );
};

export default Navbar;
