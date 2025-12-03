// src/components/PostProperty.js
import React, { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";


import {
    faHome,
    faMapMarkerAlt,
    faBed,
    faEdit,
    faImage,
    faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../component/Navbar";
import api from "../component/Baseurl"
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

const UpdatePostProperty = () => {
    const navigate = useNavigate();

    const { id, property_type } = useParams();
    const [step, setStep] = useState(0);

    const [getSubTypeOptions, setGetSubTypeOptions] = useState([]);
    const [userType, setUserType] = useState("");
    const [action, setAction] = useState("");

    const [propertyTypeurl, setPropertyTypeurl] = useState("");
    const [subType, setSubType] = useState("");
    const [phone, setPhone] = useState("");

    // Error 
    const [Suberror, setSuberror] = useState("")
    const [Error, setError] = useState("")
    const [Proeertyerror, setProeertyerror] = useState("")
    const isEdit = id && property_type ? true : false;
    const steps = [
        { label: "Basic Details", icon: faHome, link: "post-property", edit: faEdit },
        { label: "Properety Profile", icon: faBed, link: "profile", edit: faEdit },
        { label: "Amenities Section", icon: faCheckCircle, link: "amenities", edit: faEdit },
        { label: "Photos", icon: faImage, link: "submit-form", edit: faEdit },

    ];
    const userid = JSON.parse(localStorage.getItem("user"))
    // -------------------------------
    // LOCAL STORAGE LOAD
    // -------------------------------
    // useEffect(() => {
    //     const savedSubtype = JSON.parse(localStorage.getItem("subTypeData") || "[]");
    //     setGetSubTypeOptions(savedSubtype);
    //     const basic = JSON.parse(localStorage.getItem("basicDetails") || "{}");
    //     setPhone(basic.phone || "");
    //     setUserType(basic.userType || "");
    //     setAction(basic.action || "");
    //     setPropertyTypeurl(basic.propertyTypeurl || "");
    //     setSubType(basic.subType || "");
    // }, []);

    // -------------------------------
    // load Property Types
    // -------------------------------
    // useEffect(() => {
    //     const getPropertyTypes = async () => {
    //         try {
    //             const res = await axios.get("https://api.squarebigha.com/api/get-property-type", {
    //                 headers: {
    //                     Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTk5MjgxNi1kZDUxLTcyMDEtYWY5MC1iNTZiYmNiMGVmNDEiLCJqdGkiOiIzOTUzMTUxNjQyOWM1MzZiZmM1NjQyOTQ2ODNhYTYxNzc0NTgxZjRmZmU4NjE5NzNiZWQ0Mjk1OTdlYzQzZjM5NTk5ZDQ0Yjc4MjgyNWMxMyIsImlhdCI6MTc1NzQxNzk0Ni45Mjk3NzEsIm5iZiI6MTc1NzQxNzk0Ni45Mjk3NzMsImV4cCI6MTc4ODk1Mzk0Ni45MjQ1OTUsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.qL6E9AzHFXC74-XRr0-KhAao4jWisTvyeri3eUXTEFV_Hp6DTylDISB1eeDsyaStrMIfk89EjMVaClE16WbYBKGVpHSnKOaDT56ubfb7DcrHAh50BTLTTIgYyf_Gbop_pnHFkOjbFc03SgKLWHJ8PpQlShiIxtXBA2eQX5bEkYHit0eZYN0bQdjtiu8YFvhubG9OMee-r95Cc8nXRdiC3gkXw0POWjwoCev9BNFHZ8UfdgXZMjxDVo4R_fFdWTeeicFjchFxYuRb7zm1aU8OUFyc4ozNJUC6Wix4hUARjUTmIfZ5mfEq5TDQWD0AM-ERfP8tIkkoTbDqqASU2Mg6LJ4p6nUXUqAuql4sDbmRKVlB04N15xV62LHWJTgT71JfA_bgZHFJGDUQD1c53vCwqEbZUSrMMAOXF6mllBmm1baKdqiocEm9_QldIWT2U07zmYGG4PBU2N3pBmMXftZDFu-xOPBSdB7dsz9KEUeY_gLDoupX9JwgQY8aNT-lwlcb9c0tguDdLWS2cU1LY180kfF0R7QeRq5UpCyb27COT7LNu9R9sl_KMcmLnxtzhNWA-YZeS9h3sKlimso6GO3VgTevyWaVyAs4nCNxP7kAP7FdlG-ckIUEuwsFmvV5pBGu65VB8hG9n3mha-zi7oRlqm4ltkGNLVZR4pX9iBN1Z6g`
    //                 }
    //             })
    //             // console.log("Property Types:", res.data.data);
    //             if (res.data.status === 200) {
    //                 setPropertylist(res.data.data);
    //             }
    //         } catch (error) {
    //             console.log("Property Type error:", error);
    //         }
    //     }
    //     getPropertyTypes()
    // }, [subType]);
    // -------------------------------
    // EDIT MODE (AUTO LOAD)
    // -------------------------------
    useEffect(() => {
        if (!id || !property_type) return;

        const getData = async () => {
            try {
                const response = await api.get(
                    `/api/edit-property/${id}/${property_type}`,

                );
                if (response.data.status === 200) {
                    const list = response.data.data;

                    console.log("Response Data:", response.data.sub_type);
                    console.log("Edit Data:", list);

                    setGetSubTypeOptions(response.data.sub_type || "");
                    // localStorage.setItem("editData", JSON.stringify(list));
                    setPhone(list.phone || "");
                    setUserType(list.user_type || "");
                    setAction(list.listing_type || "");
                    setPropertyTypeurl(list.property_type || "");
                    setSubType(list.property_sub_type || "");

                }
            } catch (err) {
                console.log("Edit Error:", err);
            }
        };

        getData();
    }, [id, property_type]);


    // -------------------------------
    // Update BUTTON
    // -------------------------------

    const handleupdate = (link) => {

        console.log("PARAMS:", id, property_type);
        console.log("selected:", subType);

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

            const sub = subType?.toLowerCase().trim();
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

    // update api call 
    const handleUpdatePost = async () => {

        if (!phone || phone.length !== 10) {
            setError("Phone number must be 10 digits");
            return;
        }



        if (property_type === "residential") {
            const payload = {
                id: id,
                user_id: userid.user_id,
                phone: phone,
                listing_type: action,
                user_type: userType,
                property_type: propertyTypeurl,

                property_sub_type: subType,
            };
            console.log("Update Payload:", payload);
            try {
                const response = await api.post(
                    `https://api.squarebigha.com/api/update-basic-info-residential`, payload,);

                console.log("Update Response:", response.data);

                if (response.data.status === 200) {
                    toast.success("Property Updated Successfully!", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }

            } catch (error) {
                console.log("Update Error:", error);
            }
        } else if (property_type === "commercial") {
            const payload = {
                id: id,
                user_id: userid.user_id,
                phone: phone,
                listing_type: action,
                user_type: userType,
                property_type: propertyTypeurl,

                property_sub_type: subType,
            };
            console.log("Update Payload:", payload);
            try {
                const response = await api.post(
                    `/api/update-basic-info-commercial`,
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
                <Navbar />

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
                        <h2>Add Property Details</h2>

                        {/* Phone */}
                        <label>Your contact number:</label>
                        <input
                            type="tel"
                            maxLength={10}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <label className="text-danger">{Error}</label><br />
                        {/* User Type */}
                        <label>You are:</label>
                        <div className="btn-group user-type">
                            <button
                                className={userType === "owner" ? "active" : ""}
                                onClick={() => setUserType("owner")}
                            >
                                Owner
                            </button>
                            <button
                                className={userType === "agent" ? "active" : ""}
                                onClick={() => setUserType("agent")}
                            >
                                Agent
                            </button>
                        </div>

                        {/* Action */}
                        <label>You are here to:</label>
                        <div className="btn-group sub-options">
                            <button className={action === "sale" ? "active" : ""} onClick={() => setAction("sale")}>Sale</button>
                            <button className={action === "rent" ? "active" : ""} onClick={() => setAction("rent")}>Rent</button>
                            <button className={action === "lease" ? "active" : ""} onClick={() => setAction("lease")}>Lease</button>
                        </div>

                        {/* Property Type */}
                        <label>Property Type:</label>
                        <div className="btn-group property-type">

                            <button

                                className="active"
                                onClick={() => setPropertyTypeurl(propertyTypeurl)}
                            >
                                {propertyTypeurl}
                            </button>

                        </div>

                        {/* Subtype */}
                        {Array.isArray(getSubTypeOptions) && getSubTypeOptions.length > 0 && (
                            <>
                                <label>Sub Property Type:</label>
                                <div className="btn-group sub-options">
                                    {getSubTypeOptions.map((v, k) => (
                                        <button
                                            key={k}
                                            className={v.subtype_name === subType ? "active" : ""}
                                            onClick={() => setSubType(v.subtype_name)}
                                        >
                                            {v.subtype_name}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}

                        <div className="buttons">
                            {
                                isEdit ? (
                                    <button className="continue-btn" onClick={handleUpdatePost}  >
                                        Update
                                    </button>) : ""
                            }


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePostProperty;
