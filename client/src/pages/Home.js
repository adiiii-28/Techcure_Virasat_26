import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Women & Child Safety Portal</h1>
        <p className="home-subtitle">
          Your safety is our priority. Report incidents quickly and get help instantly.
        </p>

        <button 
          className="report-btn"
          onClick={() => navigate("/report")}
        >
          Report a Complaint
        </button>
      </div>
    </div>
  );
}

export default Home;
