var BookmarkName = document.getElementById("BookmarkName");
var url = document.getElementById("URL");
var btn = document.getElementById("submit-btn");

btn.onclick = AddBookmark;

var BookmarksList = [];

if (localStorage.getItem("Bookmarks") !== null) {
  BookmarksList = JSON.parse(localStorage.getItem("Bookmarks"));
  display();
} else {
  BookmarksList = [];
}

function AddBookmark() {
  var Bookmark = {
    BookmarkName: BookmarkName.value,
    url: url.value,
  };
if (BookmarkName.value.trim() !== "" && url.value.trim() !== "" && url.value.length > 3) 
  {
  BookmarksList.push(Bookmark);
  localStorage.setItem("Bookmarks", JSON.stringify(BookmarksList));
  display();
  }
  
  BookmarkName.value = null;
  url.value = null;
}

function display() {
  var box = ``;
  for (var i = 0; i < BookmarksList.length; i++) {
    box += `
        <div class="row text-center shadow-sm bg-white overflow-x-hidden">
        <div class="col py-2">${i + 1}</div>
        <div class="col py-2">${BookmarksList[i].BookmarkName}</div>
        <div class="col py-2"><button type="button" onclick="VisitBookmark(${i})" class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</button></div>
        <div class="col py-2"><button type="button" onclick="deleteBookmark(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i> Delete</button></div>
        </div>`;
  }
  document.getElementById("item").innerHTML = box;
}

function deleteBookmark(index) {
  BookmarksList.splice(index, 1);
  localStorage.setItem("Bookmarks", JSON.stringify(BookmarksList));
  display();
}

function VisitBookmark(index) {
  window.open(BookmarksList[index].url, "_blank");
}
