<?php

/**
 * CRUD API for Product Management
 * 
 * Use the following HTTP methods:
 * - GET: To retrieve all products or a specific product by ID.
 * - POST: To create a new product or retrieve a specific product by ID.
 * - PUT/PATCH: To update a specific product by ID.
 * - DELETE: To delete a specific product by ID.
 * 
 * API Endpoints:
 * 
 * 1. GET /products:
 *    - Description: Retrieve all products or a specific product by ID.
 *    - Example: GET /products (Retrieve all products)
 *    - Example: GET /products?id=1 (Retrieve product with ID 1)
 *    - Response JSON: [{"ProductID":1,"CategoryID":1,"Name":"Laptop","Description":"High-performance laptop",...}, ...]
 * 
 * 2. POST /products:
 *    - Description: Create a new product or retrieve a product by ID.
 *    - Example: POST /products (Create a new product)
 *        - Send JSON data: {"CategoryID":1,"Name":"New Product","Description":"Product Description","Price":99.99,"StockQuantity":50,"Image":"newproduct.jpg"}
 *    - Example: POST /products?id=1 (Retrieve product with ID 1)
 *        - Send JSON data: {}
 *    - Response JSON: {"message":"Product created successfully."} or {"ProductID":1,"CategoryID":1,"Name":"Laptop",...}
 * 
 * 3. PUT/PATCH /products:
 *    - Description: Update a product by ID.
 *    - Example: PUT /products (Update product with ID)
 *        - Send JSON data: {"ProductID":1,"CategoryID":1,"Name":"Updated Laptop","Description":"Updated Description","Price":1099.99,"StockQuantity":25,"Image":"updatedlaptop.jpg"}
 *    - Example: PATCH /products (Update product with ID)
 *        - Send JSON data: {"ProductID":1,"Name":"Updated Laptop"}
 *    - Response JSON: {"message":"Product updated successfully."}
 * 
 * 4. DELETE /products:
 *    - Description: Delete a product by ID.
 *    - Example: DELETE /products (Delete product with ID)
 *        - Send JSON data: {"ProductID":1}
 *    - Response JSON: {"message":"Product deleted successfully."}
 */

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Include the database connection file
include "../include.php";

// Check the request method
$method = $_SERVER['REQUEST_METHOD'];

// Switch based on the request method
switch ($method) {
    case 'GET':
        // GET /products: Retrieve all products or a specific product by ID
        getAllProducts();
        break;
    case 'POST':
        // POST /products: Create a new product or retrieve a product by ID
        $inputData = json_decode(file_get_contents("php://input"), true);
        if (isset($inputData['ProductID'])) {
            // GET /products with ID
            getProductById($inputData['ProductID']);
        } else {
            // POST /products: Create a new product
            insertProduct($inputData);
        }
        break;
    case 'PUT':
    case 'PATCH':
        // PUT/PATCH /products: Update a product by ID
        $inputData = json_decode(file_get_contents("php://input"), true);
        if (isset($inputData['ProductID'])) {
            updateProduct($inputData['ProductID'], $inputData);
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(array("message" => "Please provide a valid product ID for update."));
        }
        break;
    case 'DELETE':
        // DELETE /products: Delete a product by ID
        $inputData = json_decode(file_get_contents("php://input"), true);
        if (isset($inputData['ProductID'])) {
            deleteProduct($inputData['ProductID']);
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(array("message" => "Please provide a valid product ID for deletion."));
        }
        break;
    default:
        http_response_code(405); // Method Not Allowed
        echo json_encode(array("message" => "Invalid request method."));
}

// Function to retrieve all products
function getAllProducts()
{
    global $mysqli;

    $query = "SELECT * FROM product";
    $result = $mysqli->query($query);

    $products = array();
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    echo json_encode($products);
}

// Function to retrieve a product by ID
function getProductById($ProductID)
{
    global $mysqli;

    $query = "SELECT * FROM product WHERE ProductID = ?";
    $statement = $mysqli->prepare($query);
    $statement->bind_param('i', $ProductID);
    $statement->execute();
    $result = $statement->get_result();

    if ($result->num_rows > 0) {
        $product = $result->fetch_assoc();
        echo json_encode($product);
    } else {
        http_response_code(404); // Not Found
        echo json_encode(array("message" => "Product not found with ID: $ProductID"));
    }
}

// Function to insert a new product
function insertProduct($data)
{
    global $mysqli;

    // Extract data from the input
    $categoryID = $data['CategoryID'];
    $name = $data['Name'];
    $description = isset($data['Description']) ? $data['Description'] : null;
    $price = $data['Price'];
    $stockQuantity = $data['StockQuantity'];
    $image = isset($data['Image']) ? $data['Image'] : null;

    // Insert data into the database
    $query = "INSERT INTO product (CategoryID, Name, Description, Price, StockQuantity, Image) VALUES (?, ?, ?, ?, ?, ?)";
    $statement = $mysqli->prepare($query);
    $statement->bind_param('issdis', $categoryID, $name, $description, $price, $stockQuantity, $image);
    $statement->execute();

    http_response_code(201); // Created
    echo json_encode(array("message" => "Product created successfully."));
}

// Function to update an existing product
function updateProduct($ProductID, $data)
{
    global $mysqli;

    // Prepare the update query
    $updateFields = array();
    $updateData = array();
    foreach ($data as $key => $value) {
        if ($key !== 'ProductID') {
            $updateFields[] = "$key = ?";
            $updateData[] = $value;
        }
    }
    $updateData[] = $ProductID; // Add the ProductID to the end

    $updateQuery = "UPDATE product SET " . implode(', ', $updateFields) . " WHERE ProductID = ?";
    $updateStatement = $mysqli->prepare($updateQuery);

    // Dynamically bind parameters based on data types
    $types = str_repeat('s', count($updateData));
    $updateStatement->bind_param($types, ...$updateData);

    // Execute the update query
    $updateStatement->execute();

    http_response_code(200); // OK
    echo json_encode(array("message" => "Product updated successfully."));
}

// Function to delete an existing product
function deleteProduct($ProductID)
{
    global $mysqli;

    // Check if the product exists
    $checkQuery = "SELECT * FROM product WHERE ProductID = ?";
    $checkStatement = $mysqli->prepare($checkQuery);
    $checkStatement->bind_param('i', $ProductID);
    $checkStatement->execute();
    $checkResult = $checkStatement->get_result();

    if ($checkResult->num_rows > 0) {
        // Product exists, proceed with deletion
        $deleteQuery = "DELETE FROM product WHERE ProductID = ?";
        $deleteStatement = $mysqli->prepare($deleteQuery);
        $deleteStatement->bind_param('i', $ProductID);
        $deleteStatement->execute();

        http_response_code(200); // OK
        echo json_encode(array("message" => "Product deleted successfully."));
    } else {
        // Product not found
        http_response_code(404); // Not Found
        echo json_encode(array("message" => "Product not found with ID: $ProductID"));
    }
}
?>
