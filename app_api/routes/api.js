var router = require('express').Router();
var request = require('request');
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
			throw err;
		}
		res.json(body);
	});

});

/* Route to get the exact poem from a title 
   Is case sensitive.
*/
router.get('/titles/:title', function(req, res) {
	var options = {
		method: 'get',
		uri: 'http://poetrydb.org/title/' + req.params.title + ':abs',
		json: true
	};

	request(options, function(err, response, body) {
		if (err) {
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
			throw err;
		}
		res.json(body);
	});

});
module.exports = router;