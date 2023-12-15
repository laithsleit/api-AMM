const userID = 9; // Replace with the actual user ID


fetch(`http://localhost/api-AMM/api/cart/cart-api.php?UserID=${userID}`, {
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
        console.log('Cart data:', data);

        const productsCards = document.getElementById('products-cards');

        data.data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td> 
                    <button class="remove-button" data-product-id="${item.ProductID}">Remove</button>
                </td>
                <td> <img src="${item.Image}" > </td>
                <td> ${item.ProductName} </td>
                <td> ${item.Price} </td>
                
                <td> ${item.Quantity} </td>
            `;
            productsCards.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching cart data:', error.message);
    });



        // // Add event listener for remove buttons
        // const removeButtons = document.querySelectorAll('.remove-button');
        // removeButtons.forEach(button => {
        //     button.addEventListener('click', () => {
        //         const productId = button.dataset.productId;

        //         // Confirm with the user before removing the item
        //         const confirmRemove = confirm('Are you sure you want to remove this item?');

        //         console.log('Product ID to remove:', productId);

        //         if (confirmRemove) {
        //             // Make a DELETE request to remove the item from the database
        //             fetch(`http://localhost/ecommerce/API1/cart/DELETEcart.php?product_id=${productId}`, {
        //                 method: 'DELETE',
        //             })
        //                 .then(response => {
        //                     if (!response.ok) {
        //                         throw new Error('Failed to remove item from the cart');
        //                     }
        //                     return response.json();
        //                 })
        //                 .then(data => {
        //                     // Assuming data contains information about the removal status
        //                     console.log('Removal status:', data);

        //                     // Update the cart display on the client side if needed
        //                     // For example, you might want to remove the corresponding row from the table
        //                     button.closest('tr').remove();
        //                 })
        //                 .catch(error => {
        //                     console.error('Removal error:', error);
        //                     // Handle errors as needed
        //                 });
        //         }
        //     });
        // });
    
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
            const userID = 9;
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
        updateCartDetails();
        


    /// login buuton --- log out
document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = sessionStorage.getItem("isLoggedin") === "true";
    const loginButton = document.getElementById('Login');
  
    if (isLoggedIn) {
        // If the user is logged in, change button text to "Logout" and set the click event
        loginButton.textContent = 'Logout';
        loginButton.href = '#';  
  
        loginButton.addEventListener('click', function () {
            
            sessionStorage.removeItem("isLoggedin");
            
            window.location.href = 'signup.html';
        });
    } else {
        loginButton.textContent = 'Login';
        loginButton.href = 'signup.html';  
    }
  });
  