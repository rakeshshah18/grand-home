import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { baseUrl } from '../../utils/api';

const Register = () => {
    const [step, setStep] = useState(1); // 1: Info, 2: OTP
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        mobile: ''
    });
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${baseUrl}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (data.success) {
                setStep(2);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${baseUrl}/api/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile: formData.mobile, otp })
            });

            const data = await res.json();
            if (data.success) {
                alert('Account verified! Please login.');
                navigate('/login');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Verification failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '450px', borderRadius: '15px' }}>
                <h2 className="text-center mb-4">{step === 1 ? 'Create Account' : 'Verify Mobile'}</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                {step === 1 ? (
                    <form onSubmit={handleRegister}>
                        <div className="form-group mb-3">
                            <label>Username</label>
                            <input type="text" name="username" className="form-control" required onChange={handleChange} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }} />
                        </div>
                        <div className="form-group mb-3">
                            <label>Email</label>
                            <input type="email" name="email" className="form-control" required onChange={handleChange} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }} />
                        </div>
                        <div className="form-group mb-3">
                            <label>Mobile Number</label>
                            <input type="text" name="mobile" className="form-control" placeholder="+91..." required onChange={handleChange} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }} />
                        </div>
                        <div className="form-group mb-4">
                            <label>Password</label>
                            <input type="password" name="password" className="form-control" required onChange={handleChange} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }} />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block py-2" disabled={loading}>
                            {loading ? 'Sending OTP...' : 'Register'}
                        </button>
                        <p className="text-center mt-3">
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp}>
                        <p className="text-muted text-center">Enter the 6-digit code sent to {formData.mobile}</p>
                        <div className="form-group mb-4">
                            <input
                                type="text"
                                className="form-control text-center font-weight-bold"
                                style={{ fontSize: '1.5rem', letterSpacing: '8px', border: '1px solid #ccc', borderRadius: '8px' }}
                                maxLength="6"
                                required
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-success btn-block py-2" disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify & Continue'}
                        </button>
                        <button type="button" className="btn btn-link btn-block" onClick={() => setStep(1)}>
                            Back to Register
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Register;
