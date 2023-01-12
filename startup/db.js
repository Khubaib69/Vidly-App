const mongoose = require('mongoose')
const config = require('config');

module.exports = function(){
    mongoose.connect(config.get('db'))
    .then(() => { console.log(`Connected To Mongo DB ${config.get('db')} ....`) })
    .catch(() => { console.log("Something Went Wrong ....") });
}
