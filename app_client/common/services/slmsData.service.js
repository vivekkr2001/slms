 (function() {

    angular
    .module('slmsApp')
    .service('slmsData', slmsData);

slmsData.$inject = ['$http', 'authentication'];

    function slmsData($http, authentication) {
        
        var getCourses = function(){
            headers: {
                Authorization: 'Bearer '+ authentication.getToken()
            }
            return $http.get('/api/courses/');
        }
        
        var createCourse = function(data){
            return $http.post('/api/courses/new', data);
        }

        var readCourseById = function(courseid){
            return $http.get('/api/courses/' + courseid);
        }
        var deleteCourseById = function(courseid){
            return $http.delete('/api/courses/' + courseid);
        }
        var updateCourseById = function(courseid,data){
            return $http.put('/api/courses/' + courseid,  data);
        }
        return{
            getCourses: getCourses,
            createCourse: createCourse,
            readCourseById: readCourseById,
            deleteCourseById: deleteCourseById,
            updateCourseById: updateCourseById
        }
    };

 })();