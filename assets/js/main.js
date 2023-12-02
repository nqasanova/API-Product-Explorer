// Initialize an empty array to store product data
let products = [];
let currentPage = 1;
const itemsPerPage = 10;

// Function to dynamically populate the category select options
function populateCategorySelect(categories) {
    const categorySelect = document.getElementById('categorySelect');

    // Add a default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'All Categories';
    categorySelect.appendChild(defaultOption);

    // Add options for each category
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Function to search and filter products based on user input
function searchProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categorySelect = document.getElementById('categorySelect');
    const selectedCategory = categorySelect.value.toLowerCase();

    const filteredProducts = products.filter(product => {
        return (
            (product.title.toLowerCase().includes(searchInput) ||
                product.category.toLowerCase().includes(searchInput) ||
                product.description.toLowerCase().includes(searchInput)) &&
            (selectedCategory === '' || product.category.toLowerCase() === selectedCategory)
        );
    });

    currentPage = 1; // Reset current page to 1 when performing a new search
    displayProducts(filteredProducts, currentPage, itemsPerPage);
}

// Function to display products on the webpage with pagination
function displayProducts(productsToDisplay, page, itemsPerPage) {
    const cardListBlock = document.querySelector(".cards");
    cardListBlock.innerHTML = "";

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsSlice = productsToDisplay.slice(startIndex, endIndex);

    productsSlice.forEach((product) => {
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

    cardBlock.addEventListener("click", () => {
        const url = `detail.html?id=${product.id}`;
        window.open(url, "_blank");
    });

    cardListBlock.appendChild(cardBlock);
});

updatePaginationButtons();
}

// Function to update pagination buttons
function updatePaginationButtons() {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const pageButtonsContainer = document.getElementById("pageButtons");
    pageButtonsContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.onclick = () => goToPage(i);
        pageButtonsContainer.appendChild(button);
    }
}

// Function to navigate to the previous page
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayProducts(products, currentPage, itemsPerPage);
    }
}

// Function to navigate to the next page
function nextPage() {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayProducts(products, currentPage, itemsPerPage);
    }
}

// Function to navigate to a specific page
function goToPage(page) {
    currentPage = page;
    displayProducts(products, currentPage, itemsPerPage);
}

// Fetch products from the API and populate category select options
fetch('https://dummyjson.com/products/?limit=100')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Network response was not ok (Status: ${response.status})`);
        }
        return response.json();
    })
    .then((completedata) => {
        if (completedata.products) {
            const uniqueCategories = [...new Set(completedata.products.map(product => product.category))];
            populateCategorySelect(uniqueCategories);

            products = completedata.products;
            displayProducts(products, currentPage, itemsPerPage);
        } else {
            console.log('Invalid response format: "products" key not found.');
        }
    })
    .catch(error => {
        console.log('An error occurred during the fetch operation:', error);
    });
