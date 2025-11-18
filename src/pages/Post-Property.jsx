// src/components/PostProperty.js
import React, { useEffect, useState } from "react";
import PostSidebar from "../component/PostSidebar";
import Navbar from "../component/Navbar";
import { useLocation } from "react-router-dom";
import api from "../component/Baseurl";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertyTypes } from "../Redux/slices/PropertySlice"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import "../assets/css/PostProperty.css";

const PostProperty = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { id } = useParams();
    const { types } = useSelector(state => state.property.propertyType);

    const [getSubTypeOptions, setGetSubTypeOptions] = useState([])
    const [step, setStep] = useState(0);
    const [userType, setUserType] = useState("owner");
    const [action, setAction] = useState("sale");
    const [propertyid, setPropertyid] = useState("Residential");
    const [propertyTypeurl, setPropertyTypeurl] = useState("")
    const [subType, setSubType] = useState("");
    const [phone, setPhone] = useState("");

    console.log("Received ID:", id, propertyTypeurl);


    const handleNext = () => {
        const basicdata = {
            phone,
            userType,
            action,
            subType,
            propertyid,
            propertyTypeurl
        };

        localStorage.setItem("basicDetails", JSON.stringify(basicdata));
        localStorage.setItem("subTypeData", JSON.stringify(getSubTypeOptions));




        if (subType == "Plot / Land" || "Land" || "Plot" || "Lands" || "Lands / Plots" || "plots" || "plots / lands") {
            navigate(`/Property-Plot`);
        } else if (propertyTypeurl == "Residential") {
            navigate(`/Residential-Property`);
        } else if (propertyTypeurl == "Commercial") {
            navigate(`/Commercial-Property`);
        } else {
            alert("select property type ")
        }
    };



    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const response = await api.get(`/api/get-property/1/${btnValue}`, {
    //                 headers: {
    //                     Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTk5MjgxNi1kZDUxLTcyMDEtYWY5MC1iNTZiYmNiMGVmNDEiLCJqdGkiOiIzOTUzMTUxNjQyOWM1MzZiZmM1NjQyOTQ2ODNhYTYxNzc0NTgxZjRmZmU4NjE5NzNiZWQ0Mjk1OTdlYzQzZjM5NTk5ZDQ0Yjc4MjgyNWMxMyIsImlhdCI6MTc1NzQxNzk0Ni45Mjk3NzEsIm5iZiI6MTc1NzQxNzk0Ni45Mjk3NzMsImV4cCI6MTc4ODk1Mzk0Ni45MjQ1OTUsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.qL6E9AzHFXC74-XRr0-KhAao4jWisTvyeri3eUXTEFV_Hp6DTylDISB1eeDsyaStrMIfk89EjMVaClE16WbYBKGVpHSnKOaDT56ubfb7DcrHAh50BTLTTIgYyf_Gbop_pnHFkOjbFc03SgKLWHJ8PpQlShiIxtXBA2eQX5bEkYHit0eZYN0bQdjtiu8YFvhubG9OMee-r95Cc8nXRdiC3gkXw0POWjwoCev9BNFHZ8UfdgXZMjxDVo4R_fFdWTeeicFjchFxYuRb7zm1aU8OUFyc4ozNJUC6Wix4hUARjUTmIfZ5mfEq5TDQWD0AM-ERfP8tIkkoTbDqqASU2Mg6LJ4p6nUXUqAuql4sDbmRKVlB04N15xV62LHWJTgT71JfA_bgZHFJGDUQD1c53vCwqEbZUSrMMAOXF6mllBmm1baKdqiocEm9_QldIWT2U07zmYGG4PBU2N3pBmMXftZDFu-xOPBSdB7dsz9KEUeY_gLDoupX9JwgQY8aNT-lwlcb9c0tguDdLWS2cU1LY180kfF0R7QeRq5UpCyb27COT7LNu9R9sl_KMcmLnxtzhNWA-YZeS9h3sKlimso6GO3VgTevyWaVyAs4nCNxP7kAP7FdlG-ckIUEuwsFmvV5pBGu65VB8hG9n3mha-zi7oRlqm4ltkGNLVZR4pX9iBN1Z6g`,
    //                 },
    //             });
    //             console.log("listing data", response.data);
    //             // console.log("image", response.data.data[13].media[0].file_url);
    //             setListings(response.data.data);
    //         } catch (error) {
    //             console.log("error", error);
    //         }
    //         // setListings(response.data);
    //     }
    //     getData();
    // }, [btnValue])

    // Api  start
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(`/api/edit-property/${id}/${propertyTypeurl}`, {
                    headers: {
                        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTk5MjgxNi1kZDUxLTcyMDEtYWY5MC1iNTZiYmNiMGVmNDEiLCJqdGkiOiIzOTUzMTUxNjQyOWM1MzZiZmM1NjQyOTQ2ODNhYTYxNzc0NTgxZjRmZmU4NjE5NzNiZWQ0Mjk1OTdlYzQzZjM5NTk5ZDQ0Yjc4MjgyNWMxMyIsImlhdCI6MTc1NzQxNzk0Ni45Mjk3NzEsIm5iZiI6MTc1NzQxNzk0Ni45Mjk3NzMsImV4cCI6MTc4ODk1Mzk0Ni45MjQ1OTUsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.qL6E9AzHFXC74-XRr0-KhAao4jWisTvyeri3eUXTEFV_Hp6DTylDISB1eeDsyaStrMIfk89EjMVaClE16WbYBKGVpHSnKOaDT56ubfb7DcrHAh50BTLTTIgYyf_Gbop_pnHFkOjbFc03SgKLWHJ8PpQlShiIxtXBA2eQX5bEkYHit0eZYN0bQdjtiu8YFvhubG9OMee-r95Cc8nXRdiC3gkXw0POWjwoCev9BNFHZ8UfdgXZMjxDVo4R_fFdWTeeicFjchFxYuRb7zm1aU8OUFyc4ozNJUC6Wix4hUARjUTmIfZ5mfEq5TDQWD0AM-ERfP8tIkkoTbDqqASU2Mg6LJ4p6nUXUqAuql4sDbmRKVlB04N15xV62LHWJTgT71JfA_bgZHFJGDUQD1c53vCwqEbZUSrMMAOXF6mllBmm1baKdqiocEm9_QldIWT2U07zmYGG4PBU2N3pBmMXftZDFu-xOPBSdB7dsz9KEUeY_gLDoupX9JwgQY8aNT-lwlcb9c0tguDdLWS2cU1LY180kfF0R7QeRq5UpCyb27COT7LNu9R9sl_KMcmLnxtzhNWA-YZeS9h3sKlimso6GO3VgTevyWaVyAs4nCNxP7kAP7FdlG-ckIUEuwsFmvV5pBGu65VB8hG9n3mha-zi7oRlqm4ltkGNLVZR4pX9iBN1Z6g`,
                    },
                });
                console.log("listing data", response.data);
                // console.log("image", response.data.data[13].media[0].file_url);
                // setListings(response.data.data);
            } catch (error) {
                console.log("error", error);
            }
            // setListings(response.data);
        }
        getData();
        const subtypedata = JSON.parse(localStorage.getItem("subTypeData") || "{}")
        setGetSubTypeOptions(subtypedata)

        // basic data
        const basic = JSON.parse(localStorage.getItem("basicDetails") || "{}");
        console.log(basic.propertyType)
        setPhone(basic.phone || "")
        setUserType(basic.userType)
        setAction(basic.action)
        setPropertyTypeurl(basic.propertyTypeurl)
        setPropertyid(basic.propertyid)
        setSubType(basic.subType)
        dispatch(fetchPropertyTypes())
    }, [dispatch])


    const handlePropertyType = async (id, name) => {
        console.log("get id", id, name)
        setPropertyTypeurl(name)
        // const id = e.target.value
        setPropertyid(id)

        try {
            const res = await axios.get(`https://api.squarebigha.com/api/subtype-list-by-propertyid/${id}`, {

                headers: {
                    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTk5MjgxNi1kZDUxLTcyMDEtYWY5MC1iNTZiYmNiMGVmNDEiLCJqdGkiOiIzOTUzMTUxNjQyOWM1MzZiZmM1NjQyOTQ2ODNhYTYxNzc0NTgxZjRmZmU4NjE5NzNiZWQ0Mjk1OTdlYzQzZjM5NTk5ZDQ0Yjc4MjgyNWMxMyIsImlhdCI6MTc1NzQxNzk0Ni45Mjk3NzEsIm5iZiI6MTc1NzQxNzk0Ni45Mjk3NzMsImV4cCI6MTc4ODk1Mzk0Ni45MjQ1OTUsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.qL6E9AzHFXC74-XRr0-KhAao4jWisTvyeri3eUXTEFV_Hp6DTylDISB1eeDsyaStrMIfk89EjMVaClE16WbYBKGVpHSnKOaDT56ubfb7DcrHAh50BTLTTIgYyf_Gbop_pnHFkOjbFc03SgKLWHJ8PpQlShiIxtXBA2eQX5bEkYHit0eZYN0bQdjtiu8YFvhubG9OMee-r95Cc8nXRdiC3gkXw0POWjwoCev9BNFHZ8UfdgXZMjxDVo4R_fFdWTeeicFjchFxYuRb7zm1aU8OUFyc4ozNJUC6Wix4hUARjUTmIfZ5mfEq5TDQWD0AM-ERfP8tIkkoTbDqqASU2Mg6LJ4p6nUXUqAuql4sDbmRKVlB04N15xV62LHWJTgT71JfA_bgZHFJGDUQD1c53vCwqEbZUSrMMAOXF6mllBmm1baKdqiocEm9_QldIWT2U07zmYGG4PBU2N3pBmMXftZDFu-xOPBSdB7dsz9KEUeY_gLDoupX9JwgQY8aNT-lwlcb9c0tguDdLWS2cU1LY180kfF0R7QeRq5UpCyb27COT7LNu9R9sl_KMcmLnxtzhNWA-YZeS9h3sKlimso6GO3VgTevyWaVyAs4nCNxP7kAP7FdlG-ckIUEuwsFmvV5pBGu65VB8hG9n3mha-zi7oRlqm4ltkGNLVZR4pX9iBN1Z6g` // ⬅️ shortened for display
                },
            })
            if (res.data.status) {
                console.log("response", res.data.data)
                setGetSubTypeOptions(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    console.log(types)
    return (
        <div className="main-layout">

            <div className="content-area">
                <div>
                    <Navbar />
                </div>
                <div className="post-property-container">

                    <PostSidebar step={step} onStepChange={setStep} />
                    <div className="property-form">
                        <>
                            <div >

                                <h2>Add Property Details</h2>
                                {/* Contact Number */}
                                <label>Your contact number:</label>
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    maxLength="10"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <label>You are:</label>
                                <div className="btn-group user-type">
                                    <button className={userType === "owner" ? "active" : ""} onClick={() => setUserType("owner")}>
                                        Owner
                                    </button>
                                    <button className={userType === "agent" ? "active" : ""} onClick={() => setUserType("agent")}>
                                        Agent
                                    </button>
                                </div>

                                {/* Sale / Rent / PG */}
                                <label>You are here to:</label>
                                <div className="btn-group sub-options">
                                    <button className={action === "Sale" ? "active" : ""} onClick={() => setAction("Sale")}>
                                        Sale
                                    </button>
                                    <button className={action === "rent" ? "active" : ""} onClick={() => setAction("rent")}>
                                        Rent
                                    </button>

                                    <button className={action === "Lease" ? "active" : ""} onClick={() => setAction("Lease")}>
                                        Lease
                                    </button>

                                </div>

                                {/* Property Type */}
                                <label>Property Type:</label>
                                <div className="btn-group property-type">
                                    {Array.isArray(types) && types
                                        .filter((v) => v.status === "1")
                                        .map((v, k) => (
                                            <button
                                                key={k}
                                                value={v.id}
                                                className={v.id == propertyid ? "active" : ""}
                                                onClick={() => handlePropertyType(v.id, v.type_name)}
                                            >
                                                {v.type_name}
                                            </button>
                                        ))}

                                </div>

                                {/* Sub-Type Label and Options */}
                                <label>Sub Property Type:</label>

                                <div className="btn-group sub-options">
                                    {Array.isArray(getSubTypeOptions) && getSubTypeOptions.map((v, k) => (
                                        <button
                                            key={k}
                                            value={v.subtype_name}
                                            className={v.subtype_name === subType ? "active" : ""}
                                            onClick={() => {
                                                setSubType(v.subtype_name);
                                                // Redirect to form page after selecting both

                                            }}
                                        >
                                            {v.subtype_name}
                                        </button>
                                    ))}
                                </div>





                                <p className="help-text">
                                    Need help in listing property? <a href="#">Click Here</a>
                                </p>
                            </div>
                        </>


                        <div className="buttons">


                            <button className="continue-btn" onClick={handleNext}>Next</button>


                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PostProperty;
