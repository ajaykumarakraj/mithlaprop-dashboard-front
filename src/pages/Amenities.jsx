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
import { fetchPropertyTypes } from "../Redux/slices/PropertySlice"
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


    // localStorage.removeItem("userData");
    console.log(data, "url");





    const handleNext = () => {
        const amenitiesdata = {
            amenities
        }
        localStorage.setItem("amenitiesdata", JSON.stringify(amenitiesdata));

        navigate("/image-upload");
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
        dispatch(fetchPropertyTypes())
    }, [dispatch])
    // get api Property Type:

    // amenities 

    const getamenities = async () => {

        try {


            const res = await axios.get(`https://api.squarebigha.com/api/get-aminity`, {

                headers: {
                    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTk5MjgxNi1kZDUxLTcyMDEtYWY5MC1iNTZiYmNiMGVmNDEiLCJqdGkiOiIzOTUzMTUxNjQyOWM1MzZiZmM1NjQyOTQ2ODNhYTYxNzc0NTgxZjRmZmU4NjE5NzNiZWQ0Mjk1OTdlYzQzZjM5NTk5ZDQ0Yjc4MjgyNWMxMyIsImlhdCI6MTc1NzQxNzk0Ni45Mjk3NzEsIm5iZiI6MTc1NzQxNzk0Ni45Mjk3NzMsImV4cCI6MTc4ODk1Mzk0Ni45MjQ1OTUsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.qL6E9AzHFXC74-XRr0-KhAao4jWisTvyeri3eUXTEFV_Hp6DTylDISB1eeDsyaStrMIfk89EjMVaClE16WbYBKGVpHSnKOaDT56ubfb7DcrHAh50BTLTTIgYyf_Gbop_pnHFkOjbFc03SgKLWHJ8PpQlShiIxtXBA2eQX5bEkYHit0eZYN0bQdjtiu8YFvhubG9OMee-r95Cc8nXRdiC3gkXw0POWjwoCev9BNFHZ8UfdgXZMjxDVo4R_fFdWTeeicFjchFxYuRb7zm1aU8OUFyc4ozNJUC6Wix4hUARjUTmIfZ5mfEq5TDQWD0AM-ERfP8tIkkoTbDqqASU2Mg6LJ4p6nUXUqAuql4sDbmRKVlB04N15xV62LHWJTgT71JfA_bgZHFJGDUQD1c53vCwqEbZUSrMMAOXF6mllBmm1baKdqiocEm9_QldIWT2U07zmYGG4PBU2N3pBmMXftZDFu-xOPBSdB7dsz9KEUeY_gLDoupX9JwgQY8aNT-lwlcb9c0tguDdLWS2cU1LY180kfF0R7QeRq5UpCyb27COT7LNu9R9sl_KMcmLnxtzhNWA-YZeS9h3sKlimso6GO3VgTevyWaVyAs4nCNxP7kAP7FdlG-ckIUEuwsFmvV5pBGu65VB8hG9n3mha-zi7oRlqm4ltkGNLVZR4pX9iBN1Z6g` // ⬅️ shortened for display
                },

            })
            if (res.data.status == 200) {
                // console.log("response", res.data.data)
                setGetAmenities(res.data.data)
            }


        } catch (error) {
            console.log(error)
        }

    }

    // if (loading) return <div>Loading property types...</div>;
    // if (error) return <div>Error: {error.toString()}</div>;
    // console.log("get data", types)



    console.log(GetAmenities)

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
