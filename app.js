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
    const StoredBooks = [
      {
        title: "Book One",
        author: "John Doe",
        isbn: "3434434"
      },
      {
        title: "Book Two",
        author: "Jane Doe",
        isbn: "45545"
      }
    ];
    
    const books = StoredBooks;
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
  }
  //Clear the inputfields Method
  static clearFields() {
    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#isbn').value = "";
  }
}

//Store Class: Handles Storage

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
    //Clear the inputfields
    UI.clearFields();
  }
});

//Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
});