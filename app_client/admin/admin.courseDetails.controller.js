(function () {
    angular
        .module('slmsApp')
        .controller('adminCourseDetailCtrl', adminCourseDetailCtrl);

    adminCourseDetailCtrl.$inject = ['$routeParams','$location', '$modal' ,'contentData', '$rootScope'];
    function adminCourseDetailCtrl ($routeParams,$location, $modal, contentData, $rootScope) {
        var vm = this;
        vm.courseid = $routeParams.courseid;
        vm.currentPath = $location.path();
        contentData.courseById(vm.courseid)
            .success(function(data) {
                vm.data = {course: data};
                vm.pageHeader = {
                    title: data.name,
                    strapline: 'Admin section'
                };
                
            })
            .error(function(e){
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
            }
            
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