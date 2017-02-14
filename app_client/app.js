(function() {
angular.module('myApp', ['ngRoute', 'angularUtils.directives.dirPagination', 'focus-if']);

// Module configuration
function config ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/poems', {
			controller: 'poemsCtrl',
			controllerAs: 'vm',
			templateUrl: 'app_client/poems/poems.view.html'
		})

		.when('/poem/:title', {
			controller: 'poemCtrl',
			controllerAs: 'vm',
			templateUrl: 'app_client/poem/poem.view.html'
		})

		.when('/authors', {
			controller: 'authorsCtrl',
			controllerAs: 'vm',
			templateUrl: 'app_client/authors/authors.view.html'
		})

		.otherwise({redirectTo: '/'});

	$locationProvider.html5Mode(true);
}

angular
	.module('myApp')
	.config(['$routeProvider', '$locationProvider', config])
	// Set title based on view
	.run(['$rootScope', function($rootScope) {
		$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
			$rootScope.title = current.$$route.title;
		});

	}]);
})();