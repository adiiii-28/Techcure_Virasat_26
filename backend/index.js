const express = require("express");
const cors = require("cors");
require('dotenv').config();
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

const app = express();

// Import models
const Report = require('./models/Report');
const Complaint = require('./models/Complaint');

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
app.get("/reports", async (req, res) => {
  try {
    const reports = await Report.find().sort({ timestamp: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

// Get all complaints
app.get("/complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ timestamp: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});

// report route
app.post("/report", async (req, res) => {
  try {
    console.log("Report received:", req.body);

    // Create new report in MongoDB
    const newReport = new Report({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      incident: req.body.incident,
      location: req.body.location,
      description: req.body.description
    });

    const savedReport = await newReport.save();
    console.log("Report saved to MongoDB:", savedReport);

    res.json({ 
      success: true, 
      message: "Report submitted successfully!",
      reportId: savedReport._id
    });
  } catch (error) {
    console.error("Error saving report:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to submit report" 
    });
  }
});

// complaint route
app.post("/complaint", async (req, res) => {
  try {
    console.log("Complaint received:", req.body);

    // Create new complaint in MongoDB
    const newComplaint = new Complaint({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      complaint: req.body.complaint,
      location: req.body.location,
      userId: req.body.userId
    });

    const savedComplaint = await newComplaint.save();
    console.log("Complaint saved to MongoDB:", savedComplaint);

    res.json({ 
      success: true, 
      message: "Complaint submitted successfully!",
      complaintId: savedComplaint._id
    });
  } catch (error) {
    console.error("Error saving complaint:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to submit complaint" 
    });
  }
});

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    const reportCount = await Report.countDocuments();
    const complaintCount = await Complaint.countDocuments();
    
    res.json({ 
      status: "healthy", 
      timestamp: new Date().toISOString(),
      reports: reportCount,
      complaints: complaintCount,
      database: "MongoDB"
    });
  } catch (error) {
    res.json({ 
      status: "healthy", 
      timestamp: new Date().toISOString(),
      reports: 0,
      complaints: 0,
      database: "MongoDB (connection error)"
    });
  }
});

// Data viewer endpoint - see all submitted data
app.get("/data", async (req, res) => {
  try {
    const reports = await Report.find().sort({ timestamp: -1 });
    const complaints = await Complaint.find().sort({ timestamp: -1 });
    
    res.json({
      timestamp: new Date().toISOString(),
      total_reports: reports.length,
      total_complaints: complaints.length,
      database: "MongoDB",
      reports: reports,
      complaints: complaints
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from MongoDB" });
  }
});

const PORT = process.env.PORT || 5000;

// server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
