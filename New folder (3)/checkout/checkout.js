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
                    // Add a data attribute or unique class to the row
                    row.setAttribute('data-product-id', item.ProductID);
                    row.innerHTML = `
                    <td style="width:10vw;"> <img src="${item.Image}" alt="Product Image"></td>
                    <td> ${item.ProductName} </td>
                    <td> $${item.Price} </td>
                    <td>
                        <button class="qty-btn" onclick="updateCartItemQuantity(${item.ProductID}, -1)" aria-label="Decrease quantity">
                            <i class="fas fa-minus"></i> <!-- Minus icon -->
                        </button>
                        ${item.Quantity}
                        <button class="qty-btn" onclick="updateCartItemQuantity(${item.ProductID}, 1)" aria-label="Increase quantity">
                            <i class="fas fa-plus"></i> <!-- Plus icon -->
                        </button>
                    </td>
                    <td>$${(item.Quantity * item.Price).toFixed(2)}</td>
                    <td>
                        <button class="delete-btn" data-product-id="${item.ProductID}" aria-label="Remove item">
                            <i class="fas fa-trash-alt"></i> <!-- Trash icon -->
                        </button>
                    </td>
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
