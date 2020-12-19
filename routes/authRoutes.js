const express = require('express')
const Router = express.Router();
const { register } = require('../controllers/authController');
const router = require('./courseRoutes');

router.route('/register').post(register);

module.exports = router;

