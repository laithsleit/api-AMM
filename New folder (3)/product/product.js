document.addEventListener("DOMContentLoaded", function() {
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
    const productId = searchParams.get('id');
    const apiUrl = `http://localhost/api-AMM/api/prodect/select.php`;

    const requestData = {
        ProductID: productId
    };

    // Fetch product details and render them
    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
        .then(response => response.json())
        .then(data => {
            // Assuming 'data' is the product object with properties like Name, Price, Description, Image, etc.
            const product = data; // Adjust this if your data structure is different
            
            const productsCards = document.getElementById('products-cards');

            // Clear existing content
            productsCards.innerHTML = '';

            // Create and append the new product details
            const productDiv = document.createElement('div');
            productDiv.className = 'grid product';
            productDiv.innerHTML = `
                <div class="column-xs-12 column-md-7">
                  <div class="product-gallery">
                    <div class="product-image">
                      <img class="active" src="${product.Image}" />
                    </div>
                  </div>
                </div>
                <div class="column-xs-12 column-md-5">
                  <h1>${product.Name}</h1>
                  <h2>$${product.Price}</h2>
                  <div class="description">
                    <p>${product.Description}</p>
                    <div class="page-wrapper">
                      <button id="addtocart" class="add-to-cart-btn" data-product-id="${product.ProductID}">
                        Add to Cart
                        <span class="cart-item"></span>
                      </button>
                    </div>
                    <div class="page-wrapper" style="margin-top: 20px">
                      <a href="../checkout/checkout.html">
                        <button id="checkout" style="background: rgb(56, 186, 56); color: white">
                          Check Out
                        </button>
                      </a>
                    </div>
                  </div>
                </div>`;
            
            productsCards.appendChild(productDiv);

            // Add event listener for the Add to Cart button
            const addToCartBtn = document.getElementById('addtocart');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', function() {
                    const productId = this.getAttribute('data-product-id');
                    const quantity = 1; // Update this as needed, maybe from a quantity input
                    addToCart(productId, quantity);
                });
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });

    // Function to handle adding items to cart
    // Function to handle adding items to cart
function addToCart(productId, quantity) {
    const userId = sessionStorage.getItem('UserID'); // Ensure you have the UserID stored in the session
    if (!userId) {
        console.error('UserID not found in session storage.');
        alert('Please log in to add items to your cart.');
        return;
    }

    console.log(`Attempting to add product to cart with UserID: ${userId} and ProductID: ${productId}`);

    const cartApiUrl = `http://localhost/api-AMM/api/cart/cart-api.php?UserID=${userId}`; // Corrected for template literal

    fetch(cartApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            UserID: userId,
            ProductID: productId,
            Quantity: quantity,
            action: 'add'
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Add to cart response:', data);
        if (data.success) {
            alert(data.message); 
            updateCartCount();
            populateCartItems();
            updateTotalPrice();
        } else {
            console.error('Server responded with error:', data.message);
            alert(data.message); 
        }
    })
    .catch(error => {
        console.error('Add to cart error:', error);
        alert('There was an error adding the item to the cart.');
    });


    }
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to display random products in the DOM
    function displayRandomProducts(products) {
        const relatedProductsDiv = document.querySelector('.related-products');

        // Check if the element exists
        if (relatedProductsDiv) {
            // Remove existing content
            relatedProductsDiv.innerHTML = '';

            // Shuffle the array randomly
            const shuffledProducts = shuffleArray(products);

            // Add header
            const headerDiv = document.createElement('div');
            headerDiv.className = 'column-xs-12';
            headerDiv.innerHTML = '<h3>You may also like</h3>';
            relatedProductsDiv.appendChild(headerDiv);

            // Add random products
            shuffledProducts.slice(0, 3).forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'column-xs-12 column-md-4 d-flex';

                // Assuming the image URL is available in the 'Image' property
                const imageUrl = product.Image;

                productDiv.innerHTML = `
                <a href="product.html?id=${product.ProductID}">
                <img src="${imageUrl}" style="height: 250px; width: 100%" />
                <h4><a href="product.html?id=${product.ProductID}">${product.Name}</a></h4>
                <p class="price">$${product.Price}</p>
                </a>
            `;

                relatedProductsDiv.appendChild(productDiv);
            });
        } else {
            console.error('.related-products not found in the DOM');
        }
    }

    // Fetch data from the API using the GET method to get all products
    fetch('http://localhost/api-AMM/api/prodect/select.php')
        .then(response => response.json())
        .then(data => {
            // Check if data is an array and not empty
            if (Array.isArray(data) && data.length > 0) {
                // Call the function to display random products
                displayRandomProducts(data);
            } else {
                console.error('No data available for random products');
            }
        })
        .catch(error => {
            console.error('Error fetching random products:', error);
        });
});


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







// ////////////////
document.addEventListener("DOMContentLoaded", function() {
    // Fetch reviews when the page loads
    fetchReviews();

    // Add event listener to submit button
    document.getElementById('submit-review').addEventListener('click', submitReview);
});

function fetchReviews() {
    fetch('http://localhost/api-AMM/api/Review/ReviewSelect.php') // Replace with your GET reviews API URL
        .then(response => response.json())
        .then(data => {
            if (data.success && data.reviews) {
                displayReviews(data.reviews);
            } else {
                console.error(data.message || 'Error fetching reviews');
            }
        })
        .catch(error => console.error('Error:', error));
}

function displayReviews(reviews) {
    const reviewsContainer = document.getElementById('reviews-container');
    reviewsContainer.innerHTML = ''; // Clear existing content

    reviews.forEach(review => {
        console.log(reviews)
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'd-flex flex-start';
        reviewDiv.innerHTML = `
        <div>
        <div id="div_date_style">
        <h6 class="fw-bold mb-1">${review.Username}</h6>
        <p class="mb-0">${review.date}</p>
        </div>
        <div class="d-flex align-items-center mb-3">
            <p class="mb-0">Rate: ${generateStars(review.Rating)}</p>
        </div>
        <p class="mb-0">${review.ReviewText}</p>
   
    </div>
    <hr/>
        `;
        reviewsContainer.appendChild(reviewDiv);
        function generateStars(rating) {
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                stars += i <= rating ? '<span  class="fa fa-star checked"></span>' : '<span  class="fa fa-star"></span>';
            }
            return stars;}
    });
}

function submitReview() {
    const queryString = window.location.search;

    const searchParams = new URLSearchParams(queryString);
    let productId = searchParams.get('id');

   let userid= sessionStorage.getItem("UserID");

    const rating = document.querySelector('input[name="rating"]:checked').value;
    const commentText = document.getElementById('comment-text').value;

    const reviewData = {
        productID: productId, // Replace with actual product ID
        userID: userid, // Replace with actual user ID
        reviewText: commentText,
        rating: rating
    };

    fetch('http://localhost/api-AMM/api/Review/ReviewInser.php', { // Replace with your POST review API URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Review submitted successfully');
            fetchReviews(); // Refresh the reviews list
        } else {
            alert(data.message || 'Error submitting review');
        }
    })
    .catch(error => console.error('Error:', error));
}
