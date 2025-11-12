
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

const CommercialProperty = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate();
    // const { types, loading, error } = useSelector(state => state.auth.propertyType)
    const [step, setStep] = useState(1);
    const [lift, setLift] = useState("")
    const [cityName, setCityName] = useState("");
    // const [subLocality, setSubLocality] = useState("");
    const [locality, setLocality] = useState("");
    const [apartment, setApartment] = useState("");
    // const [bhk, setBhk] = useState("");
    const [openparking, setOpenParking] = useState("")
    const [coveredparking, setCoveredParking] = useState("")
    const [power, setPower] = useState("")

    const [floor, setFloor] = useState("")
    const [tower, setTower] = useState("")
    // const [bhkroom, setBhkroom] = useState("1");
    // const [bathroom, setBathRooms] = useState("1");
    const [balconies, setBalconies] = useState("1");
    const [price, setPrice] = useState("");
    const [area, setArea] = useState("");
    const [AreaUnit, setAreaUnit] = useState("");
    // const [unit, setUnit] = useState("1");
    const [constractionby, setConstractionby] = useState("")
    const [officespace, setOfficeSpace] = useState("");
    const [propertyage, setPropertyAge] = useState("");
    const [pantry, setPantry] = useState("")
    const [facing, setFacing] = useState("")
    const [washroom, setWashroom] = useState("")
    const [possession, setPossession] = useState("");

    const [furnishing, setFurnishing] = useState("");
    const steps = [
        { label: "Basic Details", icon: faHome },
        // { label: "Location  Details", icon: faMapMarkerAlt },
        { label: "Properety Profile", icon: faBed },
        { label: "Amenities Section", icon: faCheckCircle },
        { label: "Photos and Videos", icon: faImage },

    ];

    const Pantry = ["Private", "Shared", "Not Available"]
    const PossessionData = ["Ready To Move", "Under Constraction", "Available", "Sold", "inActive"]
    const PropertyAge = ["0 to 1 years", "1 to 5 years", "5 to 10 years", "10 years +"]
    const OfficeSpace = ["Semi-Fitted", "Fitted Space", "Sell and Core"]
    const Facing = ["Select Facing", "East", "West", "North", "South", "North East", "North West", "South East", "South West"]
    const CoveredParking = ["1 ", "2", "3", "4", "5", "6", "6+"]
    const OpenParking = ["N/A", "1", "2", "3", "4", "5", "6", "6+"]

    const Balconies = ["Connected", "individual", "Room-attached"]
    const Furnishing = ["Furnished", "Semi-Furnished", "Un-Furnished"]

    const handleSubmit = () => {
        const profileData = {
            facing,
            tower,
            floor,
            power,
            lift,
            propertyage,
            constractionby,
            openparking,
            coveredparking,
            officespace,
            washroom,
            pantry,

            bathroom,

            balconies,
            price,
            area,
            AreaUnit,
            cityName,
            locality,

            apartment,
            ownership,
            furnishing,
            possession,
        };
        localStorage.setItem("propertyProfile", JSON.stringify(profileData));
        localStorage.setItem("userData", JSON.stringify({ url: location.pathname }));
        console.log("url savr", location.pathname,)
        navigate("/amenities");

    }
    // Api  start
    useEffect(() => {

        const Profile = JSON.parse(localStorage.getItem("propertyProfile") || "{}");



        setBalconies(Profile.balconies || "1");
        setArea(Profile.area || "");
        setAreaUnit(Profile.AreaUnit || "sq.ft.");
        setPrice(Profile.price || "");
        setPossession(Profile.possession || "");
        setOfficeSpace(Profile.officespace || "");

        setFurnishing(Profile.furnishing || "");
        setCityName(Profile.cityName || "");
        setLocality(Profile.locality || "");

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
                                    <h4 className="mt-3">Possession Status</h4>
                                    <div className="btn-group sub-options">
                                        {
                                            PossessionData.map((value, k) => (
                                                <button key={k} className={possession === value ? "active" : ""} onClick={() => setPossession(value)}>
                                                    {value}
                                                </button>
                                            ))
                                        }
                                    </div>

                                    {possession === "Ready To Move" && (

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

                                    {possession === "Under Constraction" && (
                                        <div className="input-wrapper col-md-6">
                                            <select
                                                value={constractionby}
                                                onChange={(e) => setConstractionby(e.target.value)}
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
                                    <h4 className="mt-3">Office Space Type</h4>
                                    <div className="btn-group sub-options">

                                        {OfficeSpace.map((option) => (
                                            <button
                                                key={option}
                                                className={` ${officespace === option ? "active" : ""}`}
                                                onClick={() => setOfficeSpace(option)}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>


                                    <h4>Pantry</h4>
                                    <div className="btn-group sub-options">
                                        {
                                            Pantry.map((value, k) => (
                                                <button
                                                    key={k}
                                                    className={pantry == value ? "active" : ""}
                                                    onClick={() => setPantry(value)}
                                                >
                                                    {value}
                                                </button>
                                            ))
                                        }
                                    </div>

                                    <h4>Personal Washroom</h4>
                                    <div className="btn-group sub-options">
                                        <button className={washroom == "yes" ? "active" : ""} onClick={() => setWashroom("yes")}>
                                            Yes
                                        </button>
                                        <button className={washroom == "No" ? "active" : ""} onClick={() => setWashroom("No")}>
                                            No
                                        </button>
                                    </div>
                                    <h4 className="">Covered Parking</h4>

                                    <div className="btn-group sub-options">
                                        {CoveredParking.map((option) => (
                                            <button
                                                key={option}
                                                className={` ${coveredparking === option ? "active" : ""}`}
                                                onClick={() => setCoveredParking(option)}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                    <h4 className="">Open/Uncovered Parking</h4>

                                    <div className="btn-group sub-options">
                                        {OpenParking.map((option) => (
                                            <button
                                                key={option}
                                                className={` ${openparking === option ? "active" : ""}`}
                                                onClick={() => setOpenParking(option)}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                    <h4 className="">Balconies</h4>

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

                                    <h4 className="">Power Back-up</h4>
                                    <div className="btn-group sub-options">
                                        <button className={power == "No Back-up" ? "active" : ""} onClick={() => setPower("No Back-up")}>
                                            No Back-up
                                        </button>
                                        <button className={power == "Available" ? "active" : ""} onClick={() => setPower("Available")}>
                                            Available
                                        </button>
                                    </div>
                                    <h4 className="">Lift Availability</h4>
                                    <div className="btn-group sub-options">
                                        <button className={lift == "yes" ? "active" : ""} onClick={() => setLift("yes")}>
                                            Yes
                                        </button>
                                        <button className={lift == "No" ? "active" : ""} onClick={() => setLift("No")}>
                                            No
                                        </button>
                                    </div>

                                    <h4>Floor Number</h4>
                                    <input
                                        type="text"
                                        value={floor}
                                        placeholder="Enter Floor Number"
                                        onChange={(e) => setFloor(e.target.value)}
                                    />
                                    <h4 className="mt-3">Tower/Block</h4>
                                    <input
                                        type="text"
                                        value={tower}
                                        placeholder="Enter Tower/Block"
                                        onChange={(e) => setTower(e.target.value)}
                                    />
                                    <h4 className="mt-3"> Facing</h4>

                                    <select
                                        onChange={(e) => setFacing(e.target.value)}>
                                        {
                                            Facing.map((value, k) => (
                                                <option key={k} value={value}>{value}</option>
                                            ))
                                        }

                                    </select>
                                    <h4 className="mt-3">City</h4>

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

                                    {/* <label>Sub Locality (optional)</label>
                                    <input
                                        type="text"
                                        value={subLocality}
                                        placeholder="Enter Sub Locality "
                                        onChange={(e) => setSubLocality(e.target.value)}
                                    /> */}
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

export default CommercialProperty;
