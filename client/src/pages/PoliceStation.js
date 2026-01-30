import "./PoliceStation.css";

function PoliceStations() {
  const stations = [
    { name: "Patliputra Police", address: "Main Road, Patliputra", phone: "100" },
    { name: "Kotwali Thana", address: "Central Area, Kotwali", phone: "100" },
    { name: "Buddha Colony Police", address: "Buddha Colony", phone: "100" }
  ];

  return (
    <div className="police-container">
      <h1 className="police-title">Nearby Police Stations</h1>

      <input 
        type="text" 
        placeholder="Search Police Station..." 
        className="search-box"
      />

      <div className="station-list">
        {stations.map((station, index) => (
          <div key={index} className="station-card">
            <h3>{station.name}</h3>
            <p>{station.address}</p>
            <p className="phone">📞 {station.phone}</p>
            <button className="call-btn">Call Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PoliceStations;
