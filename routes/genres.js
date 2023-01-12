const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');
const validateObjectId = require('../middleware/validateObjectId');
const router = express.Router();
const { Genre } = require('../models/genres');
const { default: mongoose } = require('mongoose');

// in case we have not installed the express-async-errors package which does all the job implemented in async auth. we would do
// pass the whole function in the async middleware which contain all the try and catch block functionality. instead of repeating 
// try catch block all over in code we place that in one place in async middleware and call it everywhere. but the package express-async-errors 
// saves us even from that

// router.get('/', asyncMiddleware(async (req, res) => {
//     const genre = await Genre.find().sort('name');
//     res.send(genre);
// }));


router.get('/', async (req, res) => {
    const genre = await Genre.find().sort('name');
    res.send(genre);
});

// check the auth for token purposes
router.post('/', auth, async (req, res) => {
    if (req.body.name.length < 5 || req.body.name.length > 50) return res.status(400).send("Name Must Be Greater than 5 and less than 50");
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })

    if (!genre) return res.status(400).send(error.details[0].message);

    res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(400).send(error.details[0].message);

    res.send(genre);
});

router.get('/:id', validateObjectId, async (req, res) => {

    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('The Genre with given id was not found');

    res.send(genre);
});

module.exports = router;
// module.exports = Genre;