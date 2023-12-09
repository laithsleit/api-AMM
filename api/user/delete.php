<?php

/**
 * CRUD API for Deleting User
 * 
 * Use the following HTTP methods:
 * - DELETE: To delete a specific user by ID.
 * 
 * API Endpoint:
 * 
 * 1. DELETE /deleteUser:
 *    - Description: Delete a user by ID.
 *    - Example: DELETE /deleteUser (Delete user with ID)
 *        - Send JSON data: {"UserID":1}
 *    - Response JSON: {"message":"User deleted successfully."}
 */

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
// Include the database connection file
include_once "../include.php";

// Check the request method
$method = $_SERVER['REQUEST_METHOD'];

// Switch based on the request method
switch ($method) {
    case 'DELETE':
        // DELETE /deleteUser: Delete a user by ID
        $inputData = json_decode(file_get_contents("php://input"), true);
        if (isset($inputData['UserID'])) {
            deleteUser($inputData['UserID']);
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(array("message" => "Please provide a valid user ID for deletion."));
        }
        break;
    default:
        http_response_code(405); // Method Not Allowed
        echo json_encode(array("message" => "Invalid request method."));
}

// Function to delete an existing user
function deleteUser($UserID)
{
    global $mysqli;

    // Check if the user exists
    $checkQuery = "SELECT * FROM users WHERE UserID = ?";
    $checkStatement = $mysqli->prepare($checkQuery);
    $checkStatement->bind_param('i', $UserID);
    $checkStatement->execute();
    $checkResult = $checkStatement->get_result();

    if ($checkResult->num_rows > 0) {
        // User exists, proceed with deletion
        $deleteQuery = "DELETE FROM users WHERE UserID = ?";
        $deleteStatement = $mysqli->prepare($deleteQuery);
        $deleteStatement->bind_param('i', $UserID);
        $deleteStatement->execute();

        http_response_code(200); // OK
        echo json_encode(array("message" => "User deleted successfully."));
    } else {
        // User not found
        http_response_code(404); // Not Found
        echo json_encode(array("message" => "User not found with ID: $UserID"));
    }
}
?>
