import React, { useState } from 'react';
import { registerUser } from '../api'; // Import the API function

const RegisterComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        try {
            const response = await registerUser(email, password);
            setMessage(response.message);
        } catch (error) {
            setMessage('Registration failed');
        }
    };

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}> 
            <h2>Register</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                style={{
                    padding: "10px 20px",
                    border: "1px solid black",
                    background: "white",
                    borderRadius: "5px",
                    width: "30%"
                }}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={{
                    padding: "10px 20px",
                    border: "1px solid black",
                    background: "white",
                    borderRadius: "5px",
                    width: "30%"
                }}
            />
            <button onClick={handleRegister}
                style={{
                    margin: "20px",
                    padding: "10px 20px",
                    textDecoration: "none",
                    color: "black",
                    border: "1px solid black",
                    borderRadius: "5px",
                    cursor: "pointer",
                    background: "white",
                    fontSize: "16px",
                }}
            >Register</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RegisterComponent;
