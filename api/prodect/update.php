<?php

// File: updateProduct.php

// Purpose:
// This file updates an existing product in the "product" table in the database.

// Usage:
// Use PUT or PATCH method to update an existing product.
// Send updated product details in JSON format in the request body.
// Request body: {"ProductID":1,"CategoryID":1,"Name":"Updated Laptop",...}
// Example response: {"message":"Product updated successfully."}


include "../include.php";

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json");
    exit();
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Function to insert a new product
    function updateProduct($data)
    {
        global $mysqli;

        // Extract data from the input
        $categoryID = $data['categoryID'];
        $name = $data['name'];
        $description = $data['description'];
        $price = $data['price'];
        $stockQuantity = $data['stockQuantity'];
        $image = isset($_FILES['image']) ? $_FILES['image'] : null;

        // Handle image upload
        if ($image && $image['error'] == UPLOAD_ERR_OK) {
            $image_name = $image['name'];
            $image_tmp_name = $image['tmp_name'];

            // Adjust the directory to store images
           // Adjust the directory to store images
            $upload_path = '../../New folder (3)/images/' . $image_name;
            move_uploaded_file($image_tmp_name, $upload_path);

        }

        // Insert data into the database
        $query = "INSERT INTO product (CategoryID, Name, Description, Price, StockQuantity, Image) VALUES (?, ?, ?, ?, ?, ?)";
        $statement = $mysqli->prepare($query);
        $statement->bind_param('issdis', $categoryID, $name, $description, $price, $stockQuantity, $upload_path);
        $statement->execute();

        http_response_code(201); // Created
        echo json_encode(array("message" => "Product created successfully."));
    }

    // Get the form data
    $inputData = $_POST;

    // Call the function to insert a new product
    updateProduct($inputData);
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("message" => "Invalid request method. Use POST."));
}
?>
