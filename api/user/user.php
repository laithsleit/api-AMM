<?php
include_once "../include.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
/**
 * CRUD API for User Management
 * 
 * Use the following HTTP methods:
 * - GET: To retrieve all users or a specific user by ID.
 * - POST: To create a new user or retrieve a specific user by ID.
 * - PUT/PATCH: To update a specific user by ID.
 * - DELETE: To delete a specific user by ID.
 * 
 * API Endpoints:
 * 
 * 1. GET /users:
 *    - Description: Retrieve all users or a specific user by ID.
 *    - Example: GET /users (Retrieve all users)
 *    - Example: GET /users?id=1 (Retrieve user with ID 1)
 *    - Response JSON: [{"UserID":1,"Username":"user1","Password":"password1","Email":"user1@example.com","RoleID":2}, ...]
 * 
 * 2. POST /users:
 *    - Description: Create a new user or retrieve a user by ID.
 *    - Example: POST /users (Create a new user)
 *        - Send JSON data: {"Username":"newuser","Password":"newpassword","Email":"newuser@example.com"}
 *    - Example: POST /users?id=1 (Retrieve user with ID 1)
 *        - Send JSON data: {'UserIDUserID'}
 *    - Response JSON: {"message":"User created successfully."} or {"UserID":1,"Username":"user1",...}
 * 
 * 3. PUT/PATCH /users:
 *    - Description: Update a user by ID.
 *    - Example: PUT /users (Update user with ID)
 *        - Send JSON data: {"Username":"updateduser","Password":"laith","Email":"updateduser@example.com","RoleID":2,"UserID":2}
 *    - Example: PATCH /users (Update user with ID)
 *        - Send JSON data: {"Username":"updateduser"}
 *    - Response JSON: {"message":"User updated successfully."}
 * 
 * 4. DELETE /users:
 *    - Description: Delete a user by ID.
 *    - Example: DELETE /users (Delete user with ID)
 *        - Send JSON data: {"UserID":1}
 *    - Response JSON: {"message":"User deleted successfully."}
 */



// Check the request method
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getAllUsers();
        break;
    case 'POST':
        $inputData = json_decode(file_get_contents("php://input"), true);
        if (isset($inputData['UserID'])) {
            getUserById($inputData['UserID']);
        } else {
            insertUser($inputData);
        }
        break;
    case 'PUT':
    case 'PATCH':
        // Handle update operation
        $inputData = json_decode(file_get_contents("php://input"), true);
        if (isset($inputData['UserID'])) {
            updateUser($inputData['UserID'], $inputData);
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(array("message" => "Please provide a valid user ID for update."));
        }
        break;
    case 'DELETE':
        $inputData = json_decode(file_get_contents("php://input"), true);
        if (isset($inputData['UserID'])) {
            deleteUser($inputData['UserID']);
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(array("message" => "Please provide a valid user ID for deletion."));
        }
        break;
    default:
            echo json_encode(array("message" => "Invalid request $method."));
            http_response_code(405); // Method Not Allowed
}

// Function to retrieve all users
function getAllUsers()
{
    global $mysqli;

    $query = "SELECT * FROM users";
    $result = $mysqli->query($query);

    $users = array();
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

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
        echo json_encode($user);
    } else {
        http_response_code(404); // Not Found
        echo json_encode(array("message" => "User not found with ID: $UserID"));
    }
}

// Function to insert a new user
function insertUser($userData)
{
    global $mysqli;

    // Validate input data
    if (isset($userData['Username']) && isset($userData['Password']) && isset($userData['Email'])) {
        $username = $userData['Username'];
        $password = password_hash($userData['Password'], PASSWORD_DEFAULT);
        $email = $userData['Email'];

        // Check if the username is already taken
        $checkQuery = "SELECT * FROM users WHERE Username = ?";
        $checkStatement = $mysqli->prepare($checkQuery);
        $checkStatement->bind_param('s', $username);
        $checkStatement->execute();
        $checkResult = $checkStatement->get_result();

        if ($checkResult->num_rows > 0) {
            http_response_code(400); // Bad Request
            echo json_encode(array("message" => "Username is already taken. Please choose a different username."));
        } else {
            $insertQuery = "INSERT INTO users (Username, Password, Email) VALUES (?, ?, ?)";
            $insertStatement = $mysqli->prepare($insertQuery);
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            $insertStatement->bind_param('sss', $username, $hashedPassword, $email);
            $insertStatement->execute();

            http_response_code(201); // Created
            echo json_encode(array("message" => "User registered successfully."));
        }
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(array("message" => "Please provide username, password, and email for user registration."));
    }
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

        if (isset($userData['Username'])) {
            $updateQuery .= "Username = ?, ";
            $updateData[] = $userData['Username'];
        }

        if (isset($userData['Password'])) {
            $updateQuery .= "Password = ?, ";
            $updateData[] = password_hash($userData['Password'], PASSWORD_BCRYPT);
        }

        if (isset($userData['Email'])) {
            $updateQuery .= "Email = ?, ";
            $updateData[] = $userData['Email'];
        }

        if (isset($userData['RoleID'])) {
            $updateQuery .= "RoleID = ?, ";
            $updateData[] = $userData['RoleID'];
        }

        // Remove the trailing comma and space
        $updateQuery = rtrim($updateQuery, ", ");

        $updateQuery .= " WHERE UserID = ?";
        $updateData[] = $UserID;

        // Execute the update query
        $updateStatement = $mysqli->prepare($updateQuery);

        // Dynamically bind parameters based on their types
        $types = str_repeat('s', count($updateData) - 1) . 'i';
        $updateStatement->bind_param($types, ...$updateData);

        $updateStatement->execute();

        http_response_code(200); // OK
        echo json_encode(array("message" => "User updated successfully."));
    } else {
        http_response_code(404); // Not Found
        echo json_encode(array("message" => "User not found with ID: $UserID"));
    }
}


// Function to delete a user
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
        // Delete the user
        $deleteQuery = "DELETE FROM users WHERE UserID = ?";
        $deleteStatement = $mysqli->prepare($deleteQuery);
        $deleteStatement->bind_param('i', $UserID);
        $deleteStatement->execute();

        http_response_code(200); // OK
        echo json_encode(array("message" => "User deleted successfully."));
    } else {
        http_response_code(404); // Not Found
        echo json_encode(array("message" => "User not found with ID: $UserID"));
    }
}

?>
