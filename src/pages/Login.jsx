import React, { useState } from 'react';
import { loginUser } from '../api'; // Import the API function
import { useNavigate } from 'react-router-dom';

const LoginComponent = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const Navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await loginUser(email, password);
            localStorage.setItem('token', response.token); // Store token in localStorage
            onLogin(response.token); // Update parent component with token
            setMessage('Login successful');
            Navigate("/");

        } catch (error) {
            setMessage('Login failed');
        }
    };

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            <h2>Login</h2>
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
            <button onClick={handleLogin}
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
            >Login</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default LoginComponent;
