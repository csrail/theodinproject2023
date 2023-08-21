// change from constructor design to class design
// set up private and public items
// set up Library class
// set up Book class
// set up Author class

class Library {
    #library = [];
    #shelf = document.querySelector('.shelf')

    constructor() {
        Object.assign(Library.prototype, webFormAddBook);
        Object.assign(Library.prototype, webFormRemoveBook);

        for (const book of this.#books) {
            this.#addBookToLibrary(book);
        }
        this.#drawLibrary();

        // can substitute the below 'webFormAddBook' with 'this' now that the mixin has been assigned
        // but for some reason I feel like this has better composition and readability?
        // for smaller applications, this seems fine to invoke a mixin like this
        // for larger applications, this could be a bad practise as the mixin could change name: you'd have dependencies
        webFormAddBook.formAddBookButton().addEventListener('click', () => {
            const bookObject = new Book(
                webFormAddBook.formInputBookTitle().value,
                webFormAddBook.formInputBookAuthors().value,
                webFormAddBook.formInputBookPages().value,
                webFormAddBook.formInputBookIsRead().value)
            this.#addBookToLibrary(bookObject);
            return this.#drawBook(bookObject);
        })

        webFormRemoveBook.formRemoveBookButton().addEventListener('click', () => {
            let bookIndex = +webFormRemoveBook.formInputBookIndex().value;
            let bookObject = this.#library.find((obj) => obj.bookCount === bookIndex);
            if (bookObject === void(0)) { return }
            let bookArrayIndex = this.#library.findIndex((obj) => obj === bookObject);
            let bookDisplay = document.querySelector(`[data-index='${bookIndex}']`).parentNode;
            this.#library.splice(bookArrayIndex, 1);
            bookDisplay.remove();
        })
    }

    get library() {
        return this.#library
    }


    #books = [
        new Book("Don Quixote", "Miguel De Cervantes", "952", false),
        new Book("Napoleon's buttons", "Penny Le Couteur & Jay Burreson", 375, false),
        new Book("What is Mathematics?", "Richard Courant and Herbert Robbins", 566, false),
        new Book("Age of Extremes", "Eric Hobsbawn", 627, false),
    ]

    #addBookToLibrary(book) {
        this.#library.push(book);
    }

    #drawLibrary() {
        for (const book of this.#library) {
            this.#drawBook(book);
        }
    }
    #drawBook(book) {
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

        bookDataIndex.setAttribute('data-index', book.bookCounter.toString());

        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookPages.textContent = `${book.pages} pages`;
        bookDataIndex.textContent = book.bookCounter.toString()

        book.isRead === true ? bookIsRead.textContent = "Read" : bookIsRead.textContent = "Unread"

        bookAttribution.appendChild(bookTitle);
        bookAttribution.appendChild(bookAuthor);
        bookMetaData.appendChild(bookPages);
        bookMetaData.appendChild(bookIsRead);
        bookElement.appendChild(bookAttribution);
        bookElement.appendChild(bookMetaData);
        bookElement.appendChild(bookDataIndex);

        this.#shelf.appendChild(bookElement);
    }
}

class Book {

    static bookCount= 0;
    constructor(title, author, pages, isRead, bookCount=Book.bookCount) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = Boolean(isRead);
        this.bookCount = Book.bookCount;
        Book.bookCount +=1
    }
}

const webFormAddBook = {
    formAddBookButton() { return document.querySelector('#form-add-book-button')},
    formInputBookTitle() { return document.querySelector('#input-book-title')},
    formInputBookAuthors() { return document.querySelector('#input-book-authors')},
    formInputBookPages() { return document.querySelector('#input-book-title')},
    formInputBookIsRead() { return document.querySelector('#input-book-read')},
}

// const formAddBookButton = document.querySelector('#form-add-book-button');
// const formInputBookTitle = document.querySelector('#input-book-title');
// const formInputBookAuthors = document.querySelector('#input-book-authors');
// const formInputBookPages = document.querySelector('#input-book-title');
// const formInputBookIsRead = document.querySelector('#input-book-read');

// formAddBookButton.addEventListener('click', (event) => {
//     const bookObject = new Book(
//         formInputBookTitle.value,
//         formInputBookAuthors.value,
//         formInputBookPages.value,
//         formInputBookIsRead.value)
//     drawBook(bookObject);
// })

const webFormRemoveBook = {
    formRemoveBookButton() { return document.querySelector('#form-remove-book-button')},
    formInputBookIndex() { return document.querySelector('#input-remove-book')},
}
// const formRemoveBookButton = document.querySelector('#form-remove-book-button');
// const formInputBookIndex = document.querySelector('#input-remove-book');

// formRemoveBookButton.addEventListener('click', () => {
//     let bookIndex = +formInputBookIndex.value;
//     let bookObject = myLibrary.find((obj) => obj.bookIndex === bookIndex);
//     let bookArrayIndex = myLibrary.findIndex((obj) => obj === bookObject);
//     let book = document.querySelector(`[data-index='${bookIndex}']`).parentNode;
//     myLibrary.splice(bookArrayIndex, 1);
//     book.remove();
// })

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

const main = (() => {
    const lib = new Library();

    return { lib }
})();