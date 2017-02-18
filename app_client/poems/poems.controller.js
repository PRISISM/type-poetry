(function() {
	angular
		.module('myApp')
		.controller('poemsCtrl', poemsCtrl);

	poemsCtrl.$inject = ['$http', 'poemApi', 'usSpinnerService'];

	function poemsCtrl($http, poemApi, usSpinnerService) {
		var vm = this;
		vm.currentPage = 1;
		vm.pageSize = 20;

		vm.showSpinner = true;
		var poemPromise = poemApi.getPoems();


		poemPromise.then(function(result) {
			vm.showSpinner = false;
			vm.showControls = true;
			console.log(result);
			vm.titles = result.data.titles;
		});

	}
})();