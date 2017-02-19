(function() {

    angular
        .module('myApp')
        .directive('typeHeader', typeHeader);

    function typeHeader() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $(element).typeIt({
                    strings: 'TYPE POETRY',
                    loop: true,
                    loopDelay: 4000
                });
            }
        };
    }
})();