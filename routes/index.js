const express = require('express');
// Router instance
const router = express.Router();
const User = require('../models/User');
const Message = require('../models/Message');
const ioManager = require('../io');

// Render 'index.html' in the views folder
router.get('/', (req, res) => {
    res.render('index');
});

// User Register 
router.post('/register', async(req, res) => {
    // Get data from req
    const { username, password } = req.body;
    try {
        // Create instance for database
        const user = new User({ username, password });
        await user.save();
        // To the new page
        res.redirect(`/chat?username=${username}`);
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).send('Registration failed');
    }
});

// User login
router.post('/login', async(req, res) => {
    // Get data from req
    const { username, password } = req.body;
    try {
        // Find data in the DB
        const user = await User.findOne({ username, password });
        if (user) {
            // Match
            res.redirect(`/chat?username=${username}`);
        } else {
            // Unmatch
            res.status(400).send('Invalid username or password');
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).send('Login failed');
    }
});

// Client get request chat page
router.get('/chat', async(req, res) => {
    // Get name
    const username = req.query.username;
    // Find all message in Mongoose
    const messages = await Message.find({});
    // Render 'chat', pass it username and message
    res.render('chat', { username, messages });
});

// Client request all message
router.get('/messages', async(req, res) => {
    try {
        // Get all message in the DB        
        const messages = await Message.find({});
        // Send to client by json
        res.json(messages);
    } catch (error) {
        console.error('Fetch messages error:', error);
        res.status(500).send('Failed to fetch messages');
    }
});

// User post messages
router.post('/messages', async(req, res) => {
    // Get info from req
    const { username, message } = req.body;
    try {
        // Create new message instance
        const newMessage = new Message({ username, message, timestamp: new Date() });
        // Save to DB
        await newMessage.save();
        // Get initialed IO instance
        const io = ioManager.getIo();
        // Boardcast message to all clients
        io.emit('message', newMessage);
        // Sent success
        res.status(200).send(newMessage);
    } catch (error) {
        console.error('Send message error:', error);
        res.status(500).send('Failed to send message');
    }
});

// Export this module for other to use
module.exports = router;