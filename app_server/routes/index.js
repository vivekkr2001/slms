var express = require('express');
var router = express.Router();
var ctrlTeachers = require('../../../backend/controllers/teacher');
var ctrlStudents = require('../../../backend/controllers/student');
var ctrlAdmin = require('../../../backend/controllers/admin');
var ctrlOthers = require('../../../backend/controllers/others');

router.get('/', ctrlOthers.angularApp);
/* Locations pages */
//router.get('/courses', ctrlTeachers.courseList);
router.get('/courses/:courseid', ctrlTeachers.courseInfo);
router.get('/courses/:courseid/content/new', ctrlTeachers.addContent);
router.post('/courses/:courseid/content/new', ctrlTeachers.doAddContent);


/* Other pages */
router.get('/student', ctrlStudents.studentCourseList);
router.get('/student/:courseid', ctrlStudents.studentCourseInfo);

router.get('/admin/', ctrlAdmin.adminCourseList);
router.get('/admin/add/course/', ctrlAdmin.adminAddCourse);
router.post('/admin/add/course/', ctrlAdmin.adminDoAddCourse);

module.exports = router;
