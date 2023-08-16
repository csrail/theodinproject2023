// Items:
// Game object
// Board object
// Player object
// Token object
// Turns

// start game
// player 1 turn
// player 1 moves: selects space
// check move valid
// deny move, redo move
// accept move
// check win condition
// if won, complete game
// if not won yet, continue
// switch to player 2 turn
// player 2 moves: selects space
// check move valid...

// game
// board
// player
// tokens
// round

const Game = () => {

    const {createBoard} = Board();

    return { createBoard }
}

const Board = () => {

    const createBoard = () => {
        console.log("Board Created");
    }

    return { createBoard }
}

const game = Game();

game.createBoard();
