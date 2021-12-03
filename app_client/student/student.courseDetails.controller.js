(function () {
    angular
        .module('slmsApp')
        .controller('studentCourseDetailCtrl', studentCourseDetailCtrl);

    studentCourseDetailCtrl.$inject = ['$routeParams','contentData'];
    function studentCourseDetailCtrl ($routeParams, contentData) {
        var vm = this;
        vm.courseid = $routeParams.courseid;
        
        contentData.courseById(vm.courseid)
            .success(function(data) {
                vm.data = {course: data};
                vm.pageHeader = {
                    title: data.name,
                    strapline: 'Student section'
                };
                
            })
            .error(function(e){
                console.log(e);
            });

    }
})();