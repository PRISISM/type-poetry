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

		usSpinnerService.spin('spinner-1');

		poemPromise.then(function(result) {
			vm.showSpinner = false;
			vm.showControls = true;
			usSpinnerService.stop('spinner-1');
			console.log(result);
			vm.titles = result.data.titles;
		});

	}
})();