const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const indexRouter = require('./routes/index');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const mongoose = require('mongoose');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

module.exports = app;

mongoose.connect('mongodb://127.0.0.1:27017/fse_chat_app', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));