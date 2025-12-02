// src/components/PostProperty.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
    faHome,
    faMapMarkerAlt,
    faEdit,
    faBed,
    faImage,
    faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import api from "../component/Baseurl"
import Navbar from "../component/Navbar";


// import { fetchPropertyTypes } from "../Redux/slices/PropertySlice"
import axios from "axios";
// import "../assets/css/PostProperty.css";

const UpdateAmenities = () => {
    const navigate = useNavigate();


    const [GetAmenities, setGetAmenities] = useState("")
    const [amenities, setAmenities] = useState([]);
    const { id, property_type } = useParams();
    const [step, setStep] = useState(2);
    const steps = [
        { label: "Basic Details", icon: faHome, link: "post-property", edit: faEdit },
        { label: "Properety Profile", icon: faBed, link: "profile", edit: faEdit },
        { label: "Amenities Section", icon: faCheckCircle, link: "amenities", edit: faEdit },
        { label: "Photos", icon: faImage, link: "submit-form", edit: faEdit },
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
                const response = await api.get(`/api/edit-property/${id}/${property_type}`);
                if (response.data.status === 200) {
                    const list = response.data.data.aminity;
                    console.log("Api Edit Data:", list);
                    setAmenities(list);

                }
            } catch (err) {
                console.log("Edit Error:", err);
            }
        };

        getData();
    }, [id, property_type]);



    // Api  start
    useEffect(() => {
        const getamenities = async () => {

            try {


                const res = await api.get(`/api/get-aminity`,)
                if (res.data.status == 200) {
                    // console.log("response", res.data.data)
                    setGetAmenities(res.data.data)
                }


            } catch (error) {
                console.log(error)
            }

        }
        getamenities()

    }, [])



    const handleUpdatePost = async () => {
        if (property_type == "residential") {
            console.log("run")
            const payload = {
                property_id: id,
                aminities_id: amenities.map((item) => item.id)
            };
            console.log("Update Payload:",);
            try {
                const response = await api.post(`/api/update-amenity-residential`, payload);

                console.log("Update Response:", response.data);
                console.log(response.data.status, "response.data.status")
                if (response.data.status == 200) {
                    console.log("Update Success!");
                }

            } catch (error) {
                console.log("Update Error:", error);
            }
        } else if (property_type === "commercial") {
            const payload = {
                property_id: id,
                aminities_id: amenities.map((item) => item.id)
            };
            console.log("Update Payload:", payload);
            try {
                const response = await api.post(
                    `/api/update-amenity-commercial`,
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

export default UpdateAmenities;
