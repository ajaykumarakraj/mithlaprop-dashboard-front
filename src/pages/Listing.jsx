import React, { useState } from "react";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import { Link, useNavigate } from "react-router-dom";
const Listing = () => {
    const navigate = useNavigate();
    // Initial property list
    const [listings, setListings] = useState([
        { id: 1, title: "2BHK Apartment", location: "Delhi", price: "₹40,00,000", img: "https://i.postimg.cc/mDFYMfgW/download.jpg" },
        { id: 2, title: "Luxury Villa", location: "Mumbai", price: "₹1,20,00,000", img: "https://i.postimg.cc/mDFYMfgW/download.jpg" },
        { id: 3, title: "Office Space", location: "Bangalore", price: "₹70,00,000", img: "https://i.postimg.cc/mDFYMfgW/download.jpg" },
        { id: 4, title: "Studio Apartment", location: "Pune", price: "₹30,00,000", img: "https://i.postimg.cc/mDFYMfgW/download.jpg" },
    ]);

    // Delete function
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this property?");
        if (confirmDelete) {
            setListings(listings.filter((listing) => listing.id !== id));
        }
    };

    // Edit function (for now just an alert, later you can make a form/modal)
    const handleEdit = (listing) => {

        navigate(`/postpropertyEdit`);

    };

    return (
        <>
            <Navbar />
            <div className="d-flex container">



                {/* Main Content */}
                <div className="flex-grow-1 p-4" >
                    <div className="d-flex justify-content-between">
                        <h2 className="listheading mb-4 fw-bold">🏘️ My Listings</h2>
                        <h2 className="listheading mb-4 fw-bold"><Link to="/postproperty">🏘️ + Add Property</Link></h2>
                    </div>
                    <div className="row">
                        {listings.map((listing) => (
                            <div key={listing.id} className="col-md-12 mb-3">
                                <div className="card shadow-sm border-0 h-100">
                                    <div className="main card-body d-flex justify-content-between align-items-center">
                                        <img src={listing.img} style={{ borderRadius: "10px" }} />
                                        <div>
                                            <h5 className="card-title fw-bold">{listing.title}</h5>
                                            <p className="text-muted mb-1">{listing.location}</p>
                                            <p className="text-primary fw-bold">{listing.price}</p>
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
