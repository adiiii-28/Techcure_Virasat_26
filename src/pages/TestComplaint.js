import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

function TestComplaint() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setError("No user logged in");
      return;
    }

    const testFetch = async () => {
      try {
        console.log("Testing fetch...");
        const res = await fetch("http://localhost:5000/complaints");
        const data = await res.json();
        console.log("Raw data:", data);
        
        const userComplaints = data.filter(c => 
          c.userId === user.uid || c.userEmail === user.email
        );
        
        console.log("Filtered for user:", user.email, user.uid);
        console.log("User complaints:", userComplaints);
        
        setComplaints(userComplaints);
      } catch (err) {
        console.error("Test error:", err);
        setError(err.message);
      }
    };

    testFetch();
  }, [user]);

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Test Complaint Page</h2>
      <p>User: {user?.email}</p>
      <p>User ID: {user?.uid}</p>
      <p>Error: {error}</p>
      <h3>Complaints ({complaints.length}):</h3>
      {complaints.map((c, i) => (
        <div key={i} style={{ background: "#333", padding: "10px", margin: "10px 0" }}>
          <p><strong>Title:</strong> {c.title}</p>
          <p><strong>Description:</strong> {c.description}</p>
          <p><strong>Status:</strong> {c.status}</p>
        </div>
      ))}
    </div>
  );
}

export default TestComplaint;
