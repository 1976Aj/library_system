var bookTemplate = $('#templates .book')
var bookTable = $('#bookTable')

var borrowerTemplate = $('#templates .borrower')
var borrowerTable = $('#borrowerTable')

// MY LIBRARY ID IS 130
var libraryID = 130

var baseURL = `https://floating-woodland-64068.herokuapp.com/libraries/${libraryID}`

// The bookData argument is passed in from the API
function addBookToPage(bookData) {
  var book = bookTemplate.clone()
  book.attr('data-id', bookData.id)
  book.find('.bookTitle').text(bookData.title)
  book.find('.bookDescription').text(bookData.description)
  book.find('.bookImage').attr('src', bookData.image_url)
  book.find('.bookImage').attr('alt', bookData.title)
  bookTable.append(book)
}

var getBooksRequest = $.ajax({
  type: 'GET',
  url: `${baseURL}/books`,
})

getBooksRequest.done( (dataFromServer) => {
  dataFromServer.forEach( (bookData) => {
    addBookToPage(bookData)
  })
})



// The borrowerData argument is passed in from the API
function addBorrowerToPage(borrowerData) {
  var borrower = borrowerTemplate.clone()
  borrower.attr('data-id', borrowerData.id)
  borrower.find('.borrowerFirstName').text(borrowerData.firstname)
  borrower.find('.borrowerLastName').text(borrowerData.lastname)
  borrowerTable.append(borrower)
}

var getBorrowersRequest = $.ajax({
  type: 'GET',
  url: `${baseURL}/borrowers`,
})

getBorrowersRequest.done( (dataFromServer) => {
  dataFromServer.forEach( (borrowerData) => {
    addBorrowerToPage(borrowerData)
  })
})

