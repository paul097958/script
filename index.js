const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


let online = 0;
let db = []

io.on('connection', client => {
    online++
    console.log(online, 'people online');
    io.emit('sendOnlinePeople', online);
    io.emit('reloadText', db)
    client.on('newText', data => {
        console.log('Some one say:', data);
        db.unshift(data)
        io.emit('reloadText', db)
    })
    client.on('disconnect', () => {
        online--
        console.log(online, 'people online');
        io.emit('sendOnlinePeople', online)
    });
});


io.listen(8000);
