const winston = require('winston');

module.exports = function (err, req, res, next) {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'logfile.log' })
        ]
    });
    logger.log({
        level: 'info',
        message: 'Hello distributed log files!'
    });
    // winston.error(err.message)

    // error
    // warn
    // info
    // verbose
    // debug
    // silly

    res.send(500).send("Internal server error");
}