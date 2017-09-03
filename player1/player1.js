var guessButton = $('#start').find('#guessB');
var guessInput = $('#start').find('.guess');
var rematchButton = $('#start').find('#rematch');
var newButton = $('#start').find('#newB');
var homeButton = $('#homeB');
var finalAnswer = $('.gameBoard').find('.revealWord');
var body = $('body');
var numWrong = $('.numberWrong');
var vicTag = $('.scoreboard').find('#win');
var lossTag = $('.scoreboard').find('#loss');
var hard = ['Hard Pill to Swallow', 'Throw in the Towel', 'Jumping the Gun', 'Back to Square One',
'Elvis has left the Building', 'The Jig is Up', 'A Chip on Your Shoulder', 'Love Birds','Fit as a fiddle',
'Every Cloud Has a silver Lining', 'Hands Down', 'Heads Up', 'Down for the Count', 'Burst Your Bubble',
'Knuckle Down', 'Needle in a haystack', 'Down to the Wire', 'Top Drawer', 'Foaming at the Mouth',
'If you cannot stand the heat get out of the kitchen', 'Back to the Drawing Board', 'Go Out on a Limb',
'Beating around the Bush', 'Wild Goose Chase', 'Money does not grow on trees', 'Raining cats and dogs',
'Man of a few words', 'Elephant in the Room', 'No Brainer', 'My cup of tea', 'On the Ropes',
'Bless Up', 'I love you Asahd', 'Stay away from THEY', 'Making my way downtown', 'It is time to Duel',
'Pikachu I Choose You', 'I am a Barbie Girl in a Barbie World'];

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
  rematchButton.addClass('disabled');
  rematchButton.prop('disabled', true);
  noClickGuess();
  newButton.removeClass('disabled');
}

begin();
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
  else if (!isNaN(guess)){
    alert("Your guess can't be a number!");
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
    guessButton.addClass('disabled');
    guessButton.prop('disabled', true)
    guessInput.addClass('disabled');
    guessInput.prop('disabled', true);
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
    finalAnswer.css('color', 'rgb(212, 81, 85)');
    loss++;
    numGames = 0;
    solidRematch();
    noClickGuess();
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
  finalAnswer.css('color', 'orange');
  newButton.prop('disabled', false);
}

//when user clicks 'hard mode button', will generate random word to guess
function startNew(){
  solidGuess();
  newButton.addClass('disabled', true);
  newButton.prop('disabled', true);
  answer = hard[Math.floor(Math.random()*hard.length)].toLowerCase();
  arrayAnswer = answer.split('');
  createGameBoard();
  console.log(arrayAnswer);
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

//makes guess button and textbox solid and clickable
function solidGuess(){
  guessButton.removeClass('disabled');
  guessButton.prop('disabled', false);
  guessInput.removeClass('disabled');
  guessInput.prop('disabled', false);
}

//makes guess button and textbox unclickable
function noClickGuess(){
  guessButton.addClass('disabled');
  guessButton.prop('disabled', true);
  guessInput.addClass('disabled');
  guessInput.prop('disabled', true);
}

//makes rematch button solid and clickable
function solidRematch(){
  rematchButton.removeClass('disabled');
  rematchButton.prop('disabled', false);
}

//lets user go back to the home page
function home(){
  window.location = '../homepage/index.html';
}

//plays music
function musicToggle() {
  let myAudio = $("audio");
  return myAudio.pause();
}

//allows user to press enter to submit letter for guess
guessInput.keyup(function(event){
  if(event.keyCode == 13){
      guessButton.click();
  }
});

guessButton.on('click', getGuess);
rematchButton.on('click', rematch);
newButton.on('click', startNew);
homeButton.on('click', home);
