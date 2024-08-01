const router = require("express").Router();

let Movie = require("../models/movie");

//add new movie
router.route("/movie/add").post((req, res) => {
  const name = req.body.name;
  const genre = req.body.genre;
  const director = req.body.director;
  const language = req.body.language;
  const distribute = req.body.distribute;
  const time = Number(req.body.time);
  const posterImg = req.body.posterImg;
  const storyline = req.body.storyline;
  const releasedyear = req.body.releasedyear;
  const movieurl = req.body.movieurl;

  const newMovie = new Movie({
    name,
    genre,
    director,
    language,
    distribute,
    time,
    posterImg,
    storyline,
    releasedyear,
    movieurl
  });

  newMovie
    .save()
    .then(() => {
      res.json("Movie Created");
    })
    .catch((err) => {
      console.log(err);
    });
});

//view movies

router.route("/movies").get((req, res) => {
  Movie.find()
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      console.log(err);
    });
});
//update movie
router.route("/movie/update/:id").put(async (req, res) => {
  let movieId = req.params.id;
  const {
    name,
    genre,
    director,
    language,
    distribute,
    time,
    posterImg,
    storyline,
    releasedyear,
    movieurl
  } = req.body;

  const updateMovie = {
    name,
    genre,
    director,
    language,
    distribute,
    time,
    posterImg,
    storyline,
    releasedyear,
    movieurl
  };

  const update = await Movie.findByIdAndUpdate(movieId, updateMovie)
    .then(() => {
      res.status(200).send({ status: "Movie updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});
//delete movie
router.route("/movie/delete/:id").delete((req, res) => {
  let movieId = req.params.id;

  Movie.findByIdAndDelete(movieId)
    .then(() => {
      res.json("Delete Succussfully!");
    })
    .catch((err) => {
      console.log(err);
    });
});

//fetch data of movies
router.route("/movie/get/:id").get(async (req, res) => {
  // let movieId = req.params.id;
  let mId = req.params.id;

  await Movie.findById(mId)
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with get item", error: err.message });
    });
});


module.exports = router;
