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

	/* Get a random title from the list of all poems
	   Returns the title to be used as a link
	 */
	var getRandomPoem = function() {
		return $http.get( $location.protocol() + '://' + location.host + '/api/titles')
		.then(function(result) {
			var titles = result.data.titles;
			return titles[Math.floor(Math.random() * titles.length)];
		});
	};

	/* Get a single poem from the API
	   Returns the full response object with status code and data
	*/
	var getSinglePoem = function(title) {
		return $http.get($location.protocol() + '://' + location.host + '/api/titles/' + title)
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

	/* Get a list of lines from the API. 
	   Once a random poem is generated, it is stored in the database.
	*/
	var makeRandomPoemUrl = function(num) {
		return $http.get( $location.protocol() + '://' + location.host + '/api/makerand/' + num)
			.then(function(result) {
				return result;
			});
	};

	var getRandomPoemUrl = function(title) {
		return $http.get( $location.protocol() + '://' + location.host + '/api/getrand/' + title)
			.then(function(result) {
				return result;
			});
	};

	return {
		getPoems: getPoems,
		getRandomPoem: getRandomPoem,
		getSinglePoem: getSinglePoem,
		getAuthors: getAuthors,
		getAuthorTitles: getAuthorTitles,
		makeRandomPoemUrl: makeRandomPoemUrl,
		getRandomPoemUrl: getRandomPoemUrl
	};

}
})();