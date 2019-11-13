var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = (process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 6969);
var io = require('socket.io')(server);
server.listen(port, () => console.log('Server running in port ' + port));

io.on('connection', function(socket) {
    console.log(socket.id + ': connected');
    socket.on('disconnect', function() {
        console.log(socket.id + ': disconnected')
    })
    socket.on('client-send-newMessage', data => {
        console.log(data)
        io.sockets.emit('server-send-newMessage', {id:socket.id,content:data});
    })
});

app.get('/', (req, res) => {
    res.send("Home page. Server running okay.");
})