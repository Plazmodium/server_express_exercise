const mongoose = require('mongoose');

const aboutSchema = mongoose.Schema({
	id: { type: Number, required: false },
	description: { type: String, required: true },
});

module.exports = mongoose.model('About', aboutSchema);
