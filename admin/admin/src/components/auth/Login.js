import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { baseUrl } from '../../utils/api';

const Login = () => {
    const [formData, setFormData] = useState({
        identifier: '', // email, username, or mobile
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${baseUrl}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (data.success) {
                login(data.data);
                navigate('/dashboard');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
                <h2 className="text-center mb-4">Admin Login</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                        <label>Email, Username or Mobile</label>
                        <input
                            type="text"
                            name="identifier"
                            className="form-control"
                            required
                            onChange={handleChange}
                            placeholder="Enter your credentials"
                            style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            required
                            onChange={handleChange}
                            placeholder="••••••••"
                            style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block py-2" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <p className="text-center mt-3">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
