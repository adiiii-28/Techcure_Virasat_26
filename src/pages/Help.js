import "./Help.css";

function Help() {

  const helplines = [
    {
      title: "National Emergency",
      number: "112",
      desc: "For any immediate emergency help"
    },
    {
      title: "Women Helpline",
      number: "1091",
      desc: "Support for women facing harassment or violence"
    },
    {
      title: "Child Abuse Helpline",
      number: "1098",
      desc: "Help for children in distress or abuse cases"
    },
    {
      title: "Police Control Room",
      number: "100",
      desc: "Direct police emergency support"
    },
    {
      title: "Ambulance",
      number: "108",
      desc: "Medical emergency and ambulance services"
    }
  ];

  return (
    <div className="help-container">
      <h1 className="help-title">🛟 Emergency Help & Helplines</h1>

      <div className="helpline-list">
        {helplines.map((item, index) => (
          <div key={index} className="helpline-card">
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <p className="number">📞 {item.number}</p>
            <a href={`tel:${item.number}`} className="call-btn">
              Call Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Help;
