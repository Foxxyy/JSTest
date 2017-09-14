window.onload = fillTheList;
document.getElementById('errMessage').style.display = "none";

if (localStorage.getItem('list') == null) {
  books = [];
  localStorage.setItem('list', JSON.stringify(books));
} else {
  books = JSON.parse(localStorage.getItem('list'));
}

var bookList = "";
var curEditingIndex = 0;
var editFlag = false;

function clearFields() {
  document.getElementById('author').value = "";
  document.getElementById('year').value = "";
  document.getElementById('title').value = "";
  document.getElementById('pcount').value = "";
}

function doBlock(author, title, index) {
  return  '<div class="books-list-items-block" id="block'+ index + '">'+
            '<div class="books-list-items-block-description">' +
              '<img src="/img/book.png"/>' +
              '<div class="books-list-items-block-description-info">' +
                '<h3>' + title + "</h3>" +
                "<p>" + author + '</p>'+
              '</div>' +
            '</div>' +
            '<div class="books-list-items-block-control">' +
              '<img src="/img/edit.png" onclick="sendToEdit('+ index +')"/>'+
              '<img src="/img/delete.png" onclick="deleteBlock('+ index +')"/>'+
            '</div>' +
          '</div class="books-list-block">';
}

function addBook(author, year, title, pcount) {
  if (author == "" || year == "" || title == "" || pcount == "") {
    document.getElementById('errMessage').style.display = "block";
    return;
  }
  document.getElementById('errMessage').style.display = "none";
  if (editFlag) {
    editBlock(author, year, title, pcount);
    return;
  }
  books.push({author, year, title, pcount});
  localStorage.setItem('list', JSON.stringify(books));
  fillTheList();
  clearFields();
};

function deleteBlock(index) {
  books.splice(index, 1);
  localStorage.setItem('list', JSON.stringify(books));
  fillTheList();
}

function editBlock(author, year, title, pcount) {
  editFlag = false;
  books.splice(curEditingIndex, 1);
  books.splice(curEditingIndex, 0, {author, year, title, pcount});
  localStorage.setItem('list', JSON.stringify(books));
  fillTheList();
  clearFields();
  document.getElementById('addButton').value = "Add";
}

function sendToEdit(index) {
  curEditingIndex = index;
  editFlag = true;
  document.getElementById('addButton').value = "Confirm"
  document.getElementById('author').value = books[index].author;
  document.getElementById('year').value = books[index].year;
  document.getElementById('title').value = books[index].title;
  document.getElementById('pcount').value = books[index].pcount;
}

function fillTheList() {
  bookList = "";
  books.forEach(function(item, i, books) {
    bookList += doBlock(item.author, item.title, i);
  });
  document.getElementById("list").innerHTML = bookList;
}
