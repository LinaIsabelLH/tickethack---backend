const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
});

const User = mongoose.model('users', userSchema);

module.exports = User;