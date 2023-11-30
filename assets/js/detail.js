document.addEventListener("DOMContentLoaded", function () {
    // Extract the product ID from the URL query parameters
    const URL = new URLSearchParams(window.location.search);
    const productID = URL.get("id");

    // Fetch product details from the API based on the extracted product ID
    fetch(`https://dummyjson.com/products/${productID}`)
        .then((response) => {
            // Check if the network response is successful
            if (!response.ok) {
                throw new Error(`Network response was not ok (Status: ${response.status})`);
            }
            return response.json();
        })
        .then((product) => {
            // Access the container where product details will be displayed
            const cardDetailsContainer = document.getElementById("cardDetails");
            // Populate the HTML structure with product details
            cardDetailsContainer.innerHTML = `<div class="card">
                    <img src=${product.thumbnail} alt="img" class="images">

                    <div class="brand-info">
                        <h1 class="brand-label">Brand:</h1>
                        <h1 class="brand-name">${product.brand}</h1>
                    </div>

                    <div class="brand-info">
                        <h1 class="title-label">Title:</h1>
                        <h1 class="title-name">${product.title}</h1>
                    </div>

                    <h4 class="description">${product.description}</h4>

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
                        <h1 class="rating-label">Rating:</h1>
                        <h1 class="rating-name">${product.rating}</h1>
                    </div>

                    <div class="brand-info">
                        <h1 class="discount-label">Discount:</h1>
                        <h1 class="discount-name">${product.discountPercentage} %</h1>
                    </div>
                    
                    <div id="product-images"></div>
                </div>`;

            // Access the container for displaying product images
            const galleryContainer = cardDetailsContainer.querySelector("#product-images");
            console.log(product.images);

            // Iterate through product images and create HTML elements for each
            product.images.forEach(image => {
                const img = document.createElement("img");
                img.src = image;
                img.alt = product.description;
                galleryContainer.appendChild(img);             
            });
        })
        // Display error if any happens during fetch operation
        .catch(error => {
            console.log('An error occurred during fetch operation:', error);
        });
});