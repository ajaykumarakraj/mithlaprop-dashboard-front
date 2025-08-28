import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import PostProperty from "./pages/PostProperty"
import Listing from "./pages/Listing"
import PostPropertyEdit from "./pages/PostPropertyEdit"
import Profile from "./pages/Profile"
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/postproperty" element={<PostProperty />} />
          <Route path="/postpropertyEdit" element={<PostPropertyEdit />} />
          <Route path="/listings" element={<Listing />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
