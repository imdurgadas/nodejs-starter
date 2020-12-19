const express = require('express')
const Router = express.Router();
const { register, login } = require('../controllers/authController');
const router = require('./courseRoutes');

router.route('/register').post(register);
router.route('/login').post(login);

module.exports = router;

