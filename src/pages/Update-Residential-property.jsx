
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../component/Baseurl"
import {
    faHome,
    faMapMarkerAlt,
    faEdit,
    faBed,
    faImage,
    faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import axios from "axios";
const UpdateResidentialproperty = () => {
    const { id, property_type } = useParams();

    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [cityName, setCityName] = useState("");
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
    const steps = [
        { label: "Basic Details", icon: faHome, link: "post-property", edit: faEdit },
        { label: "Properety Profile", icon: faBed, link: "profile", edit: faEdit },
        { label: "Amenities Section", icon: faCheckCircle, link: "amenities", edit: faEdit },
        { label: "Photos", icon: faImage, link: "submit-form", edit: faEdit },

    ];


    const userid = JSON.parse(localStorage.getItem("user"))
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
                const response = await api.get(`/api/edit-property/${id}/${property_type}`,);
                if (response.data.status === 200) {
                    const list = response.data.data;
                    console.log("Api Edit Data:", list);
                    setBhk(list.bhk_type || "");
                    setBedroom(list.bedrooms || "1");
                    setBathRooms(list.bathrooms || "1");
                    setBalconies(list.balcony || "1");
                    setArea(list.area || "");
                    setAreaUnit(list.area_unit || "sq.ft.");
                    setPrice(list.price || "");
                    setOwnership(list.ownership || "");
                    setOtherroom(list.other_room || "");
                    setFurnishing(list.furnishing || "");
                    setCityName(list.property_city || "");
                    setLocality(list.locality || "");
                    setApartment(list.apartment_society || "");
                    setPropertyAge(list.property_age || "");
                    setConstruction(list.status || "");
                    setConstructionby(list.possession_by || "");

                }
            } catch (err) {
                console.log("Edit Error:", err);
            }
        };

        getData();
    }, [id, property_type]);

    // update api call 
    const handleUpdatePost = async () => {
        console.log("user id", userid.user_id)

        const payload = {
            user_id: userid.user_id,
            id: id,
            bhk_type: bhk,
            bedrooms: bedroom,
            bathrooms: bathroom,
            balcony: balconies,
            area: area,
            area_unit: AreaUnit,
            price: price,
            ownership: ownership,
            other_room: otherroom,
            furnishing: furnishing,
            property_city: cityName,
            locality: locality,
            apartment_society: apartment,
            property_age: propertyage,
            status: construction,
            possession_by: constructionby,
        };
        console.log("Update Payload:", payload);
        try {
            const response = await api.post(
                `/api/update-property-info-residential`,
                payload,

            );

            console.log("Update Response:", response.data);

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

                                    {construction === "ready to move" && (

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

                                    {construction === "under construction" && (
                                        <div>
                                            <label>Possession By</label>
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

export default UpdateResidentialproperty;
