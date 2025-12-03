import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/image/logo.png";
import lock from "../assets/image/login.png";
import "../assets/css/listing.css";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, verifyOtp } from "../Redux/slices/AuthSlice";


const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [city, setCity] = useState("");
    const [userType, setUserType] = useState("agent");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [otp, setOtp] = useState("");

    const { loading, error, message, otpSent } = useSelector((state) => state.auth);

    // 🔹 Send OTP
    const handleContinue = () => {
        if (!phone || phone.length !== 10) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }
        dispatch(signupUser({ phone, name, city, userType }));
    };

    // 🔹 Verify OTP
    const handleOtpVerify = () => {
        if (!otp || otp.length !== 4) {
            alert("Please enter 4-digit OTP.");
            return;
        }

        dispatch(verifyOtp({
            type: "signup",
            phone,
            otp,
            user_type: userType,
            name,
            city
        }))
            .unwrap()
            .then(() => {
                navigate("/postproperty");   // 👈 navigate after success
            })
            .catch(() => { });
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

                {/* ================= SIGNUP FORM ================ */}
                {!otpSent ? (
                    <>
                        <h2>Let’s get you started</h2>
                        <img src={lock} alt="City" style={{ width: "50%", marginTop: "10px", borderRadius: "8px" }} />

                        <div className="btn-group user-type">
                            <button
                                className={userType === "agent" ? "active" : ""}
                                onClick={() => setUserType("agent")}
                            >
                                Agent
                            </button>
                            <button
                                className={userType === "owner" ? "active" : ""}
                                onClick={() => setUserType("owner")}
                            >
                                Owner
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Please Enter Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="tel"
                            placeholder="Enter phone Your Number"
                            maxLength="10"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Please Enter Your City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />

                        <div className="popup-actions">
                            <button onClick={handleContinue} disabled={loading}>
                                {loading ? "Sending..." : "Continue"}
                            </button>
                        </div>
                        <p> Already Have an Account? <Link to="/"> Login Here.</Link></p>

                        {message && <p style={{ color: "green" }}>{message}</p>}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </>
                ) : (

                    /* ================= OTP VERIFY SCREEN ================ */
                    <>
                        <h2>Verify OTP</h2>

                        <input
                            type="text"
                            placeholder="Enter OTP"
                            maxLength="4"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />

                        <div className="popup-actions">
                            <button onClick={handleOtpVerify} disabled={loading}>
                                {loading ? "Verifying..." : "Verify OTP"}
                            </button>
                        </div>

                        {message && <p style={{ color: "green" }}>{message}</p>}
                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <p className="text-primary mt-2" style={{ cursor: "pointer" }} onClick={handleContinue}>
                            Resend OTP
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Signup;
