var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/door-open', function(req, res){
  io.sockets.emit('event',{type:'door-open'});
  console.log('Door open event!')
  res.json({"success": "true"});
});

app.get('/special-door-open', function(req, res){
  io.sockets.emit('event',{type:'forceSpecialDoorOpen'});
  console.log('Special door open event!')
  res.json({"success": "true"});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  console.log('a user connected');
});


