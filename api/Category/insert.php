<?php

// Include the database connection file
include "../include.php";

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

/*
 * Endpoint: insertCategory.php
 *
 * Purpose:
 * This file inserts a new category into the "category" table in the database.
 *
 * Usage:
 * Use POST method to add a new category. Send category details in JSON format in the request body.
 * Request body: {"CategoryName":"New Category"}
 * Example response: {"message":"Category created successfully."}
 */

// Get the JSON data from the request body
$inputData = json_decode(file_get_contents("php://input"), true);

// Check if required data is provided
if (isset($inputData['CategoryName'])) {
    $categoryName = $inputData['CategoryName'];

    // Insert into category table
    $query = "INSERT INTO category (CategoryName) VALUES (?)";
    $statement = $mysqli->prepare($query);
    $statement->bind_param('s', $categoryName);
    $statement->execute();

    // Check if the category was successfully inserted
    if ($statement->affected_rows > 0) {
        // Category created successfully
        echo json_encode(array("message" => "Category created successfully."));
    } else {
        // Failed to create category
        http_response_code(500); // Internal Server Error
        echo json_encode(array("message" => "Failed to create category."));
    }

    $statement->close();
} else {
    // Required data not provided
    http_response_code(400); // Bad Request
    echo json_encode(array("message" => "Please provide category name."));
}

// Close the database connection
$mysqli->close();

?>
