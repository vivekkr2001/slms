(function () {
    angular
        .module('slmsApp')
        .service('authentication', authentication);
        
    authentication.$inject = ['$window', '$http', '$location'];

    function authentication($window, $http, $location) {
        var saveToken = function (token) {
            $window.localStorage['slms-token'] = token;
        };

        var getToken = function () {
            return $window.localStorage['slms-token'];
        };

        login = function (user) {
            return $http.post('/api/login', user).success(function (data) {
                saveToken(data.token);
                if(data.role == 'admin'){
                    $location.url('/admin');
                }else if(data.role == 'teacher'){
                    $location.url('/teacher');
                }else{
                    $location.url('/student');
                }
            });
        };

        register = function (user) {
            return $http.post('/api/register', user);
                
        };

        logout = function () {
            $window.localStorage.removeItem('slms-token');
            $location.path('/');
        };
    
        var isLoggedIn = function () {
            var token = getToken();
            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };
    
        var currentUser = function () {
            if (isLoggedIn()) {
                var token = getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return {
                    email: payload.email,
                    name: payload.name
                };
            }
        };
        return {
            saveToken: saveToken,
            getToken: getToken,
            login: login,
            register: register,
            logout: logout,
            isLoggedIn: isLoggedIn,
            currentUser: currentUser
        };
    }    
})();