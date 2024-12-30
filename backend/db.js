// In-memory "database" for users
const users = [];

// Function to find a user by email
const findUserByEmail = (email) => {
  return users.find((user) => user.email === email);
};

// Function to add a user to the "database"
const addUser = (email, hashedPassword) => {
  const newUser = { email, password: hashedPassword };
  users.push(newUser);
  return newUser;
};

// Function to get all users (for debugging or testing purposes)
const getAllUsers = () => {
  return users;
};

module.exports = { findUserByEmail, addUser, getAllUsers };
