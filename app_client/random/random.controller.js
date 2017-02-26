(function() {
	angular
		.module('myApp')
		.controller('randomCtrl', randomCtrl);

	randomCtrl.$inject = ['$http', '$routeParams', '$window', 'poemApi', '$route', '$location', 'ngAudio'];

	function randomCtrl($http, $routeParams, $window, poemApi, $route, $location, ngAudio) {
		var vm = this;
		var title = $routeParams.title;
		vm.done = false; // When user is finished writing

		$window.document.title = title;

		vm.rain = ngAudio.load('public/audio/rain.mp3');
		vm.coffee = ngAudio.load('public/audio/coffee.mp3');
		vm.college = ngAudio.load('public/audio/library.mp3');

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

		/* Generates a new random poem with the same number of lines */
		vm.randomPoem = function() {

			vm.showSpinner = true;

			var randomPromise = poemApi.makeRandomPoemUrl(vm.poem.length);
			randomPromise.then(function(result) {
				vm.showSpinner = false;
				$location.path('/poem/random/' + result.data._id);
			});
		};

		vm.play = function(name) {
			var audio = vm[name];
			if (audio.paused) {
				audio.play();
			}
			else {
				audio.pause();
			}
		};

	}
})();