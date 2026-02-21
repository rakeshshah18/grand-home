import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <nav className="navbar bg-body-tertiary">
                <div
                    className="container-fluid d-flex align-items-center"
                    style={{ paddingLeft: "3vw", paddingRight: "3vw" }}
                >
                    <div style={{ width: "30px" }}></div>
                    <span className="navbar-brand mx-auto mb-0 h1">
                        Dashboard
                    </span>
                    <Link className="navbar-brand ms-auto d-flex align-items-center" to="/profile">
                        <i className="fa fa-user-circle mr-2"></i>
                        <span>{user?.username || 'User'}</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Dashboard;