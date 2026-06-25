import { useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([
    { title: "Milkesh", amount: 123456797, category: "Food", type: "Income" },
    { title: "Yunlee", amount: 1000000000, category: "Education", type: "Expense" },
    { title: "Hosatile", amount: 64597946, category: "Entertainment", type: "Income" },
  ]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("Income");

  const addTransaction = () => {
    if (!title || !amount || !category) return;

    setTransactions([
      ...transactions,
      {
        title,
        amount: Number(amount),
        category,
        type,
      },
    ]);

    setTitle("");
    setAmount("");
    setCategory("");
  };

  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  return (
    <div className="container">
      <h1>💰 Expense Analytics Dashboard</h1>

      <div className="form">
        <input
          placeholder="Transaction Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Income</option>
          <option>Expense</option>
        </select>

        <button onClick={addTransaction}>Add Transaction</button>
      </div>

      <div className="cards">
        <div className="card income">
          <h3>Total Income</h3>
          <p>₹{income}</p>
        </div>

        <div className="card expense">
          <h3>Total Expense</h3>
          <p>₹{expense}</p>
        </div>

        <div className="card balance">
          <h3>Balance</h3>
          <p>₹{balance}</p>
        </div>
      </div>

      <div className="content">
        <div className="history">
          <h2>📄 Transaction History</h2>

          {transactions.map((t, index) => (
            <div key={index} className="item">
              <div>
                <strong>{t.title}</strong>
                <br />
                ₹{t.amount} - {t.category}
              </div>

              <span
                className={
                  t.type === "Income" ? "incomeText" : "expenseText"
                }
              >
                {t.type}
              </span>
            </div>
          ))}
        </div>

        <div className="analytics">
          <h2>📊 Expense Analytics</h2>

          {transactions
            .filter((t) => t.type === "Expense")
            .map((t, index) => (
              <div key={index}>
                <p>
                  {t.category} - ₹{t.amount}
                </p>
                <progress value={t.amount} max="1000000000"></progress>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
