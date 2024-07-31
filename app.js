// Express for Web frame
// Soecket io for real time communitcation
// mongoose for database
const express = require('express');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const ioManager = require('./io');

// Express instance
const app = express();
// Http server, use express as request processor
const server = http.createServer(app);

// Initial server, 'init' from io.js
ioManager.init(server);

// Set views files address
app.set('views', path.join(__dirname, 'views'));
// Extension name 'html'
app.set('view engine', 'html');
// But use ejs rendering html file
app.engine('html', require('ejs').renderFile);

// Static resourece address
app.use(express.static(path.join(__dirname, 'public')));

// Enable to process JSON data sent by users | 'req.body'
app.use(express.json());
// Handle form data submit by user | 'req.body'
app.use(express.urlencoded({ extended: true }));

// Introduce and use indexRouter in a seperate folder
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
// Start server and listen, feedback
server.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});

mongoose.connect('mongodb://127.0.0.1:27017/fse_chat_app')
    .then(() => console.log('Connected to MongoDB success'))
    .catch(err => console.error('Connect to MongoDB failed', err));

// Export 'app' and initiated 'io' for futher use
module.exports = { app, io: ioManager.getIo() };