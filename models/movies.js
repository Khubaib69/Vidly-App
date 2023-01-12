const express = require('express');
const { number } = require('joi');
const Router = express.Router();
const mongoose = require('mongoose');
const { genreSchema } = require('./genres');

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50,
    },
    genre: {
        type: genreSchema,
        required: true,
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
    }
});

const movies = new mongoose.model('movies', movieSchema);
exports.movies = movies;