//Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI Class: Handle UI tasks
class UI {
  static displayBooks() {  
    const books = Store.getBooks();
    books.forEach(book => UI.addBookToList(book)); //Loops true the array and runs the addBookToList function for each element
  }
  
  //Add a book to the list Method
  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
  }
  
  //Delete a book Method
  static deleteBook(element) {
    //Checks if the classlist of the clicked element contains the class "delete" which is the button
    if (element.classList.contains("delete")) {
      //Removes the parentElement of the parentElement which is the TR
      element.parentElement.parentElement.remove();
    }
  }
  
  //Show Alert Method
  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    //Delete the Alert in 3sec
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }
  
  //Clear the inputfields Method
  static clearFields() {
    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#isbn').value = "";
  }
}

//Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  //Prevent Default Action
  e.preventDefault();
  //Get Input Values
  let title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;
  
  //Validate user input
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    //Instansiate a New Book
    const book = new Book (title, author, isbn);
    //Add Book to the UI
    UI.addBookToList(book);
    //Add Book to localstorage
    Store.addBook(book);
    //Show Alert succesfull add
    UI.showAlert("Book added to the list!", "success");
    //Clear the inputfields
    UI.clearFields();
  }
});

//Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  //Remove book from Local Storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  //Book removed alert
  UI.showAlert("Book deleted!", "danger");
});