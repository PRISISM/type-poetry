(function() {
	angular
		.module('myApp')
		.controller('authorsCtrl', authorsCtrl);

	authorsCtrl.$inject = ['$http', 'poemApi'];

	function authorsCtrl($http, poemApi) {
		var vm = this;

		var authorsPromise = poemApi.getAuthors();
		authorsPromise.then(function(result) {
			console.log(result);
			vm.authors = result.data.authors;
		});

	}
})();