(function() {
	angular
		.module('myApp')
		.controller('poemsCtrl', poemsCtrl);

	poemsCtrl.$inject = ['$http', 'poemApi'];

	function poemsCtrl($http, poemApi) {
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