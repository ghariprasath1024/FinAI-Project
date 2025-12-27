import React, { useState, useEffect } from "react";
import "./Transaction.css";
import { TiPencil } from "react-icons/ti";
import { MdDeleteOutline } from "react-icons/md";

const Transaction = () => {
    const [data, setData] = useState(false);
    const [data1, setData1] = useState([]);       // storing the data in the arrey
    const [add, setAdd] = useState("");           // getting the description 
    const [amount, setAmount] = useState("");     // getting the amount
    const [category, setCategory] = useState(""); // getting the category
    const [type, setType] = useState("expense"); // Set a default value         // store type string
    const [save, setSave] = useState(false);
    let [income, setIncome] = useState(0);   // this are the editing the formate 
    let [expense, setExpense] = useState(0);

    // this are the editing the formate 

    // let [newitem, setNewitem] = useState(""); // used to edite the description
    // let [newamount, setNewamount] = useState(""); // used to edite the amount
    // let [newcategory, setNewcategory] = useState(""); // used to edite the category
    let [editer, setEditer] = useState(null); // used to edite the item in the text 
    const show = () => {
        if (add !== "" && amount !== "" && category !== "") {
            if (editer) {
                setData1(
                    data1.map((item) =>
                        item.id === editer
                            ? { ...item, description: add, amount, category, type }
                            : item
                    )
                );
                setEditer(null);
            } else {
                setData1([
                    ...data1,
                    {
                        id: Date.now(),
                        description: add,
                        amount,
                        category,
                        type,
                    },
                ]);
            }
            reset();
            setData(false);
            setSave(false);
        } else {
            alert("Please fill in all fields.");
        }
    };
    const reset = () => {
        setAdd("");
        setAmount("");
        setCategory("");
        setType("");
    }
    const cancel = () => {
        setAdd("");
        setAmount("");
        setCategory("");
        setType("");
        setData(false);
        setSave(false);
        setEditer(null);
    }
    const edite = (id) => {
        let listItem = data1.find((item) => item.id === id);
        setAdd(listItem.description);
        setAmount(listItem.amount);
        setCategory(listItem.category);
        setType(listItem.type);
        setEditer(id);
        setData(true);
        setSave(true);
    }
    const delet = (id) => {
        setData1(data1.filter((item) => item.id !== id));
    };
    useEffect(() => {
        let income1 = 0, expense1 = 0;
        for (let i = 0; i < data1.length; i++) {
            if (data1[i].type === "income") {
                income1 += Number(data1[i].amount);
            } else {
                expense1 += Number(data1[i].amount);
            }
        }
        setIncome(income1);
        setExpense(expense1);
        console.log("Income:", income1, "Expense:", expense1);
    }, [data1]);
    return (
        <div className="main">
            <h1>Transaction</h1>
            <p className="sub">Manage your income and expenses</p>
            <button onClick={() => setData(true)}>New Trans..</button>
            {data && (
                <div className="heading-title">
                    <p className="heading">{save ? "Editing the Transaction" : "Adding the New Transaction"}</p>
                    <hr />
                    <div className="Adding-Items">
                        <p>
                            Description:
                            <input type="text" placeholder="enter a description" required value={add} onChange={(event) => setAdd(event.target.value)} />
                        </p>
                        <p>
                            Amount:
                            <input type="number" placeholder="enter an amount" required value={amount} onChange={(event) => setAmount(event.target.value)} />
                        </p>
                        <p>
                            Category:
                            <input type="text" placeholder="enter a category" value={category} onChange={(event) => setCategory(event.target.value)} />
                        </p>
                        <p>
                            Type:
                            <select value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </p>
                    </div>
                    <button onClick={show}>{save ? "UPDATE" : "ADD"}</button>
                    <button onClick={reset}>RESET</button>
                    <button onClick={cancel}>CANCEL</button>
                </div>
            )}
            <table className="transaction-table">
                <thead>
                    <tr>
                        <th className="son">S.No</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th className="son1">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {data1.map((items, index) => (
                        <tr key={items.id}>
                            <td>{index + 1}</td>
                            <td>{items.description}</td>
                            <td>
                                <span className="Amount" style={{ color: items.type === "income" ? "green" : "red" }}>
                                    {items.type === "income" ? "+" : "-"} {items.amount}
                                </span>
                            </td>
                            <td>{items.category}</td>
                            <td>
                                <TiPencil role="button" tabIndex={0} onClick={() => edite(items.id)} />{" "}
                                <MdDeleteOutline role="button" tabIndex={0} onClick={() => delet(items.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};
export default Transaction;