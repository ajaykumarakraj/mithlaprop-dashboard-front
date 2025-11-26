
// src/components/PostProperty.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
    faHome,
    faEdit,
    faMapMarkerAlt,
    faBed,
    faImage,
    faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import React, { use, useEffect, useState } from "react";

import Navbar from "../component/Navbar";


import axios from "axios";
// import "../assets/css/PostProperty.css";

const UpdateCommercialProperty = () => {
    const { id, property_type, } = useParams()
    // const location = useLocation();
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
    const [possession_by, setPossessionby] = useState("")
    const [officespace, setOfficeSpace] = useState("");
    const [propertyage, setPropertyAge] = useState("");
    const [pantry, setPantry] = useState("")
    const [facing, setFacing] = useState("")
    const [washroom, setWashroom] = useState("")
    const [possessionstatus, setPossessionStatus] = useState("");

    const [furnishing, setFurnishing] = useState("");
    const steps = [
        { label: "Basic Details", icon: faHome, link: "post-property", edit: faEdit },
        { label: "Properety Profile", icon: faBed, link: "profile", edit: faEdit },
        { label: "Amenities Section", icon: faCheckCircle, link: "amenities", edit: faEdit },
        { label: "Photos", icon: faImage, link: "submit-form", edit: faEdit },

    ];

    const Pantry = ["Private", "Shared", "Not Available"]
    const PossessionData = ["ready to move", "under construction", "available", "sold", "inActive"]
    const PropertyAge = ["0 to 1 years", "1 to 5 years", "5 to 10 years", "10 years +"]
    const OfficeSpace = ["Semi-Fitted", "Fitted Space", "Sell and Core"]
    const Facing = ["Select Facing", "East", "West", "North", "South", "North East", "North West", "South East", "South West"]
    const CoveredParking = ["1 ", "2", "3", "4", "5", "6", "6+"]
    const OpenParking = ["N/A", "1", "2", "3", "4", "5", "6", "6+"]

    const Balconies = ["Connected", "individual", "Room-attached"]
    const Furnishing = ["Furnished", "Semi-Furnished", "Un-Furnished"]

    const handleupdate = (link) => {

        if (link === "post-property") {
            return navigate(`/update-postproperty/${id}/${property_type}`);
        } else if (link === "amenities") {
            return navigate(`/update-amenities/${id}/${property_type}`);
        } else if (link === "submit-form") {
            return navigate(`/update-submit-form/${id}/${property_type}`);
        }
        else if (link === "profile") {

            const plotTypes = [
                "plot / land",
                "land",
                "plot",
                "lands",
                "lands / plots",
                "plots",
                "plots / lands"
            ];

            const sub = (subType || "").toLowerCase().trim();
            const type = property_type?.toLowerCase().trim();

            console.log("Subtype processed:", sub);

            // FIX ✔
            if (plotTypes.includes(sub)) {
                return navigate(`/update-property-plot/${id}/${property_type}`);
            }

            if (type === "residential") {
                return navigate(`/update-residential-property/${id}/${property_type}`);
            }

            if (type === "commercial") {
                return navigate(`/update-commercial-property/${id}/${property_type}`);
            }

            alert("Please select property type");
        }
    };



    useEffect(() => {
        if (!id || !property_type) return;

        const getData = async () => {
            try {
                const response = await axios.get(
                    `https://api.squarebigha.com/api/edit-property/${id}/${property_type}`,
                    {
                        headers: {
                            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTk5MjgxNi1kZDUxLTcyMDEtYWY5MC1iNTZiYmNiMGVmNDEiLCJqdGkiOiIzOTUzMTUxNjQyOWM1MzZiZmM1NjQyOTQ2ODNhYTYxNzc0NTgxZjRmZmU4NjE5NzNiZWQ0Mjk1OTdlYzQzZjM5NTk5ZDQ0Yjc4MjgyNWMxMyIsImlhdCI6MTc1NzQxNzk0Ni45Mjk3NzEsIm5iZiI6MTc1NzQxNzk0Ni45Mjk3NzMsImV4cCI6MTc4ODk1Mzk0Ni45MjQ1OTUsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.qL6E9AzHFXC74-XRr0-KhAao4jWisTvyeri3eUXTEFV_Hp6DTylDISB1eeDsyaStrMIfk89EjMVaClE16WbYBKGVpHSnKOaDT56ubfb7DcrHAh50BTLTTIgYyf_Gbop_pnHFkOjbFc03SgKLWHJ8PpQlShiIxtXBA2eQX5bEkYHit0eZYN0bQdjtiu8YFvhubG9OMee-r95Cc8nXRdiC3gkXw0POWjwoCev9BNFHZ8UfdgXZMjxDVo4R_fFdWTeeicFjchFxYuRb7zm1aU8OUFyc4ozNJUC6Wix4hUARjUTmIfZ5mfEq5TDQWD0AM-ERfP8tIkkoTbDqqASU2Mg6LJ4p6nUXUqAuql4sDbmRKVlB04N15xV62LHWJTgT71JfA_bgZHFJGDUQD1c53vCwqEbZUSrMMAOXF6mllBmm1baKdqiocEm9_QldIWT2U07zmYGG4PBU2N3pBmMXftZDFu-xOPBSdB7dsz9KEUeY_gLDoupX9JwgQY8aNT-lwlcb9c0tguDdLWS2cU1LY180kfF0R7QeRq5UpCyb27COT7LNu9R9sl_KMcmLnxtzhNWA-YZeS9h3sKlimso6GO3VgTevyWaVyAs4nCNxP7kAP7FdlG-ckIUEuwsFmvV5pBGu65VB8hG9n3mha-zi7oRlqm4ltkGNLVZR4pX9iBN1Z6g`
                        }
                    }
                );
                if (response.data.status === 200) {
                    const list = response.data.data;
                    console.log("Api Edit Data:", list);
                    setArea(list.area);
                    setAreaUnit(list.area_unit);
                    setPrice(list.price);
                    setPossessionStatus(list.possession_status);
                    setPropertyAge(list.property_age);
                    setPossessionby(list.possession_by);
                    setFurnishing(list.furnishing);
                    setOfficeSpace(list.office_type);
                    setPantry(list.pantry);
                    setWashroom(list.personal_washroom);
                    setCoveredParking(list.covered_parking);
                    setOpenParking(list.open_parking);
                    setBalconies(list.balcony);
                    setPower(list.power_backup);
                    setFloor(list.floor_number);
                    setTower(list.tower_block);
                    setLift(list.lift);
                    setApartment(list.apartment_society);
                    setFacing(list.facing);
                    setCityName(list.property_city);
                    setLocality(list.locality);
                }
            } catch (err) {
                console.log("Edit Error:", err);
            }
        };

        getData();
    }, [id, property_type]);



    // update api call 
    const handleUpdatePost = async () => {
        console.log("Update Post Called");

        // 🟢 REMOVE id from payload — API doesn’t need it in body
        const payload = {
            user_id:"1",
            id: id,
            area: area,
            area_unit: AreaUnit,
            price: price,
            possession_status: possessionstatus,
            property_age: propertyage,
            possession_by: possession_by || null,
            furnishing: furnishing,
            office_type: officespace,
            pantry: pantry,
            personal_washroom: washroom,
            covered_parking: coveredparking,
            open_parking: openparking,
            balcony: balconies,
            power_backup: power,
            floor_number: floor,
            tower_block: tower,
            lift: lift,
            apartment_society: apartment,
            facing: facing,
            property_city: cityName,
            locality: locality,
        };
        console.log("Update Payload:", payload);
        try {
            const response = await axios.post(
                `https://api.squarebigha.com/api/update-property-info-commercial`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTk5MjgxNi1kZDUxLTcyMDEtYWY5MC1iNTZiYmNiMGVmNDEiLCJqdGkiOiIzOTUzMTUxNjQyOWM1MzZiZmM1NjQyOTQ2ODNhYTYxNzc0NTgxZjRmZmU4NjE5NzNiZWQ0Mjk1OTdlYzQzZjM5NTk5ZDQ0Yjc4MjgyNWMxMyIsImlhdCI6MTc1NzQxNzk0Ni45Mjk3NzEsIm5iZiI6MTc1NzQxNzk0Ni45Mjk3NzMsImV4cCI6MTc4ODk1Mzk0Ni45MjQ1OTUsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.qL6E9AzHFXC74-XRr0-KhAao4jWisTvyeri3eUXTEFV_Hp6DTylDISB1eeDsyaStrMIfk89EjMVaClE16WbYBKGVpHSnKOaDT56ubfb7DcrHAh50BTLTTIgYyf_Gbop_pnHFkOjbFc03SgKLWHJ8PpQlShiIxtXBA2eQX5bEkYHit0eZYN0bQdjtiu8YFvhubG9OMee-r95Cc8nXRdiC3gkXw0POWjwoCev9BNFHZ8UfdgXZMjxDVo4R_fFdWTeeicFjchFxYuRb7zm1aU8OUFyc4ozNJUC6Wix4hUARjUTmIfZ5mfEq5TDQWD0AM-ERfP8tIkkoTbDqqASU2Mg6LJ4p6nUXUqAuql4sDbmRKVlB04N15xV62LHWJTgT71JfA_bgZHFJGDUQD1c53vCwqEbZUSrMMAOXF6mllBmm1baKdqiocEm9_QldIWT2U07zmYGG4PBU2N3pBmMXftZDFu-xOPBSdB7dsz9KEUeY_gLDoupX9JwgQY8aNT-lwlcb9c0tguDdLWS2cU1LY180kfF0R7QeRq5UpCyb27COT7LNu9R9sl_KMcmLnxtzhNWA-YZeS9h3sKlimso6GO3VgTevyWaVyAs4nCNxP7kAP7FdlG-ckIUEuwsFmvV5pBGu65VB8hG9n3mha-zi7oRlqm4ltkGNLVZR4pX9iBN1Z6g`
                    }
                }
            );

            console.log("Update Response:", response);

            if (response.data.status === 200) {
                console.log("Update Success!");
            }

        } catch (error) {
            console.log("Update Error:", error);
        }
    };

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
                                <div
                                    key={index}
                                    className="progress-step-vertical"

                                    style={{ cursor: "pointer" }}
                                >
                                    <div onClick={(link) => handleupdate(s.link)}>
                                        <div className="flexadd">
                                            <div className={`circle-icon ${index <= step ? "active" : ""}`}>
                                                <FontAwesomeIcon icon={s.icon} />
                                            </div>
                                            <div className="textadd">
                                                <span className="label">{s.label}</span>
                                            </div>
                                            <div className="circle-icon-edit">
                                                <FontAwesomeIcon icon={s.edit} />
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
                                                <button key={k} className={possessionstatus === value ? "active" : ""} onClick={() => setPossessionStatus(value)}>
                                                    {value}
                                                </button>
                                            ))
                                        }
                                    </div>

                                    {possessionstatus === "ready to move" && (

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

                                    {possessionstatus === "under construction" && (
                                        <div>
                                            <label>Possession By</label>
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

                            <button className="continue-btn" onClick={handleUpdatePost}  >
                                Update
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default UpdateCommercialProperty;
