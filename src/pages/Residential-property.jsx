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

const Residentialproperty = () => {
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
    const [bhkroom, setBhkroom] = useState("1");
    const [bathroom, setBathRooms] = useState("1");
    const [balconies, setBalconies] = useState("1");
    const [price, setPrice] = useState("");
    const [area, setArea] = useState("");
    const [AreaUnit, setAreaUnit] = useState("sq.ft.");
    const [unit, setUnit] = useState("1");

    const [ownership, setOwnership] = useState("");
    const [propertyage, setPropertyAge] = useState("");

    const [otherroom, setOtherroom] = useState([]);

    const [constraction, setConstraction] = useState("");

    const [furnishing, setFurnishing] = useState("");
    const steps = [
        { label: "Basic Details", icon: faHome },
        // { label: "Location  Details", icon: faMapMarkerAlt },
        { label: "Properety Profile", icon: faBed },
        { label: "Amenities Section", icon: faCheckCircle },
        { label: "Photos and Videos", icon: faImage },

    ];
    const toggleOption = (option) => {
        if (otherroom.includes(option)) {
            setOtherroom(otherroom.filter((item) => item !== option));
        } else {
            setOtherroom([...otherroom, option]);
        }
    };

    const PropertyAge = ["0 to 1 years", "1 to 5 years", "5 to 10 years", "10 years +"]
    const Ownership = ["Freehold", "Leasehold", "Co-operative society", "Power of Attorney"]
    const bhkadd = ["1 RK", "1 BHK", "1.5 BHK", "2 BHK", "2.5 BHK", "3 BHK", "3.5 BHK", "4 BHK"]
    const Otherroom = ["Pooja Room", "Study Room", "Servant Room", "Store Room"]
    const bhkroomno = ["1 ", "2", "3", "4+"]
    const BathRooms = ["1 ", "2", "3", "4+"]
    const Balconies = ["1 ", "2", "3", "4+"]
    const Furnishing = ["Furnished", "Semi-Furnished", "Un-Furnished"]

    const handleSubmit = () => {
        const profileData = {
            bhk,
            bhkroom,
            bathroom,
            otherroom,
            balconies,
            price,
            area,
            AreaUnit,
            cityName,
            locality,
            subLocality,
            apartment,
            ownership,
            furnishing,
            constraction,
        };
        localStorage.setItem("propertyProfile", JSON.stringify(profileData));
        localStorage.setItem("userData ", JSON.stringify({ url: location.pathname }));
        navigate("/amenities");
    }
    // Api  start
    useEffect(() => {
        const Profile = JSON.parse(localStorage.getItem("propertyProfile") || "{}");
        setBhk(Profile.bhk || "");
        setBhkroom(Profile.bhkroom || "1");
        setBathRooms(Profile.bathroom || "1");
        setBalconies(Profile.balconies || "1");
        setArea(Profile.area || "");
        setAreaUnit(Profile.AreaUnit || "");
        setPrice(Profile.price || "");
        setConstraction(Profile.constraction || "");
        setOwnership(Profile.ownership || "");
        setOtherroom(Array.isArray(Profile.otherroom) ? Profile.otherroom : []);
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
                            <h4>Your Apartment is a</h4>
                            <div className="btn-group sub-options">
                                {bhkadd.map((option) => (
                                    <button
                                        key={option}
                                        className={` ${bhk === option ? "active" : ""}`}
                                        onClick={() => setBhk(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                           <h4 className="mt-3">Add Room Details</h4>
                            <label>No. of BedRooms</label>
                            <div className="btn-group sub-options">
                                {bhkroomno.map((option) => (
                                    <button
                                        key={option}
                                        className={` ${bhkroom === option ? "active" : ""}`}
                                        onClick={() => setBhkroom(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            <label>No. of BathRooms</label>
                            <div className="btn-group sub-options">
                                {BathRooms.map((option) => (
                                    <button
                                        key={option}
                                        className={`${bathroom === option ? "active" : ""}`}
                                        onClick={() => setBathRooms(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            <label>Balconies</label>
                            <div className="btn-group sub-options">
                                {Balconies.map((option) => (
                                    <button
                                        key={option}
                                        className={` ${balconies === option ? "active" : ""}`}
                                        onClick={() => setBalconies(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
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
                                    <h4 className="mt-3">Availability Status</h4>
                                    <div className="btn-group sub-options">
                                        <button className={constraction === "Ready To Move" ? "active" : ""} onClick={() => setConstraction("Ready To Move")}>
                                            Ready To Move
                                        </button>
                                        <button className={constraction === "Under Constraction" ? "active" : ""} onClick={() => setConstraction("Under Constraction")}>
                                            Under Constraction
                                        </button>
                                        <button className={constraction === "Available" ? "active" : ""} onClick={() => setConstraction("Available")}>
                                            Available
                                        </button>
                                        <button className={constraction === "Sold" ? "active" : ""} onClick={() => setConstraction("Sold")}>
                                            Sold
                                        </button>
                                        <button className={constraction === "inActive" ? "active" : ""} onClick={() => setConstraction("inActive")}>
                                            inActive
                                        </button>

                                        <button className={constraction === "Rented" ? "active" : ""} onClick={() => setConstraction("Rented")}>
                                            Rented
                                        </button>


                                    </div>

                                    {constraction === "Ready" && (

                                        <div>
                                            <label>Age Of Property</label>
                                            <div className="btn-group sub-options">

                                                {PropertyAge.map((option) => (
                                                    <button
                                                        key={option}
                                                        className={` ${propertyage === option ? "active" : ""}`}
                                                        onClick={() => setPropertyAge(option)}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )

                                    }

                                    {constraction === "Constraction" && (
                                        <div className="input-wrapper col-md-6">
                                            <select
                                                value={unit}
                                                onChange={(e) => setUnit(e.target.value)}
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
                                    )

                                    }

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

                                    <h4 className="mt-3">Other Room</h4>

                                    <div className="btn-group sub-options">
                                        {Otherroom.map((option) => (
                                            <button
                                                key={option}
                                                className={otherroom.includes(option) ? "active" : ""}
                                                onClick={() => toggleOption(option)}
                                                type="button"
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>

                                    <h4 className="mt-3">Furnishing</h4>
                                    <div className="btn-group sub-options">

                                        {Furnishing.map((option) => (
                                            <button
                                                key={option}
                                                className={` ${furnishing === option ? "active" : ""}`}
                                                onClick={() => setFurnishing(option)}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                    <label>City</label>
                                    <input
                                        type="text"
                                        value={cityName}
                                        placeholder="Enter City Name"
                                        onChange={(e) => setCityName(e.target.value)}
                                    />
                                    <label>Locality </label>
                                    {!locality && <span className="error-text"> (Locality is required.)</span>}
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

export default Residentialproperty;
