 (function() {
    angular
    .module('slmsApp')
    .controller('courseListCtrl', courseListCtrl);

courseListCtrl.$inject = ['$scope', 'slmsData'];

    function courseListCtrl($scope, slmsData) {
    var vm = this;
    vm.pageHeader = {
        title: 'SLMS',
        strapline: 'Teacher section'
    };
    vm.sidebar = {
        content: "stdy Portal"
    };
    vm.message = "Fetching Courses";
    slmsData.getCourses()
    .success(function(data) {
        vm.message = data.length > 0 ? "" : "No Courses Alloted";
        vm.data = { courses: data };
    })
    .error(function (e) {
        $scope.message = "Sorry, something's gone wrong ";
    });
};

// var injector = angular.injector(['slmsData']);

//$injector.invoke(courseListCtrl);

 })();
