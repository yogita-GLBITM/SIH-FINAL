// import { useMemo, useState } from 'react';
// import { STATES } from '../../data/states';
// import './weather.css';

// // Deterministic mock weather so the same state always shows the same
// // reading in this frontend-only demo — swap generateWeather() for a real
// // API call once the backend is wired up.
// function generateWeather(seed) {
//   let hash = 0;
//   for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) % 997;
//   const conditions = ['Misty sunrise', 'Monsoon showers', 'Clear mountain skies', 'Low cloud cover', 'Light drizzle'];
//   const icons = ['🌫️', '🌧️', '☀️', '☁️', '🌦️'];
//   const idx = hash % conditions.length;
//   return {
//     tempC: 14 + (hash % 14),
//     condition: conditions[idx],
//     icon: icons[idx],
//     humidity: 55 + (hash % 35),
//     wind: 4 + (hash % 18),
//     uv: 1 + (hash % 8),
//     advisory: idx === 1 || idx === 4
//       ? 'Trails may be slippery — pack a rain shell and check the geo-fence alerts before you head out.'
//       : 'Good visibility for ridge walks — carry a light layer for the evening drop in temperature.',
//   };
// }

// export default function LiveWeather() {
//   const [stateId, setStateId] = useState(STATES[0].id);
//   const state = STATES.find((s) => s.id === stateId);
//   const weather = useMemo(() => generateWeather(stateId), [stateId]);

//   return (
//     <section id="weather" className="section">
//       <div className="container">
//         <div className="section-head reveal">
//           <span className="eyebrow">Live weather</span>
//           <h2>Know the sky before you <span className="section-tag-word">climb</span> into it.</h2>
//           <p>Mountain weather in the North East turns fast. Check conditions per state before
//             you commit a day to it.</p>
//         </div>

//         <div className="weather-layout">
//           <div className="weather-state-list glass-panel reveal">
//             {STATES.map((s) => (
//               <button
//                 key={s.id}
//                 className={`weather-state-item ${s.id === stateId ? 'is-active' : ''}`}
//                 style={{ '--pill-accent': s.accent }}
//                 onClick={() => setStateId(s.id)}
//               >
//                 <span className="pulse-dot" style={{ background: s.accent }} />
//                 {s.name}
//               </button>
//             ))}
//           </div>

//           <div className="weather-card glass-panel reveal" style={{ '--pill-accent': state.accent }}>
//             <div className="weather-card-top">
//               <div>
//                 <span className="eyebrow">{state.name}</span>
//                 <h3>{weather.condition}</h3>
//               </div>
//               <span className="weather-icon">{weather.icon}</span>
//             </div>

//             <div className="weather-temp">
//               {weather.tempC}°<span>C</span>
//             </div>

//             <div className="weather-stats">
//               <div className="weather-stat">
//                 <span>Humidity</span>
//                 <strong>{weather.humidity}%</strong>
//               </div>
//               <div className="weather-stat">
//                 <span>Wind</span>
//                 <strong>{weather.wind} km/h</strong>
//               </div>
//               <div className="weather-stat">
//                 <span>UV Index</span>
//                 <strong>{weather.uv}</strong>
//               </div>
//             </div>

//             <div className="weather-advisory">
//               <span className="pulse-dot" style={{ background: state.accent }} />
//               <p>{weather.advisory}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// import { useEffect, useState } from "react";
// import { STATES } from "../../data/states";
// import "./weather.css";

// const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// /* -------------------------------------------------------
//    FALLBACK LOCATIONS
//    These are used when a state button is clicked.
// ------------------------------------------------------- */

// const STATE_LOCATIONS = {
//   assam: {
//     city: "Guwahati",
//     lat: 26.1445,
//     lon: 91.7362,
//   },

//   arunachal: {
//     city: "Itanagar",
//     lat: 27.0844,
//     lon: 93.6053,
//   },

//   arunachalpradesh: {
//     city: "Itanagar",
//     lat: 27.0844,
//     lon: 93.6053,
//   },

//   meghalaya: {
//     city: "Shillong",
//     lat: 25.5788,
//     lon: 91.8933,
//   },

//   manipur: {
//     city: "Imphal",
//     lat: 24.817,
//     lon: 93.9368,
//   },

//   mizoram: {
//     city: "Aizawl",
//     lat: 23.7271,
//     lon: 92.7176,
//   },

//   nagaland: {
//     city: "Kohima",
//     lat: 25.6751,
//     lon: 94.1086,
//   },

//   tripura: {
//     city: "Agartala",
//     lat: 23.8315,
//     lon: 91.2868,
//   },

//   sikkim: {
//     city: "Gangtok",
//     lat: 27.3389,
//     lon: 88.6065,
//   },
// };


// /* -------------------------------------------------------
//    WEATHER ICON
// ------------------------------------------------------- */

// function getWeatherIcon(iconCode) {
//   if (!iconCode) {
//     return "https://openweathermap.org/img/wn/01d@2x.png";
//   }

//   return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
// }


// /* -------------------------------------------------------
//    WEATHER DESCRIPTION
// ------------------------------------------------------- */

// function cleanDescription(description) {
//   if (!description) return "Weather unavailable";

//   return description.replace(/\b\w/g, (letter) =>
//     letter.toUpperCase()
//   );
// }


// /* -------------------------------------------------------
//    MAIN COMPONENT
// ------------------------------------------------------- */

// export default function Weather() {

//   const firstState = STATES?.[0];

//   const firstLocation =
//     STATE_LOCATIONS[
//       String(firstState?.id || "assam")
//         .toLowerCase()
//         .replace(/[\s_-]/g, "")
//     ] || STATE_LOCATIONS.assam;


//   const [stateId, setStateId] = useState(
//     firstState?.id || "assam"
//   );

//   const [location, setLocation] = useState(
//     firstLocation
//   );

//   const [search, setSearch] = useState("");

//   const [weather, setWeather] = useState(null);

//   const [loading, setLoading] = useState(true);

//   const [searching, setSearching] = useState(false);

//   const [error, setError] = useState("");

//   const [lastUpdated, setLastUpdated] =
//     useState(null);


//   /* -------------------------------------------------------
//      FETCH WEATHER FROM OPENWEATHER
//   ------------------------------------------------------- */

//   async function fetchWeather(place) {

//     if (!API_KEY) {

//       setError(
//         "OpenWeather API key is missing. Add VITE_OPENWEATHER_API_KEY to your .env file."
//       );

//       setLoading(false);

//       return;
//     }


//     try {

//       setLoading(true);

//       setError("");


//       const url =
//         `https://api.openweathermap.org/data/2.5/weather` +
//         `?lat=${place.lat}` +
//         `&lon=${place.lon}` +
//         `&appid=${API_KEY}` +
//         `&units=metric`;


//       const response = await fetch(url);


//       if (!response.ok) {

//         const errorData =
//           await response.json().catch(() => null);

//         throw new Error(
//           errorData?.message ||
//           `OpenWeather request failed (${response.status})`
//         );
//       }


//       const result =
//         await response.json();


//       const currentWeather =
//         result.weather?.[0];


//       setWeather({

//         temperature:
//           Math.round(result.main?.temp ?? 0),

//         feelsLike:
//           Math.round(
//             result.main?.feels_like ?? 0
//           ),

//         humidity:
//           result.main?.humidity ?? 0,

//         pressure:
//           result.main?.pressure ?? 0,

//         wind:
//           result.wind?.speed
//             ? Math.round(
//                 result.wind.speed * 3.6
//               )
//             : 0,

//         visibility:
//           result.visibility
//             ? (
//                 result.visibility / 1000
//               ).toFixed(1)
//             : "—",

//         condition:
//           cleanDescription(
//             currentWeather?.description
//           ),

//         icon:
//           currentWeather?.icon,

//         sunrise:
//           result.sys?.sunrise,

//         sunset:
//           result.sys?.sunset,

//         country:
//           result.sys?.country,

//       });


//       setLastUpdated(new Date());

//     } catch (err) {

//       console.error(
//         "OpenWeather Error:",
//         err
//       );

//       setError(
//         err.message ||
//         "Unable to load live weather."
//       );

//     } finally {

//       setLoading(false);

//     }
//   }


//   /* -------------------------------------------------------
//      SEARCH DESTINATION
//   ------------------------------------------------------- */

//   async function searchDestination(event) {

//     event.preventDefault();

//     const query =
//       search.trim();


//     if (!query) {

//       setError(
//         "Please enter a destination."
//       );

//       return;
//     }


//     if (!API_KEY) {

//       setError(
//         "OpenWeather API key is missing."
//       );

//       return;
//     }


//     try {

//       setSearching(true);

//       setLoading(true);

//       setError("");


//       /*
//         OpenWeather Geocoding API
//       */

//       const url =
//         `https://api.openweathermap.org/geo/1.0/direct` +
//         `?q=${encodeURIComponent(query)},IN` +
//         `&limit=5` +
//         `&appid=${API_KEY}`;


//       const response =
//         await fetch(url);


//       if (!response.ok) {

//         throw new Error(
//           `Location search failed (${response.status})`
//         );

//       }


//       const results =
//         await response.json();


//       if (
//         !results ||
//         results.length === 0
//       ) {

//         throw new Error(
//           "Destination not found. Try a district or city such as Tawang, Dawki, Gangtok or Shillong."
//         );

//       }


//       /*
//         Prefer Northeast India results.
//       */

//       const northeastNames = [
//         "Assam",
//         "Arunachal Pradesh",
//         "Meghalaya",
//         "Manipur",
//         "Mizoram",
//         "Nagaland",
//         "Tripura",
//         "Sikkim",
//       ];


//       const northeastResult =
//         results.find((item) =>
//           northeastNames.some(
//             (state) =>
//               item.state
//                 ?.toLowerCase()
//                 .includes(
//                   state.toLowerCase()
//                 )
//           )
//         ) || results[0];


//       const newLocation = {

//         city:
//           northeastResult.name,

//         lat:
//           northeastResult.lat,

//         lon:
//           northeastResult.lon,

//         region:
//           northeastResult.state ||
//           "",

//         country:
//           northeastResult.country ||
//           "India",

//       };


//       setLocation(
//         newLocation
//       );


//       /*
//         Try to automatically select
//         the matching Northeast state.
//       */

//       const matchingState =
//         STATES.find((state) =>
//           northeastNames.some(
//             (name) =>
//               northeastResult.state
//                 ?.toLowerCase()
//                 .includes(
//                   name.toLowerCase()
//                 ) &&
//               state.name
//                 ?.toLowerCase()
//                 .includes(
//                   name.toLowerCase()
//                 )
//           )
//         );


//       if (matchingState) {

//         setStateId(
//           matchingState.id
//         );

//       }


//       setSearch("");


//       await fetchWeather(
//         newLocation
//       );

//     } catch (err) {

//       console.error(
//         "Search error:",
//         err
//       );

//       setError(
//         err.message ||
//         "Unable to find destination."
//       );

//       setLoading(false);

//     } finally {

//       setSearching(false);

//     }

//   }


//   /* -------------------------------------------------------
//      SELECT STATE
//   ------------------------------------------------------- */

//   function selectState(id) {

//     setStateId(id);

//     const normalized =
//       String(id)
//         .toLowerCase()
//         .replace(/[\s_-]/g, "");


//     const place =
//       STATE_LOCATIONS[normalized];


//     if (!place) {

//       console.warn(
//         "No default location configured for:",
//         id
//       );

//       return;
//     }


//     setLocation(place);

//     setSearch("");

//     fetchWeather(place);

//   }


//   /* -------------------------------------------------------
//      INITIAL WEATHER
//   ------------------------------------------------------- */

//   useEffect(() => {

//     fetchWeather(
//       firstLocation
//     );

//     // eslint-disable-next-line react-hooks/exhaustive-deps

//   }, []);


//   /* -------------------------------------------------------
//      AUTO REFRESH EVERY 10 MINUTES
//   ------------------------------------------------------- */

//   useEffect(() => {

//     const interval =
//       setInterval(() => {

//         fetchWeather(
//           location
//         );

//       }, 10 * 60 * 1000);


//     return () =>
//       clearInterval(interval);

//   }, [location]);


//   /* -------------------------------------------------------
//      FORMAT TIME
//   ------------------------------------------------------- */

//   function formatTime(timestamp) {

//     if (!timestamp) {
//       return "—";
//     }


//     return new Date(
//       timestamp * 1000
//     ).toLocaleTimeString(
//       [],
//       {
//         hour: "2-digit",
//         minute: "2-digit",
//       }
//     );

//   }


//   const selectedState =
//     STATES.find(
//       (state) =>
//         state.id === stateId
//     );


//   /* -------------------------------------------------------
//      UI
//   ------------------------------------------------------- */

//   return (

//     <section
//       id="weather"
//       className="section weather-section"
//     >

//       <div className="container">


//         {/* HEADER */}

//         <div className="section-head weather-heading">

//           <span className="eyebrow">
//             LIVE WEATHER · OPENWEATHER
//           </span>

//           <h2>
//             Read the sky before you{" "}
//             <span className="section-tag-word">
//               wander.
//             </span>
//           </h2>

//           <p>
//             Live weather conditions for
//             destinations across Northeast India.
//             Search a city, district or travel
//             destination before you leave.
//           </p>

//         </div>


//         {/* SEARCH BAR */}

//         <form
//           className="weather-search"
//           onSubmit={searchDestination}
//         >

//           <div className="weather-search-symbol">
//             ⌕
//           </div>


//           <input
//             type="text"
//             value={search}
//             onChange={(event) =>
//               setSearch(
//                 event.target.value
//               )
//             }
//             placeholder="Search destination — Tawang, Dawki, Cherrapunji, Gangtok..."
//             aria-label="Search weather destination"
//           />


//           <button
//             type="submit"
//             disabled={searching}
//           >

//             {searching
//               ? "SEARCHING..."
//               : "CHECK WEATHER"}

//           </button>

//         </form>


//         {/* SEARCH SUGGESTIONS */}

//         <div className="weather-suggestions">

//           <span>TRY:</span>

//           <button
//             onClick={() => {
//               setSearch("Tawang");
//             }}
//           >
//             Tawang
//           </button>

//           <button
//             onClick={() => {
//               setSearch("Cherrapunji");
//             }}
//           >
//             Cherrapunji
//           </button>

//           <button
//             onClick={() => {
//               setSearch("Dawki");
//             }}
//           >
//             Dawki
//           </button>

//           <button
//             onClick={() => {
//               setSearch("Gangtok");
//             }}
//           >
//             Gangtok
//           </button>

//           <button
//             onClick={() => {
//               setSearch("Kaziranga");
//             }}
//           >
//             Kaziranga
//           </button>

//         </div>


//         {/* ERROR */}

//         {error && (

//           <div className="weather-error">

//             <span>⚠</span>

//             <p>
//               {error}
//             </p>

//             <button
//               onClick={() =>
//                 fetchWeather(
//                   location
//                 )
//               }
//             >
//               RETRY
//             </button>

//           </div>

//         )}


//         {/* STATE NAVIGATION */}

//         <div className="weather-states">

//           {STATES.map((state) => (

//             <button
//               key={state.id}
//               type="button"
//               className={
//                 `weather-state-item ${
//                   state.id === stateId
//                     ? "is-active"
//                     : ""
//                 }`
//               }
//               style={{
//                 "--state-accent":
//                   state.accent ||
//                   "#52d6ae",
//               }}
//               onClick={() =>
//                 selectState(
//                   state.id
//                 )
//               }
//             >

//               <span
//                 className="state-dot"
//                 style={{
//                   background:
//                     state.accent ||
//                     "#52d6ae",
//                 }}
//               />

//               <span>
//                 {state.name}
//               </span>

//             </button>

//           ))}

//         </div>


//         {/* WEATHER CARD */}

//         <div
//           className="weather-main-card"
//           style={{
//             "--state-accent":
//               selectedState?.accent ||
//               "#52d6ae",
//           }}
//         >

//           {/* DECORATIVE ELEMENTS */}

//           <div className="weather-glow" />

//           <div className="weather-orbit orbit-one" />

//           <div className="weather-orbit orbit-two" />


//           {loading ? (

//             /* LOADING */

//             <div className="weather-loading">

//               <div className="weather-loading-icon">
//                 🌤️
//               </div>

//               <h3>
//                 Reading the sky...
//               </h3>

//               <p>
//                 Fetching live conditions for{" "}
//                 {location.city}.
//               </p>

//               <div className="weather-loader">
//                 <span />
//                 <span />
//                 <span />
//               </div>

//             </div>

//           ) : weather ? (

//             /* WEATHER */

//             <>

//               {/* TOP */}

//               <div className="weather-top">

//                 <div>

//                   <div className="weather-live-label">

//                     <span className="live-dot" />

//                     LIVE CONDITIONS

//                   </div>


//                   <div className="weather-location">

//                     <h3>
//                       {location.city}
//                     </h3>

//                     <span>
//                       {location.region ||
//                         selectedState?.name ||
//                         "Northeast India"}
//                     </span>

//                   </div>

//                 </div>


//                 <div className="weather-icon-box">

//                   <img
//                     src={getWeatherIcon(
//                       weather.icon
//                     )}
//                     alt={
//                       weather.condition
//                     }
//                   />

//                 </div>

//               </div>


//               {/* MAIN TEMPERATURE */}

//               <div className="weather-temperature">

//                 <strong>
//                   {weather.temperature}
//                 </strong>

//                 <span>
//                   °C
//                 </span>

//               </div>


//               <div className="weather-condition">

//                 {weather.condition}

//               </div>


//               {/* FEELS LIKE */}

//               <div className="weather-feels">

//                 Feels like{" "}

//                 <strong>
//                   {weather.feelsLike}°C
//                 </strong>

//               </div>


//               {/* STAT GRID */}

//               <div className="weather-stat-grid">


//                 <div className="weather-stat-card">

//                   <span className="stat-icon">
//                     💧
//                   </span>

//                   <div>

//                     <small>
//                       HUMIDITY
//                     </small>

//                     <strong>
//                       {weather.humidity}%
//                     </strong>

//                   </div>

//                 </div>


//                 <div className="weather-stat-card">

//                   <span className="stat-icon">
//                     💨
//                   </span>

//                   <div>

//                     <small>
//                       WIND
//                     </small>

//                     <strong>
//                       {weather.wind} km/h
//                     </strong>

//                   </div>

//                 </div>


//                 <div className="weather-stat-card">

//                   <span className="stat-icon">
//                     👁
//                   </span>

//                   <div>

//                     <small>
//                       VISIBILITY
//                     </small>

//                     <strong>
//                       {weather.visibility} km
//                     </strong>

//                   </div>

//                 </div>


//                 <div className="weather-stat-card">

//                   <span className="stat-icon">
//                     ◉
//                   </span>

//                   <div>

//                     <small>
//                       PRESSURE
//                     </small>

//                     <strong>
//                       {weather.pressure} hPa
//                     </strong>

//                   </div>

//                 </div>

//               </div>


//               {/* SUN INFORMATION */}

//               <div className="weather-sun">

//                 <div>

//                   <span>
//                     🌅
//                   </span>

//                   <div>
//                     <small>
//                       SUNRISE
//                     </small>

//                     <strong>
//                       {formatTime(
//                         weather.sunrise
//                       )}
//                     </strong>
//                   </div>

//                 </div>


//                 <div>

//                   <span>
//                     🌇
//                   </span>

//                   <div>
//                     <small>
//                       SUNSET
//                     </small>

//                     <strong>
//                       {formatTime(
//                         weather.sunset
//                       )}
//                     </strong>
//                   </div>

//                 </div>


//                 <div className="weather-source">

//                   <small>
//                     WEATHER SOURCE
//                   </small>

//                   <strong>
//                     OpenWeather
//                   </strong>

//                 </div>

//               </div>


//               {/* ADVISORY */}

//               <div className="weather-advisory">

//                 <span className="advisory-icon">
//                   ✦
//                 </span>

//                 <div>

//                   <small>
//                     TRAVEL NOTE
//                   </small>

//                   <p>

//                     Conditions can change quickly
//                     across mountain terrain. Check
//                     the weather again before starting
//                     your journey.

//                   </p>

//                 </div>

//               </div>


//               {/* FOOTER */}

//               <div className="weather-footer">

//                 <div>

//                   <span className="live-dot" />

//                   LIVE DATA

//                 </div>


//                 <span>
//                   {location.city}
//                 </span>


//                 {lastUpdated && (

//                   <span>
//                     Updated{" "}
//                     {lastUpdated.toLocaleTimeString(
//                       [],
//                       {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       }
//                     )}
//                   </span>

//                 )}


//                 <button
//                   type="button"
//                   onClick={() =>
//                     fetchWeather(
//                       location
//                     )
//                   }
//                 >

//                   REFRESH ↻

//                 </button>

//               </div>

//             </>

//           ) : null}

//         </div>

//       </div>

//     </section>
//   );
// }


// import { useState } from "react";
// import "./weather.css";

// const API_KEY = "8e94b6b4b32c9b49164a5662b82d9545";

// export default function LiveWeather() {
//   const [search, setSearch] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   async function getWeather(e) {
//     e.preventDefault();

//     const place = search.trim();

//     if (!place) {
//       setError("Please enter a city, district or area.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setWeather(null);

//     try {
//       // Find the coordinates of the searched location
//       const geoURL =
//         `https://api.openweathermap.org/geo/1.0/direct` +
//         `?q=${encodeURIComponent(place)}` +
//         `&limit=1` +
//         `&appid=${API_KEY}`;

//       const geoResponse = await fetch(geoURL);

//       if (!geoResponse.ok) {
//         throw new Error("Location search failed");
//       }

//       const locations = await geoResponse.json();

//       if (!locations || locations.length === 0) {
//         throw new Error("Location not found");
//       }

//       const location = locations[0];

//       // Get actual weather using coordinates
//       const weatherURL =
//         `https://api.openweathermap.org/data/2.5/weather` +
//         `?lat=${location.lat}` +
//         `&lon=${location.lon}` +
//         `&units=metric` +
//         `&appid=${API_KEY}`;

//       const weatherResponse = await fetch(weatherURL);

//       if (!weatherResponse.ok) {
//         throw new Error("Weather request failed");
//       }

//       const data = await weatherResponse.json();

//       setWeather({
//         name: location.name,
//         state: location.state || "",
//         country: location.country || "",

//         temperature: Math.round(data.main.temp),
//         feelsLike: Math.round(data.main.feels_like),

//         condition: data.weather?.[0]?.description || "Unknown",
//         icon: data.weather?.[0]?.icon || "01d",

//         humidity: data.main.humidity,
//         pressure: data.main.pressure,

//         wind: Math.round((data.wind?.speed || 0) * 3.6),

//         visibility:
//           data.visibility !== undefined
//             ? (data.visibility / 1000).toFixed(1)
//             : "—",

//         sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(
//           [],
//           {
//             hour: "2-digit",
//             minute: "2-digit",
//           }
//         ),

//         sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(
//           [],
//           {
//             hour: "2-digit",
//             minute: "2-digit",
//           }
//         ),
//       });
//     } catch (err) {
//       console.error("Weather error:", err);

//       setError(
//         "Could not get weather. Check the location and your OpenWeather API key."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   function quickSearch(place) {
//     setSearch(place);

//     // Automatically search
//     searchWeather(place);
//   }

//   async function searchWeather(place) {
//     if (!place) return;

//     setLoading(true);
//     setError("");
//     setWeather(null);

//     try {
//       const geoResponse = await fetch(
//         `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
//           place
//         )}&limit=1&appid=${API_KEY}`
//       );

//       if (!geoResponse.ok) {
//         throw new Error("Location search failed");
//       }

//       const locations = await geoResponse.json();

//       if (!locations.length) {
//         throw new Error("Location not found");
//       }

//       const location = locations[0];

//       const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`
//       );

//       if (!response.ok) {
//         throw new Error("Weather request failed");
//       }

//       const data = await response.json();

//       setWeather({
//         name: location.name,
//         state: location.state || "",
//         country: location.country || "",
//         temperature: Math.round(data.main.temp),
//         feelsLike: Math.round(data.main.feels_like),
//         condition: data.weather?.[0]?.description || "Unknown",
//         icon: data.weather?.[0]?.icon || "01d",
//         humidity: data.main.humidity,
//         pressure: data.main.pressure,
//         wind: Math.round((data.wind?.speed || 0) * 3.6),
//         visibility:
//           data.visibility !== undefined
//             ? (data.visibility / 1000).toFixed(1)
//             : "—",
//         sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(
//           [],
//           {
//             hour: "2-digit",
//             minute: "2-digit",
//           }
//         ),
//         sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(
//           [],
//           {
//             hour: "2-digit",
//             minute: "2-digit",
//           }
//         ),
//       });
//     } catch (err) {
//       console.error(err);
//       setError("Could not find weather for this location.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <section id="weather" className="weather-section">
//       <div className="weather-container">

//         {/* HEADER */}
//         <div className="weather-heading">
//           <span className="weather-eyebrow">
//             AVYSURE · LIVE WEATHER
//           </span>

//           <h2>
//             Read the sky before
//             <span> you go.</span>
//           </h2>

//           <p>
//             Search any city, district or destination across Northeast India
//             and discover its current weather conditions.
//           </p>
//         </div>

//         {/* SEARCH BAR */}
//         <form className="weather-search" onSubmit={getWeather}>
//           <div className="weather-search-icon">⌕</div>

//           <input
//             type="text"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search a city, district or area..."
//           />

//           <button type="submit" disabled={loading}>
//             {loading ? "Checking..." : "Check Weather"}
//           </button>
//         </form>

//         {/* QUICK LOCATIONS */}
//         <div className="quick-weather">
//           <span>QUICK SEARCH</span>

//           <button onClick={() => quickSearch("Gangtok")}>
//             Gangtok
//           </button>

//           <button onClick={() => quickSearch("Shillong")}>
//             Shillong
//           </button>

//           <button onClick={() => quickSearch("Guwahati")}>
//             Guwahati
//           </button>

//           <button onClick={() => quickSearch("Aizawl")}>
//             Aizawl
//           </button>

//           <button onClick={() => quickSearch("Kohima")}>
//             Kohima
//           </button>

//           <button onClick={() => quickSearch("Imphal")}>
//             Imphal
//           </button>

//           <button onClick={() => quickSearch("Itanagar")}>
//             Itanagar
//           </button>

//           <button onClick={() => quickSearch("Agartala")}>
//             Agartala
//           </button>
//         </div>

//         {/* ERROR */}
//         {error && (
//           <div className="weather-error">
//             <strong>⚠ Weather unavailable</strong>
//             <p>{error}</p>
//           </div>
//         )}

//         {/* LOADING */}
//         {loading && (
//           <div className="weather-loading">
//             <div className="weather-spinner"></div>
//             <p>Reading the skies...</p>
//           </div>
//         )}

//         {/* EMPTY */}
//         {!weather && !loading && !error && (
//           <div className="weather-empty">
//             <div className="weather-cloud">☁</div>

//             <h3>Where are you heading?</h3>

//             <p>
//               Search a destination to see its current weather.
//             </p>
//           </div>
//         )}

//         {/* RESULT */}
//         {weather && !loading && (
//           <div className="weather-result">

//             {/* MAIN WEATHER */}
//             <div className="weather-main">

//               <div className="weather-main-top">
//                 <div>
//                   <span className="weather-label">
//                     CURRENT CONDITIONS
//                   </span>

//                   <h3>{weather.name}</h3>

//                   <p>
//                     {weather.state
//                       ? `${weather.state}, ${weather.country}`
//                       : weather.country}
//                   </p>
//                 </div>

//                 <img
//                   src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
//                   alt={weather.condition}
//                 />
//               </div>

//               <div className="temperature">
//                 {weather.temperature}
//                 <span>°C</span>
//               </div>

//               <div className="condition">
//                 {weather.condition}
//               </div>

//               <div className="feels">
//                 Feels like {weather.feelsLike}°C
//               </div>
//             </div>

//             {/* DETAILS */}
//             <div className="weather-details">

//               <div className="weather-detail">
//                 <span>HUMIDITY</span>
//                 <strong>{weather.humidity}%</strong>
//               </div>

//               <div className="weather-detail">
//                 <span>WIND</span>
//                 <strong>{weather.wind} km/h</strong>
//               </div>

//               <div className="weather-detail">
//                 <span>PRESSURE</span>
//                 <strong>{weather.pressure} hPa</strong>
//               </div>

//               <div className="weather-detail">
//                 <span>VISIBILITY</span>
//                 <strong>{weather.visibility} km</strong>
//               </div>

//               <div className="weather-detail">
//                 <span>SUNRISE</span>
//                 <strong>{weather.sunrise}</strong>
//               </div>

//               <div className="weather-detail">
//                 <span>SUNSET</span>
//                 <strong>{weather.sunset}</strong>
//               </div>

//             </div>
//           </div>
//         )}

//       </div>
//     </section>
//   );
// }

import { useState } from "react";
import "./weather.css";

const API_KEY = "8e94b6b4b32c9b49164a5662b82d9545";

const NORTHEAST_STATES = [
  "Assam",
  "Arunachal Pradesh",
  "Meghalaya",
  "Manipur",
  "Mizoram",
  "Nagaland",
  "Tripura",
  "Sikkim",
];

function formatTime(timestamp) {
  if (!timestamp) return "—";

  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function selectBestLocation(results) {
  if (!results || results.length === 0) {
    return null;
  }

  // Prefer Northeast India
  const northeast = results.find((item) =>
    NORTHEAST_STATES.some(
      (state) =>
        item.state?.toLowerCase() === state.toLowerCase()
    )
  );

  if (northeast) return northeast;

  // Otherwise prefer India
  const india = results.find(
    (item) =>
      item.country?.toUpperCase() === "IN"
  );

  return india || results[0];
}

export default function LiveWeather() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchWeather(place) {
    const query = place.trim();

    if (!query) {
      setError(
        "Please enter a city, district or area."
      );
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      let location = null;
      let directWeather = null;

      // ==================================================
      // 1. FIRST TRY DIRECT CITY WEATHER SEARCH
      // ==================================================

      const directURL =
        "https://api.openweathermap.org/data/2.5/weather" +
        `?q=${encodeURIComponent(query)},IN` +
        `&appid=${API_KEY}` +
        "&units=metric";

      const directResponse = await fetch(directURL);
      const directData = await directResponse.json();

      if (
        directResponse.ok &&
        directData.cod === 200
      ) {
        location = {
          name: directData.name,
          state: "",
          country:
            directData.sys?.country || "IN",
          lat: directData.coord.lat,
          lon: directData.coord.lon,
        };

        directWeather = directData;
      }

      // ==================================================
      // 2. IF DIRECT SEARCH FAILS → GEOCODING SEARCH
      // ==================================================

      if (!location) {
        const geoURL =
          "https://api.openweathermap.org/geo/1.0/direct" +
          `?q=${encodeURIComponent(query + ",IN")}` +
          "&limit=10" +
          `&appid=${API_KEY}`;

        const geoResponse = await fetch(geoURL);
        const geoResults = await geoResponse.json();

        if (!geoResponse.ok) {
          throw new Error(
            geoResults.message ||
              "Location search failed."
          );
        }

        if (
          !Array.isArray(geoResults) ||
          geoResults.length === 0
        ) {
          throw new Error(
            `No location found for "${query}".`
          );
        }

        const selected =
          selectBestLocation(geoResults);

        if (!selected) {
          throw new Error(
            `Could not identify "${query}".`
          );
        }

        location = {
          name: selected.name,
          state: selected.state || "",
          country:
            selected.country || "IN",
          lat: selected.lat,
          lon: selected.lon,
        };
      }

      // ==================================================
      // 3. GET WEATHER USING EXACT COORDINATES
      // ==================================================

      let data = directWeather;

      if (!data) {
        const weatherURL =
          "https://api.openweathermap.org/data/2.5/weather" +
          `?lat=${location.lat}` +
          `&lon=${location.lon}` +
          `&appid=${API_KEY}` +
          "&units=metric";

        const weatherResponse =
          await fetch(weatherURL);

        data = await weatherResponse.json();

        if (!weatherResponse.ok) {
          throw new Error(
            data.message ||
              "Unable to get weather."
          );
        }
      }

      // ==================================================
      // 4. SAVE REAL WEATHER DATA
      // ==================================================

      setWeather({
        name:
          location.name ||
          data.name ||
          "Unknown",

        state:
          location.state ||
          "",

        country:
          location.country ||
          data.sys?.country ||
          "IN",

        temperature:
          data.main?.temp !== undefined
            ? Math.round(data.main.temp)
            : "—",

        feelsLike:
          data.main?.feels_like !== undefined
            ? Math.round(data.main.feels_like)
            : "—",

        condition:
          data.weather?.[0]?.description ||
          "Current conditions",

        icon:
          data.weather?.[0]?.icon ||
          "01d",

        humidity:
          data.main?.humidity ?? "—",

        pressure:
          data.main?.pressure ?? "—",

        wind:
          data.wind?.speed !== undefined
            ? Math.round(
                data.wind.speed * 3.6
              )
            : "—",

        visibility:
          data.visibility !== undefined
            ? (
                data.visibility / 1000
              ).toFixed(1)
            : "—",

        sunrise:
          formatTime(data.sys?.sunrise),

        sunset:
          formatTime(data.sys?.sunset),

        lat:
          data.coord?.lat ??
          location.lat,

        lon:
          data.coord?.lon ??
          location.lon,
      });

      // Show the location actually found
      setSearch(
        location.state
          ? `${location.name}, ${location.state}`
          : location.name
      );
    } catch (err) {
      console.error(
        "OPENWEATHER SEARCH ERROR:",
        err
      );

      setWeather(null);

      setError(
        err.message ||
          `Could not find weather for "${query}".`
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    searchWeather(search);
  }

  function quickSearch(place) {
    setSearch(place);
    searchWeather(place);
  }

  return (
    <section
      id="weather"
      className="weather-section"
    >
      <div className="weather-container">

        {/* ================= HEADER ================= */}

        <div className="weather-heading">
          <span className="weather-eyebrow">
            AVYSURE · LIVE WEATHER
          </span>

          <h2>
            Read the sky before
            <span> you go.</span>
          </h2>

          <p>
            Search any city, district or
            destination across Northeast India
            and discover its current weather.
          </p>
        </div>

        {/* ================= SEARCH ================= */}

        <form
          className="weather-search"
          onSubmit={handleSearch}
        >
          <div className="weather-search-icon">
            ⌕
          </div>

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search city, district or area..."
            autoComplete="off"
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Checking..."
              : "Check Weather"}
          </button>
        </form>

        {/* ================= QUICK SEARCH ================= */}

        <div className="quick-weather">
          <span>QUICK SEARCH</span>

          <button
            type="button"
            onClick={() =>
              quickSearch("Gangtok")
            }
          >
            Gangtok
          </button>

          <button
            type="button"
            onClick={() =>
              quickSearch("Shillong")
            }
          >
            Shillong
          </button>

          <button
            type="button"
            onClick={() =>
              quickSearch("Guwahati")
            }
          >
            Guwahati
          </button>

          <button
            type="button"
            onClick={() =>
              quickSearch("Aizawl")
            }
          >
            Aizawl
          </button>

          <button
            type="button"
            onClick={() =>
              quickSearch("Kohima")
            }
          >
            Kohima
          </button>

          <button
            type="button"
            onClick={() =>
              quickSearch("Imphal")
            }
          >
            Imphal
          </button>

          <button
            type="button"
            onClick={() =>
              quickSearch("Itanagar")
            }
          >
            Itanagar
          </button>

          <button
            type="button"
            onClick={() =>
              quickSearch("Agartala")
            }
          >
            Agartala
          </button>

          <button
            type="button"
            onClick={() =>
              quickSearch("Tawang")
            }
          >
            Tawang
          </button>

          <button
            type="button"
            onClick={() =>
              quickSearch("Cherrapunji")
            }
          >
            Cherrapunji
          </button>

          <button
            type="button"
            onClick={() =>
              quickSearch("Dimapur")
            }
          >
            Dimapur
          </button>
        </div>

        {/* ================= ERROR ================= */}

        {error && !loading && (
          <div className="weather-error">
            <strong>
              ⚠ Weather unavailable
            </strong>

            <p>{error}</p>

            <small>
              Try a city, town or district such as
              Kohima, Dimapur, Tawang or
              Cherrapunji.
            </small>
          </div>
        )}

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="weather-loading">
            <div className="weather-spinner"></div>

            <p>
              Reading the skies...
            </p>
          </div>
        )}

        {/* ================= INITIAL STATE ================= */}

        {!weather &&
          !loading &&
          !error && (
            <div className="weather-empty">
              <div className="weather-cloud">
                ☁
              </div>

              <h3>
                Where are you heading?
              </h3>

              <p>
                Search a destination to see its
                current weather.
              </p>
            </div>
          )}

        {/* ================= WEATHER RESULT ================= */}

        {weather && !loading && (
          <div className="weather-result">

            {/* MAIN WEATHER CARD */}

            <div className="weather-main">

              <div className="weather-main-top">

                <div>
                  <span className="weather-label">
                    CURRENT CONDITIONS
                  </span>

                  <h3>
                    {weather.name}
                  </h3>

                  <p>
                    {weather.state
                      ? `${weather.state}, ${weather.country}`
                      : weather.country}
                  </p>
                </div>

                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt={weather.condition}
                />
              </div>

              <div className="temperature">
                {weather.temperature}
                <span>°C</span>
              </div>

              <div className="condition">
                {weather.condition}
              </div>

              <div className="feels">
                Feels like{" "}
                {weather.feelsLike}°C
              </div>

            </div>

            {/* WEATHER DETAILS */}

            <div className="weather-details">

              <div className="weather-detail">
                <span>HUMIDITY</span>
                <strong>
                  {weather.humidity}%
                </strong>
              </div>

              <div className="weather-detail">
                <span>WIND</span>
                <strong>
                  {weather.wind} km/h
                </strong>
              </div>

              <div className="weather-detail">
                <span>PRESSURE</span>
                <strong>
                  {weather.pressure} hPa
                </strong>
              </div>

              <div className="weather-detail">
                <span>VISIBILITY</span>
                <strong>
                  {weather.visibility} km
                </strong>
              </div>

              <div className="weather-detail">
                <span>SUNRISE</span>
                <strong>
                  {weather.sunrise}
                </strong>
              </div>

              <div className="weather-detail">
                <span>SUNSET</span>
                <strong>
                  {weather.sunset}
                </strong>
              </div>

            </div>

            {/* LOCATION */}

            <div className="weather-location">

              <span>LOCATION</span>

              <strong>
                📍 {weather.name}
                {weather.state
                  ? `, ${weather.state}`
                  : ""}
              </strong>

              <small>
                {Number(weather.lat).toFixed(4)}
                {" , "}
                {Number(weather.lon).toFixed(4)}
              </small>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}