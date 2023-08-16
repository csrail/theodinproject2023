"use strict";
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
// change board state with token
// change board ui with token
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

// const Game = () => {
//
//     const {initialiseBoard} = Board();
//     const {drawBoardView} = Board();
//
//     return {
//         initialiseBoard,
//         drawBoardView,
//     }
// }
const Game = () => {

    const _player1 = Player("X");
    const _player2 = Player("O");

    let gameWinner;
    let _playerTurn = 1;
    let _player1Token = _player1.playerToken;
    let _player2Token = _player2.playerToken;

    const _board = Board(_player1, _player2);

    // _board.clearBoard();
    // _board.clearBoardView();
    _board.initialiseBoard();
    _board.drawBoardView();
    _board.setBoard();
    _playerTurn === 1 ? _playerTurn = 2 : _playerTurn = 1;
    _playerTurn = 2;

    // Board.initialiseBoard();
    // Board.drawBoardView();
    // Board.setBoard();

    // return Object.assign(
    //     {player1, player2,},
    //     Board(),
    //     Player())
}

// seems to be three ways I can interact with the Board factory function, I'm not sure which is right so I'll have to
// pick one and go with it and see what kind of mess I get into

// #1
// Board is a factory function and the Game factory function is assigned Board properties:
// return Object.assign(
//      {},
//      Board(),
//      Player())
// then interact with the Board view via:
// const game = Game();
// game.initialiseBoard();
// game.drawBoardView();
// game.setBoard();
//
// But why am I running all of this in the global scope?  Is that correct?

// #2
// Board is still a factory function, but I don't assign the properties to the Game factory function.
// Instead, I declare a variable as Board within Game:
// const _board = Board();
// _board.initialiseBoard();
// _board.drawBoardView();
// _board.setBoard();
//
// One issue I can see here is that whenever Game is initialised, the entire sequence gets run.
// You can run Game(); within the console and a second board appears.

// #3
// Board becomes a Module now with the following pattern:
// const Board = (() => { ...logic... })();
// The Board module is accessed within the Game factory function:
// Board.initialiseBoard();
// Board.drawBoardView();
// Board.setBoard();
//
// This doesn't seem to be the correct way of doing it.  Although there is only one Board that is required per Game,
// If multiple games were being created, they would all share the same Module variable _board state, therefore it's not
// I'm leaning away from Board being used as a module.
// From my findings, it seems that modules should only be used as helper functions that result in an output, and avoid
// trying to remember state.

const Board = (player1, player2) => {

    let _board = [];
    let _cell;
    const _mainView = document.querySelector('main');
    const _boardView = document.createElement('div');
    _boardView.classList.add('board');

    const _player1 = player1
    const _player2 = player2
    let _playerTurn = 1;

    const initialiseBoard = () => {
        console.log("Board Initialised");
        _board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
    }
    const drawBoardView = () => {
        const count = 3;

        for (let i = 0; i<count; i++) {
            const rowView = document.createElement('div');
            rowView.classList.add('row');
            rowView.setAttribute('data-row', i.toString());
            // rowView.textContent = `This is row ${i.toString()}`;

            for (let j = 0; j<count; j++) {
                const cellView = document.createElement('div');
                cellView.classList.add('cell');
                cellView.setAttribute('data-column', j.toString());
                cellView.textContent = j.toString();
                rowView.appendChild(cellView);
            }
            _boardView.appendChild(rowView);
        }
        _mainView.append(_boardView);
    }

    const setBoard = () => {
        _boardView.childNodes.forEach((row) => {
            row.childNodes.forEach((cell) => {
                cell.addEventListener('click', (event) => {
                    let dataRowIndex = event.target.parentNode.getAttribute('data-row');
                    let dataColumnIndex = event.target.getAttribute('data-column');
                    _cell = _board[dataRowIndex][dataColumnIndex]
                    if (_playerTurn === 1) {
                        _cell = player1.playerToken;
                        console.log(_board)
                        event.target.textContent= player1.playerToken;
                        _playerTurn === 1 ? _playerTurn = 2 : _playerTurn = 1;
                    } else if (_playerTurn === 2) {
                        _cell = player2.playerToken;
                        console.log(_board)
                        event.target.textContent= player2.playerToken;
                        _playerTurn === 1 ? _playerTurn = 2 : _playerTurn = 1;
                    }
                })
            })
        })
    }
    
    const checkValidMove = () => {
        
    }

    return {
        initialiseBoard,
        drawBoardView,
        setBoard,
    }

};

const Player = (token) => {

    // write function to set up players
    // set up player 1
    // set up player 2
    // pass player states from Player ff to Game ff
    const playerToken = token;

    return { playerToken }
}

// const game = Game();
// game.initialiseBoard();
// game.drawBoardView();
// game.setBoard();

Game();