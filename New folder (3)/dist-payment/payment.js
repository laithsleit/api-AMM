function validateCardNumber() {
    var cardNumber = document.getElementById("cardNumber").value;
    var isValidCardNumber = /^\d{16}$/.test(cardNumber);
    displayValidationMessage("Card number must be 16 digits and contain only numbers.", isValidCardNumber);

    // Show how many digits are left
    var digitsLeft = 16 - cardNumber.length;
    var digitsLeftSpan = document.getElementById("digitsLeft");
    digitsLeftSpan.innerText = digitsLeft > 0 ? digitsLeft + " digits left" : "";
}

function validateCardHolder() {
    var cardHolder = document.getElementById("cardHolder").value;
    var isValidCardHolder = /^[a-zA-Z\s]+$/.test(cardHolder);
    displayValidationMessage("Card holder must contain only letters.", isValidCardHolder);
}

function validateDate() {
    var date = document.getElementById("date").value;
    var month = parseInt(date.substring(0, 2));
  var year = parseInt(date.substring(2, 4));

  if (month < 1 || month > 12) {
    displayValidationMessage("Oops! The month should be between 01 and 12. Please try again.", false);
  } else if (year <= 22) {
    displayValidationMessage("Uh oh! Your card expierd", false);
  } else {
    displayValidationMessage("Expiry date is valid!", true);
  }
}

function validateCVC() {
    var cvc = document.getElementById("cvc").value;
    var isValidCVC = /^\d{3}$/.test(cvc);
    displayValidationMessage("CVC must be 3 digits.", isValidCVC);
}

function displayValidationMessage(message, isValid) {
    var validationDiv = document.getElementById("validation");
    validationDiv.innerText = isValid ? "" : message;
}

function validateAndConfirmCheckout() {
    var cardNumber = document.getElementById("cardNumber").value;
    var cardHolder = document.getElementById("cardHolder").value;
    var date = document.getElementById("date").value;
    var cvc = document.getElementById("cvc").value;

    if (!cardNumber || !cardHolder || !date || !cvc) {
        alert("Please fill out all fields.");
        return;
    }

    validateCardNumber();
    validateCardHolder();
    validateDate();
    validateCVC();

    // Confirm checkout only if all validations pass
    var validationDiv = document.getElementById("validation");
    if (validationDiv.innerText === "") {
        validationDiv.innerText = "Checkout confirmed!";
        confirmCheckout();
    }
}

function confirmCheckout() {
    // Add your logic here to confirm the checkout
    alert("Checkout confirmed!");
    
}




// Check if the user is logged in
const isLoggedIn = sessionStorage.getItem('isLoggedin');

if (isLoggedIn === 'true') {

} else {
    window.location.href = '../login/signup.html'
}




// //////////////////////////



// Fetch and display the total price on the order summary
function updateTotalPrice() {
    const userId = sessionStorage.getItem('UserID');
    fetch(`http://localhost/api-AMM/api/cart/totalcart.php?UserID=${userId}&action=totalPrice`)
        .then(response => response.json())
        .then(data => {

            if (data.success && data.data) {
                document.getElementById('total1').innerHTML = data.data;

            } else {
                document.getElementById('total1').innerHTML = '0';
            }

        })
        .catch(error => {
            console.error('Error fetching total price:', error);
        });
}


// Function to handle checkout confirmation
function confirmCheckout() {
    const userId = sessionStorage.getItem('UserID');
    const cardNumber = document.getElementById("cardNumber").value;
    const cardHolder = document.getElementById("cardHolder").value;
    const date = document.getElementById("date").value;
    const cvc = document.getElementById("cvc").value;

    // Replace with actual validation functions
    if (!cardNumber || !cardHolder || !date || !cvc) {
        alert("Please fill out all fields.");
        return;
    }

    // Call the API to create an order
    fetch('http://localhost/api-AMM/api/order/checkout.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserID: userId
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Order created successfully.") {
                alert("Checkout successful!");
                // Redirect to a confirmation page or update the UI accordingly
                window.location.href = '../shopa/shopa.html';
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error during checkout:', error);
        });
}

// Call updateTotalPrice when the page loads
document.addEventListener('DOMContentLoaded', function() {
    updateTotalPrice();
});