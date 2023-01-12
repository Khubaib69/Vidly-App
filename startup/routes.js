const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rental = require('../routes/rental');
const register = require('../routes/register');
const auth = require('../routes/auth');
const express = require('express');
const app = express();
const error = require('../middleware/error');
module.exports = function (app) {

    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rental', rental);
    app.use('/api/register', register);
    app.use('/api/auth', auth);
    app.use(error)
    // this is for the error middleware 

}
