// src/components/Sidebar.js
import React from "react";
// import "../assets/css/Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faMapMarkerAlt,
    faBed,
    faImage,
    faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const steps = [
    { label: "Basic Details", icon: faHome },
    { label: "Location  Details", icon: faMapMarkerAlt },
    { label: "Properety Profile", icon: faBed },
    { label: "Photos and Videos", icon: faImage },
    { label: "Amenities Section", icon: faCheckCircle },
];

const Sidebar = ({ step }) => {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Post Property</h2>
            <div className="sidebar-progress">
                {steps.map((s, index) => (
                    <div key={index} className="progress-step-vertical">
                        <div className="flexadd">
                            <div className={`circle-icon ${index <= step ? "active" : ""}`}>
                                <FontAwesomeIcon icon={s.icon} />
                            </div>
                            <div className="textadd"> <span className="label">{s.label}</span></div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`vertical-line ${index < step ? "filled" : ""}`}></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
