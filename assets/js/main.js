let products = [];

fetch('https://dummyjson.com/products/?limit=100')
    .then((response) => {
        // Check if the response status is OK
        if (!response.ok) {
            throw new Error(`Network response was not ok (Status: ${response.status})`);
        }
        return response.json();
    })
    .then((completedata) => {
        console.log('Response Data:', completedata); // Log the response data to the console
        // Check if "products" key exists in the response
        if (completedata.products) {
            products = completedata.products;
            // Processing the data
            const cardListBlock = document.querySelector(".cards");
            cardListBlock.innerHTML = "";
            products.forEach((product) => {
                const cardBlock = document.createElement("div");
                cardBlock.innerHTML =`<div class="card">
                    <img src=${product.thumbnail} alt="img" class="images">

                    <div class="brand-info">
                        <h1 class="brand-label">Brand:</h1>
                        <h1 class="brand-name">${product.brand}</h1>
                    </div>

                    <div class="brand-info">
                        <h1 class="title-label">Title:</h1>
                        <h1 class="title-name">${product.title}</h1>
                    </div>

                    <h4 class="description">${product.description}<h4>

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
                        <h1 class="discount-name">${product.discountPercentage}</h1>
                    </div>
                </div>`;

                cardBlock.addEventListener("click", () => {
                    const url = `detail.html?id=${product.id}`;
                    window.open(url, "_blank");
                });

                cardListBlock.appendChild(cardBlock);
            });
        }

        else {
            console.log('Invalid response format: "products" key not found.');
        }

    })
    .catch(error => {
        console.log('An error occured during fetch operation:', error);
    });