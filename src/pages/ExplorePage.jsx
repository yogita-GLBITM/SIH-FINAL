// import { useState } from 'react';
// import Navbar from '../components/Navbar/Navbar';
// import HiddenGems from '../components/HiddenGems/HiddenGems';
// import GeoFence from '../components/GeoFence/GeoFence';
// import SOS from '../components/SOS/SOS';
// import Logo from '../components/common/Logo';
// import { STATES, FALLBACK_IMG, getWeather } from '../data/states';
// import './explore.css';

// function Title({ n, title, desc }) {
//   return (
//     <div className="section-title">
//       <span>{n}</span>
//       <h2 dangerouslySetInnerHTML={{ __html: title }} />
//       <p>{desc}</p>
//     </div>
//   );
// }

// function WeatherAnim({ type }) {
//   if (type === 'sun') {
//     return (
//       <div className="weather-anim weather-anim--sun">
//         <div className="w-ray" />
//         <div className="w-sun" />
//       </div>
//     );
//   }

//   if (type === 'rain') {
//     return (
//       <div className="weather-anim weather-anim--rain">
//         <div className="w-cloud c1" />
//         <div className="w-cloud c2" />
//         <div className="w-cloud c3" />
//         <div className="w-rain" />
//       </div>
//     );
//   }

//   if (type === 'storm') {
//     return (
//       <div className="weather-anim weather-anim--storm">
//         <div className="w-cloud c1" />
//         <div className="w-cloud c2" />
//         <div className="w-rain" />
//         <div className="w-flash" />
//       </div>
//     );
//   }

//   if (type === 'snow') {
//     return (
//       <div className="weather-anim weather-anim--snow">
//         {Array.from({ length: 26 }).map((_, i) => (
//           <span
//             key={i}
//             className="w-flake"
//             style={{
//               left: `${(i * 37) % 100}%`,
//               width: 3 + (i % 4),
//               height: 3 + (i % 4),
//               animationDuration: `${6 + (i % 5)}s`,
//               animationDelay: `${-(i % 6)}s`,
//             }}
//           />
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="weather-anim weather-anim--cloud">
//       <div className="w-cloud c1" />
//       <div className="w-cloud c2" />
//       <div className="w-cloud c3" />
//     </div>
//   );
// }

// export default function ExplorePage({ user }) {

//   const [stateId, setStateId] = useState('meghalaya');
//   const [weatherStateId, setWeatherStateId] = useState('sikkim');
//   const [people, setPeople] = useState(2);
//   const [taste, setTaste] = useState('Adventure');
//   const [days, setDays] = useState(5);

//   /* =========================
//      EXPENSE TRACKER STATE
//   ========================= */

//   const [budget, setBudget] = useState(24000);

//   const [expenses, setExpenses] = useState([
//     {
//       id: 1,
//       name: 'Stay',
//       category: 'Stay',
//       amount: 7200,
//     },
//     {
//       id: 2,
//       name: 'Food',
//       category: 'Food',
//       amount: 2600,
//     },
//     {
//       id: 3,
//       name: 'Transport',
//       category: 'Transport',
//       amount: 4100,
//     },
//   ]);

//   const [expenseName, setExpenseName] = useState('');
//   const [expenseAmount, setExpenseAmount] = useState('');
//   const [expenseCategory, setExpenseCategory] =
//     useState('Food');

//   const totalExpense = expenses.reduce(
//     (sum, expense) =>
//       sum + expense.amount,
//     0
//   );

//   const remainingBudget =
//     budget - totalExpense;

//   const progress =
//     budget > 0
//       ? Math.min(
//           (totalExpense / budget) * 100,
//           100
//         )
//       : 0;

//   /* ADD EXPENSE */

//   const addExpense = (e) => {
//     e.preventDefault();

//     if (!expenseName.trim()) {
//       alert('Please enter what you spent on.');
//       return;
//     }

//     if (
//       !expenseAmount ||
//       Number(expenseAmount) <= 0
//     ) {
//       alert('Please enter a valid amount.');
//       return;
//     }

//     const newExpense = {
//       id: Date.now(),
//       name: expenseName,
//       category: expenseCategory,
//       amount: Number(expenseAmount),
//     };

//     setExpenses((current) => [
//       ...current,
//       newExpense,
//     ]);

//     setExpenseName('');
//     setExpenseAmount('');
//   };

//   /* DELETE EXPENSE */

//   const deleteExpense = (id) => {
//     setExpenses((current) =>
//       current.filter(
//         (expense) => expense.id !== id
//       )
//     );
//   };

//   /* =========================
//      OTHER PAGE DATA
//   ========================= */

//   const s = STATES.find(
//     (x) => x.id === stateId
//   );

//   const ws = STATES.find(
//     (x) => x.id === weatherStateId
//   );

//   const weather = getWeather(
//     weatherStateId
//   );

//   const onImgErr = (ev) => {
//     ev.currentTarget.src = FALLBACK_IMG;
//   };

//   return (
//     <div className="explore-page">

//       <Navbar user={user} />

//       {/* =========================
//           HERO
//       ========================= */}

//       <section id="hero" className="hero-seven">

//         <div className="hero-text">

//           <span>
//             AVYSURE / NORTHEAST INDIA
//           </span>

//           <h1>
//             Northeast states.
//             <br />
//             <i>Endless stories.</i>
//           </h1>

//           <p>
//             A visual journey through the
//             Northeast India — planning,
//             weather, money, safety and
//             the places that don’t make
//             the usual itinerary.
//           </p>

//           <a
//             href="#itinerary"
//             className="hero-cta"
//           >
//             START EXPLORING <b>↓</b>
//           </a>

//         </div>

//         <div className="hero-map-label">
//           NORTHEAST INDIA <b>01—08</b>
//         </div>

//         <div className="hero-strip">

//           {STATES.map((x) => (

//             <button
//               key={x.id}
//               className={
//                 x.id === stateId
//                   ? 'active'
//                   : ''
//               }
//               onClick={() =>
//                 setStateId(x.id)
//               }
//             >

//               <img
//                 src={x.hero}
//                 alt={x.name}
//                 onError={onImgErr}
//               />

//               <span>
//                 {x.name}
//               </span>

//             </button>

//           ))}

//         </div>

//       </section>


//       {/* =========================
//           ITINERARY
//       ========================= */}

//       <section
//         id="itinerary"
//         className="tool-section itinerary-section"
//       >

//         <Title
//           n="01 / DIGITAL ITINERARY"
//           title="Your trip begins with a <em>feeling.</em>"
//           desc="Shape the route by destination, group size, number of days and travel personality."
//         />

//         <div className="itinerary-card glass-card">

//           <div className="destination-stage">

//             <img
//               src={s.hero}
//               alt={s.name}
//               onError={onImgErr}
//             />

//             <div className="stage-overlay">

//               <span>
//                 SELECTED DESTINATION
//               </span>

//               <h3>
//                 {s.name}
//               </h3>

//               <p>
//                 {s.tag}
//               </p>

//             </div>

//           </div>


//           <div className="planner-fields">

//             <label>
//               DESTINATION

//               <select
//                 value={stateId}
//                 onChange={(e) =>
//                   setStateId(
//                     e.target.value
//                   )
//                 }
//               >

//                 {STATES.map((x) => (
//                   <option
//                     value={x.id}
//                     key={x.id}
//                   >
//                     {x.name}
//                   </option>
//                 ))}

//               </select>

//             </label>


//             <label>
//               TRAVELLERS

//               <div className="stepper">

//                 <button
//                   onClick={() =>
//                     setPeople(
//                       Math.max(
//                         1,
//                         people - 1
//                       )
//                     )
//                   }
//                 >
//                   −
//                 </button>

//                 <b>
//                   {people}
//                 </b>

//                 <button
//                   onClick={() =>
//                     setPeople(
//                       people + 1
//                     )
//                   }
//                 >
//                   +
//                 </button>

//               </div>

//             </label>


//             <label>
//               DAYS

//               <input
//                 type="range"
//                 min="2"
//                 max="10"
//                 value={days}
//                 onChange={(e) =>
//                   setDays(
//                     e.target.value
//                   )
//                 }
//               />

//               <strong>
//                 {days} days
//               </strong>

//             </label>


//             <label>
//               TRAVEL DNA

//               <div className="taste-pills">

//                 {[
//                   'Adventure',
//                   'Family',
//                   'Culture',
//                   'Slow',
//                 ].map((x) => (

//                   <button
//                     key={x}
//                     className={
//                       taste === x
//                         ? 'on'
//                         : ''
//                     }
//                     onClick={() =>
//                       setTaste(x)
//                     }
//                   >
//                     {x}
//                   </button>

//                 ))}

//               </div>

//             </label>


//             <button className="generate-btn">
//               GENERATE{' '}
//               {s.name.toUpperCase()}
//               {' '}PLAN

//               <span>✦</span>
//             </button>

//           </div>

//         </div>

//       </section>


//       {/* =========================
//           WEATHER
//       ========================= */}

//       <section
//         id="weather"
//         className="weather-section"
//       >

//         <Title
//           n="02 / WEATHER WINDOW"
//           title="Let the <em>sky</em> shape the route."
//           desc="A presentation-ready weather preview per state, with live-feel condition animation — ready for your team to connect to a real weather API."
//         />

//         <div className="weather-state-strip">

//           {STATES.map((x) => (

//             <button
//               key={x.id}
//               className={
//                 x.id === weatherStateId
//                   ? 'on'
//                   : ''
//               }
//               onClick={() =>
//                 setWeatherStateId(
//                   x.id
//                 )
//               }
//             >

//               <span
//                 className="dot"
//                 style={{
//                   background:
//                     x.accent,
//                 }}
//               />

//               {x.name}

//             </button>

//           ))}

//         </div>


//         <div className="weather-card">

//           <WeatherAnim
//             type={weather.type}
//           />

//           <div className="weather-big">

//             <span>
//               NOW •{' '}
//               {ws.name.toUpperCase()}
//             </span>

//             <strong>
//               {weather.tempC}°
//             </strong>

//             <p>

//               <span className="w-icon">
//                 {weather.icon}
//               </span>

//               {weather.label}

//             </p>

//           </div>


//           <div
//             className="weather-orbit"
//             style={{
//               borderColor:
//                 `${ws.accent}55`,
//               color:
//                 ws.accent,
//             }}
//           >

//             {weather.icon}

//             <small>
//               {weather.wind} KM/H
//               <br />
//               WIND
//             </small>

//           </div>


//           <div className="weather-bars">

//             {[
//               '18:00',
//               '20:00',
//               '22:00',
//               '00:00',
//             ].map((x, i) => (

//               <div key={x}>

//                 <span>
//                   {x}
//                 </span>

//                 <b>
//                   {Math.max(
//                     -4,
//                     weather.tempC - i
//                   )}
//                   °
//                 </b>

//                 <i
//                   style={{
//                     height:
//                       `${45 + i * 12}px`,
//                   }}
//                 />

//               </div>

//             ))}

//           </div>

//         </div>

//       </section>


//       {/* =========================
//           WORKING EXPENSE TRACKER
//       ========================= */}

//       <section
//         id="expense"
//         className="tool-section expense-section"
//       >

//         <Title
//           n="03 / EXPENSE TRACKER"
//           title="Spend on the <em>experience.</em>"
//           desc="Add your expenses and watch your travel budget update automatically."
//         />


//         <div className="expense-grid">


//           {/* BUDGET */}

//           <div className="budget-card glass-card">

//             <span>
//               TRIP BUDGET
//             </span>

//             <input
//               type="number"
//               value={budget}
//               min="0"
//               onChange={(e) =>
//                 setBudget(
//                   Number(
//                     e.target.value
//                   )
//                 )
//               }
//               style={{
//                 display: 'block',
//                 width: '100%',
//                 marginTop: '12px',
//                 padding: '12px',
//                 boxSizing: 'border-box',
//               }}
//             />


//             <strong
//               style={{
//                 display: 'block',
//                 marginTop: '20px',
//               }}
//             >
//               ₹
//               {totalExpense.toLocaleString(
//                 'en-IN'
//               )}
//             </strong>


//             <div className="budget-progress">

//               <i
//                 style={{
//                   width: `${progress}%`,
//                 }}
//               />

//             </div>


//             <small
//               style={{
//                 display: 'block',
//                 marginTop: '10px',
//               }}
//             >

//               {remainingBudget < 0
//                 ? `₹${Math.abs(
//                     remainingBudget
//                   ).toLocaleString(
//                     'en-IN'
//                   )} over budget`
//                 : `₹${remainingBudget.toLocaleString(
//                     'en-IN'
//                   )} remaining`}

//             </small>

//           </div>


//           {/* LEDGER */}

//           <div className="ledger glass-card">


//             {/* ADD EXPENSE FORM */}

//             <form
//               className="expense-form"
//               onSubmit={addExpense}
//             >

//               <input
//                 type="text"
//                 placeholder="What did you spend on?"
//                 value={expenseName}
//                 onChange={(e) =>
//                   setExpenseName(
//                     e.target.value
//                   )
//                 }
//               />


//               <select
//                 value={expenseCategory}
//                 onChange={(e) =>
//                   setExpenseCategory(
//                     e.target.value
//                   )
//                 }
//               >

//                 <option value="Stay">
//                   🏕️ Stay
//                 </option>

//                 <option value="Food">
//                   🍜 Food
//                 </option>

//                 <option value="Transport">
//                   🚙 Transport
//                 </option>

//                 <option value="Permits">
//                   📄 Permits
//                 </option>

//                 <option value="Guide">
//                   🧭 Guide
//                 </option>

//                 <option value="Misc">
//                   ✨ Misc
//                 </option>

//               </select>


//               <input
//                 type="number"
//                 min="1"
//                 placeholder="₹ Amount"
//                 value={expenseAmount}
//                 onChange={(e) =>
//                   setExpenseAmount(
//                     e.target.value
//                   )
//                 }
//               />


//               <button
//                 type="submit"
//                 className="add-expense"
//               >
//                 + ADD
//               </button>

//             </form>


//             {/* EXPENSE LIST */}

//             <div
//               className="expense-list"
//               style={{
//                 marginTop: '25px',
//               }}
//             >

//               {expenses.length === 0 ? (

//                 <p>
//                   No expenses added yet.
//                 </p>

//               ) : (

//                 expenses
//                   .slice()
//                   .reverse()
//                   .map((expense) => (

//                     <div
//                       className="ledger-row"
//                       key={expense.id}
//                     >

//                       <i>
//                         {expense.category ===
//                         'Stay'
//                           ? '🏕️'
//                           : expense.category ===
//                             'Food'
//                           ? '🍜'
//                           : expense.category ===
//                             'Transport'
//                           ? '🚙'
//                           : expense.category ===
//                             'Permits'
//                           ? '📄'
//                           : expense.category ===
//                             'Guide'
//                           ? '🧭'
//                           : '✨'}
//                       </i>


//                       <span>

//                         {expense.name}

//                         <small
//                           style={{
//                             display: 'block',
//                             opacity: 0.6,
//                             fontSize: '10px',
//                           }}
//                         >
//                           {expense.category}
//                         </small>

//                       </span>


//                       <b>
//                         ₹
//                         {expense.amount.toLocaleString(
//                           'en-IN'
//                         )}
//                       </b>


//                       <button
//                         type="button"
//                         onClick={() =>
//                           deleteExpense(
//                             expense.id
//                           )
//                         }
//                         style={{
//                           border: 'none',
//                           background:
//                             'transparent',
//                           cursor: 'pointer',
//                         }}
//                       >
//                         ✕
//                       </button>

//                     </div>

//                   ))

//               )}

//             </div>

//           </div>

//         </div>

//       </section>


//       {/* =========================
//           OTHER SECTIONS
//       ========================= */}

//       <HiddenGems />

//       <GeoFence />

//       <SOS />


//       {/* =========================
//           FOOTER
//       ========================= */}

//       <footer className="footer">

//         <div className="footer-brandmark">

//           <Logo size={30} />

//           <b>
//             AVYSURE
//           </b>

//         </div>

//         <span>
//           Northeast India • one
//           thoughtful journey
//         </span>

//         <span>
//           Made with ❤️ by{' hexaNE '}
//         </span>

//       </footer>

//     </div>
//   );
// }

import { useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import HiddenGems from "../components/HiddenGems/HiddenGems";
import GeoFence from "../components/GeoFence/GeoFence";
import SOS from "../components/SOS/SOS";
import Logo from "../components/common/Logo";
import LiveWeather from "../components/Weather/LiveWeather";

import { STATES, FALLBACK_IMG } from "../data/states";

import "./explore.css";

function Title({ n, title, desc }) {
  return (
    <div className="section-title">
      <span>{n}</span>
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      <p>{desc}</p>
    </div>
  );
}

export default function ExplorePage({ user }) {
  const [stateId, setStateId] = useState("meghalaya");

  const [people, setPeople] = useState(2);
  const [taste, setTaste] = useState("Adventure");
  const [days, setDays] = useState(5);

  /* =========================
     EXPENSE TRACKER
  ========================= */

  const [budget, setBudget] = useState(24000);

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      name: "Stay",
      category: "Stay",
      amount: 7200,
    },
    {
      id: 2,
      name: "Food",
      category: "Food",
      amount: 2600,
    },
    {
      id: 3,
      name: "Transport",
      category: "Transport",
      amount: 4100,
    },
  ]);

  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("Food");

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const remainingBudget = budget - totalExpense;

  const progress =
    budget > 0
      ? Math.min((totalExpense / budget) * 100, 100)
      : 0;

  /* =========================
     ADD EXPENSE
  ========================= */

  const addExpense = (e) => {
    e.preventDefault();

    if (!expenseName.trim()) {
      alert("Please enter what you spent on.");
      return;
    }

    if (!expenseAmount || Number(expenseAmount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: expenseName,
      category: expenseCategory,
      amount: Number(expenseAmount),
    };

    setExpenses((current) => [
      ...current,
      newExpense,
    ]);

    setExpenseName("");
    setExpenseAmount("");
  };

  /* =========================
     DELETE EXPENSE
  ========================= */

  const deleteExpense = (id) => {
    setExpenses((current) =>
      current.filter(
        (expense) => expense.id !== id
      )
    );
  };

  /* =========================
     STATE DATA
  ========================= */

  const s =
    STATES.find((x) => x.id === stateId) ||
    STATES[0];

  /* =========================
     IMAGE FALLBACK
  ========================= */

  const onImgErr = (ev) => {
    ev.currentTarget.src = FALLBACK_IMG;
  };

  return (
    <div className="explore-page">

      {/* =========================
          NAVBAR
      ========================= */}

      <Navbar user={user} />

      {/* =========================
          HERO
      ========================= */}

      <section
        id="hero"
        className="hero-seven"
      >

        <div className="hero-text">

          <span>
            AVYSURE / NORTHEAST INDIA
          </span>

          <h1>
            Northeast states.
            <br />
            <i>Endless stories.</i>
          </h1>

          <p>
            A visual journey through the
            Northeast India — planning,
            weather, money, safety and
            the places that don’t make
            the usual itinerary.
          </p>

          <a
            href="#itinerary"
            className="hero-cta"
          >
            START EXPLORING <b>↓</b>
          </a>

        </div>

        <div className="hero-map-label">
          NORTHEAST INDIA <b>01—08</b>
        </div>

        <div className="hero-strip">

          {STATES.map((x) => (

            <button
              key={x.id}
              className={
                x.id === stateId
                  ? "active"
                  : ""
              }
              onClick={() =>
                setStateId(x.id)
              }
            >

              <img
                src={x.hero}
                alt={x.name}
                onError={onImgErr}
              />

              <span>
                {x.name}
              </span>

            </button>

          ))}

        </div>

      </section>

      {/* =========================
          DIGITAL ITINERARY
      ========================= */}

      <section
        id="itinerary"
        className="tool-section itinerary-section"
      >

        <Title
          n="01 / DIGITAL ITINERARY"
          title="Your trip begins with a <em>feeling.</em>"
          desc="Shape the route by destination, group size, number of days and travel personality."
        />

        <div className="itinerary-card glass-card">

          <div className="destination-stage">

            <img
              src={s.hero}
              alt={s.name}
              onError={onImgErr}
            />

            <div className="stage-overlay">

              <span>
                SELECTED DESTINATION
              </span>

              <h3>
                {s.name}
              </h3>

              <p>
                {s.tag}
              </p>

            </div>

          </div>

          <div className="planner-fields">

            {/* DESTINATION */}

            <label>
              DESTINATION

              <select
                value={stateId}
                onChange={(e) =>
                  setStateId(
                    e.target.value
                  )
                }
              >

                {STATES.map((x) => (

                  <option
                    value={x.id}
                    key={x.id}
                  >
                    {x.name}
                  </option>

                ))}

              </select>

            </label>

            {/* TRAVELLERS */}

            <label>
              TRAVELLERS

              <div className="stepper">

                <button
                  type="button"
                  onClick={() =>
                    setPeople(
                      Math.max(
                        1,
                        people - 1
                      )
                    )
                  }
                >
                  −
                </button>

                <b>
                  {people}
                </b>

                <button
                  type="button"
                  onClick={() =>
                    setPeople(
                      people + 1
                    )
                  }
                >
                  +
                </button>

              </div>

            </label>

            {/* DAYS */}

            <label>
              DAYS

              <input
                type="range"
                min="2"
                max="10"
                value={days}
                onChange={(e) =>
                  setDays(
                    e.target.value
                  )
                }
              />

              <strong>
                {days} days
              </strong>

            </label>

            {/* TRAVEL DNA */}

            <label>
              TRAVEL DNA

              <div className="taste-pills">

                {[
                  "Adventure",
                  "Family",
                  "Culture",
                  "Slow",
                ].map((x) => (

                  <button
                    type="button"
                    key={x}
                    className={
                      taste === x
                        ? "on"
                        : ""
                    }
                    onClick={() =>
                      setTaste(x)
                    }
                  >
                    {x}
                  </button>

                ))}

              </div>

            </label>

            {/* GENERATE */}

            <button
              type="button"
              className="generate-btn"
            >

              GENERATE{" "}
              {s.name.toUpperCase()}
              {" "}PLAN

              <span>✦</span>

            </button>

          </div>

        </div>

      </section>

      {/* =========================
          REAL LIVE WEATHER
      ========================= */}

      <LiveWeather />

      {/* =========================
          EXPENSE TRACKER
      ========================= */}

      <section
        id="expense"
        className="tool-section expense-section"
      >

        <Title
          n="03 / EXPENSE TRACKER"
          title="Spend on the <em>experience.</em>"
          desc="Add your expenses and watch your travel budget update automatically."
        />

        <div className="expense-grid">

          {/* BUDGET */}

          <div className="budget-card glass-card">

            <span>
              TRIP BUDGET
            </span>

            <input
              type="number"
              value={budget}
              min="0"
              onChange={(e) =>
                setBudget(
                  Number(
                    e.target.value
                  )
                )
              }
              style={{
                display: "block",
                width: "100%",
                marginTop: "12px",
                padding: "12px",
                boxSizing: "border-box",
              }}
            />

            <strong
              style={{
                display: "block",
                marginTop: "20px",
              }}
            >
              ₹
              {totalExpense.toLocaleString(
                "en-IN"
              )}
            </strong>

            <div className="budget-progress">

              <i
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <small
              style={{
                display: "block",
                marginTop: "10px",
              }}
            >

              {remainingBudget < 0
                ? `₹${Math.abs(
                    remainingBudget
                  ).toLocaleString(
                    "en-IN"
                  )} over budget`
                : `₹${remainingBudget.toLocaleString(
                    "en-IN"
                  )} remaining`}

            </small>

          </div>

          {/* LEDGER */}

          <div className="ledger glass-card">

            {/* ADD EXPENSE */}

            <form
              className="expense-form"
              onSubmit={addExpense}
            >

              <input
                type="text"
                placeholder="What did you spend on?"
                value={expenseName}
                onChange={(e) =>
                  setExpenseName(
                    e.target.value
                  )
                }
              />

              <select
                value={expenseCategory}
                onChange={(e) =>
                  setExpenseCategory(
                    e.target.value
                  )
                }
              >

                <option value="Stay">
                  🏕️ Stay
                </option>

                <option value="Food">
                  🍜 Food
                </option>

                <option value="Transport">
                  🚙 Transport
                </option>

                <option value="Permits">
                  📄 Permits
                </option>

                <option value="Guide">
                  🧭 Guide
                </option>

                <option value="Misc">
                  ✨ Misc
                </option>

              </select>

              <input
                type="number"
                min="1"
                placeholder="₹ Amount"
                value={expenseAmount}
                onChange={(e) =>
                  setExpenseAmount(
                    e.target.value
                  )
                }
              />

              <button
                type="submit"
                className="add-expense"
              >
                + ADD
              </button>

            </form>

            {/* EXPENSE LIST */}

            <div
              className="expense-list"
              style={{
                marginTop: "25px",
              }}
            >

              {expenses.length === 0 ? (

                <p>
                  No expenses added yet.
                </p>

              ) : (

                expenses
                  .slice()
                  .reverse()
                  .map((expense) => (

                    <div
                      className="ledger-row"
                      key={expense.id}
                    >

                      <i>

                        {expense.category ===
                        "Stay"
                          ? "🏕️"
                          : expense.category ===
                            "Food"
                          ? "🍜"
                          : expense.category ===
                            "Transport"
                          ? "🚙"
                          : expense.category ===
                            "Permits"
                          ? "📄"
                          : expense.category ===
                            "Guide"
                          ? "🧭"
                          : "✨"}

                      </i>

                      <span>

                        {expense.name}

                        <small
                          style={{
                            display: "block",
                            opacity: 0.6,
                            fontSize: "10px",
                          }}
                        >
                          {expense.category}
                        </small>

                      </span>

                      <b>
                        ₹
                        {expense.amount.toLocaleString(
                          "en-IN"
                        )}
                      </b>

                      <button
                        type="button"
                        onClick={() =>
                          deleteExpense(
                            expense.id
                          )
                        }
                        style={{
                          border: "none",
                          background:
                            "transparent",
                          cursor: "pointer",
                        }}
                      >
                        ✕
                      </button>

                    </div>

                  ))

              )}

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          HIDDEN GEMS
      ========================= */}

      <HiddenGems />

      {/* =========================
          GEOFENCE
      ========================= */}

      <GeoFence />

      {/* =========================
          SOS
      ========================= */}

      <SOS />

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="footer">

        <div className="footer-brandmark">

          <Logo size={30} />

          <b>
            AVYSURE
          </b>

        </div>

        <span>
          Northeast India • one
          thoughtful journey
        </span>

        <span>
          Made with ❤️ by hexaNE
        </span>

      </footer>

    </div>
  );
}

