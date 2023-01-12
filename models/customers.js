const mongoose = require('mongoose');

const CustomersSchema = mongoose.Schema({
    isGold: {
        type: Boolean,
        required: true,
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    }
});

const Customer = new mongoose.model('customers', CustomersSchema);

exports.Customer = Customer;