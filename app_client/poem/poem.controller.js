(function() {
	angular
		.module('myApp')
		.controller('poemCtrl', poemCtrl);

	poemCtrl.$inject = ['$http', '$routeParams', '$window', 'poemApi'];

	function poemCtrl($http, $routeParams, $window, poemApi) {
		var vm = this;
		var title = $routeParams.title;
		$window.document.title = title;

		var poemPromise = poemApi.getSinglePoem(title);

		poemPromise.then(function(result) {
			vm.poem = result.data[0];
			var trimmedLines = vm.poem.lines.map(function(s) {
				return s.trim();
			});
			vm.poem.lines = trimmedLines;
			vm.typedPoem = Array(vm.poem.lines.length);
			vm.poemIndex = 0;
		});

		/* Compares the current string to the respective line in the poem array */
		vm.check = function(typed, index) {
			if (typed === vm.poem.lines[index]) {
				vm.next();
			}
		};

		/* Increments the poem index -- on last should trigger a modal/end. */
		vm.next = function() {
			if (vm.poemIndex >= vm.poem.lines.length - 1) {
				console.log('reached end');
			} else {
				vm.poemIndex++;
			}
		};

		console.log($routeParams.title);

	}
})();