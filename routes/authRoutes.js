const express = require('express');

// Debug: Check what's being imported
const authController = require('../controllers/authController');
console.log('Imported authController:', authController);
console.log('Available functions:', Object.keys(authController));

// Fix: Import the correct function names
const { registerUser, loginUser } = authController;
console.log('registerUser function:', typeof registerUser);
console.log('loginUser function:', typeof loginUser);

const router = express.Router();

// Use the correct function names
if (typeof registerUser === 'function') {
  router.post('/register', registerUser);
  console.log('Register route added');
} else {
  console.log('RegisterUser function is not available');
}

if (typeof loginUser === 'function') {
  router.post('/login', loginUser);
  console.log('Login route added');
} else {
  console.log('LoginUser function is not available');
}

module.exports = router;