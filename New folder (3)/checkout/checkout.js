// Function to fetch and display cart items
function fetchCartItemsAndDisplay(userID) {
    fetch(`http://localhost/api-AMM/api/cart/cart-api.php?UserID=${userID}`)
        .then(response => response.json())
        .then(data => {
            const productsCards = document.getElementById('products-cards');
            productsCards.innerHTML = ''; // Clear existing items

            if (data && Array.isArray(data.data)) {
                data.data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>
                            <button class="delete-btn" data-product-id="${item.ProductID}">
                                <i class="fas fa-trash-alt"></i> <!-- Trash icon -->
                            </button>
                        </td>
                        <td> <img src="${item.Image}" alt="Product Image"> </td>
                        <td> ${item.ProductName} </td>
                        <td> $${item.Price} </td>
                        <td> ${item.Quantity} </td>
                    `;
                    productsCards.appendChild(row);
                });

                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const productId = this.getAttribute('data-product-id');
                        deleteCartItem(productId, userID);
                    });
                });
            }
        })
        .catch(error => {
            console.error('Error fetching cart data:', error);
        });
}

// Function to delete a cart item and update the display
function deleteCartItem(productId, userID) {
    fetch(`http://localhost/api-AMM/api/cart/cart-api.php?UserID=${userID}`, {
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
            // After deleting the cart item, update the product and price tables
            updateProductTable(productId);
            updatePriceTable(userID);

            fetchCartItemsAndDisplay(userID);
            updateCartDetails(userID);
        } else {
            throw new Error(data.message);
        }
    })
    .catch(error => {
        console.error('Error deleting cart item:', error);
    });
}

function updateProductTable(productId) {
    // API call to update the product table
    // Placeholder for actual implementation
    console.log(`Updating product table for ProductID: ${productId}`);
    // Implement the API call here
}

function updatePriceTable(userID) {
    // API call to update the price table
    // Placeholder for actual implementation
    console.log(`Updating price table for UserID: ${userID}`);
    // Implement the API call here
}

// Function to update the HTML with the cart details
function updateCartDetails(userID) {
    fetch(`http://localhost/api-AMM/api/cart/totalcart.php?UserID=${userID}`)
        .then(response => response.json())
        .then(data => {
            const cartDetailsDiv = document.getElementById('subtotal');
            if (data.success && data.data) {
                cartDetailsDiv.innerHTML = `
                    <table>
                        <tr>
                            <td>Cart Subtotal</td>
                            <td>$${data.data} JD</td>
                        </tr>
                        <tr>
                            <td>Shipping</td>
                            <td>Free</td>
                        </tr>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td><strong>$${data.data} JD</strong></td>
                        </tr>
                    </table>
                    <a href="../dist-payment/payment.html"><button id="check">Proceed to checkout</button></a>
                `;
            } else {
                cartDetailsDiv.innerHTML = `<p>Your cart is empty</p>`;
            }
        })
        .catch(error => {
            console.error('Error updating cart details:', error.message);
        });
}

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    const userID = sessionStorage.getItem('UserID');
    if (userID) {
        fetchCartItemsAndDisplay(userID);
        updateCartDetails(userID);
    }

    // Login button event listener
    const loginButton = document.getElementById('Login');
    if (sessionStorage.getItem("isLoggedin") === "true") {
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

    // Checkout button event listener
    document.querySelector('.checkout-btn').addEventListener('click', function() {
        if (sessionStorage.getItem('isLoggedin') === 'true') {
            window.location.href = '../checkout/checkout.html';
        } else {
            window.location.href = '../login/signup.html';
        }
    });
});
