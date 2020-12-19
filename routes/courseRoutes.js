const express = require('express');
const router = express.Router({
    mergeParams: true
});
const { getCourses } = require('../controllers/courseController')
const advancedResults = require('../middlewares/advanceResult');
const Course = require('../models/Course');

router.route('/').get(advancedResults(Course, {
    path: 'bootcamp',
    select: 'name description'
}), getCourses)
module.exports = router;
