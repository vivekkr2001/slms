angular.module('slmsApp', []);

var courseListCtrl = function ($scope, slmsData) {
    $scope.message = "Fetching Courses";
    slmsData
    .success(function(data) {
        $scope.message = data.length > 0 ? "" : "No Courses Alloted";
        $scope.data = { courses: data };
    })
    .error(function (e) {
        $scope.message = "Sorry, something's gone wrong ";
    });
};

var slmsData = function ($http) {
    return $http.get('/api/courses/');
    };

// angular
// .module('slmsApp')
// .controller('courseListCtrl', courseListCtrl)
// .service('slmsData', slmsData);
