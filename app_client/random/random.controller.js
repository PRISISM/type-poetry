(function() {
	angular
		.module('myApp')
		.controller('randomCtrl', randomCtrl);

	randomCtrl.$inject = ['$http', '$routeParams', '$window', 'poemApi', '$route', '$location'];

	function randomCtrl($http, $routeParams, $window, poemApi, $route, $location) {
		var vm = this;
		var title = $routeParams.title;
		vm.done = false; // When user is finished writing

		$window.document.title = title;

		vm.showSpinner = true;
		var poemPromise = poemApi.getRandomPoemUrl(title);

		poemPromise.then(function(result) {
			if (result.data === null) { // if there is no match 
				$window.location.href = '/';
			}

			vm.showSpinner = false;

			vm.poem = result.data.poem;

			var trimmedLines = vm.poem.map(function(s) {
				return s.line
					.trim()
					.replace('—', '--')
					.replace('’', "'");

				/*ES6
				return Object.assign({}, s, {
					line: s.line
						.trim()
						.replace('—', '--')
						.replace('’', "'")
				});
				*/
			});

			vm.trimmedLines = trimmedLines;
			vm.typedPoem = Array(vm.poem.length);
			vm.poemIndex = 0;
		});

		/* Compares the current string to the respective line in the poem array */
		vm.check = function(typed, index) {
			if (typed === vm.trimmedLines[index]) {
				vm.next();
			}
		};

		/* Increments the poem index -- on last should trigger a modal/end. */
		vm.next = function(isCaesura) {
			if (isCaesura) {
				console.log('Caesura...');
			}
			if (vm.poemIndex >= vm.trimmedLines.length - 1) {
				vm.poemIndex++;
				vm.done = true;
				console.log('reached end');
			} else {
				vm.poemIndex++;
				/* Check if caesura */
				if (vm.trimmedLines[vm.poemIndex] === '') {
					vm.next(true);
					/* Instead, call caesura thing here (show pause)*/
				}
			}
		};

		vm.reloadRoute = function() {
			$route.reload();
		};

		/* Generates a new random poem */
		vm.randomPoem = function() {

			vm.showSpinner = true;

			var randomPromise = poemApi.getRandomPoem();
			randomPromise.then(function(result) {
				vm.showSpinner = false;
				$location.path('/poem/' + result);
			});
		};

	}
})();