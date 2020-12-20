const express = require('express')
const Router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const router = require('./courseRoutes');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(protect, getMe);
module.exports = router;

