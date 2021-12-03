(function() {
function pageHeader() {
    return {
        restrict: 'EA',
        scope: {
            content: '=content'
        },
        templateUrl: '/common/directives/pageHeader.template.html'
    };
}

angular
    .module('slmsApp')
    .directive('pageHeader', pageHeader);
})();