// javascript pattern uses constructors to create new objects
// if the 'new' keyword is missed during instancing, then you make the properties of the function available
// in the global scope;  this can create security vulnerabilities;
// there are also strange pointer relations when using the Object.setPrototypeOf(source, target) relationship

let shelf = document.querySelector('.shelf')

let bookCounter = 0;
let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = Boolean(isRead)
    this.bookIndex = bookCounter
    bookCounter += 1;
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

function drawBook(book) {
    const bookElement = document.createElement('div');
    const bookAttribution = document.createElement('div');
    const bookMetaData = document.createElement('div');
    const bookTitle = document.createElement('div');
    const bookAuthor = document.createElement('div');
    const bookPages = document.createElement('div');
    const bookIsRead = document.createElement('button');
    const bookDataIndex = document.createElement('div');

    bookElement.classList.add('book');
    bookAttribution.classList.add('attribution');
    bookMetaData.classList.add('metadata');
    bookIsRead.classList.add('read-state');

    bookDataIndex.setAttribute('data-index', book.bookIndex);

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = `${book.pages} pages`;
    bookDataIndex.textContent = book.bookIndex;

    book.isRead === true ? bookIsRead.textContent = "Read" : bookIsRead.textContent = "Unread"

    bookAttribution.appendChild(bookTitle);
    bookAttribution.appendChild(bookAuthor);
    bookMetaData.appendChild(bookPages);
    bookMetaData.appendChild(bookIsRead);
    bookElement.appendChild(bookAttribution);
    bookElement.appendChild(bookMetaData);
    bookElement.appendChild(bookDataIndex);

    shelf.appendChild(bookElement);
}

function drawLibrary() {
    for (const book of myLibrary) {
        drawBook(book);
    }
}

let book1 = new Book("Don Quixote", "Miguel De Cervantes", "952", false);
let book2 = new Book("Napoleon's buttons", "Penny Le Couteur & Jay Burreson", 375, false);
let book3 = new Book("What is Mathematics?", "Richard Courant and Herbert Robbins", 566, false);
let book4 = new Book("Age of Extremes", "Eric Hobsbawn", 627, false);

addBookToLibrary(book1)
addBookToLibrary(book2)
addBookToLibrary(book3)
addBookToLibrary(book4)

drawLibrary();

const formAddBookButton = document.querySelector('#form-add-book-button');
const formInputBookTitle = document.querySelector('#input-book-title');
const formInputBookAuthors = document.querySelector('#input-book-authors');
const formInputBookPages = document.querySelector('#input-book-title');
const formInputBookIsRead = document.querySelector('#input-book-read');

formAddBookButton.addEventListener('click', (event) => {
    const bookObject = new Book(
        formInputBookTitle.value,
        formInputBookAuthors.value,
        formInputBookPages.value,
        formInputBookIsRead.value)
    drawBook(bookObject);
})
// formInputBookTitle.value
const formRemoveBookButton = document.querySelector('#form-remove-book-button');
const formInputBookIndex = document.querySelector('#input-remove-book');

formRemoveBookButton.addEventListener('click', () => {
    let bookIndex = +formInputBookIndex.value;
    let bookObject = myLibrary.find((obj) => obj.bookIndex === bookIndex);
    let bookArrayIndex = myLibrary.findIndex((obj) => obj === bookObject);
    let book = document.querySelector(`[data-index='${bookIndex}']`).parentNode;
    myLibrary.splice(bookArrayIndex, 1);
    book.remove();
})

let readStateButtons;
function selectReadStateButtons() {
    readStateButtons = document.querySelectorAll('.read-state')
}

selectReadStateButtons();

readStateButtons.forEach((button) => {
    button.addEventListener('click', () => {
        let node = button.parentNode.parentNode;
        node = node.querySelector('[data-index]');
        let bookIndex = +node.getAttribute('data-index');
        let bookObject = myLibrary.find((obj) => obj.bookIndex === bookIndex);
        if (bookObject.isRead === true) {
            bookObject.isRead = false;
            button.textContent = 'Unread';
        } else {
            bookObject.isRead = true;
            button.textContent = 'Read';
        }
    })
})