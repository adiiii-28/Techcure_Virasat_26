import { useState, useEffect } from "react";
import "./Reports.css";

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch("http://localhost:5000/reports");
      const data = await res.json();
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading reports...</div>;
  }

  return (
    <div className="reports-container">
      <h2 className="reports-title">📋 All Submitted Reports</h2>
      
      {reports.length === 0 ? (
        <div className="no-reports">
          <p>No reports submitted yet.</p>
        </div>
      ) : (
        <div className="reports-grid">
          {reports.map((report, index) => (
            <div key={index} className="report-card">
              <div className="report-header">
                <span className="report-type">{report.type}</span>
                <span className="report-time">
                  {new Date(report.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="report-description">
                <p>{report.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <button onClick={fetchReports} className="refresh-btn">
        🔄 Refresh Reports
      </button>
    </div>
  );
}

export default Reports;
