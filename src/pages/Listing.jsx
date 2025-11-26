import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import { Link, useNavigate } from "react-router-dom";
import api from "../component/Baseurl";


const Listing = () => {
    const navigate = useNavigate();
    const [btnValue, setBtn] = useState("residential")
    const [listings, setListings] = useState([])
    console.log("btnValue", btnValue)
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(`/api/get-property/1/${btnValue}`, {
                    headers: {
                        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTk5MjgxNi1kZDUxLTcyMDEtYWY5MC1iNTZiYmNiMGVmNDEiLCJqdGkiOiIzOTUzMTUxNjQyOWM1MzZiZmM1NjQyOTQ2ODNhYTYxNzc0NTgxZjRmZmU4NjE5NzNiZWQ0Mjk1OTdlYzQzZjM5NTk5ZDQ0Yjc4MjgyNWMxMyIsImlhdCI6MTc1NzQxNzk0Ni45Mjk3NzEsIm5iZiI6MTc1NzQxNzk0Ni45Mjk3NzMsImV4cCI6MTc4ODk1Mzk0Ni45MjQ1OTUsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.qL6E9AzHFXC74-XRr0-KhAao4jWisTvyeri3eUXTEFV_Hp6DTylDISB1eeDsyaStrMIfk89EjMVaClE16WbYBKGVpHSnKOaDT56ubfb7DcrHAh50BTLTTIgYyf_Gbop_pnHFkOjbFc03SgKLWHJ8PpQlShiIxtXBA2eQX5bEkYHit0eZYN0bQdjtiu8YFvhubG9OMee-r95Cc8nXRdiC3gkXw0POWjwoCev9BNFHZ8UfdgXZMjxDVo4R_fFdWTeeicFjchFxYuRb7zm1aU8OUFyc4ozNJUC6Wix4hUARjUTmIfZ5mfEq5TDQWD0AM-ERfP8tIkkoTbDqqASU2Mg6LJ4p6nUXUqAuql4sDbmRKVlB04N15xV62LHWJTgT71JfA_bgZHFJGDUQD1c53vCwqEbZUSrMMAOXF6mllBmm1baKdqiocEm9_QldIWT2U07zmYGG4PBU2N3pBmMXftZDFu-xOPBSdB7dsz9KEUeY_gLDoupX9JwgQY8aNT-lwlcb9c0tguDdLWS2cU1LY180kfF0R7QeRq5UpCyb27COT7LNu9R9sl_KMcmLnxtzhNWA-YZeS9h3sKlimso6GO3VgTevyWaVyAs4nCNxP7kAP7FdlG-ckIUEuwsFmvV5pBGu65VB8hG9n3mha-zi7oRlqm4ltkGNLVZR4pX9iBN1Z6g`,
                    },
                });
                console.log("listing data", response.data);
                // console.log("image", response.data.data[13].media[0].file_url);
                setListings(response.data.data);
            } catch (error) {
                console.log("error", error);
            }
            // setListings(response.data);
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

    // Edit function (for now just an alert, later you can make a form/modal)
    const handleEdit = (listing) => {

        navigate(`/update-postproperty/${listing.id}/${listing.property_type}`);


    };


    // console.log("image", listings?.[7]?.media?.[0]?.file_url);
    return (
        <>
            <Navbar />
            <div className="d-flex container">



                {/* Main Content */}
                <div className="flex-grow-1 p-4" >
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center listheadingspace">
                            {/* <h2 className="listheading  fw-bold">🏘️ My Listings</h2> */}
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
