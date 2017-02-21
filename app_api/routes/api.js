var router = require('express').Router();
var request = require('request');
var url = require('url');

var mongoose = require('mongoose');
require('../models/poem');
var Poem = mongoose.model('Poem');

var linkGen = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ ){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

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
	var newString = urlString.replace('’', '%E2%80%99');
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
		uri: 'http://poetrydb.org/author/' + encodeURIComponent(req.params.author) + ':abs/title,linecount',
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

/* Route that takes a search query and returns a list of titles with their linecount and author */
router.get('/search/:title', function(req, res) {
	var options = {
		method: 'get',
		uri: 'http://poetrydb.org/title/' + encodeURIComponent(req.params.title) + '/title,author,linecount',
		json: true
	};

	console.log(options.uri);

	request(options, function(err, response, body) {
		if (err) {
			res.status(404);
			throw err;
		}
		res.json(body);
	});
});


/* Route that takes a search query and returns a list of authors */

/* Route that takes `n` number of lines and returns all titles with their lines 
   and author that match `n` number of lines (eg. 14 will match 14 and 144).
*/
router.get('/makerand/:number', function(req, res) {
	var options = {
		method: 'get',
		uri: 'http://poetrydb.org/linecount/' + encodeURIComponent(req.params.number) + '/lines,title,author',
		json: true

	};

	console.log(options.uri);

	request(options, function(err, response, body) {
		if (err) {
			res.status(404);
			throw err;
		}

		/* Check that there are actually poems here*/
		if (body.status === 404) {
			return res.json({
				status: 404,
				reason: 'Not found'
			});
		}

		var titles = body;
		var randPoem = [];

		for (var i = 0; i < req.params.number; i++) {
			var randNum = Math.floor(Math.random() * titles.length);

			var lineObj = {};

			lineObj.title = titles[randNum].title;
			lineObj.author = titles[randNum].author;
			lineObj.line = titles[randNum].lines[i];

			randPoem[i] = lineObj;
		}

		// Initial random link
		var link = linkGen();

		while (Poem.count({_id: link}) === 1) {
			// While there is a match, generate a new link then check again
			console.log('Matched _id' + link);
			link = linkGen();
		}

		/* Store in DB */
		var insertPoem = new Poem({
			_id: linkGen(),
			poem: randPoem
		});

		insertPoem.save(function(err, docs) {
			if (err) {
				return console.error(err);
			}
			console.log(docs);
			res.json(docs);
		});


		// res.json(randPoem);
	});
});

/* Query the database to get a poem from a string 
	*/
router.get('/getrand/:string', function(req, res) {
	Poem.findOne({_id: req.params.string}, function(err, poem) {
		if (err) {
			res.status(404);
		}
		res.json(poem);
	});
});


module.exports = router;