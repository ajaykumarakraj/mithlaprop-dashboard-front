import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/image/logo.png";
import "../assets/css/listing.css";

const Home = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState("owner");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");

    const handleContinue = () => {
        if (!phone || !city) {
            alert("Please complete all required fields.");
            return;
        }

        navigate("/postproperty", {
            state: {
                userType,
                phone,
                city,
            },
        });
    };

    return (
        <div className="listing-container">
            {/* Left Section */}
            <div className="listing-left">
                <Link to="/">
                    <img src={logo} alt="Logo" className="logo mb-4" style={{ width: "100px" }} />
                </Link>
                <h2>Sell or Rent Your Property Faster</h2>
                <h1>100% Free Listing on India’s #1 Real Estate Platform</h1>

                <div className="badges">
                    <span>8M+ Monthly Users</span>
                    <span>10 Years of Trust</span>
                </div>

                <div className="stats">
                    <div className="stat-box green">
                        <ul className="stat-list">
                            <li>Property Sold in Every 30 Minutes</li>
                            <li>Get Unlimited Query</li>
                            <li>Advertise for Free</li>
                        </ul>
                    </div>

                    {/* <div className="stat-box blue">
                        <h3>Property Rented in Every 10 Minutes</h3>
                    </div> */}
                </div>
            </div>

            {/* Right Section (Form) */}
            <div className="listing-right">
                <h2>Let’s get you started</h2>

                {/* User Type */}
                <label>You are:</label>
                <div className="btn-group user-type">
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

                {/* Phone */}
                <label>Your contact number:</label>
                <input
                    type="tel"
                    placeholder="Phone Number"
                    maxLength="10"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                {/* City */}
                <label>Property city:</label>
                <input
                    type="text"
                    placeholder="Please enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />

                <button className="continue-btn" onClick={handleContinue}>Continue</button>

                <p className="help-text">
                    Need help in listing property? <a href="#">Click Here</a>
                </p>
            </div>
        </div>
    );
};

export default Home;
