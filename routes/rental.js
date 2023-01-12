const express = require('express');
const router = express.Router();
const { rental } = require('../models/rental');
const { Customer } = require('../models/customers');
const { movies } = require('../models/movies');
const auth = require('../middleware/auth');


router.get('/', async (req, res) => {
    const rentals = await rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', auth, async (req, res) => {
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send("Customer not found");

    const movie = await movies.findById(req.body.movieId);
    if (!movie) return res.status(400).send("Movies Not Found");
    if (movie.numberInStock === 0) return res.status(400).send("movie no longer avalaible");

    let newRental = new rental({
        customer: {
            _id: customer._id,
            title: customer.name,
            phone: customer.phone,
        },
        movies: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        }
    });

    let newRentals = await newRental.save();
    movie.numberInStock--;
    await movie.save();
    res.send(newRentals);

})


module.exports = router;
