import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm border-0" style={{ borderRadius: '15px' }}>
                        <div className="card-body p-5">
                            <div className="d-flex align-items-center mb-4">
                                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mr-4" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                                    {user.username.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-grow-1">
                                    <h2 className="mb-0">{user.username}</h2>
                                    <p className="text-muted mb-0">Admin Account</p>
                                </div>
                                <button className="btn btn-outline-danger" onClick={handleLogout}>
                                    <i className="fa fa-sign-out mr-2"></i>Logout
                                </button>
                            </div>

                            <hr />

                            <div className="row mt-4">
                                <div className="col-sm-4 text-muted font-weight-bold">Email</div>
                                <div className="col-sm-8 mb-3">{user.email}</div>

                                <div className="col-sm-4 text-muted font-weight-bold">Mobile</div>
                                <div className="col-sm-8 mb-3">{user.mobile}</div>

                                <div className="col-sm-4 text-muted font-weight-bold">User ID</div>
                                <div className="col-sm-8 mb-3 text-break">{user._id}</div>

                                <div className="col-sm-4 text-muted font-weight-bold">Account Status</div>
                                <div className="col-sm-8">
                                    <span className="badge badge-success px-3 py-2">Verified</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
