// this is the server about chat room /socket.io using.

var express = require ('express'),
//app = require('express'),
        app = express(),
       path = require('path'),
       http = require('http').Server(app),
         io = require('socket.io')(http);

//testing porperse only. the following doesn't not need on the rest of the program

// app.get('/', function(req, res){
//   res.send('<h1>Hello world</h1>');
// });
app.use(express.static(__dirname + "/static"));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
}); //initialed a chat room server. a html file service for it


io.on('connection', function(socket){
  socket.on('chat message', function(msg){//connected notification
    console.log ("Message: " + msg);//Showing message on backstage
    io.emit('chat message', msg);
  });
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');//disconnected notification
  });
  socket.broadcast.emit('hi');//If you want to send a message to everyone except for a certain socket, we have the broadcast flag
});
// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     console.log('message:'+msg);
//   })
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });
//
// io.emit('some event',{for: 'everyone'});
//
// io.on('connection', function(socket){
//   socket.broadcast.emit('hi');
// })

http.listen(8000, function(){
  console.log('listening on *:8000');
});
