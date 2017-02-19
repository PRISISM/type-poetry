var mongoose = require('mongoose');

var PoemSchema = new mongoose.Schema({
	_id: {
		type: String,
		required: true,
		unique: true
	},
	poem: {
		type: [],
		required: true
	}
});

PoemSchema.virtual('url').get(function() {
	return this._id;
});

mongoose.model('Poem', PoemSchema);
