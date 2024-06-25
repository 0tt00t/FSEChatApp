const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const indexRouter = require('./routes/index');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'public')));
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