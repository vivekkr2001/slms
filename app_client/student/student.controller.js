(function() {
    angular
    .module('slmsApp')
    .controller('studentCourseListCtrl', studentCourseListCtrl);

studentCourseListCtrl.$inject = ['$scope', 'slmsData'];

    function studentCourseListCtrl($scope, slmsData) {
    var vm = this;
    vm.pageHeader = {
        title: 'SLMS',
        strapline: 'Student section'
    };
    vm.sidebar = {
        content: "Study Management portal"
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

})();