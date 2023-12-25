document.addEventListener("DOMContentLoaded", function() {
    updateCartCount();
    const gallery = document.getElementById('shopItem');
    let originalData = []; // Assuming you have the original data somewhere
    let currentPage = 1;
    const itemsPerPage = 12;
    const paginationContainer = document.getElementById('pagination');
    // Function to create the HTML structure for a shop item
    function createShopItem(product) {
        const shopItem = document.createElement('div');
        shopItem.className = "shop-item";
        shopItem.innerHTML = `
            <a href="../product/product.html?id=${product.ProductID}" class="shop-item--container" style="background: #f1f1f1;">
                
                <img src="${product.Image}" width="160" height="160" />
            </a>
            <div class="title">
                <h3><a href="#" style="border-bottom: 2px solid black;">${product.Name}</a></h3>
            </div>
            <div class="price">
                <span><a>$${product.Price}</a></span>
            </div>
            <div class="product-actions">
                <a href="../product/product.html?id=${product.ProductID}" class="details-btn">See Details</a>
                <button onclick="addToCart(${product.ProductID}, 1)" class="add-to-cart-btn">Add to Cart</button>
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

    function paginateProducts() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedItems = originalData.slice(startIndex, endIndex);
        updateShopItems(paginatedItems);
    }
    function createPaginationButtons(totalItems) {
        const numberOfPages = Math.ceil(totalItems / itemsPerPage);
        paginationContainer.innerHTML = '';
        for (let i = 1; i <= numberOfPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.innerText = i;
            pageButton.className = 'pagination-button';
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.addEventListener('click', function() {
                currentPage = i;
                paginateProducts();
                createPaginationButtons(totalItems); // Keep the total items consistent
            });
            paginationContainer.appendChild(pageButton);
        }
    }
    
    // Function to fetch data from the API using the POST method
    function fetchDataUsingPost(searchData) {
        fetch('http://localhost/api-AMM/api/searchPruduct/ProductSearch.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    searchProducts: searchData
                }),
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                if (data && data.success && Array.isArray(data.products)) {
                    originalData = data.products;
                    currentPage = 1; // Reset to the first page
                    paginateProducts();
                    createPaginationButtons(originalData.length);

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
            paginateProducts();
            createPaginationButtons(originalData.length);

        });

    // Add event listeners to trigger filtering when the user changes the filters
    document.getElementById('categoryFilter').addEventListener('change', filterProducts);

    // Event listener for keyup on the search input
    document.getElementById('Search').addEventListener('keyup', function(event) {
        const searchValue = event.target.value.trim();
        currentPage = 1; // Reset to the first page

        fetchDataUsingPost(searchValue);

        document.getElementById('categoryFilter').addEventListener('change', filterProducts);
    });

    // Function to filter products based on price and category
    function filterProducts() {
        const categoryFilter = document.getElementById('categoryFilter').value;
        const filteredProducts = originalData.filter(product => {
            const categoryMatches = categoryFilter === 'all' ||
                (product.CategoryID == categoryFilter || product.Category == categoryFilter);
    
            return categoryMatches;
        });
    
        updateShopItems(filteredProducts.slice(0, itemsPerPage)); // Update with the first page of filtered products
        currentPage = 1; // Reset to the first page
        createPaginationButtons(filteredProducts.length); // Recreate pagination buttons based on filtered data
    }
});

fetch('http://localhost/api-AMM/api/Category/select.php')
    .then(response => response.json())
    .then(categories => {
        // console.log(categories);
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
///////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function() {
    const isLoggedIn = sessionStorage.getItem("isLoggedin") === "true";
    const loginButton = document.getElementById('Login');

    if (isLoggedIn) {
        // If the user is logged in, change button text to "Logout" and set the click event
        loginButton.textContent = 'Logout';
        loginButton.href = '#';

        loginButton.addEventListener('click', function() {

            sessionStorage.clear();
            window.location.href = '../login/signup.html';
        });
    } else {
        loginButton.textContent = 'Login';
        loginButton.href = '../login/signup.html';
    }
});



///////////////////////////////////////////////////
function addToCart(productId, quantity) {
    const userId = sessionStorage.getItem('UserID');
    const isLoggedIn = sessionStorage.getItem('isLoggedin') === 'true';
    if (!isLoggedIn && !userId) {
        alert('Please log in to add items to the cart.');
        window.location.href = '../login/signup.html'; // Redirect to login/signup page
        return;
    }
    if (!userId) {
        alert('You must be logged in to add items to the cart.');
        return;
    }
    

    fetch(`http://localhost/api-AMM/api/cart/cart-api.php?UserID=${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserID: userId,
                ProductID: productId,
                Quantity: quantity,
                SubOrSum: 1 // Assuming 1 means add to cart
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                
                updateCartCount(); // Update cart count display
                populateCartItems();
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => {
            console.error('Error adding product to cart:', error);
        });
}