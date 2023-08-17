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
    const _board = Board(_player1, _player2);

    // _board.clearBoard();
    // _board.clearBoardView();
    _board.initialiseBoard();
    _board.drawBoardView();
    _board.setBoard();
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
    const _mainView = document.querySelector('main');
    const _boardView = document.querySelector('.board');
    const _boardMessage = document.querySelector('.board-message');

    const _player1 = player1;
    const _player2 = player2;
    let _playerTurn = 1;
    let _winner;

    const _cellCount = 3;
    const player1WinCondition = (value) => value === player1.playerToken;
    const player2WinCondition = (value) => value === player2.playerToken;

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
                    if (checkValidMove(dataRowIndex, dataColumnIndex)) {
                        if (_playerTurn === 1) {
                            _board[dataRowIndex][dataColumnIndex] = _player1.playerToken;
                            // console.log(_board);
                            event.target.textContent= _player1.playerToken;
                            // _boardMessage.textContent = "X";
                        } else if (_playerTurn === 2) {
                            _board[dataRowIndex][dataColumnIndex] = _player2.playerToken;
                            // console.log(_board);
                            event.target.textContent= _player2.playerToken;
                            _boardMessage.textContent = "O";
                        }

                        if (_winner === void(0)) {
                            checkHorizontalWin(dataRowIndex);
                        }

                        if (_winner === void(0)) {
                            let activeColumn = (getColumn(dataColumnIndex));
                            checkVerticalWin(activeColumn);
                        }

                        if (!(_winner === void(0))) {
                            deactivateBoard();
                        }

                        _playerTurn === 1 ? _playerTurn = 2 : _playerTurn = 1;
                    }
                })
            })
        })
    }
    
    const checkValidMove = (row, column) => {
       if (_board[row][column] === 0) {
           return true
       } else if (_board[row][column] === _player1.playerToken || _board[row][column] === _player2.playerToken) {
           _boardMessage.textContent = "Not a valid move";
           return false
       } else {
           return false
       }
    }

    const deactivateBoard = () => {_boardView.replaceWith(_boardView.cloneNode(true))};
    const checkHorizontalWin = (row) => {

        if (_playerTurn === 1) {
            if (_board[row].every(player1WinCondition)) {
                _boardMessage.textContent = "Player 1 Wins";
                _winner = _player1;
                return true
            }
        } else if (_playerTurn === 2) {
            if (_board[row].every(player2WinCondition)) {
                _boardMessage.textContent = "Player 2 Wins"
                _winner = _player2;
                return true
            }
        }
    }

    const getColumn = (columnIndex) => {
        let column = []
        _board.forEach((row) => {
            column.push(row[columnIndex])
        })
        return column;
    }

    const checkVerticalWin = (column) => {
        if (_playerTurn === 1) {
            if (column.every(player1WinCondition)) {
                _boardMessage.textContent = "Player 1 Wins";
                _winner = _player1;
                return true
            }
        } else if (_playerTurn === 2) {
            if (column.every(player2WinCondition)) {
                _boardMessage.textContent = "Player 2 Wins"
                _winner = _player2;
                return true
            }
        }
    }

    const getDiagonal = () => {
        // take
    }

    const checkDiagonalWin = () => {

    }

    const checkWinner = () => {

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