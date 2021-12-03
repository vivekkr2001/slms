(function() {

function footerGeneric() {
    return {
        restrict: 'EA',
        templateUrl: '/common/directives/footerGeneric.template.html'
    };
}

angular
    .module('slmsApp')
    .directive('footerGeneric', footerGeneric);
})();