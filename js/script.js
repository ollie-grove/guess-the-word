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

let word = "magnolia"; 

//This array will contain all the letters the player guesses.
let guessedLetters = []; 

//DECLARE A GLOBAL VARIABLE FOR THE NUMBER OF GUESSES 

let remainingGuesses = 8; 


//ADD AN ASYNC FUNCTION 
//Transform the data you fetched into an array, with each word separated by a line break (newline). Use delimiter const wordArray = words.split("\n")
//Grab a random word from the file, create a variable to pull a random index from the wordArray (using Math.floor(Math.random)).
//still in the funciton, pull out a random word from the array and remove any whitespae around the word using the trim() method. Reassign the valuue of the existing word global variable to this new random word (also declare the glocal word variable with let instead of const)

const getWord = async function () {
    const response = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"); 
    const words = await response.text(); 
    //console.log(words); 
    const wordArray = words.split("\n"); 
    //console.log(wordArray); 
    const randomIndex = Math.floor(Math.random() * wordArray.length); 
    word = wordArray[randomIndex].trim(); 
    placeholder(word); 
};

getWord(); 

//Circle symbols to represent each letter in the word  
const placeholder = function (word) {
    const placeholderLetters = []; 
    for (const letter of word) {
        //console.log(letter); 
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join(""); 
}; 

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

    if (input.length === 0) {
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

//Function that accepts a leter as the parameter. JavaScript is case sensitive, so it sees uppercase and lowercase letters as different characters. Convert all letters to one casing (uppercase recommended). If the player already guessed the same letter, update the message. If they haven't guessed that letter before, add the letter to the guessedLetters array. 

const makeGuess = function(guess) {
    guess = guess.toUpperCase(); 
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter. Try again!";
    } else {
        guessedLetters.push(guess); 
        console.log(guessedLetters); 
        updateRemainingGuesses(guess);
        showLetterGuesses(); 
        updateWordInProgress(guessedLetters); 
    }
};

//CREATE A FUNTION TO SHOW GUESSED LETTERS 

//Function to update the page with the letters the player guesses. Empty innerHTML of the unordered list where the player's guessed letters will appear. 

//Create a new list item for each letter inside your guessedLetters array and add it to the unordered list. (Use for...of). 

//Call the function inside the else statement of the makeGuess function so the letter displays when it hasn't been guessed before.

const showLetterGuesses = function() {
    guessedLettersList.innerHTML = ""; 
    for (const letter of guessedLetters) {
        const li = document.createElement("li"); 
        li.innerText = letter; 
        guessedLettersList.append(li); 
    }
}; 


//CREATE A FUNCTION TO UPDATE THE WORD IN PROGRESS 

//Function to update the word in progress that accepts the guessedLetters array as a parameter. This function will replace the cirlce symbols with the correct letters guessed.

//Create a variable called wordUpper to change the word variable to uppercase, then create a variable to split the word string into an array so that the letter can appear in the guessedLetters array. Then log out wordArray.

//Check if the wordArray contains any letters from the guessedLetters array (for... of). If it does contain the letters, update (.push) the circle symbol with the correct letter. (You'll want to create a new array with the updated characters then use join() to update the empty paragrah (wordInProgress) where the word in progress will appear). 

//Call the new function at the bottom of the else statement inside the makeGuess function and pass it guessedLetters as an argument. 

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase(); 
    const wordArray = wordUpper.split(""); 
    //new array with updated characters
    const showWord = []; 
    //console.log(wordArray); 
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            showWord.push(letter.toUpperCase()); 
        } else {
            showWord.push("●"); 
        }
    }
    wordInProgress.innerText = showWord.join(""); 
    checkForWin(); 
};

//CREATE A FUNCTION TO COUNT REMAINING GUESSES
// Function that will accept the guess input as a parameter.
//Grab the word and make it uppercase.
//Find out if the word contains the guessedLetter. If it doesn't include the letter from guess (! = not / false), let the player knoww that the word doesn't contain the letter and subtract 1 from their remainingGuesses. If it does contain a letter, let the player know the letter is in the word. 

const updateRemainingGuesses = function (guess) {
    const upperWord = word.toUpperCase(); 
    if (!upperWord.includes(guess)) {
        //console.log("Womp womp - bad guess, lose a chance"); 
        message.innerText = `Sorry, the word has no ${guess}.`; 
        remainingGuesses -= 1; 
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`; 
    }

//Determine if the remainingGuesses is a value of 0. If they have no guesses remaining, update the message to say the game is over and what the word is. If they have 1 guess, update the span inside the paragraph where the remaining guesses will display to tell the player they have one guess remaining. If they have more than one guess, update the same span element to tell them the number of guesses remaining. 

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class = "highlight">${word}</span>.`; 
    } else if (remainingGuesses === 1) {
        spanRemaining.innerText = `${remainingGuesses} guess`; 
    } else {
        spanRemaining.innerText = `${remainingGuesses} guesses`; 
    }
    }; 




//CALL THE NEW FUNCTION AND TEST THE GAME 



//CREATE A FUNCTION TO CHECK IF THE PLAYER WON

//Function to check if the player successfully guessed the word and won the game. Verify if their word in progress matches the word they should guess.

//If the play has won, add the "win" class to the empty paragrah where messages apear when they guess the letter. Also update the paragraph's contents to thhe highlighted p class. 

//At the bottom of the function that updates the word in progress, call this funtion to check if the player has won.

const checkForWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win"); 
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`; 

        startOver(); 
    }
}; 


//Function to hide and show guess button, paragraph with remaining guesses, UL where guessed letters appear 

const startOver = function () {
    guessButton.classList.add("hide"); 
    guessesRemaining.classList.add("hide"); 
    guessedLettersList.classList.add("hide");
    playAgainButton.classList.remove("hide"); 
};

//Add a click event to the play again button

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win"); 
    message.innerText = ""; 
    guessedLettersList.innerHTML = ""; 
    remainingGuesses = 8; 
    guessedLetter = []; 
    spanRemaining.innerText = `${remainingGuesses} guesses`; 

    getWord(); 
});
