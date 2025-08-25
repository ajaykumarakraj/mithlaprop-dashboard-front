import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/listing.css";
import logo from '../assets/images/logo.png';
const LogInForm = () => {
    const [userType, setUserType] = useState("owner");
    const [action, setAction] = useState("sell");

    return (
        <div className="listing-container">


            {/* Left Section */}
            <div className="listing-left">
                <Link to="/"> <img src={logo} alt="Logo" className="logo mb-4" /></Link>
                <h2>Sell or Rent Your Property Faster</h2>
                <h1>100% Free Listing on India’s #1 Real Estate Platform</h1>

                <div className="badges">
                    <span>8M+ Monthly Users</span>
                    <span>10 Years of Trust</span>
                </div>

                <div className="stats">
                    <div className="stat-box green">
                        <h3>Property Sold in Every 30 Minutes</h3>
                    </div>
                    <div className="stat-box blue">
                        <h3>Property Rented in Every 10 Minutes</h3>
                    </div>
                </div>

                <p className="brand">on <strong>mithlaprop</strong></p>
            </div>

            {/* Right Section (Form) */}
            <div className="listing-right">
                <h2>Let’s get you started</h2>

                <label>You are:</label>
                <div className="btn-group">
                    <button
                        className={userType === "owner" ? "active" : ""}
                        onClick={() => setUserType("owner")}
                    >
                        Owner
                    </button>
                    <button
                        className={userType === "agent" ? "active" : ""}
                        onClick={() => setUserType("agent")}
                    >
                        Agent
                    </button>
                </div>

                <label>You are here to:</label>
                <div className="btn-group">
                    <button
                        className={action === "sell" ? "active" : ""}
                        onClick={() => setAction("sell")}
                    >
                        Sell
                    </button>
                    <button
                        className={action === "rent" ? "active" : ""}
                        onClick={() => setAction("rent")}
                    >
                        Rent/Lease
                    </button>
                </div>

                <label>Your contact number:</label>
                {/* <div className="phone-input">
                  
                   
                </div> */}
                <input type="text" placeholder="Phone Number" />
                <label>Property city:</label>
                <input type="text" placeholder="Please enter city name" />

                <button className="continue-btn">Continue</button>

                <p className="help-text">
                    Need help in listing property? <a href="#">Click Here</a>
                </p>
            </div>
        </div>
    );
};

export default LogInForm;
