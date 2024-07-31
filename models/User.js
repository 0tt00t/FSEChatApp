const mongoose = require('mongoose');

// Define user Schema
const userSchema = new mongoose.Schema({
    // Use Mongoose functions to set unique username and password
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;