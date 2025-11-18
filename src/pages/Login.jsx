import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/image/logo.png";
import "../assets/css/listing.css";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, verifyOtp, closeOtpPopup, resetRedirect } from "../Redux/slices/AuthSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userType, setUserType] = useState("owner");
    const [mobile, setPhone] = useState("");
    const [name, setName] = useState("");
    const [otp, setOtp] = useState("");

    const { otpPopup, loading, error, message, redirect } = useSelector((state) => state.auth);
    console.log(message)
    // ✅ Redirect after OTP success
    useEffect(() => {
        if (redirect) {
            navigate("/postproperty", { state: { userType, mobile, name } });
            dispatch(resetRedirect());
        }
    }, [redirect, navigate, dispatch, userType, mobile, name]);

    // 🔹 Send OTP
    const handleContinue = () => {
        if (!mobile || mobile.length !== 10) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }
        dispatch(signupUser({ mobile }));
    };

    // 🔹 Verify OTP
    const handleOtpVerify = () => {
        if (!otp || otp.length !== 4) {
            alert("Please enter a valid 4-digit OTP.");
            return;
        }
        dispatch(verifyOtp({ mobile, otp }));
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
            </div>

            {/* Right Section */}
            <div className="listing-right">
                <h2>Let’s get you started</h2>

                {/* User Type */}
                <label>You are:</label>
                <div className="btn-group user-type">
                    <button className={userType === "owner" ? "active" : ""} onClick={() => setUserType("owner")}>
                        Owner
                    </button>
                    <button className={userType === "agent" ? "active" : ""} onClick={() => setUserType("agent")}>
                        Agent
                    </button>
                </div>

                {/* Phone */}
                <label>Your contact number:</label>
                <input
                    type="tel"
                    placeholder="Phone Number"
                    maxLength="10"
                    value={mobile}
                    onChange={(e) => setPhone(e.target.value)}
                />

                {/* City */}
                <label>Property city:</label>
                <input
                    type="text"
                    placeholder="Please Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <button className="continue-btn" onClick={handleContinue} disabled={loading}>
                    {loading ? "Please wait..." : "Continue"}
                </button>

                {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            </div>

            {/* OTP Popup */}
            {otpPopup && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <h3>Verify OTP</h3>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            maxLength="4"
                        />
                        <div className="popup-actions">
                            <button onClick={handleOtpVerify} disabled={loading}>
                                {loading ? "Verifying..." : "Verify"}
                            </button>
                            <button onClick={() => dispatch(closeOtpPopup())}>Cancel</button>
                        </div>
                        {message && <p style={{ color: "green" }}>{message}</p>}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
