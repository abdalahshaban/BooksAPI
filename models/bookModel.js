const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookModel = new Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('bookmodel', bookModel);
