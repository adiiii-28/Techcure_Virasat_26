import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS, apiCall } from "../config/api";
import "./ComplaintStatus.css";

function ComplaintStatus() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    console.log("ComplaintStatus mounted, user:", user);
    if (!user) {
      console.log("No user found, redirecting to login");
      navigate("/login");
      return;
    }
    fetchComplaints();
  }, [user, navigate]);

  const fetchComplaints = async () => {
    try {
      console.log("Fetching complaints...");
      const data = await apiCall(API_ENDPOINTS.COMPLAINTS);
      console.log("All complaints:", data);
      console.log("Current user:", user);
      
      // Filter complaints for current user
      const userComplaints = data.filter(complaint => 
        complaint.userId === user.uid || complaint.userEmail === user.email
      );
      
      console.log("User complaints:", userComplaints);
      setComplaints(userComplaints);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      alert("Error fetching complaints. Please check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    if (filter === "all") return true;
    return complaint.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "#f59e0b";
      case "in-progress": return "#3b82f6";
      case "resolved": return "#10b981";
      case "rejected": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "low": return "#10b981";
      case "medium": return "#f59e0b";
      case "high": return "#ef4444";
      case "urgent": return "#dc2626";
      default: return "#6b7280";
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) {
    return (
      <div className="complaint-status-container">
        <div className="status-box">
          <h2>Please login to view complaint status</h2>
          <button onClick={() => navigate("/login")} className="login-btn">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="complaint-status-container">
        <div className="status-box">
          <div className="loading-spinner"></div>
          <p>Loading your complaints...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="complaint-status-container">
      <div className="status-box">
        <div className="status-header">
          <h2 className="status-title">Your Complaint Status</h2>
          <p className="status-subtitle">Track and manage your submitted complaints</p>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All ({complaints.length})
          </button>
          <button 
            className={`filter-tab ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            Pending ({complaints.filter(c => c.status === "pending").length})
          </button>
          <button 
            className={`filter-tab ${filter === "in-progress" ? "active" : ""}`}
            onClick={() => setFilter("in-progress")}
          >
            In Progress ({complaints.filter(c => c.status === "in-progress").length})
          </button>
          <button 
            className={`filter-tab ${filter === "resolved" ? "active" : ""}`}
            onClick={() => setFilter("resolved")}
          >
            Resolved ({complaints.filter(c => c.status === "resolved").length})
          </button>
        </div>

        {/* Complaints List */}
        {filteredComplaints.length === 0 ? (
          <div className="no-complaints">
            <div className="no-complaints-icon">📋</div>
            <h3>No complaints found</h3>
            <p>
              {filter === "all" 
                ? "You haven't submitted any complaints yet." 
                : `No complaints with status "${filter}" found.`}
            </p>
            <button 
              onClick={() => navigate("/profile")} 
              className="file-complaint-btn"
            >
              File a Complaint
            </button>
          </div>
        ) : (
          <div className="complaints-list">
            {filteredComplaints.map((complaint) => (
              <div key={complaint.id} className="complaint-card">
                <div className="complaint-header">
                  <div className="complaint-title-section">
                    <h3 className="complaint-title">{complaint.title}</h3>
                    <span className="complaint-category">{complaint.category}</span>
                  </div>
                  <div className="complaint-meta">
                    <span 
                      className="status-badge" 
                      style={{ backgroundColor: getStatusColor(complaint.status) }}
                    >
                      {complaint.status?.toUpperCase() || "PENDING"}
                    </span>
                    <span 
                      className="urgency-badge"
                      style={{ backgroundColor: getUrgencyColor(complaint.urgency) }}
                    >
                      {complaint.urgency?.toUpperCase() || "MEDIUM"}
                    </span>
                  </div>
                </div>

                <div className="complaint-body">
                  <p className="complaint-description">{complaint.description}</p>
                  
                  {complaint.location && (
                    <div className="complaint-location">
                      <span className="location-icon">📍</span>
                      <span>{complaint.location}</span>
                    </div>
                  )}

                  <div className="complaint-footer">
                    <div className="complaint-id">
                      <span className="id-label">ID:</span>
                      <span className="id-value">#{complaint.id}</span>
                    </div>
                    <div className="complaint-date">
                      <span className="date-icon">🕐</span>
                      <span>{formatDate(complaint.timestamp)}</span>
                    </div>
                  </div>
                </div>

                {/* Status Progress */}
                <div className="status-progress">
                  <div className="progress-steps">
                    <div className={`step ${complaint.status === "pending" || complaint.status === "in-progress" || complaint.status === "resolved" ? "completed" : ""}`}>
                      <div className="step-icon">📝</div>
                      <span>Submitted</span>
                    </div>
                    <div className={`step ${complaint.status === "in-progress" || complaint.status === "resolved" ? "completed" : ""}`}>
                      <div className="step-icon">🔍</div>
                      <span>Under Review</span>
                    </div>
                    <div className={`step ${complaint.status === "resolved" ? "completed" : ""}`}>
                      <div className="step-icon">✅</div>
                      <span>Resolved</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Refresh Button */}
        <div className="refresh-section">
          <button onClick={fetchComplaints} className="refresh-btn">
            🔄 Refresh Status
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComplaintStatus;
