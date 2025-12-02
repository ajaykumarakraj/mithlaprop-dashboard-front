
import React, { use, useEffect, useState } from "react";
import api from "../component/Baseurl"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faMapMarkerAlt,
    faBed,
    faEdit,
    faImage,
    faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const PostProperty = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [getSubTypeOptions, setGetSubTypeOptions] = useState([]);
    const [userType, setUserType] = useState("agent");
    const [action, setAction] = useState("");
    const [propertylist, setPropertylist] = useState([]);
    const [propertyTypeurl, setPropertyTypeurl] = useState("");
    const [subType, setSubType] = useState("");
    const [phone, setPhone] = useState("");


    // Error 
    const [Suberror, setSuberror] = useState("")
    const [Error, setError] = useState("")
    const [Proeertyerror, setProeertyerror] = useState("")
    const steps = [
        { label: "Basic Details", icon: faHome, },
        { label: "Properety Profile", icon: faBed, },
        { label: "Amenities Section", icon: faCheckCircle, },
        { label: "Photos", icon: faImage, },

    ];

    // -------------------------------
    // LOCAL STORAGE LOAD
    // -------------------------------
    useEffect(() => {
        const savedSubtype = JSON.parse(localStorage.getItem("subTypeData") || "[]");
        setGetSubTypeOptions(savedSubtype);

        const basic = JSON.parse(localStorage.getItem("basicDetails") || "{}");

        setPhone(basic.phone || "");
        setUserType(basic.userType || "agent");
        setAction(basic.action || "sale");
        setPropertyTypeurl(basic.propertyTypeurl);
        setSubType(basic.subType || "");
    }, []);
    // -------------------------------
    // load Property Types
    // -------------------------------
    useEffect(() => {

        const getPropertyTypes = async () => {
            try {
                const res = await api.get("/api/get-property-type")
                if (res.data.status === 200) {
                    setPropertylist(res.data.data);
                }
            } catch (error) {
                console.log("Property Type error:", error);
            }
        }
        getPropertyTypes()
    }, [subType]);
    // -------------------------------
    // PROPERTY TYPE CLICK
    // -------------------------------
    const handlePropertyType = async (id, name) => {
        setPropertyTypeurl(name);


        try {
            const res = await api.get(`/api/subtype-list-by-propertyid/${id}`);

            if (res.data.status) {
                setGetSubTypeOptions(res.data.data);
            }
        } catch (error) {
            console.log("Subtype error:", error);
        }
    };

    // -------------------------------
    // NEXT BUTTON
    // -------------------------------
    const handleNext = () => {

        if (!phone || phone.length !== 10) {
            setError("Phone number must be 10 digits");
            return;
        }
        if (!propertyTypeurl) {
            setProeertyerror("Please select a Property Type");
            return;
        }
        if (!subType) {
            setSuberror("Please select a subtype");
            return;
        }



        const basic = {
            phone,
            userType,
            action,
            subType,
            propertyTypeurl
        };

        localStorage.setItem("basicDetails", JSON.stringify(basic));
        localStorage.setItem("subTypeData", JSON.stringify(getSubTypeOptions));

        const plotTypes = [
            "plot / land",
            "land",
            "plot",
            "lands",
            "lands / plots",
            "plots",
            "plots / lands"
        ];

        if (plotTypes.includes(subType.toLowerCase())) {
            navigate("/property-plot");
        } else if (propertyTypeurl === "residential") {
            navigate("/residential-property");
        } else if (propertyTypeurl === "commercial") {
            navigate("/commercial-property");
        } else {
            alert("Please select property type");
        }
    };
    // localStorage.removeItem("user")
    console.log(subType)
    return (
        <div className="main-layout">
            <div className="content-area">
                <Navbar />

                <div className="post-property-container">
                    <div className="sidebar">
                        <h2 className="sidebar-title">Post Property</h2>
                        <div className="sidebar-progress">
                            {steps.map((s, index) => (
                                <div
                                    key={index}
                                    className="progress-step-vertical"

                                >
                                    <div >
                                        <div className="flexadd">
                                            <div className={`circle-icon ${index <= step ? "active" : ""}`}>
                                                <FontAwesomeIcon icon={s.icon} />
                                            </div>
                                            <div className="textadd">
                                                <span className="label">{s.label}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {index < steps.length - 1 && (
                                        <div className={`vertical-line ${index < step ? "filled" : ""}`}></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="property-form">
                        <h2>Add Property Details</h2>

                        {/* Phone */}
                        <label>Your contact number:</label>
                        <input
                            type="tel"
                            maxLength={10}
                            value={phone}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {   // Only digits allowed
                                    setPhone(value);
                                }
                            }}
                        />
                        <label className="text-danger">{Error}</label><br />
                        {/* User Type */}
                        <label>You are:</label>
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

                        {/* Action */}
                        <label>You are here to:</label>
                        <div className="btn-group sub-options">
                            <button className={action === "sale" ? "active" : ""} onClick={() => setAction("sale")}>Sale</button>
                            <button className={action === "rent" ? "active" : ""} onClick={() => setAction("rent")}>Rent</button>
                            <button className={action === "lease" ? "active" : ""} onClick={() => setAction("lease")}>Lease</button>
                        </div>

                        {/* Property Type */}
                        <label>Property Type:</label>
                        <div className="btn-group property-type">
                            {
                                propertylist.filter((status) => status.status == "1").map((v, k) => (
                                    <button
                                        key={k}
                                        className={v.type_name === propertyTypeurl ? "active" : ""}
                                        onClick={() => handlePropertyType(v.id, v.type_name)}
                                    >
                                        {v.type_name}
                                    </button>
                                ))}
                        </div>
                        <label className="text-danger">{Proeertyerror}</label><br />
                        {/* Subtype */}
                        {Array.isArray(getSubTypeOptions) && getSubTypeOptions.length > 0 && (
                            <>
                                <label>Sub Property Type:</label>
                                <div className="btn-group sub-options">
                                    {getSubTypeOptions.map((v, k) => (
                                        <button
                                            key={k}
                                            className={v.subtype_name === subType ? "active" : ""}
                                            onClick={() => setSubType(v.subtype_name)}
                                        >
                                            {v.subtype_name}
                                        </button>

                                    ))}
                                </div>
                                <label className="text-danger">{Suberror}</label><br />
                            </>
                        )}

                        <div className="buttons">

                            <button className="continue-btn" onClick={handleNext}  >
                                Next
                            </button>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostProperty;
