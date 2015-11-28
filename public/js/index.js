var doorOpenAudio = new Audio('audio/door_open.mp3');
var marchAudio = new Audio('audio/march.mp3');

window.onload = function() {
  tick();
  var socket = io.connect('http://localhost:3000');
  socket.on('event', function(message){
    if(message.type == 'door-open')
      doorOpen();
    else if(message.type =='special-door-open')
      specialDoorOpen();
  });
};

function doorOpen() {
  doorOpenAudio.play();
}

function specialDoorOpen() {
  marchAudio.play();
}

function tick() {

  var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes();
  var d = now.getDay();
  var mo = now.getMonth();
  var dom = now.getDate();
  var y = now.getFullYear();

  // you can do if statements to get results
  if (d == 0) d = "nedjelja";
  else if (d == 1) d = "ponedjeljak";
  else if (d == 2) d = "utorak";
  else if (d == 3) d = "srijeda";
  else if (d == 4) d = "četvrtak";
  else if (d == 5) d = "petak";
  else d = "subota";

  document.getElementById("day").innerHTML = d;
  // you can use an array to get results  
  var month = new Array();
  month[0] = "Siječanj";
  month[1] = "Veljača";
  month[2] = "Ožujak";
  month[3] = "Travanj";
  month[4] = "Svibanj";
  month[5] = "Lipanj";
  month[6] = "Srpanj";
  month[7] = "Kolovoz";
  month[8] = "Rujan";
  month[9] = "Listopad";
  month[10] = "Studeni";
  month[11] = "Prosinac";
  mo = month[mo];

  document.getElementById("month").innerHTML = mo;

  document.getElementById("date").innerHTML = dom;

  if(m < 10) m = "0" + m;
  document.getElementById("time").innerHTML = h + ":" + m;

  setTimeout('tick()', 60);
};