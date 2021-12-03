(function() {
function navigation() {
    return {
        restrict: 'EA',
        templateUrl: '/common/directives/navigation.template.html',
        controller: 'navigationCtrl as navvm'
    };
}
angular
    .module('slmsApp')
    .directive('navigation', navigation);
})();