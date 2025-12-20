import React, { useState, useMemo } from "react";
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

    return (
        <div className="main">
            <h2>Monthly Budget Manager</h2>

            {!showForm && (
                <button onClick={() => setShowForm(true)}>
                    Add Budget
                </button>
            )}

            {showForm && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Category:</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Amount:</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">
                        {editId ? "Update" : "Save"}
                    </button>

                    <button type="button" onClick={resetForm}>
                        Cancel
                    </button>
                </form>
            )}

            {budgets.map((budget) => {
                const spent = spendingData[budget.category] || 0;
                const percent = Math.min((spent / budget.amount) * 100, 100);
                const over = spent > budget.amount;

                return (
                    <div key={budget.id}>
                        <h3>{budget.category}</h3>
                        <p>Limit: ${budget.amount}</p>
                        <p>Spent: ${spent}</p>
                        <p>Used: {Math.round(percent)}%</p>
                        {over ? (
                            <p>Over budget by ${spent - budget.amount}</p>
                        ) : (
                            <p>Remaining ${budget.amount - spent}</p>
                        )}
                        <button onClick={() => handleEdit(budget)}>Edit</button>
                        <button onClick={() => handleDelete(budget.id)}>Delete</button>
                    </div>
                );
            })}
        </div>
    );
};
export default Budgets;