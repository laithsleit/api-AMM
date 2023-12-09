document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById('shopItem');
    let originalData = [];  // Assuming you have the original data somewhere

    // Function to create the HTML structure for a shop item
    function createShopItem(product) {
        const shopItem = document.createElement('div');
        shopItem.className = "shop-item";
        shopItem.innerHTML = `
            <a href="producte.html?id=${product.ProductID}" class="shop-item--container" style="background: #f1f1f1;">
                <div class="meta">
                    <span class="discount"> <del>$${product.Price}</del></span>
                </div>
                <img src="${product.Image}" width="160" height="160" />
            </a>
            <div class="title">
                <h3><a href="#" style="border-bottom: 2px solid black;">${product.Name}</a></h3>
            </div>
            <div class="price">
                <span>Price after DISCOUNT <a>$${product.Price}</a></span>
            </div>
            <div id="button">
            <a style="" href="../dist/product.html?id=${product.ProductID}">Add to Cart</a>
            </div>  
        `;
        return shopItem;
    }

    // Function to update the shop items based on filters
    function updateShopItems(products) {
        gallery.innerHTML = '';
        products.forEach(product => {
            const shopItem = createShopItem(product);
            gallery.appendChild(shopItem);
        });
    }

    // Function to fetch data from the API using the POST method
    function fetchDataUsingPost(searchData) {
        fetch('http://localhost/api-AMM/api/searchPruduct/ProductSearch.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ searchProducts: searchData }),
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            if (data && data.success && Array.isArray(data.products)) {
                originalData = data.products;
                console.log(originalData);
                updateShopItems(originalData);
               
            } else {
                console.error('API response is not in the expected format:', data);
                // Handle errors as needed
            }

        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Handle errors as needed
        });
        
    }
    
    
    // Fetch data from the API and initialize originalData using GET method
    fetch('http://localhost/api-AMM/api/prodect/select.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            originalData = [...data];
            console.log(originalData);
            updateShopItems(originalData);
           
        });

    // Add event listeners to trigger filtering when the user changes the filters
    document.getElementById('priceFilter').addEventListener('change', filterProducts);
    document.getElementById('categoryFilter').addEventListener('change', filterProducts);

    // Event listener for keyup on the search input
    document.getElementById('Search').addEventListener('keyup', function (event) {
        const searchValue = event.target.value.trim();
         // Adjust the property name based on your API

            fetchDataUsingPost(searchValue);
           
            document.getElementById('categoryFilter').addEventListener('change', filterProducts);
    });

    // Function to filter products based on price and category
    function filterProducts() {
        
        const priceFilter = document.getElementById('priceFilter').value;
        const categoryFilter = document.getElementById('categoryFilter').value;

        const filteredProducts = originalData.filter(product => {
            const priceInRange = priceFilter === 'all' || (
                parseFloat(product.price_after_discount) >= parseFloat(priceFilter.split('-')[0]) &&
                parseFloat(product.price_after_discount) <= parseFloat(priceFilter.split('-')[1])
            );
                
            const categoryMatches = categoryFilter === 'all' || 
           (product.CategoryID == categoryFilter || product.Category == categoryFilter);
            

            return priceInRange && categoryMatches;
        });

        updateShopItems(filteredProducts);
    }

    // function filterProducts() {
    //     const priceFilter = document.getElementById('priceFilter').value;
    //     const categoryFilter = document.getElementById('categoryFilter').value;
    
    //     const filteredProducts = originalData.filter(product => {
    //         const priceInRange = priceFilter === 'all' || (
    //             parseFloat(product.Price) >= parseFloat(priceFilter.split('-')[0]) &&
    //             parseFloat(product.Price) <= parseFloat(priceFilter.split('-')[1])
    //         );
                
    //         // Use the correct property name for category comparison
    //         const categoryMatches = categoryFilter === 'all' || product.CategoryID === categoryFilter;
    
    //         return priceInRange && categoryMatches;
    //     });
    
    //     updateShopItems(filteredProducts);
    // }
    
});

fetch('http://localhost/api-AMM/api/Category/select.php')
.then(response => response.json())
.then(categories => {
    console.log(categories);
    populateCategoryDropdown(categories);
})
.catch(error => {
    console.error('Error fetching categories:', error);
    // Handle errors as needed
});

// Function to populate the category dropdown list
function populateCategoryDropdown(categories) {
    const categoryDropdown = document.getElementById('categoryFilter');

    // Clear existing options
    categoryDropdown.innerHTML = '';

    // Add default "All" option
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All';
    categoryDropdown.appendChild(allOption);

    // Add categories to the dropdown
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.CategoryID; // Assuming CategoryName is the property in your API response
        option.textContent = category.CategoryName;
        categoryDropdown.appendChild(option);
    });
}

// document.getElementById("priceFilter").addEventListener("input", displayProduct);



