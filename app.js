var express= require('express');
var app = express();
/*app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
    //console.log(req);
});*/
/*app.get('/js/filesave.js', function(req, res){
    res.sendFile(__dirname+'/js/filesave.js');
    //console.log(req);
});*/
/*app.get('/!*', function(req, res){
    res.sendFile(__dirname+'/!*');
    //console.log(req);
});*/
/*var options={
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: true,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
}*/
//app.use(express.static('/',options));
const server = require('http').Server(app);

server.listen(3000,function () {
    console.log('listen on 3000');
})
const io = require('socket.io')(server,
);
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        socket.broadcast.emit('chat message', msg);
    });
    socket.on('disconnect',function () {
        console.log('closed!');
        socket.emit('chat message', 'closed');
    });
    socket.on('file_receive',function (file_name,file_content) {
        console.log('file_received:'+file_name+'!');
        //console.log(file_content);
        socket.broadcast.emit('file_receive',file_name,file_content);
        console.log('file send!');
    });
});
