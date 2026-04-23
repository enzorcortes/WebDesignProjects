import React, { useState } from 'react';
import { createUser } from '../api/auth';
import Cookies from 'js-cookie';
import './../css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoopFooter from './LoopFooter';
import LoopFavicon from './LoopFavicon';
import LoopHeader from './LoopHeader';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateUser = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        if (email !== confirmEmail) {
            setMessage('Emails do not match');
            return;
        }
        try {
            const result = await createUser(email, password);
            console.log('User created successfully:', result);
            Cookies.set('Stoken', result.accessToken);
            setMessage('User registered successfully');
        } catch (error) {
            console.error('User creation error:', error);
            setMessage('User creation error: ' + error.message);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <LoopHeader />

            <main className="flex-grow-1 d-flex align-items-center justify-content-center" style={{ padding: '20px' }}>
                <div className="row w-100">
                    <LoopFavicon/>
                    <div className="col-md-6 mx-auto">
                        <div className="card p-4" style={{ border: '2px solid #f3e8ff', backgroundColor: '#f9f0ff' }}>
                            <h3 className="text-center mb-4 login-text">Create a Loop Account</h3>
                            <form onSubmit={handleCreateUser} className="login-text">
                                <div className="form-group mb-3">
                                    <label htmlFor="username">Create your username</label>
                                    <span className="username-requirements" style={{ display: 'block', textAlign: 'center', marginTop: '5px' }}>
                                        Your username is how you will appear to others in the Loop. It can be changed later.
                                    </span>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <img src="/images/person.svg" alt="Username Icon" style={{ width: '25px' }} />
                                            </span>
                                        </div>
                                        <input 
                                            type="text" 
                                            id="username" 
                                            className="form-control" 
                                            placeholder="Type your username" 
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Enter your email address</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <img src="/images/person.svg" alt="Email Icon" style={{ width: '25px' }} />
                                            </span>
                                        </div>
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
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="confirm-email">Confirm your email</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <img src="/images/person.svg" alt="Email Confirm Icon" style={{ width: '25px' }} />
                                            </span>
                                        </div>
                                        <input 
                                            type="email" 
                                            id="confirm-email" 
                                            className="form-control" 
                                            placeholder="Re-type Email" 
                                            value={confirmEmail}
                                            onChange={(e) => setConfirmEmail(e.target.value)}
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password"style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Create your password
                                        </label> 
                                        <span className="password-requirements" style={{ display: 'block', textAlign: 'center', marginTop: '5px' }}>
                                            min. 6 chars, 1 uppercase, 1 number
                                        </span>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <img src="/images/lock.svg" alt="Password Icon" style={{ width: '25px' }} />
                                            </span>
                                        </div>
                                        <input 
                                            type="password" 
                                            id="password" 
                                            className="form-control" 
                                            placeholder="Password" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="confirm-password">Confirm your password</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <img src="/images/lock.svg" alt="Password Confirm Icon" style={{ width: '25px' }} />
                                            </span>
                                        </div>
                                        <input 
                                            type="password" 
                                            id="confirm-password" 
                                            className="form-control" 
                                            placeholder="Re-type Password" 
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="text-center mt-3">
                                    <button type="submit" className="btn btn-primary btn-block">Create Account</button>
                                </div>
                                <div className="mt-3 text-center">
                                    <a href="/">Already have an account? Login</a>
                                </div>
                            </form>
                            {message && <div className="alert alert-info mt-3">{message}</div>}
                        </div>
                    </div>
                </div>
            </main>

            <LoopFooter />
        </div>
    );
};

export default Signup;
