// Function to fetch and display cart items
function fetchCartItemsAndDisplay(userID) {
    fetch(`http://localhost/api-AMM/api/cart/cart-api.php?UserID=${userID}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
        const productsCards = document.getElementById('products-cards');
        productsCards.innerHTML = ''; // Clear existing items
        data.data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <button class="delete-btn" data-product-id="${item.ProductID}">
                        <i class="fas fa-trash-alt"></i> <!-- Trash icon -->
                    </button>
                </td>
                <td> <img src="${item.Image}" > </td>
                <td> ${item.ProductName} </td>
                <td> ${item.Price} </td>
                <td> ${item.Quantity} </td>
            `;
            productsCards.appendChild(row);

            // Add click event listener to delete button
            row.querySelector('.delete-btn').addEventListener('click', () => {
                deleteCartItem(item.ProductID);
            });
        });
    })
    .catch(error => {
        console.error('Error fetching cart data:', error);
    });
}

// Function to delete a cart item
function deleteCartItem(productId) {
    const userId = sessionStorage.getItem('UserID');

    fetch(`http://localhost/api-AMM/api/cart/cart-api.php?UserID=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ProductID: productId,
            action: 'delete'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Item deleted successfully');
            updateCartDisplay();
        } else {
            throw new Error(data.message);
        }
    })
    .catch(error => {
        console.error('Error deleting cart item:', error);
    });
}

// Function to update the cart display
function updateCartDisplay() {
    const userID = sessionStorage.getItem('UserID');
    fetchCartItemsAndDisplay(userID);
    updateCartDetails();
}

// Function to fetch the total cart price
function fetchTotalCartPrice(userID) {
    return fetch(`http://localhost/api-AMM/api/cart/totalcart.php?UserID=${userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Total Cart data:', data);
            return data.data; // Assuming the total price is in the "data" field
        })
        .catch(error => {
            console.error('Error fetching total cart data:', error.message);
            return null;
        });
}

// Function to update the HTML with the cart details
function updateCartDetails() {
    const userID = sessionStorage.getItem('UserID');
    fetchTotalCartPrice(userID)
        .then(totalCartPrice => {
            if (totalCartPrice !== null) {
                const cartDetailsDiv = document.getElementById('subtotal');

                // Update the HTML content with the retrieved data
                cartDetailsDiv.innerHTML = `
                        <table>
                            <tr>
                                <td>Cart Subtotal</td>
                                <td>${totalCartPrice} JD</td>
                            </tr>
                            <tr>
                                <td>Shipping</td>
                                <td>Free</td>
                            </tr>
                            <tr>
                                <td><strong>Total</strong></td>
                                <td><strong>${totalCartPrice} JD</strong></td>
                            </tr>
                        </table>
                        <a href="../dist-payment/index.html"><button id="check">Proceed to checkout </button> </a>
                    `;
            }
        })
        .catch(error => {
            console.error('Error updating cart details:', error.message);
        });
}

// Call the function to update cart details
updateCartDisplay();

// Event listener for DOMContentLoaded
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

