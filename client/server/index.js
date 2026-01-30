const express = require("express");
const cors = require("cors");

const app = express();

// Store reports and complaints in memory (for demo purposes)
let reports = [];
let complaints = [];

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend running");
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
  console.log("Report received:");
  console.log(req.body);

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
  console.log("Complaint received:");
  console.log(req.body);

  // Store the complaint
  complaints.push({
    ...req.body,
    id: Date.now(),
    timestamp: req.body.timestamp || new Date().toISOString()
  });

  console.log("Total complaints:", complaints.length);

  res.json({ success: true, message: "Complaint submitted successfully" });
});

// server start
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});