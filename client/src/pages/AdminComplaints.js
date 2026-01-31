import { useState, useEffect } from "react";
import { API_ENDPOINTS, apiCall } from "../config/api";
import "./AdminComplaints.css";

function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllComplaints();
  }, []);

  const fetchAllComplaints = async () => {
    try {
      const data = await apiCall(API_ENDPOINTS.COMPLAINTS);
      setComplaints(data.reverse()); // Show latest first
    } catch (error) {
      setError("Failed to fetch complaints");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (complaintId, newStatus) => {
    try {
      // This would need to be implemented in backend
      alert("Status update feature coming soon!");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "#f59e0b";
      case "in-progress": return "#3b82f6";
      case "resolved": return "#10b981";
      default: return "#6b7280";
    }
  };

  if (loading) return <div className="loading">Loading complaints...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-complaints">
      <div className="admin-header">
        <h1>📋 All User Complaints</h1>
        <button onClick={fetchAllComplaints} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h3>Total Complaints</h3>
          <p>{complaints.length}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p>{complaints.filter(c => c.status === 'pending').length}</p>
        </div>
        <div className="stat-card">
          <h3>Resolved</h3>
          <p>{complaints.filter(c => c.status === 'resolved').length}</p>
        </div>
      </div>

      {complaints.length === 0 ? (
        <div className="no-complaints">
          <h3>No complaints found</h3>
          <p>Users haven't submitted any complaints yet.</p>
        </div>
      ) : (
        <div className="complaints-list">
          {complaints.map((complaint) => (
            <div key={complaint.id} className="complaint-card">
              <div className="complaint-header">
                <div className="complaint-info">
                  <h3>{complaint.name}</h3>
                  <p className="email">{complaint.email}</p>
                  <p className="date">{new Date(complaint.timestamp).toLocaleString()}</p>
                </div>
                <div className="complaint-status">
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(complaint.status) }}
                  >
                    {complaint.status || 'pending'}
                  </span>
                </div>
              </div>
              
              <div className="complaint-content">
                <h4>Complaint:</h4>
                <p>{complaint.complaint}</p>
                
                {complaint.location && (
                  <div className="complaint-location">
                    <h4>Location:</h4>
                    <p>{complaint.location}</p>
                  </div>
                )}
              </div>

              <div className="complaint-actions">
                <button 
                  onClick={() => updateStatus(complaint.id, 'in-progress')}
                  className="action-btn progress-btn"
                >
                  Mark In Progress
                </button>
                <button 
                  onClick={() => updateStatus(complaint.id, 'resolved')}
                  className="action-btn resolve-btn"
                >
                  Mark Resolved
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminComplaints;
