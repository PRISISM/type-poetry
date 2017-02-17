(function() {
	angular.module('myApp', ['ngRoute', 'angularUtils.directives.dirPagination', 'focus-if', 'angularResizable']);

	// Module configuration
	function config($routeProvider, $locationProvider, $routeParams) {
		$routeProvider
			.when('/', {
				controller: 'homeCtrl',
				controllerAs: 'vm',
				templateUrl: 'app_client/home/home.view.html',
				title: 'Home'

			})
			.when('/poems', {
				controller: 'poemsCtrl',
				controllerAs: 'vm',
				templateUrl: 'app_client/poems/poems.view.html',
				title: 'Poems'
			})

		.when('/poem/:title', {
			controller: 'poemCtrl',
			controllerAs: 'vm',
			templateUrl: 'app_client/poem/poem.view.html'
		})

		.when('/authors', {
			controller: 'authorsCtrl',
			controllerAs: 'vm',
			templateUrl: 'app_client/authors/authors.view.html',
			title: 'Authors'
		})

		.when('/author/:name', {
			controller: 'authorCtrl',
			controllerAs: 'vm',
			templateUrl: 'app_client/author/author.view.html'
		})

		.when('/404', {
			controller: 'errorCtrl',
			controllerAs: 'vm',
			templateUrl: 'app_client/error/404.view.html',
			title: 'Error!'
		})

		.otherwise({
			redirectTo: '/'
		});

		$locationProvider.html5Mode(true);

		// $httpProvider.interceptors.push('myInterceptor');
	}

	angular
		.module('myApp')
		.config(['$routeProvider', '$locationProvider', config])
		// Set title based on view
		.run(['$rootScope', '$routeParams', function($rootScope, $routeParams) {
			$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
				console.log($routeParams);
				if ($routeParams && $routeParams.title) { // If a title is passed
					$rootScope.title = $routeParams.title;
				} else if ($routeParams && $routeParams.name) { // If an author name is passed
					$rootScope.title = 'Poems by ' + $routeParams.name;
				} else {
					console.log(current.$$route.title);
					$rootScope.title = current.$$route.title;

				}
			});

		}]);
})();