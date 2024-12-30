import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { AddressesProvider } from "./AddressProvider"; // Import context provider
import LocationPicker from "../src/pages/Home";
import ManageAddress from "../src/pages/ManageAddresses";
import LoginComponent from "./pages/Login";
import RegisterComponent from "./pages/Register";
import { fetchProtectedContent } from "./api";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')); // Get token from localStorage
  const [protectedData, setProtectedData] = useState(null);

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem('token', token); // Store token in localStorage
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Remove token from localStorage
  };

  const handleFetchProtectedData = async () => {
    if (token) {
      try {
        const data = await fetchProtectedContent(token);
        setProtectedData(data);
      } catch (error) {
        console.error('Error fetching protected data:', error);
      }
    }
  };

  return (
    <AddressesProvider> {/* Wrap app with the provider */}
      <Router>
        <div>
          <nav style={{ padding: "20px", borderBottom: "1px solid #ddd", background: "black" }}>
            <Link to="/" style={{ marginRight: "20px", padding: "3px 5px", textDecoration: "none", color: "White", border: "1px solid white", borderRadius: "5px" }}>Home</Link>
            <Link to="/manage-addresses" style={{ marginRight: "20px", padding: "3px 5px", textDecoration: "none", color: "White", border: "1px solid white", borderRadius: "5px" }}>Manage Addresses</Link>

            {token ? (
              <button onClick={handleLogout} style={{ marginRight: "20px", padding: "3px 5px", textDecoration: "none", color: "White", border: "1px solid white", borderRadius: "5px", background:"transparent", fontSize:"16px" }}>
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" style={{ marginRight: "20px", padding: "3px 5px", textDecoration: "none", color: "White", border: "1px solid white", borderRadius: "5px" }}>Login</Link>
                <Link to="/register" style={{ marginRight: "20px", padding: "3px 5px", textDecoration: "none", color: "White", border: "1px solid white", borderRadius: "5px" }}>Register</Link>
              </>
            )}
          </nav>

          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginComponent onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterComponent />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={token ? <LocationPicker /> : <Navigate to="/login" />} // Redirect to login if not logged in
            />
            <Route
              path="/manage-addresses"
              element={token ? <ManageAddress /> : <Navigate to="/login" />} // Redirect to login if not logged in
            />
          </Routes>
        </div>
      </Router>
    </AddressesProvider>
  );
};

export default App;
