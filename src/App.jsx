import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PostProperty from "./pages/Post-Property";
import Listing from "./pages/Listing";

import Profile from "./pages/Profile";
import Login from "./pages/Login";
import ProtectedRoute from "./component/ProtectedRoute"; // 👈 import it
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


function App() {
  return (
    <Router>
      <Routes>
        {/* 🔓 Public Route */}
        <Route path="/" element={<Login />} />
        <Route path="/sign-in" element={<Login />} />
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
        {/* 🔒 Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/postproperty"
          element={
            <ProtectedRoute>
              <PostProperty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-postproperty/:id/:property_type"
          element={
            <ProtectedRoute>
              <UpdatePostProperty />
            </ProtectedRoute>
          }
        />


        <Route
          path="/listings"
          element={
            <ProtectedRoute>
              <Listing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
