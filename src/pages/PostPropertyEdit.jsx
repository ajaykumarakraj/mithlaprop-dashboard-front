// src/components/PostProperty.js
import React, { useState } from "react";
import EditSidebar from "../component/EditSidebar";
import Navbar from "../component/Navbar";
import VideoUploader from "../component/VideoUploader";
import VideoUpload from "../component/VideoUploader";
import ImageUpload from "../component/ImageUpload";
// import "../assets/css/PostProperty.css";

const PostPropertyEdit = () => {
    const [step, setStep] = useState(0);
    const [selectedType, setSelectedType] = useState("Villa");
    const [cityName, setCityName] = useState("");
    const [subLocality, setSubLocality] = useState("");
    const [locality, setLocality] = useState("");
    const [apartment, setApartment] = useState("");
    const [bhk, setBhk] = useState("1 RK");
    const [bhkroom, setBhkroom] = useState("1");
    const [bathroom, setBathRooms] = useState("1");
    const [balconies, setBalconies] = useState("1");
    const [floor, setFloor] = useState("1");
    const [area, setArea] = useState("1");
    const [unit, setUnit] = useState("1");
    const [userType, setUserType] = useState("owner");
    const [action, setAction] = useState("sell");
    const [propertyType, setPropertyType] = useState("residential");
    const [subType, setSubType] = useState("");
    const [phone, setPhone] = useState("");
    const [ownership, setOwnership] = useState("");
    const [propertyage, setPropertyAge] = useState("");
    const [city, setCity] = useState("");
    const [otherroom, setOtherroom] = useState("");
    const [amenities, setAmenities] = useState("");
    const [constraction, setConstraction] = useState("");
    const [propertyfeature, setPropertyFeature] = useState("");
    const [societyfeature, setSocietyfeature] = useState("");
    const [furnishing, setFurnishing] = useState("");
    const [flooring, setFlooring] = useState("");
    const [selectedPropertyFacing, setSelectedPropertyFacing] = useState("");
    const [selectedLocationAdvantages, setSelectedLocationAdvantages] = useState([]);


    const [selectedPowerBackup, setSelectedPowerBackup] = useState("");



    const [selectedWaterSources, setSelectedWaterSources] = useState([]);


    const [selectedOverlooking, setSelectedOverlooking] = useState([]);
    const toggleLocationAdvantage = (option) => {
        if (selectedLocationAdvantages.includes(option)) {
            setSelectedLocationAdvantages(
                selectedLocationAdvantages.filter((item) => item !== option)
            );
        } else {
            setSelectedLocationAdvantages([
                ...selectedLocationAdvantages,
                option
            ]);
        }
    };

    const toggleOverlooking = (option) => {
        if (selectedOverlooking.includes(option)) {
            setSelectedOverlooking(selectedOverlooking.filter((item) => item !== option));
        } else {
            setSelectedOverlooking([...selectedOverlooking, option]);
        }
    };

    const toggleWaterSource = (option) => {
        if (selectedWaterSources.includes(option)) {
            setSelectedWaterSources(selectedWaterSources.filter((item) => item !== option));
        } else {
            setSelectedWaterSources([...selectedWaterSources, option]);
        }
    };
    const [selectedFeatures, setSelectedFeatures] = useState([]);

    const toggleAdditionalFeature = (option) => {
        if (selectedFeatures.includes(option)) {
            setSelectedFeatures(selectedFeatures.filter((item) => item !== option));
        } else {
            setSelectedFeatures([...selectedFeatures, option]);
        }
    };
    const toggleOption = (option) => {
        if (otherroom.includes(option)) {
            setOtherroom(otherroom.filter((item) => item !== option));
        } else {
            setOtherroom([...otherroom, option]);
        }
    };


    const AmenitiesOption = (option) => {
        if (amenities.includes(option)) {
            setAmenities(amenities.filter((item) => item !== option))
        } else {
            setAmenities([...amenities, option])
        }
    }
    const PropertyFeatureOption = (option) => {
        if (propertyfeature.includes(option)) {
            setPropertyFeature(propertyfeature.filter((item) => item !== option))
        } else {
            setPropertyFeature([...propertyfeature, option])
        }
    }
    const SocietyFeatureOption = (option) => {
        if (societyfeature.includes(option)) {
            setSocietyfeature(societyfeature.filter((item) => item !== option))
        } else {
            setSocietyfeature([...societyfeature, option])
        }
    }
    if (process.env.NODE_ENV === "development") {
        console.log({ subType, action, userType, propertyType });
    }
    const LocationAdvantages = [
        "Near Hospital",
        "Near School",
        "Near Metro Station",
        "Near Bus Stop",
        "Near Market",
        "Near Highway",
        "Near Airport",
        "Near Park"
    ];

    const PropertyFacingOptions = ["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"];

    const PowerBackupOptions = ["Full", "Partial", "None"];
    const OverlookingOptions = [
        "Park/Garden",
        "Main Road",
        "Club",
        "Swimming Pool"
    ];
    const WaterSources = [
        "Municipal Corporation",
        "Borewell/Tubewell",
        "24x7 Water Supply",
        "Water Storage",
        "Rainwater Harvesting"
    ];
    const residentialSubTypessell = [
        "Flat/Apartment",
        "Independent House / Villa",
        "Independent / Builder Floor",
        "Plot / Land",
        "1 RK/ Studio Apartment",
        "Serviced Apartment",
        "Farmhouse",
        "Other"
    ];
    const residentialSubTypesrent = [
        "Flat/Apartment",
        "Independent House / Villa",
        "Independent / Builder Floor",
        "1 RK/ Studio Apartment",
        "Serviced Apartment",
        "Farmhouse",

        "Other"
    ]
    const commercialSubTypes = [
        "Office",
        "Retail",
        "Plot / Land",
        "Storage",
        "Industry",
        "Hospitality",
        "Other"

    ];

    const pgSubTypes = [
        "Flat/Apartment",
        "Independent House / Villa",
        "Independent / Builder Floor",
        "1 RK/ Studio Apartment",
        "Serviced Apartment",

    ];
    const PropertyAge = ["0 to 1 years", "1 to 5 years", "5 to 10 years", "10 years +"]
    const Ownership = ["Freehold", "Leasehold", "Co-operative society", "Power of Attorney"]
    const bhkadd = ["1 RK", "1 BHK", "1.5 BHK", "2 BHK", "3+ BHK"]
    const Otherroom = ["Pooja Room", "Study Room", "Servant Room", "Store Room"]
    const bhkroomno = ["1 ", "2", "3", "4+"]
    const BathRooms = ["1 ", "2", "3", "4+"]
    const Balconies = ["1 ", "2", "3", "4+"]
    const Furnishing = ["Furnished", "Semi-Furnished", "Un-Furnished"]
    const PropertyFeature = [
        "High Ceiling Height",
        "False Ceiling Lighting",
        "Piped-gas",
        "Internet/wi-fi connectivity",       // selected
        "Centrally Air Conditioned",
        "Water purifier",
        "Recently Renovated",                // selected
        "Private Garden / Terrace",
        "Natural Light",
        "Airy Rooms",
        "Spacious Interiors"
    ];
    const AdditionalFeatures = [
        "Separate entry for servant room",
        "Waste Disposal",
        "No open drainage around",
        "Rain Water Harvesting",
        "Rain Water Harvesting",
        "Low Density Society"
    ];
    const SocietyFeature = ["Water softening plant", "Shopping Centre", "Fitness Centre / GYM", "Swimming Pool", "Club house / Community Center"]
    const Amenities = ["Maintenance Staff", "Water Storage", "Security / Fire Alarm", "Visitor Parking", "Feng Shui / Vaastu Compliant", "Park", "Intercom Facility", "Lift"]
    const getSubTypeOptions = () => {
        if (propertyType === "residential" && action === "PG") return pgSubTypes;
        if (propertyType === "residential" && action === "sell") return residentialSubTypessell;
        if (propertyType === "residential" && action === "rent") return residentialSubTypesrent;
        if (propertyType === "commercial") return commercialSubTypes;
        return [];
    };

    const getSubTypeLabel = () => {
        switch (action) {
            case "rent":
                return "Select rental property type:";
            case "PG":
                return "Select PG type:";
            case "sell":
            default:
                return "Select property sub-type:";
        }
    };

    const handleNext = () => {
        if (step === 1 && locality.trim() === "") return;
        setStep((prev) => Math.min(prev + 1, 4));
    };

    const handleBack = () => {
        setStep((prev) => Math.max(prev - 1, 0));
    };

    const handleSubmit = () => {
        const data = { selectedType, cityName, locality, bhk };
        console.log("Form Data:", data);
        alert("Form Submitted!");
    };
    console.log(bhk)
    return (
        <div className="main-layout">

            <div className="content-area">
                <Navbar />
                <div className="post-property-container">

                    <EditSidebar step={step} onStepChange={setStep} />
                    <div className="property-form">


                        {step === 0 && (
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

                                    {/* City */}
                                    <label>Property city:</label>
                                    <input
                                        type="text"
                                        placeholder="Please enter city name"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                    {/* Owner / Agent */}
                                    <label>You are:</label>
                                    <div className="btn-group user-type">
                                        <button className={userType === "owner" ? "active" : ""} onClick={() => setUserType("owner")}>
                                            Owner
                                        </button>
                                        <button className={userType === "agent" ? "active" : ""} onClick={() => setUserType("agent")}>
                                            Agent
                                        </button>
                                    </div>

                                    {/* Sell / Rent / PG */}
                                    <label>You are here to:</label>
                                    <div className="btn-group sub-options">
                                        <button className={action === "sell" ? "active" : ""} onClick={() => setAction("sell")}>
                                            Sell
                                        </button>
                                        <button className={action === "rent" ? "active" : ""} onClick={() => setAction("rent")}>
                                            Rent/Lease
                                        </button>
                                        {propertyType === "residential" && (
                                            <button className={action === "PG" ? "active" : ""} onClick={() => setAction("PG")}>
                                                PG
                                            </button>
                                        )}
                                    </div>

                                    {/* Property Type */}
                                    <label>Property Type:</label>
                                    <div className="btn-group property-type">
                                        <button
                                            className={propertyType === "residential" ? "active" : ""}
                                            onClick={() => {
                                                setPropertyType("residential");
                                                setSubType("");
                                                if (action !== "sell" && action !== "rent" && action !== "PG") {
                                                    setAction("sell");
                                                }
                                            }}
                                        >
                                            Residential
                                        </button>
                                        <button
                                            className={propertyType === "commercial" ? "active" : ""}
                                            onClick={() => {
                                                setPropertyType("commercial");
                                                setSubType("");
                                                if (action === "PG") setAction("rent");
                                            }}
                                        >
                                            Commercial
                                        </button>
                                    </div>

                                    {/* Sub-Type Label and Options */}
                                    <label>{getSubTypeLabel()}</label>
                                    <div className="btn-group sub-options">
                                        {getSubTypeOptions().map((type) => (
                                            <button
                                                key={type}
                                                className={subType === type ? "active" : ""}
                                                onClick={() => setSubType(type)}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>



                                    {/* Continue Button */}
                                    {/* <button className="continue-btn" onClick={handleContinue}>Continue</button> */}

                                    <p className="help-text">
                                        Need help in listing property? <a href="#">Click Here</a>
                                    </p>
                                </div>
                            </>
                        )}

                        {/* {step === 1 && (
                            <>
                                <h2>Add Location Details</h2>


                            </>
                        )} */}

                        {step === 1 && (
                            <>
                                <h2>Tell Us About Your Property</h2>
                                <h4>Your Apartment is a</h4>
                                <div className="btn-group sub-options">
                                    {bhkadd.map((option) => (
                                        <button
                                            key={option}
                                            className={` ${bhk === option ? "active" : ""}`}
                                            onClick={() => setBhk(option)}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>


                                <h4 className="mt-3">Add Room Details</h4>
                                <label>No. of BedRooms</label>
                                <div className="btn-group sub-options">
                                    {bhkroomno.map((option) => (
                                        <button
                                            key={option}
                                            className={` ${bhkroom === option ? "active" : ""}`}
                                            onClick={() => setBhkroom(option)}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                <label>No. of BathRooms</label>
                                <div className="btn-group sub-options">
                                    {BathRooms.map((option) => (
                                        <button
                                            key={option}
                                            className={`${bathroom === option ? "active" : ""}`}
                                            onClick={() => setBathRooms(option)}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                <label>Balconies</label>
                                <div className="btn-group sub-options">
                                    {Balconies.map((option) => (
                                        <button
                                            key={option}
                                            className={` ${balconies === option ? "active" : ""}`}
                                            onClick={() => setBalconies(option)}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                <div className="container p-0">

                                    <div className="row">
                                        <h4 className="mt-3">Add Area Details</h4>
                                        <div className="col-md-6">

                                            <label>Built Up Area</label>
                                            <input
                                                type="number"
                                                placeholder="Enter area"
                                                value={area}
                                                onChange={(e) => setArea(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Select Area Unit</label>
                                            <div className="input-wrapper">
                                                <select
                                                    value={unit}
                                                    onChange={(e) => setUnit(e.target.value)}
                                                >
                                                    <option value="sq. ft.">sq. ft.</option>
                                                    <option value="sq. m.">sq. m.</option>
                                                    <option value="acre">acre</option>
                                                    <option value="hectare">hectare</option>
                                                </select>
                                            </div>
                                        </div>
                                        <h4 className="mt-3">Add Floor Details</h4>
                                        <div className="col-md-6">

                                            <label>Total Floor</label>
                                            <input
                                                type="number"
                                                placeholder="Enter Floor"
                                                value={floor}
                                                onChange={(e) => setFloor(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Select Area Unit</label>
                                            <div className="input-wrapper">
                                                <select
                                                    value={unit}
                                                    onChange={(e) => setUnit(e.target.value)}
                                                >
                                                    <option value="Basement">Basement</option>
                                                    <option value="Lower Ground">Lower Ground</option>
                                                    <option value="Ground">Ground</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                </select>
                                            </div>
                                        </div>
                                        <h4 className="mt-3">Availability Status</h4>
                                        <div className="btn-group sub-options">
                                            <button className={constraction === "Ready" ? "active" : ""} onClick={() => setConstraction("Ready")}>
                                                Ready To Move
                                            </button>
                                            <button className={constraction === "Constraction" ? "active" : ""} onClick={() => setConstraction("Constraction")}>
                                                Under Constraction
                                            </button>

                                        </div>

                                        {constraction === "Ready" && (

                                            <div>
                                                <label>Age Of Property</label>
                                                <div className="btn-group sub-options">

                                                    {PropertyAge.map((option) => (
                                                        <button
                                                            key={option}
                                                            className={` ${propertyage === option ? "active" : ""}`}
                                                            onClick={() => setPropertyAge(option)}
                                                        >
                                                            {option}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )

                                        }

                                        {constraction === "Constraction" && (
                                            <div className="input-wrapper col-md-6">
                                                <select
                                                    value={unit}
                                                    onChange={(e) => setUnit(e.target.value)}
                                                >
                                                    <option value="Within 3 Months">Within 3 Months</option>
                                                    <option value="Within 6 Months">Within 6 Months</option>

                                                    <option value="By 2026">By 2026</option>
                                                    <option value="By 2027">By 2027</option>
                                                    <option value="By 2028">By 2028</option>
                                                    <option value="By 2029">By 2029</option>
                                                    <option value="By 2030">By 2030</option>
                                                    <option value="By 2031">By 2031</option>
                                                </select>
                                            </div>
                                        )

                                        }

                                        <h4 className="mt-3">Ownership</h4>
                                        <div className="btn-group sub-options">

                                            {Ownership.map((option) => (
                                                <button
                                                    key={option}
                                                    className={` ${ownership === option ? "active" : ""}`}
                                                    onClick={() => setOwnership(option)}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>

                                        <h4 className="mt-3">Other Room</h4>

                                        <div className="btn-group sub-options">
                                            {Otherroom.map((option) => (
                                                <button
                                                    key={option}
                                                    className={otherroom.includes(option) ? "active" : ""}
                                                    onClick={() => toggleOption(option)}
                                                    type="button"
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>

                                        <h4 className="mt-3">Furnishing</h4>
                                        <div className="btn-group sub-options">

                                            {Furnishing.map((option) => (
                                                <button
                                                    key={option}
                                                    className={` ${furnishing === option ? "active" : ""}`}
                                                    onClick={() => setFurnishing(option)}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                        <label>City</label>
                                        <input
                                            type="text"
                                            value={cityName}
                                            placeholder="Enter City Name"
                                            onChange={(e) => setCityName(e.target.value)}
                                        />
                                        <label>Locality </label>
                                        {!locality && <span className="error-text"> (Locality is required.)</span>}
                                        <input
                                            type="text"
                                            value={locality}
                                            placeholder="Enter locality"
                                            onChange={(e) => setLocality(e.target.value)}
                                        />

                                        <label>Sub Locality (optional)</label>
                                        <input
                                            type="text"
                                            value={subLocality}
                                            placeholder="Enter Sub Locality "
                                            onChange={(e) => setSubLocality(e.target.value)}
                                        />
                                        <label>Apartment/Society</label>
                                        <input
                                            type="text"
                                            value={apartment}
                                            placeholder="Enter Apartment/Society "
                                            onChange={(e) => setApartment(e.target.value)}
                                        />
                                        <div className="checkbox-group">
                                            <label className="checkbox-item">
                                                <input type="checkbox" />
                                                <span>All inclusive price</span>
                                            </label>

                                            <label className="checkbox-item">
                                                <input type="checkbox" />
                                                <span>Tax and Govt. charges excluded</span>
                                            </label>

                                            <label className="checkbox-item">
                                                <input type="checkbox" />
                                                <span>Price Negotiable</span>
                                            </label>
                                        </div>

                                    </div>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <h2>Add amenities/unique features</h2>
                                <h4 className="mt-3">Amenities</h4>
                                <div className="btn-group sub-options">
                                    {Amenities.map((option) => (
                                        <button
                                            key={option}
                                            className={amenities.includes(option) ? "active" : ""}
                                            onClick={() => AmenitiesOption(option)}
                                            type="button"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                <h4 className="mt-3">Property Features</h4>
                                <div className="btn-group sub-options">
                                    {PropertyFeature.map((option) => (
                                        <button
                                            key={option}
                                            className={propertyfeature.includes(option) ? "active" : ""}
                                            onClick={() => PropertyFeatureOption(option)}
                                            type="button"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                <h4 className="mt-3">Society/Building feature</h4>
                                <div className="btn-group sub-options">
                                    {SocietyFeature.map((option) => (
                                        <button
                                            key={option}
                                            className={societyfeature.includes(option) ? "active" : ""}
                                            onClick={() => SocietyFeatureOption(option)}
                                            type="button"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                <h4 className="mt-3">Additional Features</h4>
                                <div className="btn-group sub-options">
                                    {AdditionalFeatures.map((option) => (
                                        <button
                                            key={option}
                                            className={selectedFeatures.includes(option) ? "active" : ""}
                                            onClick={() => toggleAdditionalFeature(option)}
                                            type="button"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                <h4 className="mt-3">Water Source</h4>
                                <div className="btn-group sub-options">
                                    {WaterSources.map((option) => (
                                        <button
                                            key={option}
                                            className={selectedWaterSources.includes(option) ? "active" : ""}
                                            onClick={() => toggleWaterSource(option)}
                                            type="button"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                <h4 className="mt-3">Overlooking</h4>
                                <div className="btn-group sub-options">
                                    {OverlookingOptions.map((option) => (
                                        <button
                                            key={option}
                                            className={selectedOverlooking.includes(option) ? "active" : ""}
                                            onClick={() => toggleOverlooking(option)}
                                            type="button"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                <h4 className="mt-3">Other Features</h4>
                                <div className="checkbox-group">
                                    <label className="checkbox-item">
                                        <input type="checkbox" />
                                        <span>In a gated society</span>
                                    </label>

                                    <label className="checkbox-item">
                                        <input type="checkbox" />
                                        <span>Corner Property</span>
                                    </label>

                                    <label className="checkbox-item">
                                        <input type="checkbox" />
                                        <span>Pet Friendly</span>
                                    </label>
                                    <label className="checkbox-item">
                                        <input type="checkbox" />
                                        <span>Wheelchair friendly</span>
                                    </label>
                                </div>
                                <h4 className="mt-3">Power Back up</h4>
                                <div className="btn-group sub-options">
                                    {PowerBackupOptions.map((option) => (
                                        <button
                                            key={option}
                                            className={selectedPowerBackup === option ? "active" : ""}
                                            onClick={() => setSelectedPowerBackup(option)}
                                            type="button"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                <h4 className="mt-3">Property facing</h4>
                                <div className="btn-group sub-options">
                                    {PropertyFacingOptions.map((option) => (
                                        <button
                                            key={option}
                                            className={selectedPropertyFacing === option ? "active" : ""}
                                            onClick={() => setSelectedPropertyFacing(option)}
                                            type="button"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                <h4 className="mt-3">Type of flooring</h4>
                                <div className="col-md-6">

                                    <div className="input-wrapper">
                                        <select
                                            value={flooring}
                                            onChange={(e) => setFlooring(e.target.value)}
                                        >
                                            <option value="Marble">Marble</option>
                                            <option value="Concrete">Concrete</option>
                                            <option value="Polished concrete">Polished concrete</option>
                                            <option value="Granite">Granite</option>
                                            <option value="Mosaic">Mosaic</option>
                                            <option value="Cement">Cement</option>
                                            <option value="Stone">Stone</option>
                                            <option value="Vinyl">Vinyl</option>

                                        </select>
                                    </div>
                                </div>
                                <h4 className="mt-3">Location Advantages</h4>
                                <div className="btn-group sub-options">
                                    {LocationAdvantages.map((option) => (
                                        <button
                                            key={option}
                                            className={selectedLocationAdvantages.includes(option) ? "active" : ""}
                                            onClick={() => toggleLocationAdvantage(option)}
                                            type="button"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>

                            </>


                        )}
                        {step === 3 && (
                            <>
                                <h2>Add One Video of Property</h2>
                                <VideoUpload />
                                <ImageUpload />
                            </>
                        )}
                        <div className="buttons">
                            {step > 0 && <button className="continue-btn" onClick={handleBack}>Back</button>}
                            {step < 3 ? (
                                <button className="continue-btn" onClick={handleNext}>Next</button>
                            ) : (
                                <button className="continue-btn" onClick={handleSubmit}>Submit</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostPropertyEdit;
