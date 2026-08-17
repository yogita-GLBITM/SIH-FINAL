// import { useState } from "react";
// import "./expense.css";

// export default function ExpenseTracker() {
//   const [budget, setBudget] = useState(15000);
//   const [expenses, setExpenses] = useState([]);

//   const [name, setName] = useState("");
//   const [amount, setAmount] = useState("");

//   const total = expenses.reduce(
//     (sum, item) => sum + item.amount,
//     0
//   );

//   const remaining = budget - total;

//   function addExpense(e) {
//     e.preventDefault();

//     if (!name || !amount) {
//       alert("Enter expense and amount");
//       return;
//     }

//     const newExpense = {
//       id: Date.now(),
//       name: name,
//       amount: Number(amount),
//     };

//     setExpenses([...expenses, newExpense]);

//     setName("");
//     setAmount("");
//   }

//   function deleteExpense(id) {
//     setExpenses(
//       expenses.filter(
//         (expense) => expense.id !== id
//       )
//     );
//   }

//   return (
//     <section
//       id="expense"
//       className="expense-section"
//     >
//       <div className="container">

//         <div className="expense-title">
//           <span>03 / EXPENSE TRACKER</span>

//           <h2>
//             Spend on the{" "}
//             <em>experience.</em>
//           </h2>

//           <p>
//             Track your travel expenses
//             easily.
//           </p>
//         </div>

//         <div className="expense-grid">

//           {/* LEFT */}

//           <div className="expense-card">

//             <label>
//               Trip Budget
//             </label>

//             <input
//               type="number"
//               value={budget}
//               onChange={(e) =>
//                 setBudget(
//                   Number(e.target.value)
//                 )
//               }
//             />

//             <div className="expense-total">
//               ₹{total.toLocaleString("en-IN")}
//             </div>

//             <p>
//               Total Spent
//             </p>

//             <div
//               className={
//                 remaining < 0
//                   ? "remaining danger"
//                   : "remaining"
//               }
//             >
//               ₹
//               {Math.abs(
//                 remaining
//               ).toLocaleString("en-IN")}

//               {remaining < 0
//                 ? " over budget"
//                 : " remaining"}
//             </div>

//           </div>


//           {/* RIGHT */}

//           <div className="expense-card">

//             <form
//               className="expense-form"
//               onSubmit={addExpense}
//             >

//               <input
//                 type="text"
//                 placeholder="What did you spend on?"
//                 value={name}
//                 onChange={(e) =>
//                   setName(e.target.value)
//                 }
//               />

//               <input
//                 type="number"
//                 placeholder="₹ Amount"
//                 value={amount}
//                 onChange={(e) =>
//                   setAmount(e.target.value)
//                 }
//               />

//               <button type="submit">
//                 ADD
//               </button>

//             </form>


//             <div className="expense-list">

//               {expenses.length === 0 && (
//                 <p className="empty">
//                   No expenses added yet.
//                 </p>
//               )}

//               {expenses
//                 .slice()
//                 .reverse()
//                 .map((expense) => (

//                   <div
//                     className="expense-row"
//                     key={expense.id}
//                   >

//                     <span>
//                       {expense.name}
//                     </span>

//                     <b>
//                       ₹
//                       {expense.amount.toLocaleString(
//                         "en-IN"
//                       )}
//                     </b>

//                     <button
//                       onClick={() =>
//                         deleteExpense(
//                           expense.id
//                         )
//                       }
//                     >
//                       ✕
//                     </button>

//                   </div>

//                 ))}

//             </div>

//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }

import { useEffect, useState } from "react";
import "./expense.css";

const categories = [
  { id: "stay", name: "Stay", icon: "🏕️" },
  { id: "food", name: "Food", icon: "🍜" },
  { id: "transport", name: "Transport", icon: "🚙" },
  { id: "permits", name: "Permits", icon: "📄" },
  { id: "guide", name: "Guide", icon: "🧭" },
  { id: "misc", name: "Misc", icon: "✨" },
];

export default function ExpenseTracker() {

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem("tripBudget");
    return saved ? Number(saved) : 24000;
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("tripExpenses");

    if (saved) {
      return JSON.parse(saved);
    }

    return [];
  });

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");


  /* SAVE DATA */

  useEffect(() => {
    localStorage.setItem(
      "tripBudget",
      budget
    );
  }, [budget]);


  useEffect(() => {
    localStorage.setItem(
      "tripExpenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);


  /* TOTAL */

  const total = expenses.reduce(
    (sum, expense) =>
      sum + expense.amount,
    0
  );


  const remaining = budget - total;


  /* ADD EXPENSE */

  function addExpense(e) {

    e.preventDefault();

    if (!name.trim()) {
      alert("Enter expense name");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Enter valid amount");
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: name.trim(),
      amount: Number(amount),
      category: category,
    };

    setExpenses([
      ...expenses,
      newExpense,
    ]);

    setName("");
    setAmount("");
  }


  /* DELETE */

  function deleteExpense(id) {

    setExpenses(
      expenses.filter(
        (expense) =>
          expense.id !== id
      )
    );
  }


  return (

    <section
      id="expense"
      className="expense-section"
    >

      <div className="container">

        {/* TITLE */}

        <div className="section-title">

          <span>
            03 / EXPENSE TRACKER
          </span>

          <h2>
            Spend on the{" "}
            <em>experience.</em>
          </h2>

          <p>
            Track every expense during
            your journey.
          </p>

        </div>


        <div className="expense-grid">


          {/* LEFT SIDE */}

          <div className="expense-summary glass-card">

            <label>
              TRIP BUDGET
            </label>

            <input
              type="number"
              value={budget}
              onChange={(e) =>
                setBudget(
                  Number(e.target.value)
                )
              }
            />


            <div className="expense-total">

              ₹{total.toLocaleString("en-IN")}

            </div>

            <span>
              TOTAL SPENT
            </span>


            <div
              className={
                remaining < 0
                  ? "expense-remaining danger"
                  : "expense-remaining"
              }
            >

              {remaining < 0
                ? `₹${Math.abs(
                    remaining
                  ).toLocaleString(
                    "en-IN"
                  )} over budget`
                : `₹${remaining.toLocaleString(
                    "en-IN"
                  )} remaining`}

            </div>


            <div className="expense-progress">

              <div
                style={{
                  width:
                    `${Math.min(
                      (total /
                        Math.max(
                          budget,
                          1
                        )) *
                        100,
                      100
                    )}%`,
                }}
              />

            </div>

          </div>


          {/* RIGHT SIDE */}

          <div className="expense-log glass-card">


            {/* FORM */}

            <form
              className="expense-form"
              onSubmit={addExpense}
            >

              <input
                type="text"
                placeholder="What did you spend on?"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
              />


              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
              >

                {categories.map(
                  (cat) => (

                    <option
                      key={cat.id}
                      value={cat.id}
                    >
                      {cat.icon}{" "}
                      {cat.name}
                    </option>

                  )
                )}

              </select>


              <input
                type="number"
                placeholder="₹ Amount"
                min="1"
                value={amount}
                onChange={(e) =>
                  setAmount(
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

            <div className="expense-list">

              {expenses.length === 0 ? (

                <p className="expense-empty">
                  No expenses added yet.
                </p>

              ) : (

                expenses
                  .slice()
                  .reverse()
                  .map((expense) => {

                    const cat =
                      categories.find(
                        (c) =>
                          c.id ===
                          expense.category
                      );

                    return (

                      <div
                        className="expense-row"
                        key={expense.id}
                      >

                        <span className="expense-icon">
                          {cat?.icon}
                        </span>

                        <div className="expense-name">

                          <strong>
                            {expense.name}
                          </strong>

                          <small>
                            {cat?.name}
                          </small>

                        </div>

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
                        >
                          ✕
                        </button>

                      </div>

                    );

                  })

              )}

            </div>

          </div>

        </div>

      </div>

    </section>

  );
}