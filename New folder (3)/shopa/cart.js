// cart 



document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('.shopping-cart');
    const cartSidebar = document.getElementById('cartSidebar');

    if (!cartIcon || !cartSidebar) {
        console.error('Cart icon or sidebar not found');
        return;
    }

    // Remove any existing event listeners
    cartIcon.removeEventListener('click', toggleCartSidebar);

    // Attach the event listener
    cartIcon.addEventListener('click', toggleCartSidebar);
    populateCartItems(); // Populates the cart items
});



function toggleCartSidebar(event) {
    event.preventDefault();
    // console.log('Cart icon clicked');
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
    // console.log('Sidebar class toggled');
}




function fetchCartItems(userId) {
    return fetch(`http://localhost/api-AMM/api/cart/cart-api.php?UserID=${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                return data; // Assuming your API returns the cart items in this format
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching cart items:', error);
        });
}


function populateCartItems() {            
    
    updateCartCount();
    updateTotalPrice();
    

    const userId = sessionStorage.getItem('UserID');
    if (!userId) {
        console.error('User ID not found in session storage');
        return;
    }
    fetchCartItems(userId)
    .then(cartData => {
        const cartItemsDiv = document.querySelector('.cart-sidebar .cart-items');
        cartItemsDiv.innerHTML = ''; // Clear current items

        if (cartData && Array.isArray(cartData.data)) {

            if (cartData.data.length === 0) {
                // Handle the case when there are no products in the cart
                const emptyCartMessage = document.createElement('p');
                emptyCartMessage.className = 'empty-cart';
                emptyCartMessage.textContent = 'Your cart is empty.';
                cartItemsDiv.appendChild(emptyCartMessage);
            } else {
                cartData.data.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'cart-item';
                    itemDiv.innerHTML = `
                        <img src="${item.Image}" alt="${item.ProductName}" class="cart-item-img">
                        <div class="cart-item-info">
                            <h4>${item.ProductName}</h4>
                            <p>Price: $${item.Price}</p>
                            <p>Quantity: 
                            <button class="qty-btn" onclick="updateCartItemQuantity(${item.ProductID}, -1)">
                                <i class="fas fa-minus"></i> <!-- Minus icon -->
                            </button>
                            <span style="color:black" id="qty-${item.ProductID}">${item.Quantity}</span>
                            <button class="qty-btn" onclick="updateCartItemQuantity(${item.ProductID}, 1)">
                                <i class="fas fa-plus"></i> <!-- Plus icon -->
                            </button>
                            
                            <button class="delete-btn" onclick="deleteCartItem(${item.ProductID})">
                                <i class="fas fa-trash-alt"></i> <!-- Trash icon -->
                            </button>
                        </div>
                    `;
                    cartItemsDiv.appendChild(itemDiv);
                    
                });
            }
        } else {
            console.error('Cart items are not in the expected format or not found');
        }
    })
    .catch(error => {
        console.error('Error fetching cart items:', error);
    });

}

function updateCartItemQuantity(productId, change) {
    const userId = sessionStorage.getItem('UserID');
    const Quantity = change === 1 ? 1 : -1;
    const subOrSum = change === 1 ? 1 : 0; // 1 for add, 0 for subtract

    fetch('http://localhost/api-AMM/api/cart/cart-api.php?UserID=' + userId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ProductID: productId,
                Quantity: Quantity,
                SubOrSum: subOrSum
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update quantity display
                const qtyElement = document.getElementById('qty-' + productId);
                qtyElement.textContent = parseInt(qtyElement.textContent) + change;
                updateUI();
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => {
            console.error('Error updating cart item:', error);
        });
}

function deleteCartItem(productId) {
    const userId = sessionStorage.getItem('UserID');

    fetch('http://localhost/api-AMM/api/cart/cart-api.php?UserID=' + userId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ProductID: productId,
                action: 'delete'
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Item deleted successfully');
                updateUI();
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => {
            console.error('Error deleting cart item:', error);
        });
}

/// login buuton --- log out
document.addEventListener("DOMContentLoaded", function() {
    const isLoggedIn = sessionStorage.getItem("isLoggedin") === "true";
    const loginButton = document.getElementById('Login');

    if (isLoggedIn) {
        // If the user is logged in, change button text to "Logout" and set the click event
        loginButton.textContent = 'Logout';
        loginButton.href = '#';

        loginButton.addEventListener('click', function() {

            sessionStorage.removeItem("isLoggedin");

            window.location.href = 'signup.html';
        });
    } else {
        loginButton.textContent = 'Login';
        loginButton.href = 'signup.html';
    }
});

document.querySelector('.checkout-btn').addEventListener('click', function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedin') === 'true';
    if (isLoggedIn) {
        window.location.href = '../checkout/checkout.html'; // Redirect to checkout page
    } else {
        window.location.href = '../login/signup.html'; // Redirect to login/signup page
    }
});






////////////////////////////////////////////

function updateCartCount() {
    const userId = sessionStorage.getItem('UserID');
    if (!userId) {
        console.error('User ID not found in session storage');
        return;
    }

    fetch(`http://localhost/api-AMM/api/cart/totalProduct.php?UserID=${userId}&action=totalProductCount`)
        .then(response => response.json())
        .then(data => {
            if (data.success && data.data) {
                document.getElementById('cart-count').textContent = data.data;

            } else {
                document.getElementById('cart-count').textContent = '0';
            }
        })
        .catch(error => {
            console.error('Error fetching cart count:', error);
        });
}

function updateTotalPrice() {
    const userId = sessionStorage.getItem('UserID');
    fetch(`http://localhost/api-AMM/api/cart/totalcart.php?UserID=${userId}&action=totalPrice`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // console.log(data);
                const totalPriceDiv = document.getElementById('total-price');
                if (totalPriceDiv) {
                    // Check if data.data is null. If it is, print 0; otherwise, print the actual data.
                    const priceText = data.data === null ? '0' : data.data;
                    totalPriceDiv.textContent = `Total Price: $${priceText}`;
                }
            } else {
                console.error('Failed to fetch total price:', data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching total price:', error);
        });
}


// update UI

function updateUI() {
    const userId = sessionStorage.getItem('UserID');
    if (!userId) {
        console.error('User ID not found in session storage');
        return;
    }

    // Update the cart items
    populateCartItems();

    // Update the cart count
    updateCartCount();

    // Update the total price
    updateTotalPrice();

    // Conditionally call additional functions if they exist
    if (typeof fetchCartItemsAndDisplay === 'function') {
        fetchCartItemsAndDisplay(userId); // Call the function only if it exists
    }
    if (typeof updateCartDetails === 'function') {
        updateCartDetails(userId); // Call the function only if it exists
    }
}


