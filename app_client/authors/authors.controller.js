(function() {
	angular
		.module('myApp')
		.controller('authorsCtrl', authorsCtrl);

	authorsCtrl.$inject = ['$http', 'poemApi'];

	function authorsCtrl($http, poemApi) {
		var vm = this;

		vm.showSpinner = true;

		var authorsPromise = poemApi.getAuthors();
		authorsPromise.then(function(result) {
			vm.showSpinner = false;
			vm.showControls = true;
			
			vm.authors = result.data.authors;
		});

	}
})();