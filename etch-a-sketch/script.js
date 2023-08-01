// create div element
// append div element to div.grid
// within div, create 16 divs
// repeat behaviour for another 15 rows
// set css display to flexbox
// to each cell, addEventListener hover
// callbackfx adds a class to the div
// the class changes the colour of the div
// reset button which removes class responsible for colors
// button that takes input
// constraint: input number cannot exceed 100
// generate grid in same amount of space, divisor function required
// bonus button changes mode to randomise color RGB value applied
// bonus button changes mode to apply 10% value change on each hover
// where 0% is white and 100% is black;

let gridSize = 16;
const grid = document.querySelector('.grid');

// for loop on gridSize
// each loop, add cell to grid;
function makeGrid () {
    for (let i = 0; i < gridSize; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
    for (let i = 0; i < gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        row.appendChild(cell);
    }
    grid.appendChild(row);
    }
}

makeGrid();

cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.addEventListener('mouseover', () => {
        console.log("text")
        cell.classList.add('color');
    })
})



