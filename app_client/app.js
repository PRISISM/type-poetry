(function() {
	angular.module('myApp', ['ngRoute',
		'ngAnimate',
		'angularUtils.directives.dirPagination',
		'focus-if',
		'angularSpinner',
		'720kb.socialshare',
		'ngAudio'
		]);

	// Module configuration
	function config($routeProvider, $locationProvider, $routeParams) {
		$routeProvider
			.when('/', {
				controller: 'homeCtrl',
				controllerAs: 'vm',
				templateUrl: 'app_client/home/home.view.html',
				title: 'Type Poetry'

			})
			.when('/poems', {
				controller: 'poemsCtrl',
				controllerAs: 'vm',
				templateUrl: 'app_client/poems/poems.view.html',
				title: 'Poems'
			})

			.when('/poem/random/:title', {
				controller: 'randomCtrl',
				controllerAs: 'vm',
				templateUrl: 'app_client/random/random.view.html'
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

			.when('/copyright', {
				templateUrl: 'app_client/copyright/copyright.view.html'
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
				if ($routeParams && $routeParams.title) { // If a title is passed
					$rootScope.title = $routeParams.title;
				} else if ($routeParams && $routeParams.name) { // If an author name is passed
					$rootScope.title = 'Poems by ' + $routeParams.name;
				} else {
					$rootScope.title = current.$$route.title;

				}
			});

		}]);
})();