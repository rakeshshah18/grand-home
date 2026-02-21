import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <nav className="navbar bg-body-tertiary" style={{ borderBottom: "3px solid #ccc" }}>
                <div
                    className="container-fluid d-flex align-items-center"
                    style={{ paddingLeft: "3vw", paddingRight: "3vw" }}
                >
                    <div style={{ width: "30px" }}></div>
                    <span className="navbar-brand mx-auto mb-0 h1 text-bold">
                        Admin Panel
                    </span>
                    <Link className="navbar-brand ms-auto d-flex align-items-center" to="/profile">
                        <i className="fa fa-user-circle mr-2"></i>
                        <span>{user?.username || 'User'}</span>
                    </Link>
                </div>
            </nav>
            <div>
                <div className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
                    <h1>Dashboard</h1>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;