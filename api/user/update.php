<?php

/**
 * CRUD API for Updating User
 */

// Include the database connection file
include_once "../include.php"; // Make sure this file contains the correct database connection setup

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'PUT':
    case 'PATCH':
        $inputData = json_decode(file_get_contents("php://input"), true);
        if (isset($inputData['UserID'])) {
            updateUser($inputData['UserID'], $inputData);
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Please provide a valid user ID for update."));
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Invalid request method."));
}

function updateUser($UserID, $userData)
{
    global $mysqli;

    $checkQuery = "SELECT * FROM users WHERE UserID = ?";
    $checkStatement = $mysqli->prepare($checkQuery);
    $checkStatement->bind_param('i', $UserID);
    $checkStatement->execute();
    $checkResult = $checkStatement->get_result();

    if ($checkResult->num_rows > 0) {
        $updateQuery = "UPDATE users SET ";
        $updateData = array();
        $types = '';

        if (isset($userData['Username'])) {
            $updateQuery .= "Username = ?, ";
            $updateData[] = $userData['Username'];
            $types .= 's';
        }

        if (isset($userData['Password'])) {
            $updateQuery .= "Password = ?, ";
            $updateData[] = password_hash($userData['Password'], PASSWORD_DEFAULT);
            $types .= 's';
        }

        if (isset($userData['Email'])) {
            $updateQuery .= "Email = ?, ";
            $updateData[] = $userData['Email'];
            $types .= 's';
        }

        if (isset($userData['RoleID'])) {
            $updateQuery .= "RoleID = ?, ";
            $updateData[] = $userData['RoleID'];
            $types .= 'i';
        }

        $updateQuery = rtrim($updateQuery, ", ");
        $updateQuery .= " WHERE UserID = ?";
        $updateData[] = $UserID;
        $types .= 'i';

        $updateStatement = $mysqli->prepare($updateQuery);
        $updateStatement->bind_param($types, ...$updateData);
        $updateStatement->execute();

        http_response_code(200);
        echo json_encode(array("message" => "User updated successfully."));
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "User not found with ID: $UserID"));
    }
}
?>
