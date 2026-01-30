// Vercel deployment trigger
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Report from "./pages/Report";
import Reports from "./pages/Reports";
import Help from "./pages/Help";
import PoliceStations from "./pages/PoliceStation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ComplaintStatus from "./pages/ComplaintStatus";
import TestComplaint from "./pages/TestComplaint";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/police" element={<PoliceStations />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/complaint-status" element={<ComplaintStatus />} />
          <Route path="/test-complaint" element={<TestComplaint />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;