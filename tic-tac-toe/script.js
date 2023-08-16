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

const Board = () => {

    let _board = []
    const _mainView = document.querySelector('main');
    const _boardView = document.createElement('div');
    _boardView.classList.add('board');

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
                cellView.setAttribute('data-cell', j.toString());
                cellView.textContent = j.toString();
                rowView.appendChild(cellView);
            }
            _boardView.appendChild(rowView);
        }
        _mainView.append(_boardView);

        _boardView.childNodes.forEach((row) => {
            row.childNodes.forEach((cell) => {
                cell.addEventListener('click', (event) => {
                    let dataRowIndex = event.target.parentNode.getAttribute('data-row');
                    let dataCellIndex = event.target.getAttribute('data-cell');
                    _board[dataRowIndex][dataCellIndex] = 'X';
                    console.log(_board)
                    event.target.textContent='X';
                })
            })
        })
    }

    const initialiseBoard = () => {
        console.log("Board Initialised");
        _board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
    }

    return {
        initialiseBoard,
        drawBoardView,
    }

}

const Player = (count) => {
    return {}
}

// const game = Game();
// game.initialiseBoard();
// game.drawBoardView();
//

const game = Board();
game.initialiseBoard();
game.drawBoardView();