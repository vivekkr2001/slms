(function() {

    angular
    .module('slmsApp')
    .service('contentData', contentData);

    contentData.$inject = ['$http', 'authentication'];

    function contentData($http, authentication) {
        var courseById = function(courseid){
        return $http.get('/api/courses/' + courseid);
        }

        var addContentById = function(courseid, data){
            return $http.post('/api/courses/' + courseid + '/contents', data);
        } 

        var deleteContentById = function(courseid, contentid){
            return $http.delete('/api/courses/' + courseid + '/contents/' + contentid);
        }

        var readContentById = function(courseid, contentid){
            return $http.get('/api/courses/' + courseid + '/contents/' + contentid);
        }

        var updateContentById = function(courseid, contentid, data){
            return $http.put('/api/courses/' + courseid + '/contents/' + contentid, data);
        }
        headers: {
            Authorization: 'Bearer '+ authentication.getToken()
            }
        return{
            courseById: courseById,
            addContentById: addContentById,
            deleteContentById: deleteContentById,
            readContentById: readContentById,
            updateContentById: updateContentById
        }
    };
    //$injector.invoke(slmsData);



 })();