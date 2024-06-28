const express = require('express');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const ioManager = require('./io');

const app = express();
const server = http.createServer(app);

ioManager.init(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});

mongoose.connect('mongodb://127.0.0.1:27017/fse_chat_app', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

module.exports = { app, io: ioManager.getIo() };