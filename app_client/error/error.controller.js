(function() {
	angular
		.module('myApp')
		.controller('errorCtrl', errorCtrl);

	errorCtrl.$inject = [];

	function errorCtrl() {
		var vm = this;
	}
})();