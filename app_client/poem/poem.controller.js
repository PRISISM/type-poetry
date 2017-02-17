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
			if (result.data.status) { // If there is a 404 Error 
				$window.location.href = '/poems';
			}
			console.log(result);
			vm.poem = result.data[0];
			var trimmedLines = vm.poem.lines.map(function(s) {
				return s
				.trim()
				.replace('—', '--')
				.replace('’', '\'');
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
		vm.next = function(isCaesura) {
			if (isCaesura) {
				console.log('Caesura...');
			}
			if (vm.poemIndex >= vm.poem.lines.length - 1) {
				vm.poemIndex++;
				swal({
					title: 'You have reached the end!',
					text: 'You have finished retyping this poem, ',
					type: 'success',
					allowEscapeKey: false,
					allowOutsideClick: false,

				});
				console.log('reached end');
			} else {
				vm.poemIndex++;
				/* Check if caesura */
				if (vm.poem.lines[vm.poemIndex] === '') {
					vm.next(true);
					/* Instead, call caesura thing here (show pause)*/
				}
			}
		};

	}
})();