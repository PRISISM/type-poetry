(function() {
	angular
		.module('myApp')
		.controller('homeCtrl', homeCtrl);

	homeCtrl.$inject = ['$http', 'poemApi'];

	function homeCtrl($http, poemApi) {
		var vm = this;
		vm.currentPage = 1;
		vm.pageSize = 20;

		var poemPromise = poemApi.getPoems();
		poemPromise.then(function(result) {
			console.log(result);
			vm.titles = result.data.titles;
		});

	}
})();