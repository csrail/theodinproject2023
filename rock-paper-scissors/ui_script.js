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
// disable buttons on win

let round = 1;
let humanPlayerChoice;
let computerPlayerChoice;
let humanPlayerScore = 0;
let computerPlayerScore = 0;
const selection = ["rock", "paper", "scissors"]

let information_board = document.querySelector('.information');

let buttons = document.querySelectorAll('button.option');

function playRound () {
        let humanPlayerChoice = this.getAttribute('data-choice');
        let computerPlayerChoice = getComputerPlayerChoice();
        checkRoundWinner(humanPlayerChoice, computerPlayerChoice);
        showHumanPlayerScore();
        showComputerPlayerScore();
        checkGameWinner()
        incrementRound();
        showRound();
}

buttons.forEach(button => {
    button.addEventListener('click', playRound);
})

function getComputerPlayerChoice() {
    return computerPlayerChoice = selection[getRandomChoice()];
}

function getRandomChoice() {
    return Math.floor(Math.random() * selection.length)
}

function showHumanPlayerChoice() {
    console.log(`You choose ${humanPlayerChoice}`);
}

function showComputerPlayerChoice() {
    console.log(`Computer chooses ${computerPlayerChoice}`);
}

function showHumanPlayerScore() {
    let humanScore = document.querySelector('.human_score')
    humanScore.textContent = `Human Score: ${humanPlayerScore}`;
}

function showComputerPlayerScore() {
    let computerScore = document.querySelector('.computer_score')
    computerScore.textContent = `Computer Score: ${computerPlayerScore}`;
}

function incrementRound () {
    round++;
}

function showRound () {
    let round_counter = document.querySelector('.round');
    round_counter.textContent = `Round ${round}`;
}

function checkRoundWinner (humanChoice, computerChoice) {
    switch (humanChoice) {
        case ("rock"):
            if (computerChoice === "scissors") {
                information_board.textContent = "Human wins.";
                humanPlayerScore++;
                break
            } else if (computerChoice === "rock") {
                information_board.textContent = "Tie.";
                break
            } else if (computerChoice === "paper") {
                information_board.textContent = "Computer wins.";
                computerPlayerScore++;
                break
            }
            break
        case ("paper"):
            if (computerChoice === "rock") {
                information_board.textContent = "Human wins.";
                humanPlayerScore++;
                break
            } else if (computerChoice === "paper") {
                information_board.textContent = "Tie.";
                break
            } else if (computerChoice === "scissors") {
                information_board.textContent = "Computer wins.";
                computerPlayerScore++;
                break
            }
            break
        case ("scissors"):
            if (computerChoice === "paper") {
                information_board.textContent = "Human wins.";
                humanPlayerScore++;
                break
            } else if (computerChoice === "scissors") {
                information_board.textContent = "Tie";
                break
            } else if (computerChoice === "rock") {
                information_board.textContent = "Computer wins.";
                computerPlayerScore++;
                break
            }
    }
}

function checkGameWinner () {
    if (humanPlayerScore === 5) {
        information_board.textContent = 'Human player wins the game.';
    }
    if (computerPlayerScore === 5) {
        information_board.textContent = 'Computer player wins the game.';
    }

    if (humanPlayerScore === 5 || computerPlayerScore === 5) {
        buttons.forEach(button => {
            button.removeEventListener('click', playRound)
        })
        let message = document.createElement('div')
        message.textContent = 'Reload this page to play again.';
        information_board.appendChild(message);
    }
}
