(function () {
    angular
        .module('slmsApp')
        .controller('courseModalCtrl', courseModalCtrl);
    courseModalCtrl.$inject = ['$modalInstance', '$routeParams', 'slmsData', '$rootScope'];
    function courseModalCtrl($modalInstance, $routeParams, slmsData, $rootScope) {
        var vm = this;
        vm.courseid = $rootScope.courseid;
        vm.formError = "";

        slmsData.readCourseById(vm.courseid)
            .success(function (data) {
                vm.data = data;
            })
            .error(function (e) {
                console.log(e);
            });

        vm.doAddCourse = function (formData) {
            slmsData.createCourse( {
                name: formData.name,
                description: formData.description,
                learning: formData.learning
            })
                .success(function (data) {
                    vm.modal.close(data);
                    window.location.reload();
                })
                .error(function (data) {
                    vm.formError = "Try Again!!, Error: " + data;
                });
            return false;
        };

        vm.deleteCourse = function (courseid) {
            slmsData.deleteCourseById(courseid, vm.courseid)
                .success(function () {
                    vm.modal.close();
                    window.location.reload();
                })
                .error(function (data) {
                    vm.formError = "Error in Deletion: " +  data    ;
                });
            return false;
        };

        vm.updateCourse = function (courseid, data) {
             console.log("Update details: " + data);
            slmsData.updateCourseById(courseid, data)
                .success(function () {
                    vm.modal.close();
                    window.location.reload();                
                })
                .error(function (data) {
                    vm.formError = data;
                });
            return false;
        }

        vm.modal = {
            close: function (result) {
                $modalInstance.close(result);
            },
            cancel: function () {
                $modalInstance.dismiss('cancel');
            }
        };
        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.formData.name || !vm.formData.description) {
                vm.formError = "Name and file fields required, please try again";
                return false;
            } else {
                vm.doAddCourse(vm.formData);

            }
        };

        vm.onDelete = function () {
            vm.deleteCourse(vm.courseid, vm.courseid);
        }

        vm.onUpdate = function () {
            vm.formError = "";
            if (!vm.formData1.name || !vm.formData1.description) {
                vm.formError = "Name and Description fields required, please try again";
                return false;
            } else {
                vm.updateCourse(vm.courseid, vm.formData1);
            }
        }

    }
})();