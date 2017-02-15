(function() {

    angular
        .module('myApp')
        .directive('typeHeader', typeHeader);

    function typeHeader() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $(element).typeIt({
                    strings: 'TYPOETRY',
                    loop: true,
                    loopDelay: 4000
                });
            }
        };
    }
})();