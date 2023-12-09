<?php
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

// Rest of your existing code...

// File: getProductById.php

// Purpose:
// This file retrieves a specific product by ID from the "product" table in the database.

// Usage:
// Use GET method and provide 'id' parameter in the URL to get details of a specific product.
// Response will be a JSON object containing product details.
// Example request: GET http://example.com/getProductById?id=1
// Example response: {"ProductID":1,"CategoryID":1,"Name":"Laptop",...}


// File: getAllProducts.php

// Purpose:
// This file retrieves all products from the "product" table in the database.

// Usage:
// Use GET method to request a list of all products.
// Response will be a JSON array containing product details.
// Example request: GET http://example.com/getAllProducts
// Example response: [{"ProductID":1,"CategoryID":1,"Name":"Laptop",...}, {...}, ...]



// Include the database connection file

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include the database connection file
include "../include.php";

// CORS headers
// CORS headers





if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    function getAllProducts()
    {
        global $mysqli;

        $query = "SELECT * FROM product";
        $result = $mysqli->query($query);

        $products = array();
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }

        echo json_encode($products);
    }

    // Call the function to get all products
    getAllProducts();

} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Get the JSON data from the request body
    $inputData = json_decode(file_get_contents("php://input"), true);

    if (isset($inputData['ProductID'])) {
        $productId = $inputData['ProductID'];

        function getProductById($productId)
        {
            global $mysqli;

            $query = "SELECT * FROM product WHERE ProductID = ?";
            $statement = $mysqli->prepare($query);
            $statement->bind_param('i', $productId);
            $statement->execute();
            $result = $statement->get_result();

            if ($result->num_rows > 0) {
                $product = $result->fetch_assoc();
                echo json_encode($product);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(array("message" => "Product not found with ID: $productId"));
            }
        }

        // Call the function to get product by ID
        getProductById($productId);
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(array("message" => "Please provide a valid product ID."));
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("message" => "Invalid request method. Use GET or POST."));
}
?>
