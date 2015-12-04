var doorOpenAudio = new Audio('audio/door_open.mp3');
var marchAudio = new Audio('audio/march.mp3');
var elapsedFromLastDoorOpen = 0;
var elapsedFromLastSpecialDoorOpen = 0;

window.onload = function() {
  setInterval('clockUpdate()', 1000);
  setInterval('eventDelayHandler()', 1000);

  var socket = io.connect('http://theforce.foi.rocks');
  socket.on('event', function(payload){
    handleEvent(payload);
  });
};

/**
 * Processes events recieved via sockets.
 * @object payload - Contains the event payload
 */
function handleEvent(payload) {
  if(payload.type == 'refresh') {
    window.location.reload();
  }
  if(payload.type == 'forceSpecialDoorOpen') {
    specialDoorOpen();
  }
  if(elapsedFromLastSpecialDoorOpen >= 15*60) {
    specialDoorOpen();
    elapsedFromLastSpecialDoorOpen = 0;
  }
  if(elapsedFromLastDoorOpen >= 15 && marchAudio.paused == true) {
    doorOpen();
  }
  elapsedFromLastDoorOpen = 0;
}

/**
 * Runs the normal door open action.
 */
function doorOpen() {
  doorOpenAudio.play();
}

/**
 * Runs the special door open action.
 */
function specialDoorOpen() {
  marchAudio.play();
}

/**
 * Handles delays and actions upon delay expiry
 */
function eventDelayHandler() {
  elapsedFromLastDoorOpen++;
  elapsedFromLastSpecialDoorOpen++;
}

/**
 * Updates the clock - re-runs every 60 seconds
 */
function clockUpdate() {
  var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes();
  var d = now.getDay();
  var mo = now.getMonth();
  var dom = now.getDate();

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
};