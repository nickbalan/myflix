const mongoose = require('mongoose');
//Integrating bcrypt
const bcrypt = require('bcrypt');

let movieSchema = mongoose.Schema({
	Title: {type: String, require: true},
	Description: {type: String, require: true},
	Genre: [{type: mongoose.Schema.Types.ObjectId, ref: 'genre'}],
	Director: [{type: mongoose.Schema.Types.ObjectId, ref: 'director'}],
	ImageUrl: String,
	Featured: Boolean
});

let userSchema = mongoose.Schema({
	Username: {type: String, require: true},
	Password: {type: String, require: true},
	Email: {type: String, require: true},
	Birthday: Date,
	FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'movie'}]
});

userSchema.statics.hashPassword = (password) => {
	return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
	return bcrypt.compareSync(password, this.Password);
};

let directorSchema = mongoose.Schema({
	Name: {type: String, require: true},
	Bio: {type: String, require: true},
	Birth: Date,
	Death: Date
});

let genreSchema = mongoose.Schema({
	Name: {type: String, require: true},
	Description: {type: String, require: true},
});

let movie = mongoose.model('movie', movieSchema);
let user = mongoose.model('user', userSchema);
let director = mongoose.model('director', directorSchema);
let genre = mongoose.model('genre', genreSchema);

module.exports.Movie = movie;
module.exports.User= user;
module.exports.Director = director;
module.exports.Genre = genre;