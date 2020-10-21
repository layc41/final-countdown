// use mongoose and bcrypt
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Movie.js
const movieSchema = require('./Movie');
const favoriteSchema = require('./Favorite');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    favorites: [favoriteSchema],
    // get info from the Movie model
    savedMovies: [movieSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
userSchema.virtual('movieCount').get(function () {
  return this.savedMovies.length;
});

userSchema.virtual('favoriteCount').get(function () {
  return this.favorites.length;
});

const User = model('User', userSchema);

module.exports = User;