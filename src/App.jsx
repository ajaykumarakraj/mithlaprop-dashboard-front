import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PostProperty from "./pages/Post-Property";
import Listing from "./pages/Listing";

import Profile from "./pages/Profile";
import Login from "./pages/Login";
import ProtectedRoute from "./component/ProtectedRoute"; // 👈 import it
import Residentialproperty from "./pages/Residential-property";
import Amenities from "./pages/Amenities";
import Imageupload from "./pages/Images-upload";
import ResidentialPlot from "./pages/Residential-Plot";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔓 Public Route */}
        <Route path="/sign-in" element={<Login />} />
        <Route path="/Residential-Property" element={<Residentialproperty />} />
        <Route path="/Residential-Plot" element={<ResidentialPlot />} />
        <Route path="/amenities" element={<Amenities />} />
        <Route path="/image-upload" element={<Imageupload />} />
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
