import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { GoArrowUpRight } from "react-icons/go";
import { GoArrowDownRight } from "react-icons/go";
import { MdOutlineAttachMoney } from "react-icons/md";
function Dashboard() {
    return (
        <div className="main">
            <h1>Dashboard</h1>
            <p className="sub">Overview of your financial health.</p>
            <div className="cards">
                <div className="card">
                    <div className="label">
                        <div className="label1">Total Balance</div>
                        <nav>
                            <MdOutlineAttachMoney className='icons' style={{ color: "white" }} />
                        </nav>
                    </div>
                    <div className="value">${ }</div>
                    <div>Available funds</div>
                </div>
                <div className="card">
                    <div className='label'>
                        <div className="label1">Total Income </div>
                        <nav>
                            <GoArrowUpRight className="icons" style={{ color: "white" }} />
                        </nav>
                    </div>
                    <div className="value">${ }</div>
                    <div>{""}vs last month</div>
                </div>
                <div className="card">
                    <div className='label'>
                        <div className="label1">Total Expenses</div>
                        <nav><GoArrowDownRight className="icons" style={{ color: "white" }} /></nav>
                    </div>
                    <div className="value">${ }</div>
                    <div>{""}vs last month</div>
                </div>
            </div>
            <div className="charts">
                <div className="chart-box">
                    <h3>Expense Breakdown</h3>
                    <div className="pie"></div>
                </div>
                <div className="chart-box">
                    <h3>Recent Expenses</h3>
                    <div className="bars">
                        <div className="bar b1"></div>
                        <div className="bar b2"></div>
                        <div className="bar b3"></div>
                        <div className="bar b4"></div>
                        <div className="bar b5"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;