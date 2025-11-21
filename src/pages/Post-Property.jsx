// src/components/PostProperty.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faMapMarkerAlt,
    faBed,
    faEdit,
    faImage,
    faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../component/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertyTypes } from "../Redux/slices/PropertySlice";
import axios from "axios";

const PostProperty = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id, property_type } = useParams();
    const [step, setStep] = useState(0);
    const { types } = useSelector(state => state.property.propertyType);

    const [getSubTypeOptions, setGetSubTypeOptions] = useState([]);
    const [userType, setUserType] = useState("");
    const [action, setAction] = useState("");
    const [propertyTypeurl, setPropertyTypeurl] = useState("");
    const [subType, setSubType] = useState("");
    const [phone, setPhone] = useState("");

    // console.log("PARAMS:", id, property_type);
    const isEdit = id && property_type ? true : false;
    const steps = [
        { label: "Basic Details", icon: faHome, link: "post-property" },
        { label: "Properety Profile", icon: faBed, link: "profile" },
        { label: "Amenities Section", icon: faCheckCircle, link: "amenities" },
        { label: "Photos", icon: faImage, link: "uploadphotos" },

    ];

    // -------------------------------
    // LOCAL STORAGE LOAD
    // -------------------------------
    useEffect(() => {
        dispatch(fetchPropertyTypes());

        const savedSubtype = JSON.parse(localStorage.getItem("subTypeData") || "[]");
        setGetSubTypeOptions(savedSubtype);

        const basic = JSON.parse(localStorage.getItem("basicDetails") || "{}");

        setPhone(basic.phone || "");
        setUserType(basic.userType || "");
        setAction(basic.action || "");
        setPropertyTypeurl(basic.propertyTypeurl || "");
        setSubType(basic.subType || "");
    }, [dispatch]);

    // -------------------------------
    // EDIT MODE (AUTO LOAD)
    // -------------------------------
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
                    console.log("Edit Data:", list);
                    localStorage.setItem("editData", JSON.stringify(list));
                    setPhone(list.phone || "");
                    setUserType(list.user_type || "");
                    setAction(list.listing_type || "");
                    setPropertyTypeurl(list.property_type || "");
                    setSubType(list.property_sub_type || "");
                    // temporary single subtype until full list loads
                    setGetSubTypeOptions([{ subtype_name: list.property_sub_type }]);

                    // load full subtype list by ID
                    if (list.property_type_id) {
                        handlePropertyType(list.property_type_id, list.property_type);
                    }
                }
            } catch (err) {
                console.log("Edit Error:", err);
            }
        };

        getData();
    }, [id, property_type]);

    // -------------------------------
    // PROPERTY TYPE CLICK
    // -------------------------------
    const handlePropertyType = async (id, name) => {
        setPropertyTypeurl(name);
        setSubType(""); // reset old selection

        try {
            const res = await axios.get(
                `https://api.squarebigha.com/api/subtype-list-by-propertyid/${id}`,
                {
                    headers: {
                        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTk5MjgxNi1kZDUxLTcyMDEtYWY5MC1iNTZiYmNiMGVmNDEiLCJqdGkiOiIzOTUzMTUxNjQyOWM1MzZiZmM1NjQyOTQ2ODNhYTYxNzc0NTgxZjRmZmU4NjE5NzNiZWQ0Mjk1OTdlYzQzZjM5NTk5ZDQ0Yjc4MjgyNWMxMyIsImlhdCI6MTc1NzQxNzk0Ni45Mjk3NzEsIm5iZiI6MTc1NzQxNzk0Ni45Mjk3NzMsImV4cCI6MTc4ODk1Mzk0Ni45MjQ1OTUsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.qL6E9AzHFXC74-XRr0-KhAao4jWisTvyeri3eUXTEFV_Hp6DTylDISB1eeDsyaStrMIfk89EjMVaClE16WbYBKGVpHSnKOaDT56ubfb7DcrHAh50BTLTTIgYyf_Gbop_pnHFkOjbFc03SgKLWHJ8PpQlShiIxtXBA2eQX5bEkYHit0eZYN0bQdjtiu8YFvhubG9OMee-r95Cc8nXRdiC3gkXw0POWjwoCev9BNFHZ8UfdgXZMjxDVo4R_fFdWTeeicFjchFxYuRb7zm1aU8OUFyc4ozNJUC6Wix4hUARjUTmIfZ5mfEq5TDQWD0AM-ERfP8tIkkoTbDqqASU2Mg6LJ4p6nUXUqAuql4sDbmRKVlB04N15xV62LHWJTgT71JfA_bgZHFJGDUQD1c53vCwqEbZUSrMMAOXF6mllBmm1baKdqiocEm9_QldIWT2U07zmYGG4PBU2N3pBmMXftZDFu-xOPBSdB7dsz9KEUeY_gLDoupX9JwgQY8aNT-lwlcb9c0tguDdLWS2cU1LY180kfF0R7QeRq5UpCyb27COT7LNu9R9sl_KMcmLnxtzhNWA-YZeS9h3sKlimso6GO3VgTevyWaVyAs4nCNxP7kAP7FdlG-ckIUEuwsFmvV5pBGu65VB8hG9n3mha-zi7oRlqm4ltkGNLVZR4pX9iBN1Z6g`
                    }
                }
            );

            if (res.data.status) {
                setGetSubTypeOptions(res.data.data);
            }
        } catch (error) {
            console.log("Subtype error:", error);
        }
    };

    // -------------------------------
    // NEXT BUTTON
    // -------------------------------
    const handleNext = () => {

        const basic = {
            phone,
            userType,
            action,
            subType,
            propertyTypeurl
        };

        localStorage.setItem("basicDetails", JSON.stringify(basic));
        localStorage.setItem("subTypeData", JSON.stringify(getSubTypeOptions));

        const plotTypes = [
            "plot / land",
            "land",
            "plot",
            "lands",
            "lands / plots",
            "plots",
            "plots / lands"
        ];

        if (plotTypes.includes(subType.toLowerCase())) {
            navigate("/Property-Plot");
        } else if (propertyTypeurl === "residential") {
            navigate("/Residential-Property");
        } else if (propertyTypeurl === "commercial") {
            navigate("/Commercial-Property");
        } else {
            alert("Please select property type");
        }
    };
    const handleupdate = (link) => {

        console.log("PARAMS:", id, property_type);
        console.log("selected:", link);

        if (link === "post-property") {
            navigate("/postproperty")
        } else if (link === "profile") {
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
            console.log("Subtype processed:", type);
            if (plotTypes.includes(sub)) {
                navigate("/Property-Plot");
            } else if (type === "residential") {
                navigate("/Residential-Property");
            } else if (type === "commercial") {
                navigate("/Commercial-Property");
            } else {
                alert("Please select property type");
            }
        }

    };
    // update api call 
    const handleUpdatePost = async () => {
        console.log("Update Post Called");

        // 🟢 REMOVE id from payload — API doesn’t need it in body
        const payload = {
            id: id,
            phone: phone,
            listing_type: action,
            user_type: userType,
            property_type: propertyTypeurl,
            user_id: "1",
            property_sub_type: subType,
        };
        console.log("Update Payload:", payload);
        try {
            const response = await axios.post(
                `https://api.squarebigha.com/api/update-post-property-residential`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTk5MjgxNi1kZDUxLTcyMDEtYWY5MC1iNTZiYmNiMGVmNDEiLCJqdGkiOiIzOTUzMTUxNjQyOWM1MzZiZmM1NjQyOTQ2ODNhYTYxNzc0NTgxZjRmZmU4NjE5NzNiZWQ0Mjk1OTdlYzQzZjM5NTk5ZDQ0Yjc4MjgyNWMxMyIsImlhdCI6MTc1NzQxNzk0Ni45Mjk3NzEsIm5iZiI6MTc1NzQxNzk0Ni45Mjk3NzMsImV4cCI6MTc4ODk1Mzk0Ni45MjQ1OTUsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.qL6E9AzHFXC74-XRr0-KhAao4jWisTvyeri3eUXTEFV_Hp6DTylDISB1eeDsyaStrMIfk89EjMVaClE16WbYBKGVpHSnKOaDT56ubfb7DcrHAh50BTLTTIgYyf_Gbop_pnHFkOjbFc03SgKLWHJ8PpQlShiIxtXBA2eQX5bEkYHit0eZYN0bQdjtiu8YFvhubG9OMee-r95Cc8nXRdiC3gkXw0POWjwoCev9BNFHZ8UfdgXZMjxDVo4R_fFdWTeeicFjchFxYuRb7zm1aU8OUFyc4ozNJUC6Wix4hUARjUTmIfZ5mfEq5TDQWD0AM-ERfP8tIkkoTbDqqASU2Mg6LJ4p6nUXUqAuql4sDbmRKVlB04N15xV62LHWJTgT71JfA_bgZHFJGDUQD1c53vCwqEbZUSrMMAOXF6mllBmm1baKdqiocEm9_QldIWT2U07zmYGG4PBU2N3pBmMXftZDFu-xOPBSdB7dsz9KEUeY_gLDoupX9JwgQY8aNT-lwlcb9c0tguDdLWS2cU1LY180kfF0R7QeRq5UpCyb27COT7LNu9R9sl_KMcmLnxtzhNWA-YZeS9h3sKlimso6GO3VgTevyWaVyAs4nCNxP7kAP7FdlG-ckIUEuwsFmvV5pBGu65VB8hG9n3mha-zi7oRlqm4ltkGNLVZR4pX9iBN1Z6g`
                    }
                }
            );

            console.log("Update Response:", response.data);

            if (response.data.status === 200) {
                console.log("Update Success!");
            }

        } catch (error) {
            console.log("Update Error:", error);
        }
    };



    // console.log("Subtype:", subType);
    // console.log("Options:", getSubTypeOptions);

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
                            {Array.isArray(types) &&
                                types
                                    .filter((v) => v.status === "1")
                                    .map((v, k) => (
                                        <button
                                            key={k}
                                            className={v.type_name === propertyTypeurl ? "active" : ""}
                                            onClick={() => handlePropertyType(v.id, v.type_name)}
                                        >
                                            {v.type_name}
                                        </button>
                                    ))}
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
                                    </button>) : (
                                    <button className="continue-btn" onClick={handleNext}  >
                                        Next
                                    </button>)
                            }


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostProperty;
