import { useState } from "react";
import { API_ENDPOINTS, apiCall } from "../config/api";
import "./Report.css";

function Report() {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!type || !description) {
      alert("Please fill in all fields");
      return;
    }

    const reportData = {
      type,
      description,
      timestamp: new Date().toISOString(),
    };

    try {
      const data = await apiCall(API_ENDPOINTS.REPORT, {
        method: "POST",
        body: JSON.stringify(reportData),
      });
      
      if (data.success) {
        alert("✅ Report submitted successfully!");
        setType("");
        setDescription("");
      } else {
        alert("❌ " + (data.message || "Failed to submit report"));
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("❌ Error submitting report. Please check if the server is running and try again.");
    }
  };

  return (
    <div className="report-container">
      <div className="report-content"> {/* ✅ yaha fix kiya */}
        <h2 className="report-title">🚨 Report Incident</h2>

        <form onSubmit={handleSubmit}>

          <label>Incident Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select type</option>
            <option value="Women Safety">Women Safety</option>
            <option value="Child Safety">Child Safety</option>
            <option value="Community Issue">Community Issue</option>
          </select>

          <label>Description</label>
          <textarea
            placeholder="Describe the incident..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <button type="submit">Submit Report</button>

        </form>
      </div>
    </div>
  );
}

export default Report;
