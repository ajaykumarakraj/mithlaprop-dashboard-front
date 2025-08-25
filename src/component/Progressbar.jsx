// components/ProgressBar.js
import React from "react";
// import "../styles/ProgressBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faMapMarkerAlt,
    faBed,
    faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const stepIcons = [faHome, faMapMarkerAlt, faBed, faCheckCircle];
const stepLabels = ["Type", "Location", "BHK", "Review"];

const ProgressBar = ({ step }) => {
    return (
        <div className="progress-container">
            {stepLabels.map((label, index) => (
                <div className="progress-step-wrapper" key={index}>
                    <div className={`progress-step ${index <= step ? "active" : ""}`}>
                        <div className="step-circle">
                            <FontAwesomeIcon icon={stepIcons[index]} />
                        </div>
                        <div className="step-label">{label}</div>
                    </div>
                    {index < stepLabels.length - 1 && (
                        <div className={`progress-line ${index < step ? "filled" : ""}`}></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
