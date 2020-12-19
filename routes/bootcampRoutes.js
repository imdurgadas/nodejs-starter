const express = require('express');
const router = express.Router();
const { getBootcamps, getBootcampById, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius } = require('../controllers/bootcampController')

router.route('/').get(getBootcamps).post(createBootcamp);
router.route('/:id').get(getBootcampById).put(updateBootcamp).delete(deleteBootcamp);
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
module.exports = router;
