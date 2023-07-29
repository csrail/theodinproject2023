// initialise game
// start round
// show player scores
// get human player choice
// get computer player choice
// compare choices
// show winner
// update score
// restart round
// check win condition
// helper functions

let round = 0;
let humanPlayerChoice;
let computerPlayerChoice;
let humanPlayerScore = 0;
let computerPlayerScore = 0;
const selection = ["rock", "paper", "scissors"]

function getHumanPlayerChoice() {
    humanPlayerChoice = prompt("Choose rock, paper, or scissors.");
    humanPlayerChoice = cleanInput(humanPlayerChoice)
    switch (humanPlayerChoice) {
        case ("rock"):
            humanPlayerChoice = "rock";
            break
        case ("paper"):
            humanPlayerChoice = "paper";
            break
        case ("scissors"):
            humanPlayerChoice = "scissors";
            break
        default:
            console.log("You need to type either 'rock', 'paper', or 'scissors' to continue.")
            return getHumanPlayerChoice()
    }
}

function getComputerPlayerChoice() {
    computerPlayerChoice = selection[getRandomChoice()];
}

function getRandomChoice() {
    return Math.floor(Math.random() * 3)
}

function cleanInput(choice) {
    return choice.toLowerCase()
}

function showHumanPlayerChoice() {
    console.log(`You choose ${humanPlayerChoice}`);
}

function showComputerPlayerChoice() {
    console.log(`Computer chooses ${computerPlayerChoice}`);
}

function showHumanPlayerScore() {
    console.log(`Human Score: ${humanPlayerScore}`);
}

function showComputerPlayerScore() {
    console.log(`Computer Score: ${computerPlayerScore}`);
}

function incrementRound () {
    round++;
}

function showRound () {
    console.log(`Round ${round} --FIGHT!--`);
}

function checkRoundWinner (humanChoice, computerChoice) {
    switch (humanChoice) {
        case ("rock"):
            if (computerChoice === "scissors") {
                console.log("Human wins.");
                humanPlayerScore++;
                break
            } else if (computerChoice === "rock") {
                console.log("Tie.");
                break
            } else if (computerChoice === "paper") {
                console.log("Computer wins.");
                computerPlayerScore++;
                break
            }
            break
        case ("paper"):
            if (computerChoice === "rock") {
                console.log("Human wins.");
                humanPlayerScore++;
                break
            } else if (computerChoice === "paper") {
                console.log("Tie.");
                break
            } else if (computerChoice === "scissors") {
                console.log("Computer wins.");
                computerPlayerScore++;
                break
            }
            break
        case ("scissors"):
            if (computerChoice === "paper") {
                console.log("Human wins.");
                humanPlayerScore++;
                break
            } else if (computerChoice === "scissors") {
                console.log("Tie");
                break
            } else if (computerChoice === "rock") {
                console.log("Computer wins.");
                computerPlayerScore++;
                break
            }
    }
}

function checkGameWinner () {
    if (humanPlayerScore === 5) {
        console.log("Human player wins the game.");
    }
    if (computerPlayerScore === 5) {
        console.log("Computer player wins the game.");
    }
}

function playRound () {
    showRound();
    getHumanPlayerChoice();
    getComputerPlayerChoice();
    showHumanPlayerChoice();
    showComputerPlayerChoice();
    checkRoundWinner(humanPlayerChoice, computerPlayerChoice);
    showHumanPlayerScore();
    showComputerPlayerScore();
    checkGameWinner();
    incrementRound();
}

function game() {
    while (humanPlayerScore !== 5 && computerPlayerScore !== 5) {
        playRound();
    }
}

game();
console.log("Thanks for playing.")
console.log("Refresh this page to play again.")