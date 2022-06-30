//Unordered list of guessed letters
const guessedLetters = document.querySelector(".guessed-letters"); 

//"Guess" button
const guessButton = document.querySelector(".button-element"); 

//Letter input box 
const letterInput = document.querySelector(".letter");  

//Empty paragrah where word in progress appears 
const wordInProgress = document.querySelector(".word-in-progress"); 

//Paragraph where remaining guesses display
const guessesRemaining = document.querySelector(".remaining");  

//Span inside remaining guesses
const spanRemaining = document.querySelector("span");  

//Paragraph where messages appear when player guesses a letter 
const message = document.querySelector(".message"); 

//Hidden button that appears prompting player to play again 
const playAgainButton = document.querySelector(".play-again");  

//First test word
const word = ("Magnolia"); 

//Circle symbols to represent each letter in the word  
const placeholder = function (word) {
    const placeholderLetters = []; 
    for (const letter of word) {
        console.log(letter); 
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join(""); 
}; 

placeholder(word); 

guessButton.addEventListener("click", function(e) {
    e.preventDefault(); 
    const guess = letterInput.value; 
    console.log(guess); 
    letterInput.value = ""; 
});

