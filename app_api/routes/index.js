var express = require('express');
var router = express.Router();
var ctrlCourses = require('../controllers/courses');
var ctrlContents = require('../controllers/contents');
var ctrlAuth = require('../controllers/authentication');
var ctrlDb = require('../models/db');


router.get('/courses', ctrlCourses.courseList);
router.post('/courses/new', ctrlCourses.coursesCreate);
router.get('/courses/:courseid', ctrlCourses.coursesReadOne);
router.put('/courses/:courseid',  ctrlCourses.coursesUpdateOne);
router.delete('/courses/:courseid',  ctrlCourses.coursesDeleteOne);

// // reviews
router.post('/courses/:courseid/contents', ctrlContents.contentsCreate);
router.get('/courses/:courseid/contents/:contentid', ctrlContents.contentsReadOne);
router.put('/courses/:courseid/contents/:contentid', ctrlContents.contentsUpdateOne);
router.delete('/courses/:courseid/contents/:contentid', ctrlContents.contentsDeleteOne);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// router.post('/upload', ctrlDb.upload);

module.exports = router;
