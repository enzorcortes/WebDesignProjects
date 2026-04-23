import React, { useState } from 'react';
import './../css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoopFooter from './LoopFooter';
import LoopFavicon from './LoopFavicon';
import LoopHeader from './LoopHeader';

const Reset = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        // Add logic to handle password reset here
        setMessage('Password has been reset successfully');
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <LoopHeader />

            <main className="flex-grow-1 d-flex align-items-center justify-content-center" style={{ padding: '20px' }}>
                <div className="row w-100">
                    <div className="col-md-6 mx-auto">
                        <LoopFavicon />
                        <div className="card p-4" style={{ border: '2px solid #f3e8ff', backgroundColor: '#f9f0ff' }}>
                            <h3 className="text-center mb-4 login-text">Reset Password</h3>
                            <form onSubmit={handleResetPassword} className="login-text">
                                <div className="form-group mb-3">
                                    <label htmlFor="new-password">New Password</label>
                                    <span className="password-requirements" style={{ display: 'block', textAlign: 'center', marginTop: '5px' }}>
                                        min. 6 chars, 1 uppercase, 1 number
                                    </span>
                                    <input 
                                        type="password" 
                                        id="new-password" 
                                        className="form-control" 
                                        placeholder="Enter new password" 
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="confirm-password">Confirm New Password</label>
                                    <input 
                                        type="password" 
                                        id="confirm-password" 
                                        className="form-control" 
                                        placeholder="Re-type new password" 
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="text-center mt-3">
                                    <button type="submit" className="btn btn-primary w-40">Apply New Password</button>
                                </div>
                                {message && <div className="alert alert-info mt-3">{message}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <LoopFooter />
        </div>
    );
};

export default Reset;
