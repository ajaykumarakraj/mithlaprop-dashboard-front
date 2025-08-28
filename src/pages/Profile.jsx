// src/pages/Profile.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faMapMarkerAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../component/Navbar";
// import profilePic from "../assets/image/user.png"; // put your default user image here

const Profile = () => {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <>
            <Navbar />
            <div className="container mt-4">

                {/* Profile Header */}
                <div className="card shadow-sm border-0">
                    <div className="card-body text-center">
                        {/* <img
                        src={profilePic}
                        alt="Profile"
                        className="rounded-circle border"
                        width="120"
                        height="120"
                    /> */}
                        <h3 className="mt-3 mb-0">Ajay Kumar</h3>
                        <p className="text-muted">Real Estate Agent</p>
                        <button className="btn btn-primary btn-sm">
                            <FontAwesomeIcon icon={faEdit} className="me-2" />
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Tabs Section */}
                <ul className="nav nav-tabs mt-4">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
                            onClick={() => setActiveTab("overview")}
                        >
                            Overview
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "properties" ? "active" : ""}`}
                            onClick={() => setActiveTab("properties")}
                        >
                            My Properties
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "settings" ? "active" : ""}`}
                            onClick={() => setActiveTab("settings")}
                        >
                            Settings
                        </button>
                    </li>
                </ul>

                {/* Tab Content */}
                <div className="card shadow-sm border-0 mt-3">
                    <div className="card-body">
                        {activeTab === "overview" && (
                            <div>
                                <h5 className="mb-3">Personal Information</h5>
                                <p><FontAwesomeIcon icon={faUser} className="me-2 text-primary" /> Ajay Kumar</p>
                                <p><FontAwesomeIcon icon={faEnvelope} className="me-2 text-primary" /> ajay@example.com</p>
                                <p><FontAwesomeIcon icon={faPhone} className="me-2 text-primary" /> +91 9876543210</p>
                                <p><FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-primary" /> Patna, Bihar</p>
                            </div>
                        )}

                        {activeTab === "properties" && (
                            <div>
                                <h5 className="mb-3">My Properties</h5>
                                <ul className="list-group">
                                    <li className="list-group-item">2BHK Apartment - Delhi</li>
                                    <li className="list-group-item">Luxury Villa - Mumbai</li>
                                    <li className="list-group-item">Studio Flat - Pune</li>
                                </ul>
                            </div>
                        )}

                        {activeTab === "settings" && (
                            <div>
                                <h5 className="mb-3">Account Settings</h5>
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">Change Email</label>
                                        <input type="email" className="form-control" placeholder="Enter new email" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Change Password</label>
                                        <input type="password" className="form-control" placeholder="Enter new password" />
                                    </div>
                                    <button className="btn btn-success">Save Changes</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
