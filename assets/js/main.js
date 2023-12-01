// Initialize an empty array to store product data
let products = [];

// Function to search and filter products based on user input
function searchProducts() {
    // Retrieve the search input value and convert to lowercase for case-insensitive comparison
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categorySelect = document.getElementById('categorySelect');
    const selectedCategory = categorySelect.value.toLowerCase();

    // Filter products based on title, category, and search input
    const filteredProducts = products.filter(product => {
        return (
            (product.title.toLowerCase().includes(searchInput) ||
            product.category.toLowerCase().includes(searchInput) ||
            product.description.toLowerCase().includes(searchInput)) &&
            (selectedCategory === '' || product.category.toLowerCase() === selectedCategory)
        );
    });

    displayProducts(filteredProducts);
}

// Function to display products on the webpage
function displayProducts(productsToDisplay) {
    const cardListBlock = document.querySelector(".cards");
    cardListBlock.innerHTML = "";
    productsToDisplay.forEach((product) => {
        const cardBlock = document.createElement("div");
        cardBlock.innerHTML = `<div class="card">
            <img src=${product.thumbnail} alt="img" class="images">

            <div class="brand-info">
                <h1 class="title-label">Title:</h1>
                <h1 class="title-name">${product.title}</h1>
            </div>

            <div class="brand-info">
                <h1 class="category-label">Category:</h1>
                <h1 class="category-name">${product.category}</h1>
            </div>

            <div class="brand-info">
                <h1 class="stock-label">Stock:</h1>
                <h1 class="stock-name">${product.stock}</h1>
            </div>

            <div class="brand-info">
                <h1 class="price-label">Price:</h1>
                <h1 class="price-name">${product.price}</h1>
            </div>

            <div class="brand-info">
                <h1 class="discount-label">Discount:</h1>
                <h1 class="discount-name">${product.discountPercentage} %</h1>
            </div>
        </div>`;

        // Add a click event listener to open a new window with detailed product information
        cardBlock.addEventListener("click", () => {
            const url = `detail.html?id=${product.id}`;
            window.open(url, "_blank");
        });

        // Append the card to the container
        cardListBlock.appendChild(cardBlock);
    });
}

// Fetch products from the API
fetch('https://dummyjson.com/products/?limit=100')
    .then((response) => {
        // Check if the response status is OK
        if (!response.ok) {
            throw new Error(`Network response was not ok (Status: ${response.status})`);
        }
        return response.json();
    })
    .then((completedata) => {
        console.log('Response Data:', completedata);
        // Check if "products" key exists in the response
        if (completedata.products) {
            products = completedata.products;
            // Display all products initially
            displayProducts(products);
        } else {
            console.log('Invalid response format: "products" key not found.');
        }
    })
    // Display error if any happens during fetch operation
    .catch(error => {
        console.log('An error occurred during the fetch operation:', error);
    });
