// src/components/Navbar.js
import React from "react";
// import "../assets/css/Navbar.css";
import logo from "../assets/image/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <img src={logo} style={{ width: "100px" }} />
                <ul className="navbar-menu">
                    <li>Dashboard</li>
                    <li>Listings</li>
                    <li>Packages</li>
                    <li>Post Property</li>
                    <li>Account</li>
                </ul>
            </div>
            {/* <div className="navbar-right">
                <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
            </div> */}
        </div>
    );
};

export default Navbar;
