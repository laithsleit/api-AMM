<?php

/**
 * CRUD API for Updating User
 * 
 * Use the following HTTP methods:
 * - PUT/PATCH: To update a specific user by ID.
 * 
 * API Endpoint:
 * 
 * 1. PUT/PATCH /updateUser:
 *    - Description: Update a user by ID.
 *    - Example: PUT /updateUser (Update user with ID)
 *        - Send JSON data: {"Username":"updateduser","Password":"laith","Email":"updateduser@example.com","RoleID":2,"UserID":3}
 *    - Response JSON: {"message":"User updated successfully."}
 */

// Include the database connection file
include_once "../include.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Check the request method
$method = $_SERVER['REQUEST_METHOD'];

// Switch based on the request method
switch ($method) {
    case 'PUT':
    case 'PATCH':
        // PUT/PATCH /updateUser: Update a user by ID
        $inputData = json_decode(file_get_contents("php://input"), true);
        if (isset($inputData['UserID'])) {
            updateUser($inputData['UserID'], $inputData);
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(array("message" => "Please provide a valid user ID for update."));
        }
        break;
    default:
        http_response_code(405); // Method Not Allowed
        echo json_encode(array("message" => "Invalid request method."));
}

// Function to update an existing user
function updateUser($UserID, $userData)
{
    global $mysqli;

    // Check if the user exists
    $checkQuery = "SELECT * FROM users WHERE UserID = ?";
    $checkStatement = $mysqli->prepare($checkQuery);
    $checkStatement->bind_param('i', $UserID);
    $checkStatement->execute();
    $checkResult = $checkStatement->get_result();

    if ($checkResult->num_rows > 0) {
        // Fetch the existing user data
        $existingUserData = $checkResult->fetch_assoc();

        // Update only the fields that are provided
        $updateQuery = "UPDATE users SET ";
        $updateData = array();

        if (isset($userData['username'])) {
            $updateQuery .= "Username = ?, ";
            $updateData[] = $userData['username'];
        }

        if (isset($userData['password'])) {
            $updateQuery .= "Password = ?, ";
            $updateData[] = password_hash($userData['password'], PASSWORD_DEFAULT);
        }

        if (isset($userData['email'])) {
            $updateQuery .= "Email = ?, ";
            $updateData[] = $userData['email'];
        }

        if (isset($userData['roleId'])) {
            $updateQuery .= "RoleID = ?, ";
            $updateData[] = $userData['roleId'];
        }

        // Remove the trailing comma and space
        $updateQuery = rtrim($updateQuery, ", ");

        $updateQuery .= " WHERE UserID = ?";
        $updateData[] = $UserID;

        // Execute the update query
        $updateStatement = $mysqli->prepare($updateQuery);
        call_user_func_array(array($updateStatement, 'bind_param'), $updateData);
        $updateStatement->execute();

        http_response_code(200); // OK
        echo json_encode(array("message" => "User updated successfully."));
    } else {
        http_response_code(404); // Not Found
        echo json_encode(array("message" => "User not found with ID: $UserID"));
    }
}
?>
