<?php
// PHP Script for Deleting a Product from the Database

// Include the database connection file
include "../include.php";

// CORS headers for cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit();
}

// Endpoint: deleteProduct.php
// Method: DELETE
// Description: Deletes a product from the database.
// Request body: JSON object containing the 'ProductID' field.
// Example: { "ProductID": 123 }
// Responses:
// - 200 OK: Product deleted successfully.
// - 400 Bad Request: Missing or invalid ProductID.
// - 405 Method Not Allowed: Invalid request method.
// - 500 Internal Server Error: Server-side error during deletion.

// Check if the request method is DELETE
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    // Get the JSON data from the request body
    $inputData = json_decode(file_get_contents("php://input"), true);

    // Check if ProductID is provided
    if (isset($inputData['ProductID'])) {
        $productId = $inputData['ProductID'];

        // Function to delete an existing product
        function deleteProduct($productId) {
            global $mysqli;

            // Prepare the delete query
            $query = "DELETE FROM product WHERE ProductID = ?";
            $deleteStatement = $mysqli->prepare($query);
            $deleteStatement->bind_param('i', $productId);

            // Execute the delete statement
            if ($deleteStatement->execute()) {
                echo json_encode(array("message" => "Product deleted successfully."));
            } else {
                http_response_code(500); // Internal Server Error
                echo json_encode(array("message" => "Error deleting product."));
            }

            $deleteStatement->close();
        }

        // Call the function to delete the product
        deleteProduct($productId);
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(array("message" => "Please provide a valid product ID."));
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("message" => "Invalid request method. Use DELETE."));
}
?>
