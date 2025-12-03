


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


const PropertyPlot = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [cityName, setCityName] = useState("");

    const [locality, setLocality] = useState("");
    const [apartment, setApartment] = useState("");

    const [plotno, setPlotno] = useState("");

    const [price, setPrice] = useState("");
    const [area, setArea] = useState("");
    const [AreaUnit, setAreaUnit] = useState("");

    const [Floors, setFloors] = useState("")

    const [ConstructionStatus, setConstructionStatus] = useState("")
    const [possession_by, setPossession] = useState("")
    const [ownership, setOwnership] = useState("");
    const [construction, setConstruction] = useState("");

    const [furnishing, setFurnishing] = useState("");


    const [errors, setErrors] = useState({});
    const steps = [
        { label: "Basic Details", icon: faHome },

        { label: "Properety Profile", icon: faBed },
        { label: "Amenities Section", icon: faCheckCircle },
        { label: "Photos and Videos", icon: faImage },

    ];



    const Ownership = ["Freehold", "Leasehold", "Co-operative society", "Power of Attorney"]


    const validateForm = () => {
        const newErrors = {};
        if (!area || area <= 0)
            newErrors.area = "Please enter a valid built up area";
        if (!price || price <= 0)
            newErrors.price = "Please enter property price";
        if (!ConstructionStatus) newErrors.ConstructionStatus = "Please select Construction status";
        if (!Floors) newErrors.Floors = "Please select Floors";
        if (!ownership) newErrors.ownership = "Please select ownership";
        if (!cityName) newErrors.cityName = "Please enter city";
        if (!locality) newErrors.locality = "Please enter locality";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;  // ❌ Form invalid → Stop
        }
        const profileData = {
            possession_by,
            ConstructionStatus,
            plotno,
            Floors,
            price,
            area,
            AreaUnit,
            cityName,
            locality,
            apartment,
            ownership,
            furnishing,
            construction,
        };
        localStorage.setItem("propertyProfile", JSON.stringify(profileData));
        localStorage.setItem("userData", JSON.stringify({ url: location.pathname }));
        navigate("/amenities");
    }
    // Api  start
    useEffect(() => {
        const Profile = JSON.parse(localStorage.getItem("propertyProfile") || "{}");

        setFloors(Profile.Floors || "")
        setPlotno(Profile.plotno || "")
        setPossession(Profile.possession_by || "Within 3 Months")
        setConstructionStatus(Profile.ConstructionStatus || "")
        setArea(Profile.area || "");
        setAreaUnit(Profile.AreaUnit || "sq.ft.");
        setPrice(Profile.price || "");
        setConstruction(Profile.construction || "");
        setOwnership(Profile.ownership || "");

        setFurnishing(Profile.furnishing || "");
        setCityName(Profile.cityName || "");
        setLocality(Profile.locality || "");

        setApartment(Profile.apartment || "");

    }, []);
    console.log(plotno)
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

                                    {errors.area && <p className="text-danger">{errors.area}</p>}


                                    <h4 className="mt-3">Floors Allowed For Construction</h4>
                                    <div className="col-md-6">

                                        <input
                                            type="number"
                                            placeholder="No. of Floors"
                                            value={Floors}
                                            onChange={(e) => setFloors(e.target.value)}
                                        />
                                    </div>
                                    {errors.Floors && <p className="text-danger">{errors.Floors}</p>}
                                    <h4 className="mt-3">Plot No.  (Optional)</h4>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            placeholder="Plot No. "
                                            value={plotno}
                                            onChange={(e) => setPlotno(e.target.value)}
                                        />

                                    </div>


                                    <h4 className="mt-3">Any Construction done on this Property</h4>
                                    <div className="btn-group sub-options">
                                        <button className={ConstructionStatus === "Yes" ? "active" : ""} onClick={() => setConstructionStatus("Yes")}> Yes </button>
                                        <button className={ConstructionStatus === "NO" ? "active" : ""} onClick={() => setConstructionStatus("NO")}> NO </button>

                                    </div>
                                    {errors.ConstructionStatus && <p className="text-danger">{errors.ConstructionStatus}</p>}
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
                                    {errors.ownership && <p className="text-danger">{errors.ownership}</p>}
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
                                    {errors.price && <p className="text-danger">{errors.price}</p>}
                                    <h4 className="mt-3">Possession By  (Optional)</h4>

                                    <div className="input-wrapper col-md-6">
                                        <select
                                            value={possession_by}
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
                                    {errors.cityName && <p className="text-danger">{errors.cityName}</p>}
                                    <label>Locality </label>

                                    <input
                                        type="text"
                                        value={locality}
                                        placeholder="Enter locality"
                                        onChange={(e) => setLocality(e.target.value)}
                                    />

                                    {errors.locality && <p className="text-danger">{errors.locality}</p>}
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

export default PropertyPlot;
