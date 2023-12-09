<?php

// Include the database connection file
include "../include.php";

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
/*
 * Endpoint: getAllCategories.php
 *
 * Purpose:
 * This file retrieves categories from the "category" table in the database based on the provided conditions.
 *
 * Usage:
 * Use GET method to get all categories or POST method to get a category by ID.
 * Example requests:
 *   - GET http://example.com/getAllCategories
 *   - POST http://example.com/getAllCategories (with {"CategoryID": 1} in the request body)
 * Example responses:
 *   - [{"CategoryID":1,"CategoryName":"Category 1"},{"CategoryID":2,"CategoryName":"Category 2"},...]
 *   - {"CategoryID":1,"CategoryName":"Category 1"}
 */

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Select all categories
    $query = "SELECT * FROM category";
    $result = $mysqli->query($query);

    // Check if categories are found
    if ($result->num_rows > 0) {
        $categories = array();

        // Fetch categories as associative array
        while ($row = $result->fetch_assoc()) {
            $categories[] = $row;
        }

        // Return categories in JSON format
        echo json_encode($categories);
    } else {
        // No categories found
        echo json_encode(array());
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if CategoryID is provided in the request body
    $inputData = json_decode(file_get_contents("php://input"), true);
    if (isset($inputData['CategoryID'])) {
        $categoryID = $inputData['CategoryID'];

        // Retrieve category by ID
        $query = "SELECT * FROM category WHERE CategoryID = ?";
        $statement = $mysqli->prepare($query);
        $statement->bind_param('i', $categoryID);
        $statement->execute();
        $result = $statement->get_result();

        // Check if category is found
        if ($result->num_rows > 0) {
            $category = $result->fetch_assoc();

            // Return category in JSON format
            echo json_encode($category);
        } else {
            // Category not found
            http_response_code(404); // Not Found
            echo json_encode(array("message" => "Category not found."));
        }

        $statement->close();
    } else {
        // CategoryID not provided in the request body
        http_response_code(400); // Bad Request
        echo json_encode(array("message" => "Please provide CategoryID in the request body."));
    }
} else {
    // Wrong request method
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("message" => "Method not allowed."));
}

// Close the database connection
$mysqli->close();

?>
