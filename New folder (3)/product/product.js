const activeImage = document.querySelector(".product-image .active");
const productImages = document.querySelectorAll(".image-list img");
const navItem = document.querySelector('a.toggle-nav');

function changeImage(e) {
    activeImage.src = e.target.src;
}

function toggleNavigation() {
    this.nextElementSibling.classList.toggle('active');
}

productImages.forEach(image => image.addEventListener("click", changeImage));
navItem.addEventListener('click', toggleNavigation);

$(document).ready(function() {
    $("#addtocart").on("click", function() {
        var button = $(this);
        var cart = $("#cart");
        var cartTotal = cart.attr("data-totalitems");
        var newCartTotal = parseInt(cartTotal) + 1;

        button.addClass("sendtocart");
        setTimeout(function() {
            button.removeClass("sendtocart");
            cart.addClass("shake").attr("data-totalitems", newCartTotal);
            setTimeout(function() {
                cart.removeClass("shake");
            }, 500);
        }, 1000);
    });
});

document.addEventListener("DOMContentLoaded", function() {
        const queryString = window.location.search;
        const searchParams = new URLSearchParams(queryString);
        const productId = searchParams.get('id');
        const apiUrl = `http://localhost/api-AMM/api/prodect/select.php`;

        const requestData = {
            ProductID: productId
        };

        fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Cart data:', data);

                const productsCards = document.getElementById('products-cards');
                const div = document.getElementById('product-container');

                div.innerHTML = `
        <div class="grid product">
          <div class="column-xs-12 column-md-7">
            <div class="product-gallery">
              <div class="product-image">
                <img class="active" src="${data.Image}" />
              </div>
            </div>
          </div>
          <div class="column-xs-12 column-md-5">
            <h1>${data.Name}</h1>
            <h2>$${data.Price}</h2>
            <div class="description">
              <p>${data.Description}</p>
              <div id="cart" class="cart" data-totalitems="0">
                <i class="fas fa-shopping-cart"></i>
              </div>
              <div class="page-wrapper">
                <i class="fa-solid fa-minus"></i>
                <button id="addtocart">
                  Add to Cart
                  <span class="cart-item"></span>
                </button>
                <i class="fa-solid fa-plus"></i>
              </div>
              <div class="page-wrapper" style="margin-top: 20px">
                <a href="../pay/pay.html">
                  <button
                    id="addtocart"
                    style="background: rgb(56, 186, 56); color: white"
                  >
                    Check Out
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>`;

                productsCards.appendChild(row);

                // Rest of your code...
            })


        const removeButtons = document.querySelectorAll('.remove-button');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.dataset.productId;
                const confirmRemove = confirm('Are you sure you want to remove this item?');

                console.log('Product ID to remove:', productId);

                if (confirmRemove) {
                    fetch(`http://localhost/ecommerce/API1/cart/DELETEcart.php?product_id=${productId}`, {
                            method: 'DELETE',
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to remove item from the cart');
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('Removal status:', data);
                            button.closest('tr').remove();
                        })
                        .catch(error => {
                            console.error('Removal error:', error);
                        });
                }
            });
        });

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
                    <img src="${imageUrl}" style="height: 250px; width: 100%" />
                    <h4><a href="product.html?id=${product.ProductID}">${product.Name}</a></h4>
                    <p class="price">$${product.Price}</p>
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
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });

document.addEventListener("DOMContentLoaded", function() {
    const isLoggedIn = sessionStorage.getItem("isLoggedin") === "true";
    const loginButton = document.getElementById('Login');

    if (isLoggedIn) {
        // If the user is logged in, change button text to "Logout" and set the click event
        loginButton.textContent = 'Logout';
        loginButton.href = '#';

        loginButton.addEventListener('click', function() {

            sessionStorage.removeItem("isLoggedin");

            window.location.href = '../login/signup.html';
        });
    } else {
        loginButton.textContent = 'Login';
        loginButton.href = '../login/signup.html';
    }
});