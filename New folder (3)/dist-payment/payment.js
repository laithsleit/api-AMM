document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("order-form");
    const submitButton = document.getElementById("submit-button");
    const resultDiv = document.getElementById("result");

    // Add an event listener for the submit button click
    submitButton.addEventListener("click", function () {
        if (form.checkValidity()) {
            // If the form is valid, proceed with the API request
            const userID = document.getElementById("userID").value;
            const firstName = document.getElementById("firstName").value;
            const lastName = document.getElementById("lastName").value;
            // Add more input field values as needed

            // Construct the request data
            const requestData = {
                UserID: userID,
                FirstName: firstName,
                LastName: lastName,
                // Add more fields to match your data structure
            };

            // Send a POST request to your API endpoint
            fetch("http://localhost/api-AMM/api/order/checkout.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            })
                .then((response) => response.json())
                .then((data) => {
                    // Handle the API response here
                    resultDiv.textContent = data.message;
                    if (data.orderID) {
                        // If the order was created successfully, you can perform additional actions here
                        // For example, redirect the user to a confirmation page
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    resultDiv.textContent = "An error occurred.";
                });
        } else {
            // If the form is invalid, show an error message
            resultDiv.textContent = "Please fill out all required fields.";
        }
    });
});
