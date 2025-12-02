// src/components/PostProperty.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../component/Baseurl"
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

const Residentialproperty = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [cityName, setCityName] = useState("");
    // const [subLocality, setSubLocality] = useState("");
    const [locality, setLocality] = useState("");
    const [apartment, setApartment] = useState("");
    const [bhk, setBhk] = useState("");
    const [bedroom, setBedroom] = useState("1");
    const [bathroom, setBathRooms] = useState("1");
    const [balconies, setBalconies] = useState("1");
    const [price, setPrice] = useState("");
    const [area, setArea] = useState("");
    const [AreaUnit, setAreaUnit] = useState("");
    const [constructionby, setConstructionby] = useState("")
    const [ownership, setOwnership] = useState("");
    const [propertyage, setPropertyAge] = useState("");

    const [otherroom, setOtherroom] = useState([]);

    const [construction, setConstruction] = useState("");

    const [furnishing, setFurnishing] = useState("");



    const [errors, setErrors] = useState({});

    const steps = [
        { label: "Basic Details", icon: faHome, },
        { label: "Properety Profile", icon: faBed, },
        { label: "Amenities Section", icon: faCheckCircle, },
        { label: "Photos", icon: faImage, },

    ];
    const toggleOption = (option) => {
        if (otherroom.includes(option)) {
            setOtherroom(otherroom.filter((item) => item !== option));
        } else {
            setOtherroom([...otherroom, option]);
        }
    };

    const PropertyAge = ["0 to 1 years", "1 to 5 years", "5 to 10 years", "10 years +"]
    const Ownership = ["Freehold", "Leasehold", "Co-Operative Society", "Power of Attorney"]
    const bhkadd = ["1 RK", "1 BHK", "1.5 BHK", "2 BHK", "2.5 BHK", "3 BHK", "3.5 BHK", "4 BHK"]
    const Otherroom = ["Pooja Room", "Study Room", "Servant Room", "Store Room"]
    const bedroomno = ["1", "2", "3", "4+"]
    const BathRooms = ["1", "2", "3", "4+"]
    const Balconies = ["N/A", "1", "2", "3", "4+"]
    const Furnishing = ["Furnished", "Semi-Furnished", "Un-Furnished"]
    const validateForm = () => {
        const newErrors = {};

        if (!bhk) newErrors.bhk = "Please select Your Apartment ";
        if (!area || area <= 0)
            newErrors.area = "Please enter a valid built up area";
        if (!price || price <= 0)
            newErrors.price = "Please enter property price";
        if (!construction) newErrors.construction = "Please select Availability status";
        if (!ownership) newErrors.ownership = "Please select ownership";
        if (!cityName) newErrors.cityName = "Please enter city";



        if (!locality) newErrors.locality = "Please enter locality";


        if (!furnishing) newErrors.furnishing = "Please select furnishing";



        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;  // ❌ Form invalid → Stop
        }
        const profileData = {
            bhk,
            bedroom,
            bathroom,
            otherroom,
            balconies,
            price,
            constructionby,
            area,
            AreaUnit,
            cityName,
            locality,
            propertyage,
            apartment,
            ownership,
            furnishing,
            construction,
        };
        localStorage.setItem("propertyProfile", JSON.stringify(profileData));
        localStorage.setItem("userData", JSON.stringify({ url: location.pathname }));
        // console.log("url savr", location.pathname,)
        navigate("/amenities");

    }
    // Api  start
    useEffect(() => {
        const Profile = JSON.parse(localStorage.getItem("propertyProfile") || "{}");
        console.log("Profile", Profile);
        setBhk(Profile.bhk || "");
        setBedroom(Profile.bedroom || "1");
        setBathRooms(Profile.bathroom || "1");
        setBalconies(Profile.balconies || "N/A");
        setArea(Profile.area || "");
        setAreaUnit(Profile.AreaUnit || "sq.ft.");
        setPrice(Profile.price || "");
        setOwnership(Profile.ownership || "");
        setOtherroom(Profile.otherroom || "");
        setFurnishing(Profile.furnishing || "");
        setCityName(Profile.cityName || "");
        setLocality(Profile.locality || "");
        setApartment(Profile.apartment || "");
        setPropertyAge(Profile.propertyage || "");
        setConstruction(Profile.construction || "");
        setConstructionby(Profile.constructionby || "");
        // dispatch(fetchPropertyTypes()); 
    }, []);





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
                                    <div onClick={(link) => handleupdate(s.link)}>
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
                            {errors.bhk && <p className="text-danger">{errors.bhk}</p>}
                            <h4 className="mt-3">Add Room Details</h4>
                            <label>No. of BedRooms</label>
                            <div className="btn-group sub-options">
                                {bedroomno.map((option) => (
                                    <button
                                        key={option}
                                        className={` ${bedroom === option ? "active" : ""}`}
                                        onClick={() => setBedroom(option)}
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
                                        {errors.area && <p className="text-danger">{errors.area}</p>}
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
                                        {errors.price && <p className="text-danger">{errors.price}</p>}
                                    </div>
                                    <div className="col-md-6">
                                        <label>Per Unit</label>
                                        <div className="input-wrapper">
                                            <input type="text" value={AreaUnit || "sq.ft."} readOnly />


                                        </div>
                                    </div>
                                    <h4 className="mt-3">Availability Status</h4>
                                    <div className="btn-group sub-options">
                                        <button className={construction === "ready to move" ? "active" : ""} onClick={() => setConstruction("ready to move")}>
                                            Ready to Move
                                        </button>
                                        <button className={construction === "under construction" ? "active" : ""} onClick={() => setConstruction("under construction")}>
                                            Under Construction
                                        </button>
                                        <button className={construction === "available" ? "active" : ""} onClick={() => setConstruction("available")}>
                                            Available
                                        </button>
                                        <button className={construction === "sold" ? "active" : ""} onClick={() => setConstruction("sold")}>
                                            Sold
                                        </button>
                                        <button className={construction === "inActive" ? "active" : ""} onClick={() => setConstruction("inActive")}>
                                            InActive
                                        </button>

                                        <button className={construction === "rented" ? "active" : ""} onClick={() => setConstruction("rented")}>
                                            Rented
                                        </button>


                                    </div>
                                    {errors.construction && <p className="text-danger">{errors.construction}</p>}
                                    {construction === "ready to move" && (

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

                                    {construction === "under construction" && (
                                        <div>
                                            <label>Possession By (Optional)</label>
                                            <div className="input-wrapper col-md-6">
                                                <select
                                                    value={constructionby}
                                                    onChange={(e) => setConstructionby(e.target.value)}
                                                >
                                                    {/* <option value={constructionby}>{constructionby}</option> */}
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
                                    <h4 className="mt-3">Other Room (Optional)</h4>

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
                                    {errors.furnishing && <p className="text-danger">{errors.furnishing}</p>}
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
                            <button className="continue-btn" onClick={handleSubmit}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Residentialproperty;
