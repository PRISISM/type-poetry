(function() {
	angular
		.module('myApp')
		.controller('homeCtrl', homeCtrl);

	homeCtrl.$inject = [];

	function homeCtrl() {
		var vm = this;
	}
})();