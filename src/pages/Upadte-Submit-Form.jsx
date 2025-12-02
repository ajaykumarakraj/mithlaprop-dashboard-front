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
import api from "../component/Baseurl"
import Navbar from "../component/Navbar";



import axios from "axios";
// import "../assets/css/PostProperty.css";

const UpdateSubmitForm = () => {
    const navigate = useNavigate();

    const { id, property_type } = useParams();

    const [step, setStep] = useState(3);
    const [deleteIds, setDeleteIds] = useState([]);


    const [previews, setPreviews] = useState([]);
    const [files, setFiles] = useState([]);
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




    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        const validFiles = selectedFiles.filter(file => file.type.startsWith("image/"));

        setFiles(prev => [...prev, ...validFiles]);

        const previewURLs = validFiles.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...previewURLs]);
    };


    const handleRemoveImage = async (id, index) => {
        console.log("Remove Image Called for index:", index);
        console.log("Server Image ID:", id);
        if (property_type === "residential") {

        }
        // 🟦 If server image (id exists) → call API
        if (id) {
            try {
                const res = await api.get(
                    `/api/delete-image/${id}`);
                console.log("Delete Image Response:", res.data);
            } catch (error) {
                console.log("Delete Image Error:", error);
            }
        }

        // 🟩 Remove preview from UI
        setPreviews((prev) => prev.filter((_, i) => i !== index));

        // 🟩 Remove from local uploaded files (only if local file)
        setFiles((prev) => prev.filter((_, i) => i !== index));

        // 🟩 Remove from server deleteIds list
        setDeleteIds((prev) => prev.filter((item, i) => i !== index));
    };



    useEffect(() => {
        if (!id || !property_type) return;

        const getData = async () => {
            try {
                const response = await api.get(
                    `/api/edit-property/${id}/${property_type}`);
                if (response.data.status === 200) {
                    const list = response.data.data.media;
                    console.log("Api Edit Data:", list);
                    setDeleteIds(list);
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

        const userid = JSON.parse(localStorage.getItem("user"))
        if (property_type == "residential") {
            // 🟢 REMOVE id from payload — API doesn’t need it in body
            const formData = new FormData();

            formData.append("user_id", userid.user_id);
            formData.append("id", id);//property id

            // Append all selected files as images[]
            files.forEach((file) => {
                formData.append("images[]", file);
            });
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }
            try {
                const response = await api.post(
                    `/api/update-image-residential`, formData);

                console.log("Update Response:", response.data);

                if (response.data.status === 200) {
                    console.log("Update Success!");
                }

            } catch (error) {
                console.log("Update Error:", error);
            }
        } else if (property_type == "commercial") {

            const formData = new FormData();

            formData.append("user_id", userid.user_id);
            formData.append("id", id);//property id

            // Append all selected files as images[]
            files.forEach((file) => {
                formData.append("images[]", file);
            });
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }
            try {
                const response = await api.post(
                    `/api/update-image-commercial`,
                    formData,);

                console.log("Update Response:", response.data);

                if (response.data.status === 200) {
                    console.log("Update Success!");
                }

            } catch (error) {
                console.log("Update Error:", error);
            }
        }
    }


    console.log(deleteIds, "preview image");

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
                                        {previews.map((src, index) => {
                                            const serverImage = deleteIds[index]; // if exists → server image

                                            return (
                                                <div key={index} className="preview-item">
                                                    <img
                                                        src={src}
                                                        alt={`Preview ${index}`}
                                                        className="preview-image"
                                                    />

                                                    <button
                                                        className="remove-btn"
                                                        onClick={() =>
                                                            handleRemoveImage(serverImage?.id, index)
                                                        }
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}


                            {/* <button className="upload-btn" disabled={!previews.length}>
                                Upload Images
                            </button> */}
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
