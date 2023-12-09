<?php
// File: deleteProduct.php

// Purpose:
// This file deletes an existing product from the "product" table in the database.

// Usage:
// Use DELETE method to remove an existing product. Provide the 'id' parameter in the URL.
// Example request: DELETE http://example.com/deleteProduct?id=1
// Example response: {"message":"Product deleted successfully."}

// Additional Information:
// - Returns a 404 Not Found if the specified product ID does not exist.
// - Provides CORS headers to allow cross-origin requests.
// - Supports Access-Control-Allow-Methods: DELETE.
// - Requires Content-Type: application/json in headers.



// Include the database connection file
include "../include.php";

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json");
    exit();
}
// Check if the request method is DELETE
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    // Get the JSON data from the request body
    $inputData = json_decode(file_get_contents("php://input"), true);

    // Check if productId is provided
    if (isset($inputData['ProductID'])) {
        $productId = $inputData['ProductID'];

        // Function to delete an existing product
        function deleteProduct($productId)
        {
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

