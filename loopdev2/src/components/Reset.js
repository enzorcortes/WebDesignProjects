import React, { useState } from 'react';
import './../css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoopFooter from './LoopFooter';
import LoopFavicon from './LoopFavicon';
import LoopHeader from './LoopHeader';

const Reset = () => {
    const [email, setEmail] = useState('');
    const [showResetLightbox, setShowResetLightbox] = useState(false);

    const handleResetPassword = (e) => {
        e.preventDefault();
        // Logic to send password reset email goes here
        setShowResetLightbox(true);
    };

    const closeResetLightbox = () => {
        setShowResetLightbox(false);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <LoopHeader />
            
            <main className="flex-grow-1 d-flex align-items-center justify-content-center" style={{ padding: '20px' }}>
                <div className="row w-100">
                <LoopFavicon />
                    <div className="col-md-6 mx-auto">
                        
                        <div className="card p-4" style={{ border: '2px solid #f3e8ff', backgroundColor: '#f9f0ff' }}>
                            <h3 className="text-center mb-4 login-text">Reset Password</h3>
                            <form onSubmit={handleResetPassword} className="login-text">
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Enter your email address</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        className="form-control" 
                                        placeholder="Email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="text-center mt-3">
                                    <button type="submit" className="btn btn-primary w-30">Reset Password</button>
                                </div>
                                <div className="mt-3">
                                <a href="/">Back to Login</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <LoopFooter />

            {/* ResetLightbox for confirmation */}
            {showResetLightbox && (
                <div className="reset-lightbox">
                    <div className="lightbox-content">
                        <span className="close" onClick={closeResetLightbox}>&times;</span>
                        <h4>Check Your Email</h4>
                        <p>Please check your email for password reset instructions.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reset;
