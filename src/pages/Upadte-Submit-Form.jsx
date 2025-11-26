// src/components/PostProperty.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useParams } from "react-router-dom";
import {
    faHome,
    faMapMarkerAlt,
    faBed,
    faEdit,
    faImage,
    faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../component/Navbar";



import axios from "axios";
// import "../assets/css/PostProperty.css";

const UpdateSubmitForm = () => {
    const navigate = useNavigate();

    const { id, property_type } = useParams();

    const [step, setStep] = useState(3);
    const [apiMedia, setApiMedia] = useState([]);


    const [previews, setPreviews] = useState([]);
    const [files, setFiles] = useState([]);


    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        const validFiles = selectedFiles.filter(file => file.type.startsWith("image/"));

        setFiles(prev => [...prev, ...validFiles]);

        const previewURLs = validFiles.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...previewURLs]);
    };


    const handleRemoveImage = (index) => {
        // 1. Remove from previews
        setPreviews((prev) => prev.filter((_, i) => i !== index));

        // 2. Remove from local uploaded files
        setFiles((prev) => prev.filter((_, i) => i !== index));

        // 3. Remove from API media if needed
        setApiMedia((prev) => prev.filter((_, i) => i !== index));
    };


    const steps = [
        { label: "Basic Details", icon: faHome, link: "post-property", edit: faEdit },
        { label: "Properety Profile", icon: faBed, link: "profile", edit: faEdit },
        { label: "Amenities Section", icon: faCheckCircle, link: "amenities", edit: faEdit },
        { label: "Photos", icon: faImage, link: "submit-form", edit: faEdit },

    ];
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
                    const list = response.data.data.media;
                    console.log("Api Edit Data:", list);
                    setPreviews(list.map(
                        (item) => `https://api.squarebigha.com/${item.file_url}`
                    ));

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
            user_id: "1",
            id: id,

        };
        console.log("Update Payload:", payload);
        try {
            const response = await axios.post(
                `https://api.squarebigha.com/api/update-image-residential`,
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



                        <div className="image-upload-container">
                            <h2>Upload Your Images</h2>

                            <label className="image-upload-box">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                />
                                <div className="upload-text">
                                    <p>Click or Drag & Drop to Upload</p>
                                    <span>Accepted: .jpg, .png, .jpeg</span>
                                </div>
                            </label>

                            {previews.length > 0 && (
                                <div className="image-preview">
                                    <h4>All Uploaded Images:</h4>
                                    <div className="preview-grid">
                                        {previews.map((src, index) => (
                                            <div key={index} className="preview-item">
                                                <img

                                                    src={src}
                                                    alt={`Preview ${index}`}
                                                    className="preview-image"
                                                />
                                                <button
                                                    className="remove-btn"
                                                    onClick={() => handleRemoveImage(index)}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button className="upload-btn" disabled={!previews.length}>
                                Upload Images
                            </button>
                        </div>



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

export default UpdateSubmitForm;
