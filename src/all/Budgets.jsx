import React, { useState, useMemo } from "react";
import "./Budgets.css";
const Budgets = ({ transactions = [] }) => {
    const [budgets, setBudgets] = useState([]);
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const spendingData = useMemo(() => {
        const data = {};
        transactions.forEach((t) => {
            const d = new Date(t.date);
            if (
                t.type === "expense" &&
                d.getMonth() === month &&
                d.getFullYear() === year
            ) {
                data[t.category] = (data[t.category] || 0) + t.amount;
            }
        });
        return data;
    }, [transactions, month, year]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!category || !amount) return;

        if (editId) {
            setBudgets(
                budgets.map((b) =>
                    b.id === editId ? { ...b, category, amount: Number(amount) } : b
                )
            );
        } else {
            setBudgets([
                ...budgets,
                { id: Date.now(), category, amount: Number(amount) }
            ]);
        }

        resetForm();
    };

    const resetForm = () => {
        setCategory("");
        setAmount("");
        setEditId(null);
        setShowForm(false);
    };

    const handleEdit = (budget) => {
        setCategory(budget.category);
        setAmount(budget.amount);
        setEditId(budget.id);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        setBudgets(budgets.filter((b) => b.id !== id));
    };
    const currentYear = new Date().getFullYear();
    return (
        <div className="main">
            <h2>Budgets</h2>
            <p>Track spending limits per category.</p>
            <div className="budget1">
               <p><h2>Monthly Budget Manager</h2>Tracking for December  {currentYear}</p>
                {!showForm && (
                    <button onClick={() => setShowForm(true)}>
                       + Add Budget
                    </button>
                )}
            </div>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <p>Adding a New Budgets</p>
                    <hr />
                    <div className="form1">
                        <div>
                            <label>Category:</label>
                            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required/>
                        </div>
                        <div>
                            <label>Limit of This category: </label>
                            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                        </div>
                    </div>
                    <button type="submit" className="edit">
                        {editId ? "Update" : "Save"}
                    </button>

                    <button type="button" onClick={resetForm} className="edit">
                        Cancel
                    </button>
                </form>
            )}

            {budgets.map((budget) => {
                const spent = spendingData[budget.category] || 0;
                const percent = Math.min((spent / budget.amount) * 100, 100);
                const over = spent > budget.amount;
                return (
                    <div key={budget.id} className="budget">
                        <h3>{budget.category}</h3><button onClick={() => handleEdit(budget)} >Edit</button><button onClick={() => handleDelete(budget.id)}>Delete</button>
                        <p>Limit: ${budget.amount}</p>
                        <p>{spent}<p>Used: {Math.round(percent)}%</p></p>
                        {over ? (
                            <p>Over budget by ${spent - budget.amount}</p>
                        ) : (
                            <p>Remaining ${budget.amount - spent}</p>
                        )}
                    </div>
                );
            })}

        </div>

    );
};
export default Budgets;