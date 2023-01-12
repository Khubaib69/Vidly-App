const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // fetch the token from the header
    const token = req.header('x-auth-token');
    // if no token provided send this
    if (!token) return res.status(401).send("Access Denied, Token Not Provided");

    try {
        // else compare and verify the token and if it is correct then in decocded we have the payload in our case we will have the id
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        // transfer control to next function in pipeline
        next();
    }
    catch (ex) {
        res.status(400).send("Invalid Token");
    }
}