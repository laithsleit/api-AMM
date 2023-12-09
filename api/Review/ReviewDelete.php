<?php

include "../include.php";
include "Review.php";

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: DELETE");
    header("Access-Control-Allow-Headers: Content-Type");
    http_response_code(204); // No Content
    exit;
}


// Check if it's a DELETE request
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
    exit;
}

// Get the review ID from the query parameters
$reviewID = $_GET['reviewID'] ?? null;

// Validate the presence of Review ID
if ($reviewID === null) {
    http_response_code(400); // Bad Request
    echo json_encode(["success" => false, "message" => "Review ID is required"]);
    exit;
}

// Create a new instance of the Review class
$reviewObj = new Review($mysqli);

// Delete the review
$result = $reviewObj->deleteReview($reviewID);

// Return the result as JSON
http_response_code($result["success"] ? 200 : 500); // OK or Internal Server Error
echo json_encode($result);
?>
