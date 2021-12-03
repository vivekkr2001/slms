(function() {
    angular
    .module('slmsApp')
    .controller('adminCourseListCtrl', adminCourseListCtrl);

adminCourseListCtrl.$inject = ['$scope', 'slmsData', '$modal', '$rootScope'];

    function adminCourseListCtrl($scope, slmsData, $modal, $rootScope) {
    var vm = this;
    vm.pageHeader = {
        title: 'SLMS',
        strapline: 'Admin section'
    };
    vm.sidebar = {
        content: "Student learning portal"
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

    vm.popupCourseForm = function () {
        var modalInstance = $modal.open({
            templateUrl: '/modal/course/courseModal.view.html',
            controller: 'courseModalCtrl as vm',
        });

    };
    vm.updateCourse= function(courseid){
        var corid = $rootScope;
        corid.courseid = courseid;
        
        var modalInstance = $modal.open({
            templateUrl: '/modal/course/courseUpdate.view.html',
            controller: 'courseModalCtrl as vm',
        });
    }
    
    vm.deleteCourse = function(courseid){
        var corid = $rootScope;
        corid.courseid = courseid;
        var modalInstance = $modal.open({
            templateUrl: '/modal/course/courseDelete.view.html',
            controller: 'courseModalCtrl as vm',
        });      
};
};

 })();