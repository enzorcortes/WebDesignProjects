import React, { useState } from 'react';

const Dashboard = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
    };

    return (
        <div>
            Dashboard
        </div>
    );
};

export default Dashboard;
