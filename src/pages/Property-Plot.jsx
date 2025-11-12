


// src/components/PostProperty.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
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
import { fetchPropertyTypes } from "../Redux/slices/authSlice"
import axios from "axios";
// import "../assets/css/PostProperty.css";

const PropertyPlot = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate();
    // const { types, loading, error } = useSelector(state => state.auth.propertyType)
    const [step, setStep] = useState(1);

    const [cityName, setCityName] = useState("");
    const [subLocality, setSubLocality] = useState("");
    const [locality, setLocality] = useState("");
    const [apartment, setApartment] = useState("");
    const [bhk, setBhk] = useState("");

    const [sides, setSideOption] = useState("1");

    const [price, setPrice] = useState("");
    const [area, setArea] = useState("");
    const [AreaUnit, setAreaUnit] = useState("");


    // const [AreaLenth, setAreaLenth] = useState("");
    // const [AreaBreadth, setAreaBreadth] = useState("")
    const [Floors, setFloors] = useState("")
    const [Boundary, setBoundary] = useState("")
    const [ConstructionStatus, setConstructionStatus] = useState("")
    const [Possession, setPossession] = useState("")



    const [ownership, setOwnership] = useState("");


    // const [otherroom, setOtherroom] = useState([]);

    const [constraction, setConstraction] = useState("");

    const [furnishing, setFurnishing] = useState("");
    const steps = [
        { label: "Basic Details", icon: faHome },
        // { label: "Location  Details", icon: faMapMarkerAlt },
        { label: "Properety Profile", icon: faBed },
        { label: "Amenities Section", icon: faCheckCircle },
        { label: "Photos and Videos", icon: faImage },

    ];


    const openside = ["1 ", "2", "3", "3+"]

    const Ownership = ["Freehold", "Leasehold", "Co-operative society", "Power of Attorney"]



    const handleSubmit = () => {
        const profileData = {
            Possession,
            ConstructionStatus,
            sides,
            Boundary,
            Floors,
            bhk,
            price,
            area,
            AreaUnit,
            cityName,
            locality,
            
            apartment,
            ownership,
            furnishing,
            constraction,
        };
        localStorage.setItem("propertyProfile", JSON.stringify(profileData));
        localStorage.setItem("userData", JSON.stringify({ url: location.pathname }));
        navigate("/amenities");
    }
    // Api  start
    useEffect(() => {
        const Profile = JSON.parse(localStorage.getItem("propertyProfile") || "{}");
        setBhk(Profile.bhk || "");
        setArea(Profile.area || "");
        setAreaUnit(Profile.AreaUnit || "sq.ft.");
        setPrice(Profile.price || "");
        setConstraction(Profile.constraction || "");
        setOwnership(Profile.ownership || "");
        // setOtherroom(Array.isArray(Profile.otherroom) ? Profile.otherroom : []);
        setFurnishing(Profile.furnishing || "");
        setCityName(Profile.cityName || "");
        setLocality(Profile.locality || "");
        setSubLocality(Profile.subLocality || "");
        setApartment(Profile.apartment || "");

        dispatch(fetchPropertyTypes());
    }, [dispatch]);

    // get api Property Type:
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
                            <h2>Tell Us About Your Property</h2>




                            <div className="container p-0">

                                <div className="row">
                                    <h4 className="mt-3">Add Area Details</h4>
                                    <div className="col-md-6">

                                        <label>Built Up Area</label>
                                        <input
                                            type="number"
                                            placeholder="Enter area"
                                            value={area}
                                            onChange={(e) => setArea(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Select Area Unit</label>
                                        <div className="input-wrapper">
                                            <select
                                                value={AreaUnit}
                                                onChange={(e) => setAreaUnit(e.target.value)}
                                            >
                                                <option value="sq.ft.">sq.ft.</option>
                                                <option value="sq.yards">sq.yards</option>
                                                <option value="sq.m.">sq.m.</option>
                                                <option value="grounds">grounds</option>
                                                <option value="aankadam">aankadam</option>
                                                <option value="rood">rood</option>
                                                <option value="chataks">chataks</option>
                                                <option value="perch">perch</option>
                                                <option value="guntha">guntha</option>
                                                <option value="ares">ares</option>
                                                <option value="biswa">biswa</option>
                                                <option value="acres">acres</option>
                                                <option value="bigha">bigha</option>
                                                <option value="kottah">kottah</option>
                                                <option value="hectares">hectares</option>
                                                <option value="marla">marla</option>
                                                <option value="kanal">kanal</option>
                                                <option value="cents">cents</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* <h4 className="mt-3">Property Diamensions</h4>
                                    <div className="col-md-6">

                                        <label>Lenth of Plot</label>
                                        <input
                                            type="number"
                                            placeholder={`Lenth of Plot (${AreaUnit || "sq.ft."})`}
                                            value={AreaLenth}
                                            onChange={(e) => setAreaLenth(e.target.value)}
                                        />
                                    </div> */}
                                    {/* <div className="col-md-6">

                                        <label>Breadth of Plot</label>
                                        <input
                                            type="number"
                                            placeholder={`Breadth of Plot (${AreaUnit || "sq.ft."})`}
                                            value={AreaBreadth}
                                            onChange={(e) => setAreaBreadth(e.target.value)}
                                        />
                                    </div> */}

                                    <h4 className="mt-3">Floors Allowed For Construction</h4>
                                    <div className="col-md-6">

                                        <input
                                            type="number"
                                            placeholder="No. of Floors"
                                            value={Floors}
                                            onChange={(e) => setFloors(e.target.value)}
                                        />
                                    </div>
                                    <h4 className="mt-3">Is there  boundary wall around the property</h4>
                                    <div className="btn-group sub-options">
                                        <button className={Boundary === "Yes" ? "active" : ""} onClick={() => setBoundary("Yes")}> Yes </button>
                                        <button className={Boundary === "NO" ? "active" : ""} onClick={() => setBoundary("NO")}> NO </button>

                                    </div>
                                    <h4 className="mt-3">No. of Open Side</h4>
                                    <div className="btn-group sub-options">
                                        {openside.map((option) => (
                                            <button
                                                key={option}
                                                className={`${sides === option ? "active" : ""}`}
                                                onClick={() => setSideOption(option)}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>


                                    <h4 className="mt-3">Any Construction done on this Property</h4>
                                    <div className="btn-group sub-options">
                                        <button className={ConstructionStatus === "Yes" ? "active" : ""} onClick={() => setConstructionStatus("Yes")}> Yes </button>
                                        <button className={ConstructionStatus === "NO" ? "active" : ""} onClick={() => setConstructionStatus("NO")}> NO </button>

                                    </div>
                                    <h4 className="mt-3">Ownership</h4>
                                    <div className="btn-group sub-options">

                                        {Ownership.map((option) => (
                                            <button
                                                key={option}
                                                className={` ${ownership === option ? "active" : ""}`}
                                                onClick={() => setOwnership(option)}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                    <h4 className="mt-3">Add Price Details</h4>
                                    <div className="col-md-6">

                                        <label>Total Price</label>
                                        <input
                                            type="number"
                                            placeholder="Enter Price"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Per Unit</label>
                                        <div className="input-wrapper">
                                            <input type="text" value={AreaUnit} readOnly />


                                        </div>
                                    </div>
                                    <h4 className="mt-3">Possession By</h4>





                                    <div className="input-wrapper col-md-6">
                                        <select
                                            value={Possession}
                                            onChange={(e) => setPossession(e.target.value)}
                                        >
                                            <option value="Within 3 Months">Within 3 Months</option>
                                            <option value="Within 6 Months">Within 6 Months</option>

                                            <option value="By 2026">By 2026</option>
                                            <option value="By 2027">By 2027</option>
                                            <option value="By 2028">By 2028</option>
                                            <option value="By 2029">By 2029</option>
                                            <option value="By 2030">By 2030</option>
                                            <option value="By 2031">By 2031</option>
                                        </select>
                                    </div>






                                    <label>City</label>
                                    <input
                                        type="text"
                                        value={cityName}
                                        placeholder="Enter City Name"
                                        onChange={(e) => setCityName(e.target.value)}
                                    />
                                    <label>Locality </label>

                                    <input
                                        type="text"
                                        value={locality}
                                        placeholder="Enter locality"
                                        onChange={(e) => setLocality(e.target.value)}
                                    />

                                    <label>Sub Locality (optional)</label>
                                    <input
                                        type="text"
                                        value={subLocality}
                                        placeholder="Enter Sub Locality "
                                        onChange={(e) => setSubLocality(e.target.value)}
                                    />
                                    <label>Apartment/Society</label>
                                    <input
                                        type="text"
                                        value={apartment}
                                        placeholder="Enter Apartment/Society "
                                        onChange={(e) => setApartment(e.target.value)}
                                    />


                                </div>
                            </div>
                        </>




                        <div className="buttons">

                            <a href="/postproperty" className="continue-btn">Back</a>
                            {/* <a href="/amenities" className="continue-btn">Next</a> */}
                            <button className="continue-btn" onClick={handleSubmit}>Next</button>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PropertyPlot;
