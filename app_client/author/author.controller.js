(function() {
	angular
		.module('myApp')
		.controller('authorCtrl', authorCtrl);

	authorCtrl.$inject = ['$http', '$window', '$routeParams', 'poemApi'];

	function authorCtrl($http, $window, $routeParams, poemApi) {
		var vm = this;
		vm.name = $routeParams.name;
		$window.document.title = 'Poems by ' + vm.name;

		var authorPromise = poemApi.getAuthorTitles(vm.name);
		authorPromise.then(function(result) {
			

			console.log(result);
			vm.poems = result.data;
		});

	}
})();