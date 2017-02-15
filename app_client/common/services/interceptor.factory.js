// A factory to intercept requests
(function() {
angular
	.module('myApp')
	.factory('myInterceptor', myInterceptor);

myInterceptor.$inject = ['$log', '$location'];

function myInterceptor($log, $location) {
	return {
		response: function(responseData) {
			$log('REsponse..');
			return responseData;
		}
	};

	// return {
	// 	getPoems: getPoems,
	// 	getSinglePoem: getSinglePoem,
	// 	getAuthors: getAuthors,
	// 	getAuthorTitles: getAuthorTitles
	// };

}
})();