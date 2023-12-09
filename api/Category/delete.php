<?php

// Include the database connection file
include_once "../include.php";

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

/*
 * Endpoint: deleteCategory.php
 *
 * Purpose:
 * This file deletes a category from the "category" table in the database based on the provided CategoryID.
 *
 * Usage:
 * Use DELETE method and provide CategoryID as a parameter.
 * Example request: DELETE http://example.com/deleteCategory?CategoryID=1
 * Example response: {"message":"Category deleted successfully."}
 */

// Check if the request method is DELETE
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    
    $inputData = json_decode(file_get_contents("php://input"), true);
    
    if (isset($inputData['CategoryID'])) {
        $categoryID = $inputData['CategoryID'];

        // Delete category by ID
        $query = "DELETE FROM category WHERE CategoryID = ?";
        $statement = $mysqli->prepare($query);
        $statement->bind_param('i', $categoryID);
        $statement->execute();

        // Check if the category was successfully deleted
        if ($statement->affected_rows > 0) {
            // Category deleted successfully
            echo json_encode(array("message" => "Category deleted successfully."));
        } else {
            // Failed to delete category
            http_response_code(500); // Internal Server Error
            echo json_encode(array("message" => "Failed to delete category."));
        }

        $statement->close();
    } else {
        // CategoryID not provided
        http_response_code(400); // Bad Request
        echo json_encode(array("message" => "Please provide CategoryID."));
    }
} else {
    // Invalid request method
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("message" => "Invalid request method. Use DELETE method."));
}

// Close the database connection
$mysqli->close();
