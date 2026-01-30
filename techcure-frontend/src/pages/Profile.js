import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS, apiCall } from "../config/api";
import "./Profile.css";

function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [complaint, setComplaint] = useState({
    title: "",
    description: "",
    category: "",
    urgency: "medium",
    location: ""
  });
  
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error logging out");
    }
  };

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    
    if (!complaint.title || !complaint.description || !complaint.category) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const complaintData = {
        ...complaint,
        userEmail: user.email,
        userId: user.uid,
        timestamp: new Date().toISOString(),
        status: "pending"
      };

      const data = await apiCall(API_ENDPOINTS.COMPLAINT, {
        method: "POST",
        body: JSON.stringify(complaintData),
      });
      
      if (data.success) {
        alert("✅ Complaint submitted successfully!");
        console.log("Redirecting to complaint status...");
        // Reset form
        setComplaint({
          title: "",
          description: "",
          category: "",
          urgency: "medium",
          location: ""
        });
        // Redirect to complaint status page
        navigate("/complaint-status");
      } else {
        alert("❌ " + (data.message || "Failed to submit complaint"));
      }
    } catch (error) {
      console.error("Complaint submission error:", error);
      alert("❌ Error submitting complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setComplaint({
      ...complaint,
      [e.target.name]: e.target.value
    });
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-box">
          <h2>Please login to view profile</h2>
          <button onClick={() => navigate("/login")} className="login-btn">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-box">
        {/* User Info Section */}
        <div className="user-info">
          <div className="user-avatar">
            <span className="avatar-text">{user.email[0].toUpperCase()}</span>
          </div>
          <div className="user-details">
            <h2 className="user-email">{user.email}</h2>
            <p className="user-status">Verified User</p>
          </div>
          <div className="user-actions">
            <Link to="/complaint-status" className="view-status-btn">
              📋 View Complaint Status
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>

        {/* Complaint Form Section */}
        <div className="complaint-section">
          <h3 className="section-title">File a Complaint</h3>
          
          <form onSubmit={handleComplaintSubmit} className="complaint-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={complaint.category}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Women Safety">Women Safety</option>
                  <option value="Child Safety">Child Safety</option>
                  <option value="Community Issue">Community Issue</option>
                  <option value="Traffic Violation">Traffic Violation</option>
                  <option value="Noise Pollution">Noise Pollution</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="urgency">Urgency Level</label>
                <select
                  id="urgency"
                  name="urgency"
                  value={complaint.urgency}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="title">Complaint Title *</label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Brief title of your complaint"
                value={complaint.title}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location (Optional)</label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Where did this incident occur?"
                value={complaint.location}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Detailed Description *</label>
              <textarea
                id="description"
                name="description"
                placeholder="Provide detailed description of the incident..."
                value={complaint.description}
                onChange={handleChange}
                className="form-textarea"
                rows="4"
                required
              />
            </div>

            <button 
              type="submit" 
              className="submit-complaint-btn"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Complaint"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
