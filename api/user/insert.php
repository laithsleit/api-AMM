<?php
//  *  POST /users:
//      - Description: Create a new user
// *    - Send JSON data: {'UserIDUserID'}
// *    - Response JSON: {"message":"User created successfully."} or {"UserID":1,"Username":"user1",...}
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


// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Handle POST request to insert a new user
    $inputData = json_decode(file_get_contents("php://input"), true);

    // Validate input data
    if (isset($inputData['Username']) && isset($inputData['Password']) && isset($inputData['Email'])) {
        // If all required fields are provided, insert the new user
        insertUser($inputData['Username'], $inputData['Password'], $inputData['Email']);
    } else {
        // If required fields are missing, return an error message
        http_response_code(400); // Bad Request
        echo json_encode(array("message" => "Please provide username, password, and Email for user registration."));
    }
} else {
    // If the request method is not POST, return an error message
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("message" => "Invalid request method. Please use POST."));
}

// Function to insert a new user
function insertUser($username, $password, $email)
{
    global $mysqli; // Assuming you have a MySQLi object

    // Check if the username is already taken
    $checkQuery = "SELECT * FROM users WHERE Username = ?";
    $checkStatement = $mysqli->prepare($checkQuery);
    $checkStatement->bind_param('s', $username);
    $checkStatement->execute();
    $checkResult = $checkStatement->get_result();

    if ($checkResult->num_rows > 0) {
        // If username is already taken, return an error message
        http_response_code(400); // Bad Request
        echo json_encode(array("message" => "Username is already taken. Please choose a different username."));
    } else {
        // Insert the new user
        $insertQuery = "INSERT INTO users (Username, Password, Email) VALUES (?, ?, ?)";
        $insertStatement = $mysqli->prepare($insertQuery);
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT); // Hash the password

        $insertStatement->bind_param('sss', $username, $hashedPassword, $email);
        $insertStatement->execute();

        // Return a success message
        http_response_code(201); // Created
        echo json_encode(array("message" => "User registered successfully."));
    }
}

?>
