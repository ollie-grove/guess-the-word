//Unordered list of guessed letters
const guessedLettersList = document.querySelector(".guessed-letters"); 

//"Guess" button
const guessButton = document.querySelector(".guess"); 

//Letter input box 
const letterInput = document.querySelector(".letter");  

//Empty paragrah where word in progress appears 
const wordInProgress = document.querySelector(".word-in-progress"); 

//Paragraph where remaining guesses display
const guessesRemaining = document.querySelector(".remaining");  

//Span inside remaining guesses
const spanRemaining = document.querySelector(".remaining span");  

//Paragraph where messages appear when player guesses a letter 
const message = document.querySelector(".message"); 

//Hidden button that appears prompting player to play again 
const playAgainButton = document.querySelector(".play-again");  

//First test word
const word = ("Magnolia"); 

//This array will contain all the letters the player guesses.
const guessedLetters = []; 

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

//To prevent the default behavior of clicking a button, the form submitting, and then reloading the page, add the e.preventDefault(); 

guessButton.addEventListener("click", function(e) {
    e.preventDefault(); 
    message.innerText = "";
    //To capture the value of the input
    const guess = letterInput.value; 
    //console.log(guess); 

    const goodGuess = playerInput(guess); 

    if (goodGuess) {
        makeGuess(guess); 
    }

    letterInput.value = ""; 
     
});




//Function that accepts the input value as a parameter to validate the player's input

const playerInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;

    //Now code uses a regular expression to ensure the player inputs a letter.
    
    //Conditional block to check for 3 scenarios: 1) check if the input is empty. 2) Check if the player has entered more than on letter. 3) Check if they've entered a character that doesn't match the regular expression pattern (.match() method here). Each condition should have a message directing the player on what to input. If all other conditions aren't met, the input is a letter. Return the input. 

    if (input.length = 0) {
        console.log("Is the input empty?"); 
        message.innerText = "Please enter a letter"; 
    } else if (input.lenth > 1) {
        console.log("Did you enter more than one letter?")
        message.innerText = "Please enter a single letter."; 
    } else if (!input.match(acceptedLetter)) {
        console.log("Did you type a number or a special character?");
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        console.log("Yay, we got a single letter!");

    return input; 
    }

}; 

const makeGuess = function(guess) {
    //JavaScript is case sensitive, so it sees uppercase and lowercase letters as different characters. Convert all letters to one casing (uppercase recommended). If the player already guessed the same letter, update the message. If they haven't guessed that letter before, add the letter to the guessedLetters array. 
    guess = guess.toUpperCase(); 
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter. Try again!";
    } else {
        guessedLetters.push(guess); 
        console.log(guessedLetters); 
    }
};


//ISSUES: - When there is not input, message is returning as special character or number.