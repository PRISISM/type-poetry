(function() {
	angular
		.module('myApp')
		.controller('homeCtrl', homeCtrl);

	homeCtrl.$inject = ['$http'];

	function homeCtrl($http) {
		var vm = this;
		vm.currentPage = 1;
		vm.pageSize = 20;

		$http.get('/api/titles').then(function(result) {
			console.log(result);
			vm.titles = result.data.titles;
		});
	}
})();