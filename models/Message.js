const mongoose = require('mongoose');

// Define message Schema
const messageSchema = new mongoose.Schema({
    // Use Mongoose functions to set varibles
    username: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, deafault: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;