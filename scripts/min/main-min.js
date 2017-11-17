/* global Requests */

var bookTemplate = $('#templates .book')
var bookTable = $('#bookTable')

var borrowerTemplate = $('#templates .borrower')
var borrowerTable = $('#borrowerTable')

// MY LIBRARY ID IS 130
var libraryID = 130
var requests = new Requests(libraryID)

// var baseURL = `https://floating-woodland-64068.herokuapp.com/libraries/${libraryID}`
var dataModel = {
  // books: [],
  // borrower: [],
}


// The bookData argument is passed in from the API
function addBookToPage(bookData) {
  var book = bookTemplate.clone()
  book.attr('data-id', bookData.id)
  book.find('.bookTitle').text(bookData.title)
  book.find('.bookDescription').text(bookData.description)
  book.find('.bookImage').attr('src', bookData.image_url)
  book.find('.bookImage').attr('alt', bookData.title)
  bookTable.prepend(book)
}

var bookPromise = requests.getBooks().then((dataFromServer) => {
  dataModel.books = dataFromServer
})

// DELETE BOOK
bookTable.on('click', '.bookDelete', function(event) {
  var item = $(event.currentTarget).parent()
  var itemId = item.attr('data-id')
  requests.deleteBook({id: itemId}).then(() => {
    item.remove()
  })
})

// The borrowerData argument is passed in from the API
function addBorrowerToPage(borrowerData) {
  var borrower = borrowerTemplate.clone()
  borrower.attr('data-id', borrowerData.id)
  borrower.find('.borrowerName').text(`${borrowerData.firstname} ${borrowerData.lastname}`)
  borrowerTable.prepend(borrower)
}

var borrowerPromise = requests.getBorrowers().then((dataFromServer) => {
  dataModel.borrowers = dataFromServer
})

var promises = [bookPromise, borrowerPromise]

Promise.all(promises).then(() => {
  // First add borrower to the page
  dataModel.borrowers.forEach( (borrowerData) => {
    addBorrowerToPage(borrowerData)
  })
  // Next add books to the page
  dataModel.books.forEach( (bookData) => {
    addBookToPage(bookData)
  })
})

// DELETE BORROWER
borrowerTable.on('click', '.borrowerDelete', function(event) {
  var item = $(event.currentTarget).parent()
  var itemId = item.attr('data-id')
  requests.deleteBorrower({id: itemId}).then(() => {
    item.remove()
  })
})

// BOOKS MODAL FUNCTIONALITY

$('#createBookButton').on('click', () => {
  var bookData = {}
  bookData.title = $('.addBookTitle').val()
  bookData.description = $('.addBookDescription').val()
  bookData.image_url = $('.addBookImageURL').val()

  requests.createBook(bookData).then((dataFromServer) => {
    addBookToPage(dataFromServer)
    $('#addBookModal').modal('hide')
    $('#addBookForm')[0].reset()
  })
})


// BORROWER MODAL FUNCTIONALITY

$('#createBorrowerButton').on('click', () => {
  var borrowerData = {}
  borrowerData.firstname = $('.addBorrowerFirstname').val()
  borrowerData.lastname = $('.addBorrowerLastname').val()

  requests.createBorrower(borrowerData).then((dataFromServer) => {
    addBorrowerToPage(dataFromServer)
    $('#addBorrowerModal').modal('hide')
    $('#addBorrowerForm')[0].reset()
  })

})


// IMAGE LOADING ERROR


