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

    // lighthange
    let [ligthchanger, setlightchanger] = useState(true)

    //creating a account
    let [createac2, setCreateac2] = useState(
        {
            "email": "",
            "password": ""
        }
    )

    let [data, setData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4001/product", { method: "get" })
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
            alert("please try a to login after")
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

    // creating the add the vlue in the fack data base
    let handlingadd = (e) => {
        let { value, name } = e.target;
        setCreateac2({
            ...createac2,
            [name]: value
        });
    };

    let handlesubmit = (e) => {
        e.preventDefault(); 
        fetch("http://localhost:4001/product", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(createac2)
        })
            .then(() => {
                alert("Data has been stored");
            })
            .catch((err) => {
                console.error("Error:", err);
            });
    };
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
                <form className='login' onSubmit={handlesubmit}>
                    <h1>Create a
                        <br /> Account</h1>
                    <label htmlFor="">Email  :</label>
                    <input value={createac2.email} onChange={handlingadd} name="email" type="email" className='inputtype1' /><br />
                    <label htmlFor="">PassWord  :</label>
                    <input value={createac2.password} onChange={handlingadd} name="password" type="password" className='inputtype1' />
                    <br />
                    <button type='submit'>Create a Acc....</button>
                    <p>or</p>
                    <hr className="hr" />
                    <button onClick={backtologin}>Back-To-Login</button>
                </form>
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
                        <button className='colorchange' onClick={lightmode}>{ligthchanger ? "Light Mode" : " Dark  Mode"}</button>
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