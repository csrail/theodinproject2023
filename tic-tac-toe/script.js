"use strict";
// Items:
// Game object
// Board View object
// Board Model object
// Player object

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



const Board = (player1, player2) => {

    let _board = [];
    const _mainView = document.querySelector('main');
    const _boardView = document.querySelector('.board');
    const _boardMessage = document.querySelector('.board-message');

    const _player1 = player1;
    const _player2 = player2;
    let _playerTurn = 1;
    let _winner;

    const _gridSize = 3;
    const _player1WinCondition = (value) => value === player1.playerToken;
    const _player2WinCondition = (value) => value === player2.playerToken;

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

                        if (_winner === void(0)) {
                            let diagonalOneResults = getDiagonalResults(getDiagonalOneMap);
                            checkDiagonalWin(diagonalOneResults);
                        }

                        if (_winner === void(0)) {
                            let diagonalTwoResults = getDiagonalResults(getDiagonalTwoMap);
                            checkDiagonalWin(diagonalTwoResults);
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
            if (_board[row].every(_player1WinCondition)) {
                _boardMessage.textContent = "Player 1 Wins";
                _winner = _player1;
                return true
            }
        } else if (_playerTurn === 2) {
            if (_board[row].every(_player2WinCondition)) {
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
            if (column.every(_player1WinCondition)) {
                _boardMessage.textContent = "Player 1 Wins";
                _winner = _player1;
                return true
            }
        } else if (_playerTurn === 2) {
            if (column.every(_player2WinCondition)) {
                _boardMessage.textContent = "Player 2 Wins"
                _winner = _player2;
                return true
            }
        }
    }

    const getDiagonalOneMap = (() => {
        // [[0,0], [1,1], [2,2]
        // +1, +1
        // two streams going in the same direction so 1 counter
        let mapping = []
        for (let i = 0; i < _gridSize; i++) {
            mapping.push([i, i])
        }
        // console.log(mapping);
        return mapping;
    })();

    const getDiagonalResults = (diagonalMap) => {
        let diagonal = [];
        diagonalMap.forEach((cell) => {
            const row = cell[0]
            const column = cell[1]
            diagonal.push(_board[row][column])
        })
        // console.log(diagonal);
        return diagonal;
    }
    const getDiagonalTwoMap = (() => {
        // [[2,0], [1,1], [2,2]
        // -1, +1
        // two streams going in different directions so 2 counters
        let mapping = []
        let j = 0;
        for (let i = _gridSize -1 ; i > -1; i--) {
            mapping.push([i, j]);
            j++;
        }
        // console.log(mapping);
        return mapping;
    })();

    const checkDiagonalWin = (diagonal) => {
        if (_playerTurn === 1) {
            if (diagonal.every(_player1WinCondition)) {
                _winner = _player1;
                _boardMessage.textContent = "Player 1 Wins";
                return true
            }
        } else if (_playerTurn === 2) {
            if (diagonal.every(_player2WinCondition)) {
                _winner = _player2;
                _boardMessage.textContent = "Player 2 Wins";
                return true
            }
        }
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

    const playerToken = token;

    return { playerToken }
}

const Game = (() => {

    const _player1 = Player("X");
    const _player2 = Player("O");

    let gameWinner;
    const _board = Board(_player1, _player2);

    // _board.clearBoard();
    // _board.clearBoardView();
    _board.initialiseBoard();
    _board.drawBoardView();
    _board.setBoard();

    return {}
})();