(function() {
	angular
		.module('myApp')
		.controller('homeCtrl', homeCtrl);

	homeCtrl.$inject = ['poemApi', '$location'];

	function homeCtrl(poemApi, $location) {
		var vm = this;

		vm.randPoem = function(num) {
			/* Spinner */
			vm.showSpinner = true;
			var randomPromise = poemApi.makeRandomPoemUrl(num);

			randomPromise.then(function(result) {
				/* Spinner off */
				vm.showSpinner = false;
				$location.path('poem/random/' + result.data._id);
			});


		};
	}
})();