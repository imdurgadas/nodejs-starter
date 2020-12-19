const express = require('express');
const { getBootcamps, getBootcampById, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius } = require('../controllers/bootcampController')
const courseRouter = require('./courseRoutes')

const router = express.Router();

//Re Route into resource routers
router.use('/:bootcampId/courses', courseRouter);


router.route('/').get(getBootcamps).post(createBootcamp);
router.route('/:id').get(getBootcampById).put(updateBootcamp).delete(deleteBootcamp);
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
module.exports = router;
