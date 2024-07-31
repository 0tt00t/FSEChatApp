// Socekt io variable
let io;

module.exports = {
    // Initiated Socket, connent it to HTTP server
    init: function(server) {
        // Introduce Socket Io
        const socketIo = require('socket.io');
        // Initiated and connect to HTTP server
        io = socketIo(server);
        // Set up connection event listener
        io.on('connection', (socket) => {
            // Globle event 'connection' trigger console log
            console.log('A user connected');
            // User event 'disconnect' triggers console log
            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
        });
    },
    // Method to acquire initiated Io instance
    getIo: function() {
        return io;
    }
};