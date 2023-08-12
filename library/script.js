let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = Boolean(read)
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

function drawLibrary() {

}

let book1 = new Book("Don Quixote", "Miguel De Cervantes", "952", false);
let book2 = new Book("Napoleon's buttons", "Penny Le Couteur & Jay Burreson", 375, false);
let book3 = new Book("What is Mathematics?", "Richard Courant and Herbert Robbins", 566, false);
let book4 = new Book("Age of Extremes", "Eric Hobsbawn", 627, false);

addBookToLibrary(book1)
addBookToLibrary(book2)
addBookToLibrary(book3)
addBookToLibrary(book4)



console.log(myLibrary);