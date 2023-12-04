const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const booksContainer = document.querySelector('.books-container'); 

const form = document.querySelector('form');
const addButton = document.querySelector('#add-btn');
const closeDialogButton = document.querySelector('#close-btn');
const submitButton = document.querySelector('button[type="submit"]');

const author = document.querySelector('input[name="author"]');
const title = document.querySelector('input[name="title"]');
const pages = document.querySelector('input[name="pages"]');
const isRead = document.querySelector('input[type="checkbox"]');

addButton.addEventListener('click', () => {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
});

closeDialogButton.addEventListener('click', () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
});

function validate() {
    return !(author.value === '' || title.value === '' || pages.value === '');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validate()) {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
        const myBook = new Book(author.value, title.value, pages.value, isRead.checked);
        addBookToLibrary(myBook);
        showLibrary();
    } else {
        alert("Values must not be empty");
    }


});


const myLibrary = [];

function Book(author, title, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    showLibrary();
}

function clearLibrary() {
    booksContainer.innerHTML = '';
}

Book.prototype.toggleReadStatus = function () {
    this.isRead = !this.isRead;
};

function toggleReadStatus(index) {
    myLibrary[index].toggleReadStatus();
    showLibrary();
}

function showLibrary() {
    // Clear
    clearLibrary();

    myLibrary.forEach((book, index) => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeBookFromLibrary(index));
        removeButton.classList.add('removeBtn');

        const toggleReadButton = document.createElement('button');
        toggleReadButton.textContent = book.isRead ? 'Read' : 'Not read';
        toggleReadButton.classList.add(book.isRead ? 'read' : 'not-read');
        toggleReadButton.addEventListener('click', () => toggleReadStatus(index));

        bookElement.innerHTML = `
            <p>"${book.title}"</p> 
            <p>${book.author}</p>
            <p>${book.pages} pages</p>
            
        `;

        bookElement.appendChild(toggleReadButton);
        bookElement.appendChild(removeButton);

        booksContainer.appendChild(bookElement);
    });
}

showLibrary();

