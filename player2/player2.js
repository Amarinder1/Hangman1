var wordButton = $('#start').find('#inputB');
var wordInput = $('#start').find('.input');
var guessButton = $('#start').find('#guessB');
var guessInput = $('#start').find('.guess');
var finalAnswer = $('.gameBoard').find('.revealWord');
var body = $('body');
var numWrong = $('.numberWrong');
var rematchButton = $('#start').find('#rematch');
var vicTag = $('.scoreboard').find('#win');
var lossTag = $('.scoreboard').find('#loss');
var homeButton = $('#homeB');

var guess = '';
var answer = '';
var arrayAnswer = [];//what user inputs as word to be guessed
var arrayGuess = [];//what second person guesses
var arrayFinal = [];//used to create the game board
var wrong = 0;//counter for wrong guesses
var final;
var loss = 0;//number of game losses
var victory = 0;//number of games wins
var numGames = 0;//counter for games won in a row

function begin(){
  rematchButton.prop('disabled', true);
  rematchButton.addClass('disabled');
  solidWord();
  disableGuess();
}

begin();
//getting word(s) to guess from user, splits it into charcters and put them in an array
//also checks if word is a space
function getWord(){
  disableInput();
  solidGuess();
  answer = wordInput.val().toLowerCase();
  if(answer.trim() == ''){
    alert('Enter a word');
    begin();
    return false;
  }
  else{
    arrayAnswer = answer.split('');
    console.log(arrayAnswer);
    createGameBoard();
    wordInput.val('');
    return true;
  }
}

//checking if the guess the user makes is a new letter or a letter that was already guessed
function checkGuess(){
  for (var i = arrayGuess.length; i > 0; i --){
    if (arrayGuess[i] === arrayGuess[0]){
      alert('You already guessed this letter...');
      i = -1;
      return true;
    }
  }
}

//going to take letter that user inputs and compare it to letters in the word
function compareLetter(){
  if(!checkGuess()){
    for (var i = 0; i < arrayAnswer.length; i++){
      if (arrayAnswer[i] == arrayGuess[0]){
        revealLetter();
        win();
      }
    }
    if (!arrayAnswer.includes(arrayGuess[0])){
      wrong++;
      numWrong.text('Missed Guesses: ' + wrong);
      if (wrong < 5){
        alert('Ha! Wrong letter');
      }
      else{
        lose();
      }
    }
  }
}

//getting a letter guess from user and putting it into an array
//also checks if user puts in more than 1 charcter or a space
function getGuess(){
  guess = guessInput.val().toLowerCase();
  if(guess.trim() == ''){
    alert('Guess a letter!!');
  }
  else{
    if (guess.length == 1){
      arrayGuess.unshift(guess);
      console.log(arrayGuess);
      guessInput.val('');
      compareLetter();
    }
    else{
      alert("You can only guess 1 letter at a time");
    }
  }
}

//creates the game board
//will create game board that will take multiple words after!!!!!
function createGameBoard(){
  for (var i = 0; i < arrayAnswer.length; i++){
    if (answer[i] == ' '){
      arrayFinal.push(' ');
    }
    else{
      arrayFinal.push('-');
    }
  }
  finalAnswer.append(arrayFinal);
}

//will show the correct letter
function revealLetter(){
  for (var i = 0; i < arrayAnswer.length; i++){
    if (arrayAnswer[i] == arrayGuess[0]){
      arrayFinal[i] = arrayGuess[0];
      final = arrayFinal.join('');
    }
  }
  finalAnswer.text(final);
}

//happens if user has won the game
function win(){
  if(final == answer && wrong !=5){
    disableGuess();
    solidRematch();
    victory++;
    numGames++;
    finalAnswer.text('YOU WIN!!!');
    finalAnswer.css('color', 'rgb(134, 256, 89)');
    vicTag.text("Wins: " + victory);
  }
}

//happens when user has lost the game
function lose(){
    numWrong.text('Missed Guesses: ' + wrong);
    finalAnswer.text('YOU LOSE!!! THE WORD WAS ' + answer.toUpperCase());
    finalAnswer.css('color', 'rgb(251, 54, 57)');
    loss++;
    numGames = 0;
    solidRematch();
    disableGuess();
    lossTag.text('Losses: ' + loss);
}

//resets the game
function rematch(){
  InARow();
  begin();
  guess = '';
  answer = '';
  arrayAnswer = [];
  arrayGuess = [];
  arrayFinal = [];
  wrong = 0;
  final = '';
  finalAnswer.text('');
  numWrong.text('Missed Guesses: ');
  finalAnswer.css('color', 'black');
}

//checks to see if user has won 3 or more games in a row
function InARow(){
  if(numGames >= 3){
    alert('WOOHOO!! YOU HAVE WON ' + numGames + ' GAMES IN A ROW!!');
  }
  else if(numGames == 0){
    alert('I thought you were good at this game. I guess I was wrong');
  }
}

function disableGuess(){
  guessInput.addClass('disabled');
  guessButton.addClass('disabled');
  guessInput.prop('disabled', true);
  guessButton.prop('disabled', true);
}

function solidGuess(){
  guessButton.removeClass('disabled');
  guessButton.prop('disabled', false);
  guessInput.removeClass('disabled');
  guessInput.prop('disabled', false);

}

function disableInput(){
  wordButton.addClass('disabled');
  wordInput.addClass('disabled');
  wordInput.prop('disabled', true);
  wordButton.prop('disabled', true);
}

function solidWord(){
  wordButton.removeClass('disabled');
  wordButton.prop('disabled', false);
  wordInput.removeClass('disabled');
  wordInput.prop('disabled', false);
}

function solidRematch(){
  rematchButton.removeClass('disabled');
  rematchButton.prop('disabled', false);
}

//lets user press enter to submit word to be guessed
wordInput.keyup(function(event){
    if(event.keyCode == 13){
        wordButton.click();
    }
});

//allows user to press enter to submit letter for guess
guessInput.keyup(function(event){
    if(event.keyCode == 13){
        guessButton.click();
    }
});

//when clicked, goes to homepage
function home(){
  window.location = '../homepage/index.html';
}

//plays music
function musicToggle() {
  let myAudio = $("audio");
  return myAudio.pause();
}

wordButton.on('click', getWord);
guessButton.on('click', getGuess);
rematchButton.on('click', rematch);
homeButton.on('click', home);
