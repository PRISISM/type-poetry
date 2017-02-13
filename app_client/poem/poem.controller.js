(function() {
	angular
		.module('myApp')
		.controller('poemCtrl', poemCtrl);

	poemCtrl.$inject = ['$http', '$routeParams', '$window'];

	function poemCtrl($http, $routeParams, $window) {
		var vm = this;
		var title = $routeParams.title;
		$window.document.title = title;

		$http.get('/api/titles/' + title).then(function successCallback(result) {
			vm.poem = result.data[0];
			vm.typedPoem = Array(vm.poem.lines.length);
			vm.poemIndex = 0;
			console.log(result);
		}, function errorCallback(err) {
			console.log(err);
			// handle err
		});

		/* Compares the current string to the respective line in the poem array */
		vm.check = function (typed, index) {
			if (typed == vm.poem.lines[index]) {
				vm.next();
			}
		};

		/* Increments the poem index -- on last should trigger a modal/end. */
		vm.next = function() {
			if (vm.poemIndex >= vm.poem.lines.length - 1) {
				vm.poemIndex = 0;
			}
			else {
				vm.poemIndex++;
			}
		};

		console.log($routeParams.title);

	}
})();