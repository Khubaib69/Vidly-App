const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Register } = require('../models/register');

router.get('/', async (req, res) => {
    const userData = await Register.findOne();
    res.send({
        _id: userData._id,
        name: userData.name,
        email: userData.email,
    });
});


router.post('/', async (req, res) => {
    // Find the user by email if user is not in db then show invalid email and pass
    const user = await Register.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid Email Or Password");


    // this is used to compare the password send by the user and password stored in db
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send("Invalid Email Or Password");
    }


    // Generate JWT token with only id property and send in headers (simple way)
    // const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
    // res.header('x-auth-token', token).send(token);


    // Generate JWT token with only id property and send in headers (Good way)
    const token = user.generateAuthToken();
    res.send(token);

})

module.exports = router;