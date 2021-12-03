(function () {
    angular
        .module('slmsApp')
        .controller('registerCtrl', registerCtrl);
    registerCtrl.$inject = ['$location', 'authentication'];
    function registerCtrl($location, authentication) {
        var vm = this;
        vm.pageHeader = {
            title: 'Create a new SLMS account'
        };
        if($location.path() == '/admin/register/teacher'){
            vm.credentials = {
                name: "",
                email: "",
                password: "",
                role: "teacher"
            };
        }else{
            vm.credentials = {
                name: "",
                email: "",
                password: "",
                role: "student"
            };
        }
        if($location.path() == '/admin/register/teacher'){
            vm.returnPage =  '/admin/';
        }else{
            vm.returnPage =  '/';
        } 
        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.doRegister();
            }
        };
        vm.doRegister = function () {
            vm.formError = "";
            authentication
                .register(vm.credentials)
                .error(function (err) {
                    vm.formError = "Fill all the details Completely";
                })
                .then(function () {
                    alert("You Have been registered.")
                    $location.path(vm.returnPage);
                });
        };

    };
})();