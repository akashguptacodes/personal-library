document.addEventListener("DOMContentLoaded", () => {
    const categoryButtons = document.querySelectorAll(".category-button");
    const recommendationsContainer = document.getElementById("recommendations");
    
    

    async function fetchRecommendedBooks(category) {
        let apiUrl;
        switch (category) {
            case "Thriller":
                apiUrl = "https://openlibrary.org/subjects/thrillers.json?limit=10";
                break;
            case "Romance":
                apiUrl = "https://openlibrary.org/subjects/love_stories.json?limit=10";
                break;
            case "Horror":
                apiUrl = "https://openlibrary.org/subjects/horror_tales.json?limit=10";
                break;
            case "Children's Literature":
                apiUrl = "https://openlibrary.org/subjects/children_s_books.json?limit=10";
                break;
            case "Fiction":
                apiUrl = "https://openlibrary.org/subjects/fiction.json?limit=10";
                break;
            default:
                apiUrl = `https://openlibrary.org/subjects/${category}.json?limit=10`;
        }

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Failed to fetch data from the API");
            }
            const data = await response.json();

            displayRecommendedBooks(data.works);
        } catch (error) {
            console.error("Error fetching data:", error);
            recommendationsContainer.innerHTML = "<p>Failed to fetch data. Please try again later.</p>";
        }
    }

    function displayRecommendedBooks(books) {
        recommendationsContainer.innerHTML = "";
        books.forEach((book) => {
            const bookItem = document.createElement("div");
            bookItem.classList.add("book-item");

            const bookImage = document.createElement("img");
            bookImage.classList.add("book-image");
            bookImage.src = book.cover_id
                ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                : "https://via.placeholder.com/150";
            bookItem.appendChild(bookImage);

            const bookTitle = document.createElement("h3");
            bookTitle.textContent = book.title;
            bookItem.appendChild(bookTitle);

            recommendationsContainer.appendChild(bookItem);
        });
    }

    // Fetch Fiction books data when the page loads
    fetchRecommendedBooks("Fiction");

    categoryButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");
            if (category) {
                fetchRecommendedBooks(category);
            }
        });
    });
});