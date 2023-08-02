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
// remove current grid
// generate grid in same amount of space, divisor function required
// bonus button changes mode to randomise color RGB value applied
// bonus button changes mode to apply 10% value change on each hover
// where 0% is white and 100% is black;

let gridCount = 16;
const grid = document.querySelector('.grid');
let cell;
let cells;
const gridSize = 200;
let cellSize;
const randomColorModeButton = document.querySelector('.random-color-mode');
const gradientModeButton = document.querySelector('.gradient-mode');
const HEXADECIMAL_DIGITS = '0123456789ABCEDF';

// for loop on gridCount
// each loop, add cell to grid;
function makeGrid () {
    cellSize = gridSize / gridCount;
    for (let i = 0; i < gridCount; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
    for (let i = 0; i < gridCount; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.height = `${cellSize}px`;
        cell.style.width = `${cellSize}px`;
        row.appendChild(cell);
    }
    grid.appendChild(row);
    }
}



function selectCells () {
    cells = document.querySelectorAll('.cell');
}

function colorCell () {
    this.classList.add('color');
}

function colorCells (cells) {
    cells.forEach(cell => {
        cell.addEventListener('mouseover', colorCell)
    })
}

const resizeOption = document.querySelector('.resize');

function askGridCount () {
    gridCount = Number(prompt("Resize this grid: pick a number between 1 and 50."))
    if (gridCount === 0) return;
    validateGridCount(gridCount);
}

function validateGridCount (grid) {
    if (Number.isNaN(grid) || grid < 1 || grid > 50 ) askGridCount();
}

function deleteCells() {
    cells.forEach(cell => {
        cell.remove();
    })
}

resizeOption.addEventListener('click', () => {
    askGridCount();
    selectCells();
    deleteCells();
    makeGrid();
    selectCells();
    colorCells(cells);
})

function resetColors () {
    selectCells();
    cells.forEach(cell => {
        cell.classList.remove('color');
    })
}

function getRandomColor () {
    let color = "#"
    for (let i = 0; i < 6; i++) {
        color += HEXADECIMAL_DIGITS[Math.floor(Math.random() * HEXADECIMAL_DIGITS.length)];
    }
    console.log(color);
    return color;
}

randomColorModeButton.addEventListener('click', () => {
    resetColors();
    // would it be cheaper to delete cells and then recreate grid?
    // currently iterating at least twice instead of destroying the objects altogether and then iterating once.
    // definitely cheaper to delete the cells and recreate grid otherwise you have to keep track of each color mode
    // and remove the event listener for the specific callback function that colors thigns.
    selectCells()
    cells.forEach(cell => {
        cell.removeEventListener('mouseover', colorCell)
    })
    cells.forEach(cell => {
        cell.addEventListener('mouseover', () => {
            cell.style.backgroundColor = getRandomColor();
        })
    })
})

// TODO FIX PROPAGATION.  Need to access event so bubbling can be fixed to improve performance.

gradientModeButton.addEventListener('click', () => {
    console.log('gradient');
    selectCells();
    deleteCells();
    makeGrid();
    selectCells();
    cells.forEach(cell => {
        cell.addEventListener('mouseover', colorDark10);
    })

})

function colorDark10 () {
    this.style.backgroundColor = "rgba(0,0,0, 0.1)";
    this.addEventListener('mouseover', colorDark20);
    console.log("Dark10");
}

function colorDark20 () {
    this.style.backgroundColor = "rgba(0,0,0, 0.2)";
    this.addEventListener('mouseover', colorDark30);
}

function colorDark30 () {
    this.style.backgroundColor = "rgba(0,0,0, 0.3)";
    this.addEventListener('mouseover', colorDark40);
}

function colorDark40 () {
    this.style.backgroundColor = "rgba(0,0,0, 0.4)";
    this.addEventListener('mouseover', colorDark50);
}

function colorDark50 () {
    this.style.backgroundColor = "rgba(0,0,0, 0.5)";
    this.addEventListener('mouseover', colorDark60);
}

function colorDark60 () {
    this.style.backgroundColor = "rgba(0,0,0, 0.6)";
    this.addEventListener('mouseover', colorDark70);
}

function colorDark70 () {
    this.style.backgroundColor = "rgba(0,0,0, 0.7)";
    this.addEventListener('mouseover', colorDark80);
}

function colorDark80 () {
    this.style.backgroundColor = "rgba(0,0,0, 0.8)";
    this.addEventListener('mouseover', colorDark90);
}

function colorDark90 () {
    this.style.backgroundColor = "rgba(0,0,0, 0.9)";
    this.addEventListener('mouseover', colorDark100);
}

function colorDark100 () {
    this.style.backgroundColor = "rgba(0,0,0, 1)";
}

function initialize () {
    makeGrid();
    selectCells();
    colorCells(cells);
}

initialize();
