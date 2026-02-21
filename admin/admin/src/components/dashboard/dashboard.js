import React from "react";

const Dashboard = () => {
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
                    <a className="navbar-brand ms-auto" href="#">
                        <i className="fa fa-user text-dark"> User</i>
                    </a>
                </div>
            </nav>
        </div>
    );
};

export default Dashboard;