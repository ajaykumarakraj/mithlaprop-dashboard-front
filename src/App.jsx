import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostProperty from "./pages/Post-Property";
import Listing from "./pages/Listing";

import Profile from "./pages/Profile";
import Login from "./pages/Login";
import ProtectedRoute from "./component/ProtectedRoute"
import Residentialproperty from "./pages/Residential-property";
import Amenities from "./pages/Amenities";
import SubmitForm from "./pages/Submit-Form";

import CommercialProperty from "./pages/Commercial-Property";
import PropertyPlot from "./pages/Property-Plot";
import UpdatePostProperty from "./pages/Update-Post-Property";
import UpdateResidentialproperty from "./pages/Update-Residential-property";
import UpdateAmenities from "./pages/Update-Amenities";
import UpdateSubmitForm from "./pages/Upadte-Submit-Form";
import UpdateCommercialProperty from "./pages/Update-Commercial-Property";
import UpdatePropertyPlot from "./pages/Update-Property-Plot";

import Signup from "./pages/Signup";


function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />

        {/* Protected Routes Wrapper */}
        <Route element={<ProtectedRoute />}>
          <Route path="/residential-property" element={<Residentialproperty />} />
          <Route path="/update-residential-property/:id/:property_type" element={<UpdateResidentialproperty />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/update-amenities/:id/:property_type" element={<UpdateAmenities />} />
          <Route path="/commercial-property" element={<CommercialProperty />} />
          <Route path="/update-commercial-property/:id/:property_type" element={<UpdateCommercialProperty />} />
          <Route path="/property-plot" element={<PropertyPlot />} />
          <Route path="/update-property-plot/:id/:property_type" element={<UpdatePropertyPlot />} />
          <Route path="/submit-form" element={<SubmitForm />} />
          <Route path="/update-submit-form/:id/:property_type" element={<UpdateSubmitForm />} />
          <Route path="/postproperty" element={<PostProperty />} />
          <Route path="/update-postproperty/:id/:property_type" element={<UpdatePostProperty />} />
          <Route path="/listings" element={<Listing />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>


    </Router>
  );
}

export default App;
