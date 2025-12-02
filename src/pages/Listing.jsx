import React, { useEffect, useState } from "react";
// import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import { Link, useNavigate } from "react-router-dom";
import api from "../component/Baseurl";


const Listing = () => {
    const navigate = useNavigate();
    const [btnValue, setBtn] = useState("residential")
    const [listings, setListings] = useState([])
    console.log("btnValue", btnValue)

    const userid = JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(`/api/get-property/${userid.user_id}/${btnValue}`);
                console.log("listing data", response.data);

                setListings(response.data.data);
            } catch (error) {
                console.log("error", error);
            }

        }
        getData();
    }, [btnValue])


    // Delete function
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this property?");
        if (confirmDelete) {
            setListings(listings.filter((listing) => listing.id !== id));
        }
    };

    const handleEdit = (listing) => {

        navigate(`/update-postproperty/${listing.id}/${listing.property_type}`);


    };

    return (
        <>
            <Navbar />
            <div className="d-flex container">



                {/* Main Content */}
                <div className="flex-grow-1 p-4" >
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center listheadingspace">

                            <h1 className={`listheading   ${btnValue == "residential" ? "Active-btn" : ""}`} value={btnValue} onClick={() => setBtn("residential")}>🏠 Residential</h1>
                            <h1 className={`listheading   ${btnValue == "commercial" ? "Active-btn" : ""}`} value={btnValue} onClick={() => setBtn("commercial")}>🏢Commercial</h1>

                        </div>
                        <div>
                            <h2 className="listheading mb-4 fw-bold"><Link to="/postproperty">🏘️ + Add Property</Link></h2>
                        </div>

                    </div>

                    <div className="row">
                        {listings.map((listing) => (
                            <div key={listing.id} className="col-md-12 mb-3">
                                <div className="card shadow-sm border-0 h-100">
                                    <div className="main card-body listing d-flex justify-content-between align-items-center">
                                        <img
                                            src={
                                                listing?.media?.[0]?.file_url
                                                    ? `https://api.squarebigha.com/${listing.media[0].file_url}`
                                                    : "/no-image.jpg"
                                            }
                                            style={{ borderRadius: "10px", width: "120px", height: "90px", objectFit: "cover" }}
                                            alt="property"
                                        />
                                        <div>
                                            <h5 className="card-title fw-bold text-transform">{listing.bhk_type}, {listing.property_type}</h5>
                                            <p className="text-muted mb-1 text-transform">{listing.agent_city}, {listing.locality}</p>
                                            <p className="text-primary fw-bold">₹ {listing.price}</p>
                                        </div>

                                        {/* Action Buttons */}
                                        <div>
                                            <button
                                                className="btn btn-sm btn-outline-primary me-2"
                                                onClick={() => handleEdit(listing)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDelete(listing.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Listing;
