// // import{useState}from'react';import'./sos.css';export default function SOS(){const[armed,setArmed]=useState(false),[count,setCount]=useState(0);const activate=()=>{if(armed){setArmed(false);setCount(0);return}setCount(5);setArmed(true);let n=5;const t=setInterval(()=>{n--;setCount(n);if(n<=0)clearInterval(t)},1000)};return <section id="sos" className="sos"><div className="sos-copy"><span>06 / SAFETY LAYER</span><h2>When the journey<br/>needs a <i>backup.</i></h2><p>A visible safety layer for trusted contacts, live location and emergency alerts. The current button is a frontend simulation for your SIH demo.</p><div className="sos-checks"><div><b>01</b><span>Trusted contact</span></div><div><b>02</b><span>Live location</span></div><div><b>03</b><span>Emergency alert</span></div></div></div><div className={'sos-console '+(armed?'armed':'')}><div className="sos-ring ring-1"/><div className="sos-ring ring-2"/><button onClick={activate} className="sos-button"><span>{armed?(count>0?count:'✓'):'SOS'}</span><small>{armed?'CANCEL':'HOLD / ACTIVATE'}</small></button><div className="sos-status"><span className="status-dot"/>{armed?'EMERGENCY FLOW ARMED':'SAFETY SYSTEM READY'}</div></div></section>}


// import { useState, useEffect } from "react";
// import "./sos.css";

// export default function SOS() {
//   const [armed, setArmed] = useState(false);
//   const [count, setCount] = useState(0);
//   const [location, setLocation] = useState(null);
//   const [locationError, setLocationError] = useState("");

//   const getLocation = () => {
//     if (!navigator.geolocation) {
//       setLocationError("Geolocation is not supported by this browser.");
//       return;
//     }

//     setLocationError("");

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           accuracy: position.coords.accuracy,
//         });
//       },
//       (error) => {
//         setLocationError("Location permission denied or unavailable.");
//         console.error(error);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 0,
//       }
//     );
//   };

//   const activate = () => {
//     // Cancel SOS
//     if (armed) {
//       setArmed(false);
//       setCount(0);
//       return;
//     }

//     setCount(5);
//     setArmed(true);

//     let n = 5;

//     const timer = setInterval(() => {
//       n--;
//       setCount(n);

//       if (n <= 0) {
//         clearInterval(timer);

//         // Get user's location after countdown
//         getLocation();
//       }
//     }, 1000);
//   };

//   // Keep getting updated location while SOS is active
//   useEffect(() => {
//     let watchId;

//     if (armed && navigator.geolocation) {
//       watchId = navigator.geolocation.watchPosition(
//         (position) => {
//           setLocation({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             accuracy: position.coords.accuracy,
//           });
//         },
//         (error) => {
//           console.error(error);
//         },
//         {
//           enableHighAccuracy: true,
//           maximumAge: 5000,
//         }
//       );
//     }

//     return () => {
//       if (watchId) {
//         navigator.geolocation.clearWatch(watchId);
//       }
//     };
//   }, [armed]);

//   return (
//     <section id="sos" className="sos">

//       <div className="sos-copy">
//         <span>06 / SAFETY LAYER</span>

//         <h2>
//           When the journey
//           <br />
//           needs a <i>backup.</i>
//         </h2>

//         <p>
//           A visible safety layer for trusted contacts, live location
//           and emergency alerts. The SOS button activates your live
//           location for this demo.
//         </p>

//         <div className="sos-checks">
//           <div>
//             <b>01</b>
//             <span>Trusted contact</span>
//           </div>

//           <div>
//             <b>02</b>
//             <span>Live location</span>
//           </div>

//           <div>
//             <b>03</b>
//             <span>Emergency alert</span>
//           </div>
//         </div>
//       </div>

//       <div className={"sos-console " + (armed ? "armed" : "")}>

//         <div className="sos-ring ring-1" />
//         <div className="sos-ring ring-2" />

//         <button onClick={activate} className="sos-button">
//           <span>
//             {armed ? (count > 0 ? count : "✓") : "SOS"}
//           </span>

//           <small>
//             {armed ? "CANCEL" : "HOLD / ACTIVATE"}
//           </small>
//         </button>

//         <div className="sos-status">
//           <span className="status-dot" />

//           {armed
//             ? "EMERGENCY FLOW ARMED"
//             : "SAFETY SYSTEM READY"}
//         </div>

//         {/* LOCATION CARD */}
//         {location && (
//           <div className="location-card">

//             <div className="location-title">
//               📍 LIVE LOCATION
//             </div>

//             <div className="coordinates">
//               <div>
//                 <span>LATITUDE</span>
//                 <strong>
//                   {location.latitude.toFixed(6)}
//                 </strong>
//               </div>

//               <div>
//                 <span>LONGITUDE</span>
//                 <strong>
//                   {location.longitude.toFixed(6)}
//                 </strong>
//               </div>
//             </div>

//             <div className="accuracy">
//               Accuracy: ±{Math.round(location.accuracy)} meters
//             </div>

//             <a
//               href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="map-button"
//             >
//               OPEN IN GOOGLE MAPS →
//             </a>

//           </div>
//         )}

//         {locationError && (
//           <div className="location-error">
//             ⚠️ {locationError}
//           </div>
//         )}

//       </div>
//     </section>
//   );
// }

import { useState, useEffect } from "react";
import "./sos.css";

export default function SOS() {
  const [armed, setArmed] = useState(false);
  const [count, setCount] = useState(0);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // SEND LOCATION TO BACKEND
  const sendSOS = async (latitude, longitude) => {
    console.log("🚨 SEND SOS FUNCTION CALLED");
console.log("Latitude:", latitude);
console.log("Longitude:", longitude);
    try {
      setSending(true);
      setLocationError("");
console.log("📡 SENDING TO BACKEND...");
      const response = await fetch("http://localhost:8080/api/sos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1,
          teamMemberId: 1,
          latitude: latitude,
          longitude: longitude,
          emergencyType: "Travel Emergency",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send SOS");
      }

      const data = await response.json();

      console.log("🚨 SOS SENT TO BACKEND:", data);

      setSent(true);
      setSending(false);
    } catch (error) {
      console.error("❌ SOS BACKEND ERROR:", error);
      setLocationError("Unable to send SOS to server.");
      setSending(false);
    }
  };

  // GET USER LOCATION
  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(
        "Geolocation is not supported by this browser."
      );
      return;
    }

    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const newLocation = {
          latitude,
          longitude,
          accuracy: position.coords.accuracy,
        };

        setLocation(newLocation);

        // SEND LOCATION TO BACKEND
        sendSOS(latitude, longitude);
      },
      (error) => {
        console.error("LOCATION ERROR:", error);

        setLocationError(
          "Location permission denied or unavailable."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
      }
    );
  };

  // SOS BUTTON
  const activate = () => {
    console.log("🚨 SOS BUTTON CLICKED");
    // CANCEL
    if (armed) {
      setArmed(false);
      setCount(0);
      setSent(false);
      return;
    }

    setCount(5);
    setArmed(true);
    setSent(false);

    let n = 5;

    const timer = setInterval(() => {
      n--;

      setCount(n);

      if (n <= 0) {
        clearInterval(timer);

        // GET LOCATION AFTER COUNTDOWN
        getLocation();
      }
    }, 1000);
  };

  // LIVE LOCATION TRACKING
  useEffect(() => {
    let watchId;

    if (armed && navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          setLocation({
            latitude,
            longitude,
            accuracy: position.coords.accuracy,
          });
        },
        (error) => {
          console.error("LIVE LOCATION ERROR:", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 5000,
        }
      );
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [armed]);

  return (
    <section id="sos" className="sos">

      <div className="sos-copy">

        <span>06 / SAFETY LAYER</span>

        <h2>
          When the journey
          <br />
          needs a <i>backup.</i>
        </h2>

        <p>
          A visible safety layer for trusted contacts, live
          location and emergency alerts. The SOS button activates
          your live location.
        </p>

        <div className="sos-checks">

          <div>
            <b>01</b>
            <span>Trusted contact</span>
          </div>

          <div>
            <b>02</b>
            <span>Live location</span>
          </div>

          <div>
            <b>03</b>
            <span>Emergency alert</span>
          </div>

        </div>

      </div>

      <div
        className={
          "sos-console " + (armed ? "armed" : "")
        }
      >

        <div className="sos-ring ring-1" />
        <div className="sos-ring ring-2" />

        <button
          onClick={activate}
          className="sos-button"
        >

          <span>
            {armed
              ? count > 0
                ? count
                : "✓"
              : "SOS"}
          </span>

          <small>
            {armed ? "CANCEL" : "HOLD / ACTIVATE"}
          </small>

        </button>

        <div className="sos-status">

          <span className="status-dot" />

          {sending
            ? "SENDING SOS..."
            : sent
            ? "SOS SENT SUCCESSFULLY"
            : armed
            ? "EMERGENCY FLOW ARMED"
            : "SAFETY SYSTEM READY"}

        </div>

        {/* LOCATION CARD */}

        {location && (
          <div className="location-card">

            <div className="location-title">
              📍 LIVE LOCATION
            </div>

            <div className="coordinates">

              <div>
                <span>LATITUDE</span>

                <strong>
                  {location.latitude.toFixed(6)}
                </strong>
              </div>

              <div>
                <span>LONGITUDE</span>

                <strong>
                  {location.longitude.toFixed(6)}
                </strong>
              </div>

            </div>

            <div className="accuracy">
              Accuracy: ±
              {Math.round(location.accuracy)}
              {" "}meters
            </div>

            <a
              href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="map-button"
            >
              OPEN IN GOOGLE MAPS →
            </a>

          </div>
        )}

        {locationError && (
          <div className="location-error">
            ⚠️ {locationError}
          </div>
        )}

      </div>

    </section>
  );
}
