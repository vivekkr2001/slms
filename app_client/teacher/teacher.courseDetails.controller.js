(function () {
    angular
        .module('slmsApp')
        .controller('teacherCourseDetailCtrl', teacherCourseDetailCtrl);

    teacherCourseDetailCtrl.$inject = ['$routeParams', 'contentData', '$modal', '$rootScope'];
    function teacherCourseDetailCtrl($routeParams, contentData, $modal, $rootScope) {
        var vm = this;
        vm.courseid = $routeParams.courseid;

        contentData.courseById(vm.courseid)
            .success(function (data) {
                vm.data = { course: data };
                vm.pageHeader = {
                    title: data.name,
                    strapline: 'Teacher section'
                };

            })
            .error(function (e) {
                console.log(e);
            });

            vm.popupContentForm = function () {
                var modalInstance = $modal.open({
                    templateUrl: '/modal/content/contentModal.view.html',
                    controller: 'contentModalCtrl as vm',
                });
        
            };
            vm.updateContent= function(contentid){
                var conid = $rootScope;
                conid.id = contentid;
                var modalInstance = $modal.open({
                    templateUrl: '/modal/content/contentUpdate.view.html',
                    controller: 'contentModalCtrl as vm',
                });
            };
            
            vm.deleteContent = function(contentid){
                var conid = $rootScope;
                conid.id = contentid;
                var modalInstance = $modal.open({
                    templateUrl: '/modal/content/contentDelete.view.html',
                    controller: 'contentModalCtrl as vm',
                });
            };
    }
})();