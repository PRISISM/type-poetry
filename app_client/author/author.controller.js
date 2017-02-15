(function() {
	angular
		.module('myApp')
		.controller('authorCtrl', authorCtrl);

	authorCtrl.$inject = ['$http', '$window', '$routeParams', 'poemApi'];

	function authorCtrl($http, $window, $routeParams, poemApi) {
		var vm = this;
		var name = $routeParams.name;
		$window.document.title = 'Poems by ' + name;

		var authorPromise = poemApi.getAuthorTitles(name);
		authorPromise.then(function(result) {
			

			console.log(result);
			vm.poems = result.data;
		});

	}
})();