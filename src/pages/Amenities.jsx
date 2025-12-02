// src/components/PostProperty.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
    faHome,
    faMapMarkerAlt,
    faBed,
    faImage,
    faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";

import Navbar from "../component/Navbar";

import { useDispatch, useSelector } from "react-redux";
import api from "../component/Baseurl"
import axios from "axios";
// import "../assets/css/PostProperty.css";

const Amenities = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [GetAmenities, setGetAmenities] = useState("")
    const [amenities, setAmenities] = useState([]);
    const [step, setStep] = useState(2);
    const steps = [
        { label: "Basic Details", icon: faHome },
        // { label: "Location  Details", icon: faMapMarkerAlt },
        { label: "Properety Profile", icon: faBed },
        { label: "Amenities Section", icon: faCheckCircle },
        { label: "Photos and Videos", icon: faImage },
    ];


    const AmenitiesOption = (option) => {
        const current = Array.isArray(amenities) ? amenities : [];

        // Check if selected already
        const exists = current.find((item) => item.id === option.id);

        if (exists) {
            setAmenities(current.filter((item) => item.id !== option.id));
        } else {
            setAmenities([...current, { id: option.id, name: option.name }]);
        }
    };
    ;
    const data = JSON.parse(localStorage.getItem("userData"));

    console.log(data, "url");





    const handleNext = () => {
        const amenitiesdata = {
            amenities
        }
        localStorage.setItem("amenitiesdata", JSON.stringify(amenitiesdata));

        navigate("/submit-form");
    };



    // Api  start
    useEffect(() => {
        // localStorage.removeItem("amenitiesdata");
        const editData = JSON.parse(localStorage.getItem("editData") || "{}");
        console.log("editData", editData.aminity);
        const amenityData = JSON.parse(localStorage.getItem("amenitiesdata"));

        setAmenities(editData?.aminity || amenityData?.amenities || []);
        console.log(amenityData, "hrghfdghk")

        getamenities()
        // dispatch(fetchPropertyTypes())
    }, [])


    const getamenities = async () => {

        try {


            const res = await api.get(`/api/get-aminity`)
            if (res.data.status == 200) {
                // console.log("response", res.data.data)
                setGetAmenities(res.data.data)
            }


        } catch (error) {
            console.log(error)
        }

    }




    // console.log(GetAmenities)

    return (
        <div className="main-layout">

            <div className="content-area">
                <div>
                    <Navbar />
                </div>
                <div className="post-property-container">

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
                    <div className="property-form">


                        <>
                            <h2>Add amenities/unique features</h2>
                            <h4 className="mt-3">Amenities</h4>
                            <div className="btn-group sub-options">
                                {Array.isArray(GetAmenities) && GetAmenities.filter((v) => v.status === "1").map((option) => (
                                    <button
                                        key={option.id}

                                        className={amenities.some((item) => item.id === option.id) ? "active" : ""}

                                        onClick={() => AmenitiesOption(option)}
                                        type="button"
                                    >
                                        {option.name}
                                    </button>
                                ))}


                            </div>



                        </>
                        <div className="buttons">
                            <a href={data?.url} className="continue-btn">Back</a>

                            <button className="continue-btn" onClick={handleNext}>Next</button>


                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Amenities;
