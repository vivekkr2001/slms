(function () {
    angular.module('slmsApp', ['ngRoute', 'ui.bootstrap']);
    function config ($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'about/about.view.html',
            controller: 'loginCtrl',
            controllerAs: 'vm'
        })
        .when('/teacher',{
            templateUrl: 'teacher/teacher.view.html',
            controller: 'courseListCtrl',
            controllerAs: 'vm'
        })
        .when('/teacher/:courseid/',{
            templateUrl: 'teacher/teacher.courseDetails.html',
            controller: 'teacherCourseDetailCtrl',
            controllerAs: 'vm'
        })
        .when('/student/', {
            templateUrl: 'student/student.view.html',
            controller: 'studentCourseListCtrl',
            controllerAs: 'vm'
        })
        .when('/student/:courseid/',{
            templateUrl: 'student/student.courseDetails.html',
            controller: 'studentCourseDetailCtrl',
            controllerAs: 'vm'
        })
        .when('/admin', {
            templateUrl: 'admin/admin.view.html',
            controller: 'adminCourseListCtrl',
            controllerAs: 'vm'
        })
        .when('/admin/:courseid/',{
            templateUrl: 'admin/admin.courseDetails.html',
            controller: 'adminCourseDetailCtrl',
            controllerAs: 'vm'
        })
        .when('/courses/:courseid/contents/:contentid',{
            templateUrl: 'modal/contentDelete.view.html',
            controller: 'contentModalCtrl',
            controllerAs: 'vm'
        })
        .when('/register', {
            templateUrl: '/auth/register/register.view.html',
            controller: 'registerCtrl',
            controllerAs: 'vm'
        })
        .when('/admin/register/teacher',{
            templateUrl: '/auth/register/register.view.html',
            controller: 'registerCtrl',
            controllerAs: 'vm'
        })
        .otherwise({redirectTo: '/'});
    }

    angular
    .module('slmsApp')
    .config(['$routeProvider', config]);
})();