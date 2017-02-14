// A service to retrieve data from the wrapper API defined in /app_api
(function() {
angular
	.module('myApp')
	.factory('poemApi', poemApi);

poemApi.$inject = ['$http', '$location'];

function poemApi($http, $location) {
	
	/* Get all titles of poems from the API 
	   Returns the full response object with status code and data
	*/
	var getPoems = function() {
		return $http.get( $location.protocol() + '://' + location.host + '/api/titles')
			.then(function(result) {
				return result;
			});
	};

	/* Get a single poem from the API
	   Returns the full response object with status code and data
	*/
	var getSinglePoem = function(title) {
		return $http.get( $location.protocol() + '://' + location.host + '/api/titles/' + title)
			.then(function(result) {
				return result;
			});
	};

	/* Get all authors from the API
	   Returns the full response object with status code and data
	*/
	var getAuthors = function() {
		return $http.get( $location.protocol() + '://' + location.host + '/api/authors/')
			.then(function(result) {
				return result;
			});
	};

	/* Get all titles of a single author from the API
	   Returns the full response object with status code and data
	*/
	var getAuthorTitles = function(author) {
		return $http.get( $location.protocol() + '://' + location.host + '/api/authors/' + author)
			.then(function(result) {
				return result;
			});
	};

	return {
		getPoems: getPoems,
		getSinglePoem: getSinglePoem,
		getAuthors: getAuthors,
		getAuthorTitles: getAuthorTitles
	};

}
})();