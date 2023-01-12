// require('express-async-errors');
// to save from try catch block statements 
// const winston = require('winston');
// require('winston-mongodb');
// const mongoose = require('mongoose');
// const genres = require('./routes/genres');
// const customers = require('./routes/customers');
// const movies = require('./routes/movies');
// const rental = require('./routes/rental');
// const register = require('./routes/register');
// const error = require('./middleware/error');
// const auth = require('./routes/auth');
const express = require('express');
const app = express();
// const config = require('config');


// *************** CODE IS DIVIDED AND PLACED IN SAPERATE MODULE AND THE LINKING POINT IS HERE NEW IMPLEMENTATION ***************
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);
// *************** CODE IS DIVIDED AND PLACED IN SAPERATE MODULE AND THE LINKING POINT IS HERE NEW IMPLEMENTATION ****************


// *************** TO LOG ERRORS IN A SAPERATE FILE WHICH CONTAINS ERROR NAMES AND VARIOUS INFO ABOUT ERRORS IN OLD IMPLEMENTATION *********************
// const logger = winston.createLogger({
//     transports: [
//         new winston.transports.Console(),
//         new winston.transports.File({ filename: 'logfile.log' })
//     ]
// });
// *************** TO LOG ERRORS IN A SAPERATE FILE WHICH CONTAINS ERROR NAMES AND VARIOUS INFO ABOUT ERRORS IN OLD IMPLEMENTATION *********************
// To Log Errors in the db 
// winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly' }));
// *************** THIS IS USED TO CONNECT TO DB IN OLD IMPLEMENTATION *********************


// if (!config.get('jwtPrivateKey')) {
//     console.error("JWT Private Key Not Defined");
//     process.exit(1);
// }


// *************** THIS IS USED TO CONNECT TO DB IN OLD IMPLEMENTATION *********************
// mongoose.connect('mongodb://localhost/vidly')
//     .then(() => { console.log("Connected To Mongo DB....") })
//     .catch(() => { console.log("Something Went Wrong ....") });
// *************** THIS IS USED TO CONNECT TO DB IN OLD IMPLEMENTATION *********************


// *************** THESE ARE USED TO DEFINE THE ENDPOINTS IN OLD IMPLEMENTATION *********************
// app.use(express.json());
// app.use('/api/genres', genres);
// app.use('/api/customers', customers);
// app.use('/api/movies', movies);
// app.use('/api/rental', rental);
// app.use('/api/register', register);
// app.use('/api/auth', auth);

// app.use(error)
// this is for the error middleware 
// *************** THESE ARE USED TO DEFINE THE ENDPOINTS IN OLD IMPLEMENTATION *********************

const port = process.env.PORT || 3000;
// Default
// app.listen(port, () => console.log(`Listening to port ${port}... `))
// For Integration Testing
const server = app.listen(port, () => console.log(`Listening to port ${port}... `));

module.exports = server;