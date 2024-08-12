  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const searchResults = document.getElementById("search-results");
  
    async function performSearch(query) {
      const apiUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(
        query
      )}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch data from the API");
        const data = await response.json();
        displayResults(data.docs);
      } catch (error) {
        console.error("Error fetching data:", error);
        searchResults.innerHTML =
          "<p>Failed to fetch data. Please try again later.</p>";
      }
    }
    function displayResults(books) {
      searchResults.innerHTML = "";
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      books.forEach((book) => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("book-item");
        const bookImage = document.createElement("img");
        bookImage.classList.add("book-image");
        bookImage.src = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : "https://via.placeholder.com/150";
        bookItem.appendChild(bookImage);
        const bookTitle = document.createElement("h3");
        bookTitle.textContent = book.title;
        bookItem.appendChild(bookTitle);
  
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        overlay.style.display = "none";
  
        const addToWishlistButton = document.createElement("button");
        addToWishlistButton.textContent = wishlist.some(
          (wishlistBook) => wishlistBook.key === book.key
        )
          ? "Added"
          : "Add to Wishlist";
        addToWishlistButton.textContent = "Add To Wishlist";
        addToWishlistButton.style.padding = "8px 16px";
        addToWishlistButton.style.backgroundColor = "#ff9800";
        addToWishlistButton.style.color = "white";
        addToWishlistButton.style.border = "none";
        addToWishlistButton.style.borderRadius = "5px";
        addToWishlistButton.style.cursor = "pointer";
        addToWishlistButton.style.fontWeight = "bold";
        addToWishlistButton.classList.add("wishlist-button");
        addToWishlistButton.disabled = wishlist.some(
          (wishlistBook) => wishlistBook.key === book.key
        );
  
        addToWishlistButton.addEventListener("click", () => {
          if (!wishlist.some((wishlistBook) => wishlistBook.key === book.key)) {
            wishlist.push({
              key: book.key,
              title: book.title,
              cover: bookImage.src,
            });
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            addToWishlistButton.textContent = "Added";
            addToWishlistButton.style.padding = "8px 16px";
            addToWishlistButton.style.backgroundColor = "#ff9800";
            addToWishlistButton.style.color = "white";
            addToWishlistButton.style.border = "none";
            addToWishlistButton.style.borderRadius = "5px";
            addToWishlistButton.style.cursor = "pointer";
            addToWishlistButton.style.fontWeight = "bold";
            addToWishlistButton.disabled = true;
          }
        });
  
        overlay.appendChild(addToWishlistButton);
        bookItem.appendChild(overlay);
  
        bookItem.addEventListener("mouseenter", () => {
          overlay.style.display = "block";
        });
  
        bookItem.addEventListener("mouseleave", () => {
          overlay.style.display = "none";
        });
  
        searchResults.appendChild(bookItem);
      });
    }
  
    searchButton.addEventListener("click", () => {
      const query = searchInput.value.trim();
      if (query) performSearch(query);
    });
  
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) performSearch(query);
      }
    });
  });