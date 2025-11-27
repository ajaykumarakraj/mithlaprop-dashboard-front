// src/components/PostProperty.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faMapMarkerAlt,
    faBed,
    faImage,
    faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../component/Navbar";



import axios from "axios";
// import "../assets/css/PostProperty.css";

const SubmitForm = () => {
    const navigate = useNavigate();
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
        { label: "Basic Details", icon: faHome },
        // { label: "Location  Details", icon: faMapMarkerAlt },
        { label: "Properety Profile", icon: faBed },
        { label: "Amenities Section", icon: faCheckCircle },
        { label: "Photos and Videos", icon: faImage },

    ];

    // Api  start
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("editData") || "{}");

        if (storedData?.media) {
            const apiImages = storedData.media.map(
                (item) => `https://api.squarebigha.com/${item.file_url}`
            );

            setApiMedia(storedData.media); // Store API media list
            setPreviews(apiImages);        // Show preview
        }
    }, []);


    // get api Property Type:

    console.log(previews, "preview image");

    // if (loading) return <div>Loading property types...</div>;
    // if (error) return <div>Error: {error.toString()}</div>;
    // console.log("get data", types)


    const handleSubmit = async () => {
        const basic = JSON.parse(localStorage.getItem("basicDetails") || "{}");
        const profile = JSON.parse(localStorage.getItem("propertyProfile") || "{}");
        const amenityData = JSON.parse(localStorage.getItem("amenitiesdata") || "{}");
        if (basic.propertyTypeurl == "commercial") {
            const ids = Array.isArray(amenityData?.amenities)
                ? amenityData.amenities.map(item => item.id)
                : [];
            console.log(ids, "id find");

            const formData = new FormData();
            // ✅ Append Text Data According To Given Keys
            // 🔹 User Info
            formData.append("user_id", "1");
            formData.append("phone", basic.phone);
            formData.append("agent_city", "");
            formData.append("user_type", basic.userType);

            // 🔹 Property Basic Info

            formData.append("listing_type", basic.action);  //
            formData.append("property_type", basic.propertyTypeurl);
            formData.append("property_sub_type", basic.subType);
            // 🔹 Property Details
            formData.append("price", profile.price || "");
            formData.append("price_unit", profile.AreaUnit || "sq.ft.");
            formData.append("area", profile.area || "");
            formData.append("area_unit", profile.AreaUnit || "sq.ft.");
            formData.append("possession_by", profile.possession_by || "");
            formData.append("property_age", profile.propertyage);
            formData.append("possession_status", profile.possessionstatus || "");
            formData.append("furnishing", profile.furnishing || "");
            formData.append("office_type", profile.officespace || "");
            formData.append("pantry", profile.pantry || "");
            formData.append("personal_washroom", profile.washroom || "");
            formData.append("covered_parking", profile.coveredparking || "");
            formData.append("open_parking", profile.openparking || "");
            formData.append("balcony", profile.balconies || "");
            formData.append("lift", profile.lift || "");
            formData.append("power_backup", profile.power || "");
            formData.append("floor_number", profile.floor || "");
            formData.append("tower_block", profile.tower || "");
            formData.append("facing", profile.facing || "");



            // for plot section 
            formData.append("floor_allowed", profile.Floors || "");
            formData.append("plot_no", profile.plotno || "");
            formData.append("any_construction", profile.ConstructionStatus || "");

            // 🔹 Location Info
            formData.append("property_city", profile.cityName || "");
            formData.append("locality", profile.locality || "");
            formData.append("apartment_society", profile.apartment || "");
            // 🔹 Extra Fields

            formData.append("aminities_id", ids);//JSON.stringify(amenityData)

            // ✅ Append Images (Important: actual File objects)
            files.forEach((file) => {
                formData.append("images[]", file);
            });
            for (let pair of formData.entries()) {
                console.log(pair[0] + ": ", pair[1]);
            }
            console.log(formData, "formdata");
            try {

                const response = await axios.post(
                    "https://api.squarebigha.com/api/post-property-commercial",

                    formData,
                    {
                        headers: {

                            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTk5MjgxNi1kZDUxLTcyMDEtYWY5MC1iNTZiYmNiMGVmNDEiLCJqdGkiOiIzOTUzMTUxNjQyOWM1MzZiZmM1NjQyOTQ2ODNhYTYxNzc0NTgxZjRmZmU4NjE5NzNiZWQ0Mjk1OTdlYzQzZjM5NTk5ZDQ0Yjc4MjgyNWMxMyIsImlhdCI6MTc1NzQxNzk0Ni45Mjk3NzEsIm5iZiI6MTc1NzQxNzk0Ni45Mjk3NzMsImV4cCI6MTc4ODk1Mzk0Ni45MjQ1OTUsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.qL6E9AzHFXC74-XRr0-KhAao4jWisTvyeri3eUXTEFV_Hp6DTylDISB1eeDsyaStrMIfk89EjMVaClE16WbYBKGVpHSnKOaDT56ubfb7DcrHAh50BTLTTIgYyf_Gbop_pnHFkOjbFc03SgKLWHJ8PpQlShiIxtXBA2eQX5bEkYHit0eZYN0bQdjtiu8YFvhubG9OMee-r95Cc8nXRdiC3gkXw0POWjwoCev9BNFHZ8UfdgXZMjxDVo4R_fFdWTeeicFjchFxYuRb7zm1aU8OUFyc4ozNJUC6Wix4hUARjUTmIfZ5mfEq5TDQWD0AM-ERfP8tIkkoTbDqqASU2Mg6LJ4p6nUXUqAuql4sDbmRKVlB04N15xV62LHWJTgT71JfA_bgZHFJGDUQD1c53vCwqEbZUSrMMAOXF6mllBmm1baKdqiocEm9_QldIWT2U07zmYGG4PBU2N3pBmMXftZDFu-xOPBSdB7dsz9KEUeY_gLDoupX9JwgQY8aNT-lwlcb9c0tguDdLWS2cU1LY180kfF0R7QeRq5UpCyb27COT7LNu9R9sl_KMcmLnxtzhNWA-YZeS9h3sKlimso6GO3VgTevyWaVyAs4nCNxP7kAP7FdlG-ckIUEuwsFmvV5pBGu65VB8hG9n3mha-zi7oRlqm4ltkGNLVZR4pX9iBN1Z6g`
                        }
                    }
                );
                console.log(response.data.status)
                console.log(response.data.error)
                if (response.data.status == 200) {
                    console.log("Success:", response.data);
                    alert("✅ Property Posted Successfully!");

                    localStorage.removeItem("amenitiesdata");
                    localStorage.removeItem("basicDetails");
                    localStorage.removeItem("propertyProfile");
                    localStorage.removeItem("userData");
                    localStorage.removeItem("subTypeData");
                    navigate("/listings");

                }



                // Redirect After Submit (Choose your route)
                // navigate("/my-properties"); // <--- Change if needed

            } catch (error) {
                console.log("Upload Error:", error.response?.data || error);
                alert("❌ Failed to Post Property");
            }
        } else {
            const ids = Array.isArray(amenityData?.amenities)
                ? amenityData.amenities.map(item => item.id)
                : [];
            console.log(ids, "id find");

            const formData = new FormData();
            // ✅ Append Text Data According To Given Keys
            formData.append("user_id", "1");
            formData.append("phone", basic.phone || "");
            formData.append("agent_city", basic.agent_city || "");
            formData.append("user_type", basic.userType || "");
            formData.append("listing_type", basic.action || "");
            formData.append("property_type", basic.propertyTypeurl || "");
            formData.append("property_sub_type", basic.subType || "");

            // 🔹 Price & Area
            formData.append("price", profile.price || "");
            formData.append("price_unit", profile.AreaUnit || "");
            formData.append("area", profile.area || "");
            formData.append("area_unit", profile.AreaUnit || "");

            // 🔹 Property Details
            formData.append("bathrooms", profile.bathroom || "");
            formData.append("bedrooms", profile.bhkroom || "");
            formData.append("balcony", profile.balconies || "");
            formData.append("furnishing", profile.furnishing || "");
            formData.append("property_age", profile.propertyage || "");
            formData.append("possession_by", profile.constructionby || "");
            formData.append("status", profile.construction || "");
            formData.append("bhk_type", profile.bhk || "");
            formData.append("ownership", profile.ownership || "");
            formData.append("other_room", profile.otherroom || "");
            // for plot section 
            formData.append("floor_allowed", profile.Floors || "");
            formData.append("plot_no", profile.plotno || "");
            formData.append("any_construction", profile.ConstructionStatus || "");
            formData.append("possession_by", profile.possession_by || "");
            // 🔹 Location Info
            formData.append("property_city", profile.cityName || "");
            formData.append("locality", profile.locality || "");
            formData.append("apartment_society", profile.apartment || "");

            // 🔹 Amenities
            formData.append("aminities_id", ids || "");


            // ✅ Append Images (Important: actual File objects)
            files.forEach((file) => {
                formData.append("images[]", file);
            });
            for (let pair of formData.entries()) {
                console.log(pair[0] + ": ", pair[1]);
            }

            try {

                const response = await axios.post(
                    "https://api.squarebigha.com/api/post-property",

                    formData,
                    {
                        headers: {

                            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTk5MjgxNi1kZDUxLTcyMDEtYWY5MC1iNTZiYmNiMGVmNDEiLCJqdGkiOiIzOTUzMTUxNjQyOWM1MzZiZmM1NjQyOTQ2ODNhYTYxNzc0NTgxZjRmZmU4NjE5NzNiZWQ0Mjk1OTdlYzQzZjM5NTk5ZDQ0Yjc4MjgyNWMxMyIsImlhdCI6MTc1NzQxNzk0Ni45Mjk3NzEsIm5iZiI6MTc1NzQxNzk0Ni45Mjk3NzMsImV4cCI6MTc4ODk1Mzk0Ni45MjQ1OTUsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.qL6E9AzHFXC74-XRr0-KhAao4jWisTvyeri3eUXTEFV_Hp6DTylDISB1eeDsyaStrMIfk89EjMVaClE16WbYBKGVpHSnKOaDT56ubfb7DcrHAh50BTLTTIgYyf_Gbop_pnHFkOjbFc03SgKLWHJ8PpQlShiIxtXBA2eQX5bEkYHit0eZYN0bQdjtiu8YFvhubG9OMee-r95Cc8nXRdiC3gkXw0POWjwoCev9BNFHZ8UfdgXZMjxDVo4R_fFdWTeeicFjchFxYuRb7zm1aU8OUFyc4ozNJUC6Wix4hUARjUTmIfZ5mfEq5TDQWD0AM-ERfP8tIkkoTbDqqASU2Mg6LJ4p6nUXUqAuql4sDbmRKVlB04N15xV62LHWJTgT71JfA_bgZHFJGDUQD1c53vCwqEbZUSrMMAOXF6mllBmm1baKdqiocEm9_QldIWT2U07zmYGG4PBU2N3pBmMXftZDFu-xOPBSdB7dsz9KEUeY_gLDoupX9JwgQY8aNT-lwlcb9c0tguDdLWS2cU1LY180kfF0R7QeRq5UpCyb27COT7LNu9R9sl_KMcmLnxtzhNWA-YZeS9h3sKlimso6GO3VgTevyWaVyAs4nCNxP7kAP7FdlG-ckIUEuwsFmvV5pBGu65VB8hG9n3mha-zi7oRlqm4ltkGNLVZR4pX9iBN1Z6g`
                        }
                    }
                );
                console.log(response.data.status)
                console.log(response.data.error)
                if (response.data.status == 200) {
                    console.log("Success:", response.data);
                    alert("✅ Property Posted Successfully!");

                    localStorage.removeItem("amenitiesdata");
                    localStorage.removeItem("basicDetails");
                    localStorage.removeItem("propertyProfile");
                    localStorage.removeItem("userData");
                    localStorage.removeItem("subTypeData");
                    navigate("/listings");

                }



                // Redirect After Submit (Choose your route)
                // navigate("/my-properties"); // <--- Change if needed

            } catch (error) {
                console.log("Upload Error:", error.response?.data || error);
                alert("❌ Failed to Post Property");
            }
        }


    };

    // useEffect(() => {
    //     const basic = JSON.parse(localStorage.getItem("basicDetails"));
    //     const profile = JSON.parse(localStorage.getItem("propertyProfile"));
    //     const amenityData = JSON.parse(localStorage.getItem("amenities"));

    //     console.log("final data", {
    //         ...basic,
    //         ...profile,
    //         amenities: amenityData,
    //         images: previews // File array
    //     });
    // }, []);

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
                            <a href="/amenities" className="continue-btn">Back</a>
                            <button className="continue-btn" onClick={handleSubmit}>Submit</button>


                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SubmitForm;
