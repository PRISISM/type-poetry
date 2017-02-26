(function() {
	angular
		.module('myApp')
		.controller('poemCtrl', poemCtrl);

	poemCtrl.$inject = ['$http', '$routeParams', '$window', 'poemApi', '$route', '$location', '$document', 'ngAudio'];

	function poemCtrl($http, $routeParams, $window, poemApi, $route, $location, $document, ngAudio) {
		var vm = this;
		var title = $routeParams.title;
		vm.done = false; // When user is finished writing

		$window.document.title = title;

		vm.showSpinner = true;
		var poemPromise = poemApi.getSinglePoem(title);

		poemPromise.then(function(result) {
			if (result.data.status) { // If there is a 404 Error 
				$window.location.href = '/poems';
			}
			vm.showSpinner = false;
			vm.poem = result.data[0];
			var trimmedLines = vm.poem.lines.map(function(s) {
				return s
					.trim()
					.replace('—', '--')
					.replace('’', "'");
			});
			vm.poem.lines = trimmedLines;
			vm.typedPoem = Array(vm.poem.lines.length);
			vm.poemIndex = 0;
		});

		vm.rain = ngAudio.load('public/audio/rain.mp3');
		vm.coffee = ngAudio.load('public/audio/coffee.mp3');
		vm.college = ngAudio.load('public/audio/library.mp3');

		/* Compares the current string to the respective line in the poem array */
		vm.check = function(typed, index) {
			if (typed === vm.poem.lines[index]) {
				vm.next();
			}
		};

		/* Increments the poem index -- on last should trigger a modal/end. */
		vm.next = function(isCaesura) {
			if (isCaesura) {
				console.log('Caesura...');
			}
			if (vm.poemIndex >= vm.poem.lines.length - 1) {
				vm.poemIndex++;
				vm.done = true;
			} else {
				vm.poemIndex++;
				/* Check if caesura */
				if (vm.poem.lines[vm.poemIndex] === '') {
					vm.next(true);
					/* Instead, call caesura thing here (show pause)*/
				}
			}
		};

		vm.reloadRoute = function() {
			$route.reload();
		};

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