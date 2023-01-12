const express = require('express');
const router = express.Router();
const { Customer } = require('../models/customers');
const auth = require('../middleware/auth');


router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', auth, async (req, res) => {
    let newCustomer = await Customer({ isGold: req.body.isGold, name: req.body.name, phone: req.body.phone });
    newCustomer = await newCustomer.save();
    res.send(newCustomer);
})

router.put('/:id', async (req, res) => {
    const customers = await Customer.findByIdAndUpdate(req.params.id, { isGold: req.body.isGold, name: req.body.name, phone: req.body.phone }, { new: true })
    if (!customers) return res.status(400).send(error.details[0].message);
    res.send(customers);

})

router.delete('/:id', async (req, res) => {
    const customers = await Customer.findByIdAndRemove(req.params.id);
    if (!customers) return res.status(400).send(error.details[0].message);
    res.send(customers);
})

module.exports = router;