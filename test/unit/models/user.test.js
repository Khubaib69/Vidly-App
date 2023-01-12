const { Register } = require('../../../models/register');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

// user is basically register
describe("user.generateAuthToken", () => {
    it("should return a valid json web token", () => {
        const payload = { _id: new mongoose.Types.ObjectId(), isAdmin: true };
        const user = new Register(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload)
    })
});