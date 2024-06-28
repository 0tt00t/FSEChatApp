const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Message = require('../models/Message');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/register', async(req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.redirect(`/chat?username=${username}`);
    } catch (error) {
        console.error('User registration failed:', error);
        res.status(400).send('User registerd fail');
    }
});

router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.redirect(`/chat?username=${username}`);
        } else {
            console.error('User login failed:', error);
            res.status(400).send('Invalid username or password');
        }
    } catch (error) {
        res.status(400).send('User login failed');
    }
});

router.get('/chat', async(req, res) => {
    const username = req.query.username;
    const messages = await Message.find({});
    res.render('chat', { username, messages });
});

router.get('/message', async(req, res) => {
    try {
        const message = await Message.find({});
        res.json(message);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send('Error fetching messages');
    }
});

router.post('/messages', async(req, res) => {
    const { username, message } = req.body;
    try {
        const newMessage = new Message({ username, message });
        await newMessage.save();
        res.status(200).send(newMessage);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send('Error sending message');
    }
});

module.exports = router;