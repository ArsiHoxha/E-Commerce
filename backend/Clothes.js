const mongoose = require('mongoose');

// Define a Mongoose schema
const clothes = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    profileImage: String,
    arrayOFimages:[String],
    arrayOFcolors:[String],
    arrayOFsizes:[String]
});

// Define a Mongoose model
const Clothes = mongoose.model('Clothes', clothes);

module.exports = Clothes;
