import React, { useState } from 'react';
import { createUser, signInUser } from '../api/auth'; // Import Firebase functions
import Cookies from 'js-cookie'; // Import js-cookie
import './../css/styles.css';

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
        <div>
            <div id="login">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {message && <h1>{message}</h1>} 
                    <div>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>

        <hr/>

        <div id="signup">
            <form onSubmit={handleCreateUser}>
                <h1>Sign up</h1>
                {message && <h1>{message}</h1>} 
                <div>
                    <label>Create Email:</label>
                    <input 
                        type="email" 
                        value={newEmail} 
                        onChange={(e) => setNewEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Create Password:</label>
                    <input 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Create User</button>
            </form>
        </div>

        </div>
    );
};

export default Login;
