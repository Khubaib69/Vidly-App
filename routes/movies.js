// import { movies } from '../models/movies';
// import { Genre } from './genres';
const { movies } = require('../models/movies');
const Genre = require('./genres');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();


router.get('/', async (req, res) => {
    const movie = await movies.find().sort('name');
    res.send(movie);
});

router.post('/', auth, async (req, res) => {
    if (req.body.genreId) return res.status(400).send("Invalid Genre Id");
    const genre = await Genre.findById(req.body.genre._id);
    if (!genre) return res.status(400).send("Genre Not Found");

    let newMovie = new movies({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })


    let movie = await movies(newMovie);
    movie = await movie.save();
    res.send(movie);
});

// router.put('/', async (req, res) => {
//     const updateMovie = movies.findByIdAndUpdate(req.params.id, { title: req.body.title, genre: req.body.genre, numberInStock: req.body.genre, dailyDentalRate: req.body.dailyDentalRate }, { new: true });
//     if (!updateMovie) return res.status(400).send(error.details[0].message);
//     res.send(updateMovie);
// });

// router.delete('/', async (req, res) => {
//     const deletedMovie = movies.findByIdAndRemove(req.params.id, { title: req.body.title, genre: req.body.genre, numberInStock: req.body.genre, dailyDentalRate: req.body.dailyDentalRate }, { new: true });
//     if (!deletedMovie) return res.status(400).send(error.details[0].message);
//     res.send(deletedMovie);
// });

module.exports = router;