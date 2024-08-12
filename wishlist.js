document.addEventListener("DOMContentLoaded", () => {
  function loadWishlist() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const wishlistResults = document.getElementById("wishlist-results");
    wishlistResults.innerHTML = "";
    wishlistResults.style.display = "grid";
    wishlistResults.style.gridTemplateColumns = "repeat(5, 1fr)";
    wishlistResults.style.maxHeight = "400px";
    wishlistResults.style.overflowY = "auto";

    wishlist.forEach((book, index) => {
      const bookItem = document.createElement("div");
      bookItem.classList.add("book-item");
      const bookImage = document.createElement("img");
      bookImage.classList.add("book-image");
      bookImage.src = book.cover || "https://via.placeholder.com/150";
      bookItem.appendChild(bookImage);
      const bookTitle = document.createElement("h3");
      bookTitle.textContent = book.title;
      bookItem.appendChild(bookTitle);
      const readAlreadyButton = document.createElement("button");
      readAlreadyButton.textContent = "Done Reading";
      readAlreadyButton.style.padding = "8px 16px";
      readAlreadyButton.style.backgroundColor = "#ff9800";
      readAlreadyButton.style.color = "white";
      readAlreadyButton.style.border = "none";
      readAlreadyButton.style.borderRadius = "5px";
      readAlreadyButton.style.cursor = "pointer";
      readAlreadyButton.style.fontWeight = "bold";
      readAlreadyButton.classList.add("action-button");
      readAlreadyButton.addEventListener("click", () => {
        readAlreadyButton.disabled = true;
        readAlreadyButton.textContent = "Marked as Read";
        readAlreadyButton.style.padding = "8px 16px";
        readAlreadyButton.style.backgroundColor = "#56E39F";
        readAlreadyButton.style.color = "white";
        readAlreadyButton.style.border = "none";
        readAlreadyButton.style.borderRadius = "5px";
        readAlreadyButton.style.cursor = "pointer";
        readAlreadyButton.style.fontWeight = "bold";
      });
      bookItem.appendChild(readAlreadyButton);
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.style.padding = "8px 16px";
      deleteButton.style.backgroundColor = "#b22222";
      deleteButton.style.color = "white";
      deleteButton.style.border = "none";
      deleteButton.style.borderRadius = "5px";
      deleteButton.style.margin = "3px";
      deleteButton.style.cursor = "pointer";
      deleteButton.style.fontWeight = "bold";
      deleteButton.classList.add("action-button");
      deleteButton.addEventListener("click", () => {
        wishlist.splice(index, 1);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        bookItem.remove();
      });
      bookItem.appendChild(deleteButton);
      wishlistResults.appendChild(bookItem);
    });
  }

  loadWishlist();
});