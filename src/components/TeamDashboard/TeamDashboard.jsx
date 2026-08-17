import { useEffect, useState } from "react";

import "./team.css";
export default function TeamDashboard() {
  const [sosList, setSosList] = useState([]);
  const [loading, setLoading] = useState(true);

  const teamMemberId = 1;

  async function loadSOS() {
    try {
      const response = await fetch(
        `http://localhost:8080/api/team/${teamMemberId}/sos`
      );

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();

      console.log("🚨 SOS RECEIVED:", data);

      setSosList(data);
      setLoading(false);
    } catch (error) {
      console.error("❌ Cannot connect to backend:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSOS();

    const timer = setInterval(loadSOS, 5000);

    return () => clearInterval(timer);
  }, []);

  function openLocation(latitude, longitude) {
    window.open(
      `https://www.google.com/maps?q=${latitude},${longitude}`,
      "_blank"
    );
  }

  async function acceptSOS(sosId) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/sos/${sosId}/accept`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teamMemberId: 1,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Could not accept SOS");
      }

      alert("✅ SOS Accepted");

      loadSOS();
    } catch (error) {
      console.error(error);
      alert("❌ Unable to accept SOS");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#f5f5f5",
        color: "#111",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        🚨 AVYSURE Team Dashboard
      </h1>

      {loading && (
        <h2 style={{ textAlign: "center" }}>
          Loading...
        </h2>
      )}

      {!loading && sosList.length === 0 && (
        <div
          style={{
            maxWidth: "600px",
            margin: "40px auto",
            padding: "30px",
            background: "white",
            borderRadius: "15px",
            textAlign: "center",
          }}
        >
          <h2>✅ No Active SOS</h2>
          <p>Everything is safe right now.</p>
        </div>
      )}

      {sosList.map((sos) => (
        <div
          key={sos.id}
          style={{
            maxWidth: "600px",
            margin: "25px auto",
            padding: "25px",
            background: "white",
            border: "3px solid red",
            borderRadius: "15px",
          }}
        >
          <h2 style={{ color: "red" }}>
            🚨 SOS ALERT
          </h2>

          <p>
            <strong>User ID:</strong>{" "}
            {sos.userId}
          </p>

          <p>
            <strong>Emergency:</strong>{" "}
            {sos.emergencyType}
          </p>

          <p>
            <strong>Latitude:</strong>{" "}
            {sos.latitude}
          </p>

          <p>
            <strong>Longitude:</strong>{" "}
            {sos.longitude}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {sos.status}
          </p>

          <p>
            <strong>Time:</strong>{" "}
            {new Date(sos.createdAt).toLocaleString()}
          </p>

          <button
            onClick={() =>
              openLocation(
                sos.latitude,
                sos.longitude
              )
            }
            style={{
              padding: "12px 18px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            📍 View Location
          </button>

          {sos.status === "ACTIVE" && (
            <button
              onClick={() => acceptSOS(sos.id)}
              style={{
                padding: "12px 18px",
                cursor: "pointer",
              }}
            >
              ✅ Accept SOS
            </button>
          )}
        </div>
      ))}
    </div>
  );
}