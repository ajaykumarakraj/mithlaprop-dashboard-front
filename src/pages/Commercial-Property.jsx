
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


import axios from "axios";

const CommercialProperty = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [lift, setLift] = useState("")
    const [cityName, setCityName] = useState("");
    const [locality, setLocality] = useState("");
    const [apartment, setApartment] = useState("");
    const [openparking, setOpenParking] = useState("")
    const [coveredparking, setCoveredParking] = useState("")
    const [power, setPower] = useState("")

    const [floor, setFloor] = useState("")
    const [tower, setTower] = useState("")
    const [balconies_com, setBalconiescom] = useState("");
    const [price, setPrice] = useState("");
    const [area, setArea] = useState("");
    const [AreaUnit, setAreaUnit] = useState("");
    const [possession_by, setPossessionby] = useState("")
    const [officespace, setOfficeSpace] = useState("");
    const [propertyage, setPropertyAge] = useState("");
    const [pantry, setPantry] = useState("")
    const [facing, setFacing] = useState("")
    const [washroom, setWashroom] = useState("")
    const [possessionstatus, setPossessionStatus] = useState("");

    const [furnishing, setFurnishing] = useState("");


    const [errors, setErrors] = useState({});
    const steps = [
        { label: "Basic Details", icon: faHome },
        { label: "Properety Profile", icon: faBed },
        { label: "Amenities Section", icon: faCheckCircle },
        { label: "Photos and Videos", icon: faImage },

    ];

    const Pantry = ["Private", "Shared", "Not Available"]
    const PossessionData = ["ready to move", "under construction", "available", "sold", "inActive"]
    const PropertyAge = ["0 to 1 years", "1 to 5 years", "5 to 10 years", "10 years +"]
    const OfficeSpace = ["Semi-Fitted", "Fitted Space", "Sell and Core"]
    const Facing = ["Select Facing", "East", "West", "North", "South", "North East", "North West", "South East", "South West"]
    const CoveredParking = ["1 ", "2", "3", "4", "5", "6", "6+"]
    const OpenParking = ["N/A", "1", "2", "3", "4", "5", "6", "6+"]

    const Balconies_Com = ["connected", "individual", "room-attached", "N/A"]
    const Furnishing = ["Furnished", "Semi-Furnished", "Un-Furnished"]

    const validateForm = () => {
        const newErrors = {};
        console.log(balconies_com, "balconies")
        // Apartment
        if (!apartment) {
            newErrors.apartment = "Please select your Apartment";
        }

        // Area
        if (!area || area <= 0) {
            newErrors.area = "Please enter a valid built up area";
        }

        // Price
        if (!price || price <= 0) {
            newErrors.price = "Please enter property price";
        }

        // Availability Status
        if (!possessionstatus) {
            newErrors.possessionstatus = "Please select Possession  status";
        }


        // Pantry
        if (!pantry) {
            newErrors.pantry = "Please select Pantry ";
        }
        //  washroom Status
        if (!washroom) {
            newErrors.washroom = "Please select office Space ";
        }

        //  coveredparking Status
        if (!coveredparking) {
            newErrors.coveredparking = "Please select Covered Parking ";
        }
        //  openparking Status
        if (!openparking) {
            newErrors.openparking = "Please select Open Parking ";
        }
        //  power Status
        if (!power) {
            newErrors.power = "Please select Power ";
        }

        //  lift Status
        if (!lift) {
            newErrors.lift = "Please select Lift ";
        }
        //  floor Status
        if (!floor) {
            newErrors.floor = "Enter Floor Number ";
        }
     
        if (!balconies_com) {
            newErrors.balconies_com = "Please Select Balconies ";
        }

        // City
        if (!cityName) {
            newErrors.cityName = "Please Enter city";
        }

        // Locality
        if (!locality) {
            newErrors.locality = "Please Enter Locality";
        }

        // Furnishing
        if (!furnishing) {
            newErrors.furnishing = "Please Select Furnishing";
        }

        console.log("Validation Errors:", newErrors);



        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = () => {
        if (!validateForm()) {
            return;  // ❌ Form invalid → Stop
        }
        const profileData = {
            facing,
            tower,
            floor,
            power,
            lift,
            propertyage,
            possession_by,
            openparking,
            coveredparking,
            officespace,
            washroom,
            pantry,
            balconies_com,
            price,
            area,
            AreaUnit,
            cityName,
            locality,
            apartment,
            furnishing,
            possessionstatus,
        };
        localStorage.setItem("propertyProfile", JSON.stringify(profileData));
        localStorage.setItem("userData", JSON.stringify({ url: location.pathname }));
        console.log("url savr", location.pathname,)
        navigate("/amenities");

    }
    // Api  start
    useEffect(() => {

        const Profile = JSON.parse(localStorage.getItem("propertyProfile") || "{}");
        setBalconiescom(Profile.balconies_com || "");
        setPossessionby(Profile.possession_by || "")
        setPantry(Profile.pantry || "")
        setWashroom(Profile.washroom || "")
        setPropertyAge(Profile.propertyage || "")
        setOpenParking(Profile.openparking || "")
        setCoveredParking(Profile.coveredparking || "")
        setFloor(Profile.floor || "")
        setLift(Profile.lift || "")
        setFacing(Profile.facing || "")
        setTower(Profile.tower || "")
        setPower(Profile.power || "")
        setArea(Profile.area || "");
        setAreaUnit(Profile.AreaUnit || "sq.ft.");
        setPrice(Profile.price || "");
        setPossessionStatus(Profile.possessionstatus || "");
        setOfficeSpace(Profile.officespace || "");
        setFurnishing(Profile.furnishing || "");
        setCityName(Profile.cityName || "");
        setLocality(Profile.locality || "");
        setApartment(Profile.apartment || "");

    }, []);
    // console.log(tower)
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
                                    {errors.area && (
                                        <p style={{ color: "red", marginTop: "4px" }}>
                                            {errors.area}
                                        </p>
                                    )}
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
                                    {errors.price && (
                                        <p style={{ color: "red", marginTop: "4px" }}>
                                            {errors.price}
                                        </p>
                                    )}
                                    <h4 className="mt-3">Possession Status</h4>
                                    <div className="btn-group sub-options">
                                        {
                                            PossessionData.map((value, k) => (
                                                <button key={k} className={possessionstatus === value ? "active" : ""} onClick={() => setPossessionStatus(value)}>
                                                    {value}
                                                </button>
                                            ))
                                        }
                                    </div>
                                    {errors.possessionstatus && (
                                        <p style={{ color: "red", marginTop: "4px" }}>
                                            {errors.possessionstatus}
                                        </p>
                                    )}
                                    {possessionstatus === "Ready To Move" && (

                                        <div>
                                            <label>Age Of Property (Optional)</label>
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

                                    {possessionstatus === "Under Construction" && (
                                        <div>
                                            <label>Possession By (Optional)</label>
                                            <div className="input-wrapper col-md-6">
                                                <select
                                                    value={possession_by}
                                                    onChange={(e) => setPossessionby(e.target.value)}
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
                                    {errors.furnishing && (
                                        <p style={{ color: "red", marginTop: "4px" }}>
                                            {errors.furnishing}
                                        </p>
                                    )}
                                    <h4 className="mt-3">Office Space Type  (Optional)</h4>
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
                                    {errors.pantry && (
                                        <p style={{ color: "red", marginTop: "4px" }}>
                                            {errors.pantry}
                                        </p>
                                    )}
                                    <h4>Personal Washroom</h4>
                                    <div className="btn-group sub-options">
                                        <button className={washroom == "yes" ? "active" : ""} onClick={() => setWashroom("yes")}>
                                            Yes
                                        </button>
                                        <button className={washroom == "No" ? "active" : ""} onClick={() => setWashroom("No")}>
                                            No
                                        </button>
                                    </div>
                                    {errors.washroom && (
                                        <p style={{ color: "red", marginTop: "4px" }}>
                                            {errors.washroom}
                                        </p>
                                    )}
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

                                    {errors.coveredparking && (
                                        <p style={{ color: "red", marginTop: "4px" }}>
                                            {errors.coveredparking}
                                        </p>
                                    )}
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
                                    {errors.openparking && (
                                        <p style={{ color: "red", marginTop: "4px" }}>
                                            {errors.openparking}
                                        </p>
                                    )}
                                    <h4 className="">Balconies</h4>

                                    <div className="btn-group sub-options">
                                        {Balconies_Com.map((option) => (
                                            <button
                                                key={option}
                                                className={` ${balconies_com === option ? "active" : ""}`}
                                                onClick={() => setBalconiescom(option)}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.balconies_com && (
                                        <p style={{ color: "red", marginTop: "4px" }}>
                                            {errors.balconies_com}
                                        </p>
                                    )}
                                    <h4 className="">Power Back-up</h4>
                                    <div className="btn-group sub-options">
                                        <button className={power == "No Back-up" ? "active" : ""} onClick={() => setPower("No Back-up")}>
                                            No Back-up
                                        </button>
                                        <button className={power == "Available" ? "active" : ""} onClick={() => setPower("Available")}>
                                            Available
                                        </button>
                                    </div>
                                    {errors.power && (
                                        <p style={{ color: "red", marginTop: "4px" }}>
                                            {errors.power}
                                        </p>
                                    )}
                                    <h4 className="">Lift Availability</h4>
                                    <div className="btn-group sub-options">
                                        <button className={lift == "yes" ? "active" : ""} onClick={() => setLift("yes")}>
                                            Yes
                                        </button>
                                        <button className={lift == "No" ? "active" : ""} onClick={() => setLift("No")}>
                                            No
                                        </button>
                                    </div>
                                    {errors.lift && (
                                        <p style={{ color: "red", marginTop: "4px" }}>
                                            {errors.lift}
                                        </p>
                                    )}
                                    <h4>Floor Number</h4>
                                    <input
                                        type="text"
                                        value={floor}
                                        placeholder="Enter Floor Number"
                                        onChange={(e) => setFloor(e.target.value)}
                                    />
                                    {errors.floor && (
                                        <p style={{ color: "red", marginTop: "4px" }}>
                                            {errors.floor}
                                        </p>
                                    )}
                                    <h4 className="mt-3">Tower/Block  (Optional)</h4>
                                    <input
                                        type="text"
                                        value={tower}
                                        placeholder="Enter Tower/Block"
                                        onChange={(e) => setTower(e.target.value)}
                                    />

                                    {/* {errors.tower && (
                                        <p style={{ color: "red", marginTop: "4px" }}>
                                            {errors.tower}
                                        </p>
                                    )} */}
                                    <h4 className="mt-3"> Facing  (Optional)</h4>

                                    <select
                                        value={facing}
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
                                    {errors.cityName && (
                                        <p style={{ color: "red", marginTop: "4px" }}>
                                            {errors.cityName}
                                        </p>
                                    )}
                                    <label>Locality </label>

                                    <input
                                        type="text"
                                        value={locality}
                                        placeholder="Enter locality"
                                        onChange={(e) => setLocality(e.target.value)}
                                    />
                                    {errors.locality && (
                                        <p style={{ color: "red", marginTop: "4px" }}>
                                            {errors.locality}
                                        </p>
                                    )}
                                    <label>Apartment/Society (Optional)</label>
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
