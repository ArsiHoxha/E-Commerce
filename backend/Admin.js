const mongoose = require('mongoose');

const Admin = new mongoose.Schema({
    email: { type: String, required: true,unique: true},
    password: { type: String, required: true }
});

const Admini = mongoose.model('Admin', Admin);
module.exports = Admini;