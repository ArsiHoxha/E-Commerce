const mongoose = require('mongoose');

const UserCreation = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true,unique: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },

    password: { type: String, required: true }
});

const Blog = mongoose.model('UserCreation', UserCreation);
module.exports = Blog;