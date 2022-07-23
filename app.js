//Books images
const books = {
    nightoverwaters: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388249830i/5055.jpg",
    itendswithus: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1470427482i/27362503.jpg",
    thesecretlivesofbabasegiswives: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1264521277i/7194279.jpg",
    mendontdie: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602578946i/55658722.jpg",
    thedavincicode: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1579621267i/968.jpg",
    purplehibiscus: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1527718322i/14569052.jpg",
    idonotcometoyoubychance: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1293037353i/6265288.jpg",
    ofwomenandfrogs: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1542900692i/42593652.jpg",
    beliversandhustlers: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1646172734i/60532867.jpg",
    loveincolor: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1611551071i/54698746.jpg",
    halfofayellowsun: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327934717i/18749.jpg"
}

// Book representation

class Book{
    constructor(title, author, isbn, titleObject) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.titleObject = title.split(" ").join("")
    }
}

//UI tasks
class UI{
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book))

    }

    static addBookToList(book) {
        const main = document.querySelector("main");

        const section = document.createElement('section');
        section.className = "section";
        section.innerHTML = `
            <div class= "image">
            <img src= "${books[book.titleObject]}">
            </div>
            <div class="center">
                <div class="title">${book.title}</div>
                <div class="author">${book.author}</div>
                <div class="isbn">${book.isbn}</div>
            </div>
            <div class="remove">Remove
                <i class="fa-solid fa-x"></i>
            </div>"`
    main.appendChild(section);
    }

    static clearField() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    }

    static deleteBook(target) {
        if ( target.classList.contains("remove")) {
            target.parentElement.remove();
            const alert = document.querySelector(".alert-message")
            alert.innerHTML = "book removed";
            alert.classList.add("success");
            setTimeout(() => alert.innerHTML = "", 3000);
        }
    }
}

//Storage section
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = []; 
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }
    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem("books", JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem("books", JSON.stringyfy(books));
    }
}

//Events Add, Remove and Display
document.addEventListener("DOMContentLoaded", UI.displayBooks);
document.querySelector(".submit").addEventListener("click", (e) => {
    //prevent submit
    e.preventDefault()
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;
    const titleObject = title.split(" ").join();
    const alert = document.querySelector(".alert-message")

    if (title === '' || author === '' || isbn === '') {
        alert.classList.add("error")
        alert.innerHTML = "please fill all fields";
        setTimeout(() => alert.innerHTML = " ", 3000)
    } else {
        if (alert.classList.contains("error")) {
            alert.classList.remove("error");
            alert.classList.add("success");
            alert.innerHTML = "Book Added";
            setTimeout(() => alert.innerHTML = " ", 3000)
        }
        const book = new Book(title, titleObject, author, isbn)
        console.log(book);

        UI.addBookToList(book);
        Store.addBook(book);
        UI.clearField();

    }
})

setTimeout(() => {
    const sections = document.querySelectorAll("section")
    sections.forEach(() => {
            addEventListener("click", (e) => {
                UI.deleteBook(e.target)
                Store.removeBook(e.target.parentElement.previousElementSibling.textcontent)
        })
 })
}, 2000)


