const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
	},
	password: {
		type: String,
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	telp: {
		type: String,
	},
	email: {
		type: String,
	},
});

module.exports = user = mongoose.model("user", userSchema);
