module.exports = io => {
    io.on('connection', (socket) => {
        console.log('New user connection')

        socket.on('userCoordinates', coords => {
            socket.broadcast.emit('newUserCoordinates', coords);
        });
    });
}