// START + DIFFICULTY SELECTION
const startWrapper = document.getElementById(`startWrapper`);
const difficultySelectForm = document.getElementById(`difficultySelect`);
const difficultySelect = document.getElementById(`difficulty`);

// GAME
const gameWrapper = document.getElementById(`gameWrapper`);
const guessesText = document.getElementById(`guesses`);
const wordHolderText = document.getElementById(`wordHolder`);

// GUESSING FORM
const guessForm = document.getElementById(`guessForm`);
const guessInput = document.getElementById(`guessInput`);
const guessSubmitButton = document.getElementById('guessSubmitButton')
const errorMess = document.getElementById('errorMessage')

// GAME RESET BUTTON
const resetGame = document.getElementById(`resetGame`);

// CANVAS
let canvas = document.getElementById(`hangmanCanvas`);

const city = document.getElementById('cityDisplay');

// The following Try-Catch Block will catch the errors thrown
try {
  // Instantiate a game Object using the Hangman class.
let game;
  // add a submit Event Listener for the to the difficultySelectionForm
  //    get the difficulty input
  //    call the game start() method, the callback function should do the following
  //       1. hide the startWrapper
  //       2. show the gameWrapper
  //       3. call the game getWordHolderText and set it to the wordHolderText
  //       4. call the game getGuessessText and set it to the guessesText
  difficultySelectForm.addEventListener(`submit`, function (event) {
    game = new Hangman(canvas);
    game.start(difficultySelect.value, cbFunction);
  });

  function cbFunction(){
    startWrapper.classList.add('hidden');
    gameWrapper.classList.remove('hidden');
    wordHolderText.innerText = game.getWordHolderText();
    guessesText.innerText = game.getGuessesText();
    guessInput.disabled = false;
    guessSubmitButton.disabled = false;
  }

  // add a submit Event Listener to the guessForm
  //    get the guess input
  //    call the game guess() method
  //    set the wordHolderText to the game.getHolderText
  //    set the guessesText to the game.getGuessesText
  //    clear the guess input field
  // Given the Guess Function calls either the checkWin or the onWrongGuess methods
  // the value of the isOver and didWin would change after calling the guess() function.
  // Check if the game isOver:
  //      1. disable the guessInput
  //      2. disable the guessButton
  //      3. show the resetGame button
  // if the game is won or lost, show an alert.
  guessForm.addEventListener(`submit`, function (e) {
    errorMess.classList.add("hidden");
    game.guess(guessInput.value);
    if(game.error == ''){
    wordHolderText.innerText = game.getWordHolderText();
    guessesText.innerText = game.getGuessesText();
    guessInput.value = '';
    if(game.isOver){
      guessInput.disabled = true;
      guessSubmitButton.disabled = true;
      resetGame.classList.remove('hidden');
      if(game.didWin){
        alert('You win!');
      }
      else{
      alert('You have lost. Sorry!');
      }
    }
  }
  else{
    errorMess.classList.remove("hidden");
    errorMess.innerText = game.error;
  }

  });

  // add a click Event Listener to the resetGame button
  //    show the startWrapper
  //    hide the gameWrapper
  resetGame.addEventListener(`click`, function (e) {
    startWrapper.classList.remove('hidden');
    gameWrapper.classList.add('hidden');
    resetGame.classList.add('hidden');
    });
  } catch (error) {
    console.error(error);
    alert(error);
  }
