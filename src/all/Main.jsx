import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './Main.css';
import Dashboard from './Dashboard';
import Transaction from './Transaction';
import Budgets from './Budgets';
import AIadvisor from './AIadvisor';

function Main() {
    let [login, setLogin] = useState(false);
    let [data, setData] = useState("");
    // useEffect(() => {
    //     fetch("http://localhost:4000/product")
    //         .then((data1) => {
    //             return (data1.json());
    //         })
    //         .then((data2) => {
    //             setData(data2)
    //             console.log(data2)
    //         })
    // }, [1])
    // const button = () => {
    //     if (data.username === username1 && data.password === password1) {
    //         setLogin(true);
    //     }
    // }

    return (
        <div>
            {
                !login &&
                <div>
                    <label htmlFor="">UserName:</label>
                    <input type="text"/><br />
                    <label htmlFor="">PassWord:</label>
                    <input type="password"/>
                    <br />
                    <button onClick={()=>setLogin(true)}>login</button>
                </div>
            }
            {
                login &&
                <div className='heading1'>
                    <div className='header'>
                        <h4>FinAI - Intelligent Finance Manager</h4>
                    </div>
                    <Router>
                        <div className='title2'>
                            <h1 className="title">Fin Ai</h1>
                            <div className="links">
                                <Link to="/">Dashboard</Link>
                                <Link to="/Transaction">Transaction</Link>
                                <Link to="/Budgets">Budgets</Link>
                                <Link to="/Aiadvisor">Aiadvisor</Link>
                            </div>
                            <button className='colorchange'>Light Mode</button>
                            <button className='sign-out' onClick={() => setLogin(false)}>Sign Out</button>
                        </div>
                        <Routes>
                            <Route path='/' element={<Dashboard />} />
                            <Route path='/Transaction' element={<Transaction />} />
                            <Route path='/Budgets' element={<Budgets />} />
                            <Route path='/Aiadvisor' element={<AIadvisor />} />
                        </Routes>
                    </Router>

                </div>
            }
        </div>
    )
}
export default Main;