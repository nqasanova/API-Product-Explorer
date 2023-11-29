fetch('https://dummyjson.com/products')
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
            // Your existing code for processing the data
            let data1 = "";
            completedata.products.map((products) => {
                data1 += ` <div class="card">
                    <img src=${products.thumbnail} alt="img" class="images">

                    <div class="brand-info">
                        <h1 class="brand-label">Brand:</h1>
                        <h1 class="brand-name">${products.brand}</h1>
                    </div>

                    <div class="brand-info">
                        <h1 class="title-label">Title:</h1>
                        <h1 class="title-name">${products.title}</h1>
                    </div>

                    <h4 class="description">${products.description}<h4>

                    <div class="brand-info">
                        <h1 class="category-label">Category:</h1>
                        <h1 class="category-name">${products.category}</h1>
                    </div>

                    <div class="brand-info">
                        <h1 class="stock-label">Stock:</h1>
                        <h1 class="stock-name">${products.stock}</h1>
                     </div>

                     <div class="brand-info">
                        <h1 class="price-label">Price:</h1>
                        <h1 class="price-name">${products.price}</h1>
                    </div>

                    <div class="brand-info">
                        <h1 class="rating-label">Rating:</h1>
                        <h1 class="rating-name">${products.rating}</h1>
                    </div>

                    <div class="brand-info">
                        <h1 class="discount-label">Discount:</h1>
                        <h1 class="discount-name">${products.discountPercentage}</h1>
                    </div>

                </div>`;
            });
            document.getElementById("cards").innerHTML = data1;
        }
    })
    .catch(error => {
        console.log('An error occured during fetch operation:', error);
    });
