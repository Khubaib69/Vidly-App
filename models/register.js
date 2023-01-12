const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024,
    },
    isAdmin: {
        type: Boolean,
    }
});

registerSchema.methods.generateAuthToken = function () {
    // whenever this function is called we store the user id and is admin property in json token and return it
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const Register = new mongoose.model('register', registerSchema);

exports.Register = Register;