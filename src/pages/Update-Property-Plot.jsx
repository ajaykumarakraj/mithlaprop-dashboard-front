
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


const UpdatePropertyPlot = () => {
    const { id, property_type } = useParams();

    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [cityName, setCityName] = useState("");

    const [locality, setLocality] = useState("");
    const [apartment, setApartment] = useState("");


    const [plotno, setPlotno] = useState("1");

    const [price, setPrice] = useState("");
    const [area, setArea] = useState("");
    const [AreaUnit, setAreaUnit] = useState("");

    const [Floors, setFloors] = useState("")

    const [ConstructionStatus, setConstructionStatus] = useState("")
    const [possession_by, setPossession] = useState("")
    const [ownership, setOwnership] = useState("");

    const openside = ["1 ", "2", "3", "3+"]

    const Ownership = ["Freehold", "Leasehold", "Co-operative society", "Power of Attorney"]
    const steps = [
        { label: "Basic Details", icon: faHome, link: "post-property", edit: faEdit },
        { label: "Properety Profile", icon: faBed, link: "profile", edit: faEdit },
        { label: "Amenities Section", icon: faCheckCircle, link: "amenities", edit: faEdit },
        { label: "Photos", icon: faImage, link: "submit-form", edit: faEdit },

    ];

    const userid = JSON.parse(localStorage.getItem("user"))
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
    // get api Property Type:
    useEffect(() => {
        if (!id || !property_type) return;

        const getData = async () => {
            try {
                const response = await api.get(
                    `/api/edit-property/${id}/${property_type}`,

                );
                if (response.data.status === 200) {
                    const list = response.data.data;
                    console.log("Api Edit Data:", list);
                    setArea(list.area || "");
                    setAreaUnit(list.area_unit);
                    setFloors(list.floor_allowed)
                    setPlotno(list.plot_no)
                    setConstructionStatus(list.any_construction)
                    setPrice(list.price);
                    setOwnership(list.ownership || "");
                    setPossession(list.possession_by)
                    setCityName(list.property_city || "");
                    setLocality(list.locality || "");
                    setApartment(list.apartment_society || "");

                }
            } catch (err) {
                console.log("Edit Error:", err);
            }
        };

        getData();
    }, [id, property_type]);

    // update api call 
    const handleUpdatePost = async () => {

        if (property_type === "residential") {

            const payload = {
                user_id: userid.user_id,
                id: id,
                area: area,
                area_unit: AreaUnit,
                floor_allowed: Floors,
                plot_no: plotno,
                any_construction: ConstructionStatus,
                price: price,
                ownership: ownership,
                possession_by: possession_by,
                property_city: cityName,
                locality: locality,
                apartment_society: apartment,

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
        } else if (property_type === "commercial") {
            const payload = {
                user_id: userid.user_id,
                id: id,
                area: area,
                area_unit: AreaUnit,
                floor_allowed: Floors,
                plot_no: plotno,
                any_construction: ConstructionStatus,
                price: price,
                ownership: ownership,
                possession_by: possession_by,
                property_city: cityName,
                locality: locality,
                apartment_society: apartment,

            };
            console.log("Update Payload:", payload);
            try {
                const response = await api.post(
                    `/api/update-property-info-commercial`,
                    payload,

                );

                console.log("Update Response:", response.data);

                if (response.data.status === 200) {
                    console.log("Update Success!");
                }

            } catch (error) {
                console.log("Update Error:", error);
            }
        }


    };

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


                                    <h4 className="mt-3">Floors Allowed For Construction</h4>
                                    <div className="col-md-6">

                                        <input
                                            type="number"
                                            placeholder="No. of Floors"
                                            value={Floors}
                                            onChange={(e) => setFloors(e.target.value)}
                                        />
                                    </div>

                                    <h4 className="mt-3">Plot No.</h4>
                                    <div className="btn-group sub-options">
                                        {openside.map((option) => (
                                            <button
                                                key={option}
                                                className={`${plotno === option ? "active" : ""}`}
                                                onClick={() => setPlotno(option)}
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

export default UpdatePropertyPlot;
