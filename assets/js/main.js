fetch('https://dummyjson.com/products')
    .then(response => {
        // Check if the response status is OK (200)
        if (!response.ok) {
            throw new Error(`Network response was not ok (Status: ${response.status})`);
        }
        
        // Parse the JSON data from the response
        return response.json();
    })
    .then(data => {
        // Handle the retrieved data (e.g., display it on the console)
        console.log('Products data:', data);
    })
    .catch(error => {
        // Handle errors during the fetch operation
        console.error('Error during fetch operation:', error.message);
    });