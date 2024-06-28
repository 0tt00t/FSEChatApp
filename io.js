let io;

module.exports = {
    init: function(server) {
        const socketIo = require('socket.io');
        io = socketIo(server);
        io.on('connection', (socket) => {
            console.log('A user connected');
            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
        });
    },
    getIo: function() {
        if (!io) {
            throw new Error('Socket.io not initialized!');
        }
        return io;
    }
};