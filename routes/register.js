const express = require('express');
const { Register } = require('../models/register');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

// Route to get your own profile
router.get('/me', auth, async (req, res) => {
    // req.user contains data in decoded token or in payload of token in our case the id, we set it in auth using req.user
    // and find by that id and remove the password from result 
    const userDetails = await Register.findById(req.user._id).select('-password');
    res.send(userDetails);
})

router.get('/', async (req, res) => {
    const registeredUser = await Register.find().sort('name');
    // if(!registeredUser) return res.status(404).send()
    res.send(registeredUser);

})

router.post('/', async (req, res) => {
    // Find the user by email if user is in db tell him user is already registered
    let user = await Register.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User Already Registered");

    // else create a new user with given name email and pass
    let register = new Register({ name: req.body.name, email: req.body.email, password: req.body.password });

    // generate salt to encrypt the password and save in db
    const salt = await bcrypt.genSalt(10);
    register.password = await bcrypt.hash(register.password, salt);
    register = await register.save();
    // Generate JWT token with only id property {Simple Way}
    // const token = jwt.sign({ _id: register._id }, config.get('jwtPrivateKey'));


    // Generate JWT token with only id property {Good Way}
    const token = register.generateAuthToken();
    // send token in headers
    res.header("x-auth-token", token).send({
        name: register.name,
        email: register.email,
        _id: register._id,
    });
})

module.exports = router;


