<?php

//  * 1. GET /users:
//  *    - Description: Retrieve all users or a specific user by ID.
//  *    - Example: GET /users (Retrieve all users)
//  *    - Example: GET /users?id=1 (Retrieve user with ID 1)
//  *    - Response JSON: [{"UserID":1,"Username":"user1","Password":"password1","Email":"user1@example.com","RoleID":2}, ...]
//  * 
//  * 2. POST /users:
//  *    - Description: Create a new user or retrieve a user by ID.
//  *    - Example: POST /users (Create a new user)
//  *        - Send JSON data: {"Username":"newuser","Password":"newpassword","Email":"newuser@example.com"}
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

// Check if the request method is GET or POST

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    // Handle GET request to retrieve all users
    getAllUsers();

} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Handle POST request to retrieve a specific user by ID
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['UserID'])) {
        // If user ID is provided, get user details
        getUserById($data['UserID']);
    } else {
        // If user ID is not provided, return an error message
        http_response_code(400); // Bad Request
        echo json_encode(array("message" => "Please provide a valid user ID"));
    }
} else {
    // If the request method is not GET or POST, return an error message
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("message" => "Invalid request method. Please use GET or POST."));
}

// Function to retrieve all users
function getAllUsers()
{
    global $mysqli;

    $query = "SELECT * FROM users WHERE RoleID = 2";
    $result = $mysqli->query($query);

    $users = array();
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    // Return the users as JSON
    echo json_encode($users);
}

// Function to retrieve a specific user by ID
function getUserById($UserID)
{
    global $mysqli; 

    $query = "SELECT * FROM users WHERE UserID = ?";
    $statement = $mysqli->prepare($query);
    $statement->bind_param('i', $UserID);
    $statement->execute();
    
    $result = $statement->get_result();
    $user = $result->fetch_assoc();

    if ($user) {
        // If the user is found, return the user details as JSON
        echo json_encode($user);
    } else {
        // If the user is not found, return an error message
        http_response_code(404); // Not Found
        echo json_encode(array("message" => "User not found with ID: $UserID"));
    }
}

?>
