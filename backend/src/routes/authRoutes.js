const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const {
  register,
  login,
  getMe,
  updatePassword
} = require('../controllers/authController');

// Rotas públicas
router.post('/login', login);

// Rotas protegidas
router.get('/me', protect, getMe);
router.put('/updatepassword', protect, updatePassword);

// Rotas de admin
router.post('/register', protect, authorize('admin'), register);

module.exports = router;