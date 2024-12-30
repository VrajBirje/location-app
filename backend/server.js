const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require("cors");

// Import in-memory database
const { findUserByEmail, addUser } = require("./db");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

// Get JWT secret key from environment variable
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Register route
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const userExists = findUserByEmail(email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Add the new user to the "database"
  const newUser = addUser(email, hashedPassword);

  return res.status(201).json({ message: "User registered successfully" });
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Compare the hashed password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Create JWT token
  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" });

  return res.json({ token });
});

// Protected route (example)
app.get("/protected", (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    return res.json({ message: "Protected content", user: decoded });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
