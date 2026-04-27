const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log('User joined room: ' + roomId);
    });

    socket.on('move', (data) => {
        socket.to(data.roomId).emit('update', data);
    });
});

http.listen(3000, () => {
    console.log('Server started! Go to http://localhost:3000');
});