const express = require("express");
const cors = require("cors");

const app = express();

// Store reports and complaints in memory (for demo purposes)
// In production, you should use a database like MongoDB or PostgreSQL
let reports = [];
let complaints = [];

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ 
    message: "Suraksha Setu Backend API",
    version: "1.0.0",
    endpoints: {
      reports: "/reports",
      complaints: "/complaints",
      submitReport: "/report",
      submitComplaint: "/complaint"
    }
  });
});

// Get all reports
app.get("/reports", (req, res) => {
  res.json(reports);
});

// Get all complaints
app.get("/complaints", (req, res) => {
  res.json(complaints);
});

// report route
app.post("/report", (req, res) => {
  console.log("Report received:", req.body);

  // Store the report
  reports.push({
    ...req.body,
    id: Date.now(),
    timestamp: req.body.timestamp || new Date().toISOString()
  });

  console.log("Total reports:", reports.length);

  res.json({ success: true, message: "Report saved" });
});

// complaint route
app.post("/complaint", (req, res) => {
  console.log("Complaint received:", req.body);

  // Store the complaint
  complaints.push({
    ...req.body,
    id: Date.now(),
    timestamp: req.body.timestamp || new Date().toISOString()
  });

  console.log("Total complaints:", complaints.length);

  res.json({ success: true, message: "Complaint submitted successfully" });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    reports: reports.length,
    complaints: complaints.length
  });
});

// Data viewer endpoint - see all submitted data
app.get("/data", (req, res) => {
  res.json({
    timestamp: new Date().toISOString(),
    total_reports: reports.length,
    total_complaints: complaints.length,
    reports: reports,
    complaints: complaints
  });
});

const PORT = process.env.PORT || 5000;

// server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
