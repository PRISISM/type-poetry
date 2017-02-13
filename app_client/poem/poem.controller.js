(function() {
	angular
		.module('myApp')
		.controller('poemCtrl', poemCtrl);

	poemCtrl.$inject = ['$http', '$routeParams', '$window'];

	function poemCtrl($http, $routeParams, $window) {
		var vm = this;
		var title = $routeParams.title;
		$window.document.title = title;

		vm.typedPoem = [];

		$http.get('/api/titles/' + title).then(function successCallback(result) {
			vm.poem = result.data[0];
			console.log(result);
		}, function errorCallback(err) {
			console.log(err);
			// handle err
		});

		console.log($routeParams.title);

		// $http.get('/api/titles').then(function(result) {
		// 	console.log(result);
		// 	vm.titles = result.data.titles;
		// });
	}
})();