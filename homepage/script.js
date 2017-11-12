var howTo = $('#show');
var hide = $('#hide');
var p1 = $('#player1');
var p2 = $('#player2');

//shows instructions
function show(){
  $('#instructions').slideDown();
  howTo.attr('style', 'display: none');
  hide.attr('style', 'display: block');
}

//hides instructions
function hides(){
  $('#instructions').slideUp();
  hide.attr('style', 'display: none');
  howTo.attr('style', 'display: block');
}

//goes to player1 page
function playerOne(){
  window.location = '../player1/player1.html';
}

//goes to player2 page
function playerTwo(){
  window.location = '../player2/player2.html';
}

//plays music
function musicToggle() {
  let myAudio = $("audio");
  return myAudio.pause();
}

howTo.on('click', show);
hide.on('click', hides);
p1.on('click', playerOne)
p2.on('click', playerTwo)
