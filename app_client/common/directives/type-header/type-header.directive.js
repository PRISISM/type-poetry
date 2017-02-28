(function() {

    angular
        .module('myApp')
        .directive('typeHeader', typeHeader);

    typeHeader.$inject = ['$location'];

    function typeHeader($location) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $(element).typeIt({
                    strings: 'TYPE POETRY',
                    startDelay: 100
                });

                /* Temp*/
                // scope.$watch(function() {
                //     return $location.path();
                // }, function() {
                //     if ($location.path().match(/\/poem\/.*/)) {
                //         $(element).typeIt({
                //             strings: 'TYPE POETRY'
                //         });
                //     }
                //     else {
                //         // $(element).typeIt({
                //         //     strings: 'TYPE POETRY',
                //         //     loop: true,
                //         //     loopDelay: 4000
                //         // });
                //     }
                //     console.log($location.path());
                // });

            }
        };
    }
})();