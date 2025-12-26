import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './Main.css';
import Dashboard from './Dashboard';
import Transaction from './Transaction';
import Budgets from './Budgets';
import AIadvisor from './AIadvisor';

function Main() {
    //login page
    let [login, setLogin] = useState(true);
    let [createac, setCreateac] = useState(false);
    let [dashboard, setDashboard] = useState(false)

    let [username1, setUsername1] = useState("");
    let [password1, setPassword1] = useState("")

    let [ligthchanger, setlightchanger] = useState(true)

    let [data, setData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/product")
            .then((data1) => {
                return (data1.json());  
            })
            .then((data2) => {
                setData(data2)
                console.log(data2)
            })
    }, [])
    const Login1 = () => {
        const user = data.find((item) => item.email === username1 && item.password === password1);
        if (user) {
            setDashboard(true);
            setLogin(false);
            setCreateac(false);
        }
        else {
            alert("please type a to login after")
        }
    }
    const createac1 = () => {
        setLogin(false);
        setDashboard(false);
        setCreateac(true);
    }
    const backtologin = () => {
        setLogin(true);
        setCreateac(false);
        setDashboard(false);
    }

    // /light mode
    const counter = 0
    const lightmode = () => {
        const color = document.querySelector('body');
        if (color) {
            setlightchanger(!ligthchanger); //changing the name
            color.classList.toggle('text-color')
        }
    }
    return (
        <div>
            {
                login &&
                <div className='login'>
                    <h1>Login</h1>
                    <label htmlFor="">Email  :</label>
                    <input type="email" className='inputtype1' value={username1} onChange={(e) => setUsername1(e.target.value)} /><br />
                    <label htmlFor="">PassWord  :</label>
                    <input type="password" className='inputtype1' value={password1} onChange={(e) => setPassword1(e.target.value)} />
                    <br />
                    <button onClick={Login1}>Login</button>
                    <p>or</p>
                    <hr className="hr" />
                    <button onClick={createac1}>Create Account</button>
                </div>
            }
            {
                createac &&
                <div>
                    <div className='login'>
                        <h1>Create a Account</h1>
                        <label htmlFor="">Email  :</label>
                        <input type="email" className='inputtype1' /><br />
                        <label htmlFor="">PassWord  :</label>
                        <input type="password" className='inputtype1' />
                        <br />
                        <button onClick={Login1}>Create a Acc....</button>
                        <p>or</p>
                        <hr className="hr" />
                        <button onClick={backtologin}>Back-To-Login</button>
                    </div>
                </div>
            }
            {
                dashboard &&
                <div className='heading1'>
                    <div className='header'>
                        <h4>FinAI - Intelligent Finance Manager</h4>
                        <h6>{username1}</h6>
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
                            <button className='colorchange' onClick={lightmode}>{ligthchanger ? "Light Mode":" Dark  Mode"}</button>
                            <button className='sign-out' onClick={backtologin}>Sign Out</button>
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