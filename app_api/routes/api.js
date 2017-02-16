var router = require('express').Router();
var request = require('request');
var url = require('url');
// var poetryController = require('poetryController');

/* Route to get all titles of poems */
router.get('/titles', function(req, res) {
	var options = {
		method: 'get',
		uri: 'http://poetrydb.org/title',
		json: true
	};

	request(options, function(err, response, body) {
		if (err) {
			res.status(404);
			throw err;
		}
		res.json(body);
	});

});

/* Route to get the exact poem from a title 
   Is case sensitive.
*/
router.get('/titles/:title', function(req, res) {
	var urlString = 'http://poetrydb.org/title/' + encodeURIComponent(req.params.title) + ':abs';
	/* Accounting for the ’ symbol not being encoded by request */
	var newString =  urlString.replace('’', '%E2%80%99');
	console.log(newString);

	var options = {
		method: 'get',
		uri: newString,
		json: true,
		encoding: 'utf-8'
	};

	// console.log(options.uri.indexOf('’'));

	request(options, function(err, response, body) {
		if (err) {
			res.status(404);
			throw err;
		}
		res.json(body);
	});
});

/* Route to get all authors of poems */
router.get('/authors', function(req, res) {
	var options = {
		method: 'get',
		uri: 'http://poetrydb.org/author',
		json: true
	};

	request(options, function(err, response, body) {
		if (err) {
			res.status(404);
			throw err;
		}
		res.json(body);
	});

});

/* Route to get the exact list of poems from an author
   Is case sensitive.
*/
router.get('/authors/:author', function(req, res) {
	var options = {
		method: 'get',
		uri: 'http://poetrydb.org/author/' + req.params.author + ':abs/title',
		json: true
	};

	request(options, function(err, response, body) {
		if (err) {
			res.status(404);
			throw err;
		}
		res.json(body);
	});

});
module.exports = router;