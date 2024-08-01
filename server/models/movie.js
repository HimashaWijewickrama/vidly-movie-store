const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },

  language: {
    type: String,
    required: true,
  },

  distribute: {
    type: String,
    required: true,
  },

  time: {
    type: Number,
    required: true,
  },

  posterImg: {
    type: String,
    required: true,
  },

  storyline: {
    type: String,
    required: true,
  },
  releasedyear: {
    type: String,
    required: true,
  },
  movieurl: {
    type: String,
    required: false,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
