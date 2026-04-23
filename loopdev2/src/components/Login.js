import React, { useState } from 'react';
import { createUser, signInUser } from '../api/auth'; // Import Firebase functions
import Cookies from 'js-cookie'; // Import js-cookie
import './../css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoopFooter from './LoopFooter';
import LoopFavicon from './LoopFavicon';
import LoopHeader from './LoopHeader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState(''); // Add state for message

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await signInUser(email, password); // Sign in user
            console.log('Login successful:', result); // Log the result
            Cookies.set('Stoken', result.accessToken); // Save accessToken in cookie
            setMessage('Login successful'); // Set success message
            
        } catch (error) {
            console.error('Login error:', error); // Log the error
            setMessage('Login error: ' + error.message); // Set error message
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const result = await createUser(newEmail, newPassword); // Create new user
            console.log('User created successfully:', result); // Log the result
            Cookies.set('Stoken', result.accessToken); // Save accessToken in cookie
            setMessage('User registered successfully'); // Set success message
        } catch (error) {
            console.error('User creation error:', error); // Log the error
            setMessage('User creation error: ' + error.message); // Set error message
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100"> {/* Full height flex container */}
            <LoopHeader />

            <main className="flex-grow-1 d-flex align-items-center justify-content-center" style={{ padding: '20px' }}>
                <div className="row w-100">
                    <LoopFavicon />
                    <div className="col-md-6 mx-auto"> {/* Center the column */}
                        <div className="card p-4" style={{ border: '2px solid #f3e8ff', backgroundColor: '#f9f0ff', height: '100%' }}>
                            <h3 className="text-center mb-4 login-text">Welcome back to the Loop</h3>
                            <form onSubmit={handleSubmit} className="login-text"> {/* Apply the font class here */}
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Enter your username or email</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <img src="/images/person.svg" alt="Username Icon" style={{width: '25px'}} />
                                            </span>
                                        </div>
                                        <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Enter your password</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <img src="/images/lock.svg" alt="Password Icon" style={{width: '25px'}} />
                                            </span>
                                        </div>
                                        <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="text-center mt-3"> {/* Add mt-3 for margin-top */}
                                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                                </div>
                                <div className="mt-3 text-center">
                                    <a href="/reset">Forgot your password?</a>
                                </div>
                                <div className="mt-3 text-center">
                                    <a href="/signup">New here? Make a new account</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <LoopFooter /> {/* Footer will be at the bottom */}
        </div>
    );
};

export default Login;
