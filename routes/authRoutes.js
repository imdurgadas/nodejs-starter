const express = require('express')
const Router = express.Router();
const { register, login, getMe, logout } = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const router = require('./courseRoutes');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/me').get(protect, getMe);
module.exports = router;

