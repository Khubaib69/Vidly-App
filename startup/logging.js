require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

module.exports = function () {
    // TO Log errors in a saperate file which contains errors name and various info about errors
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'logfile.log' })
        ]
    });

    // To Log Errors in the db
    winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly' }));

    // process.on("uncaughtException",(ex)=>{
    //     logger.log({
    //         level: 'error',
    //         message: 'Hello distributed log exception!'
    //     });
    //     process.exit(1);
    // })

    // process.on("unhandledRejection",(ex)=>{
    //     logger.log({
    //         level: 'error',
    //         message: 'Hello distributed log unhandledRejection!'
    //     });
    //     process.exit(1);
    // })
}
