<?php

// Include the database connection file
include "../include.php";

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

/*
 * Endpoint: createOrder.php
 *
 * Purpose:
 * This file creates a new order for a user and adds order items from their cart based on the provided data.
 *
 * Usage:
 * Use POST method to create a new order. Send user ID in JSON format in the request body.
 * Example request: POST http://example.com/createOrder
 * Request body: {"UserID": 1}
 * Example response: {"message":"Order created successfully."}
 */

// Function to calculate total order amount
function calculateTotalOrderAmount($userID)
{
    global $mysqli;

    $query = "SELECT SUM(p.Price * c.Quantity) AS TotalAmount
              FROM cart c
              JOIN product p ON c.ProductID = p.ProductID
              WHERE c.UserID = ?";
    $statement = $mysqli->prepare($query);

    if (!$statement) {
        die("Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error);
    }

    $statement->bind_param('i', $userID);
    $statement->execute();
    $result = $statement->get_result();

    $totalAmount = 0.00;

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $totalAmount = $row['TotalAmount'];
    }

    $statement->close();

    return $totalAmount;
}

// Function to get the most recent order ID for a user
function getRecentOrderID($userID)
{
    global $mysqli;

    $query = "SELECT MAX(OrderID) AS RecentOrderID FROM orders WHERE UserID = ?";
    $statement = $mysqli->prepare($query);

    if (!$statement) {
        die("Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error);
    }

    $statement->bind_param('i', $userID);
    $statement->execute();
    $result = $statement->get_result();

    $recentOrderID = null;

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $recentOrderID = $row['RecentOrderID'];
    }

    $statement->close();

    return $recentOrderID;
}

// Function to check if the user ID exists
function isUserIDExists($userID)
{
    global $mysqli;

    $query = "SELECT COUNT(*) AS UserCount FROM users WHERE UserID = ?";
    $statement = $mysqli->prepare($query);

    if (!$statement) {
        die("Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error);
    }

    $statement->bind_param('i', $userID);
    $statement->execute();
    $result = $statement->get_result();

    $userCount = 0;

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $userCount = $row['UserCount'];
    }

    $statement->close();

    return $userCount > 0;
}

// Function to insert data into orders table
function createOrder($userID, $totalOrderAmount)
{
    global $mysqli;

    $query = "INSERT INTO orders (OrderDate, UserID, TotalOrderAmount) VALUES (NOW(), ?, ?)";
    $statement = $mysqli->prepare($query);

    if (!$statement) {
        die("Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error);
    }

    $statement->bind_param('id', $userID, $totalOrderAmount);
    $statement->execute();

    // Get the order ID of the newly inserted order
    $orderID = getRecentOrderID($userID);

    return $orderID;
}

// Function to insert data into orderitems table
function addOrderItem($orderID, $productID, $quantity)
{
    global $mysqli;

    // Fetch the product price from the product table
    $priceQuery = "SELECT Price FROM product WHERE ProductID = ?";
    $priceStatement = $mysqli->prepare($priceQuery);

    if (!$priceStatement) {
        die("Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error);
    }

    $priceStatement->bind_param('i', $productID);
    $priceStatement->execute();
    $priceResult = $priceStatement->get_result();

    $price = 0.00;

    if ($priceResult->num_rows > 0) {
        $row = $priceResult->fetch_assoc();
        $price = $row['Price'];
    }

    $priceStatement->close();

    // Insert into OrderItems table
    $insertQuery = "INSERT INTO orderitems (OrderID, ProductID, Quantity, Price) VALUES (?, ?, ?, ?)";
    $insertStatement = $mysqli->prepare($insertQuery);

    if (!$insertStatement) {
        die("Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error);
    }

    $insertStatement->bind_param('iiid', $orderID, $productID, $quantity, $price);
    $insertStatement->execute();

    $insertStatement->close();
}

// Get the JSON data from the request body
$inputData = json_decode(file_get_contents("php://input"), true);

// Check if UserID is set in the request
if (isset($inputData['UserID'])) {
    $userID = $inputData['UserID'];

    // Check if the user ID exists
    if (isUserIDExists($userID)) {
        // Calculate total order amount
        $totalOrderAmount = calculateTotalOrderAmount($userID);

        // Check if total order amount is valid
        if ($totalOrderAmount !== null && $totalOrderAmount > 0) {
            // Create a new order
            $orderID = createOrder($userID, $totalOrderAmount);

            // Retrieve cart items for the user
            $cartQuery = "SELECT ProductID, Quantity FROM cart WHERE UserID = ?";
            $cartStatement = $mysqli->prepare($cartQuery);

            if (!$cartStatement) {
                die("Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error);
            }

            $cartStatement->bind_param('i', $userID);
            $cartStatement->execute();
            $cartResult = $cartStatement->get_result();

            // Add each cart item as an order item
            while ($cartRow = $cartResult->fetch_assoc()) {
                if ($cartRow !== null && isset($cartRow['ProductID']) && isset($cartRow['Quantity'])) {
                    addOrderItem($orderID, $cartRow['ProductID'], $cartRow['Quantity']);
                } else {
                    echo 'Error retrieving cart items';
                    exit;    
                }
            }

            // Clear the user's cart after creating the order
            $clearCartQuery = "DELETE FROM cart WHERE UserID = ?";
            $clearCartStatement = $mysqli->prepare($clearCartQuery);

            if (!$clearCartStatement) {
                die("Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error);
            }

            $clearCartStatement->bind_param('i', $userID);
            $clearCartStatement->execute();

            // Close the database connection
            $mysqli->close();

            // Echo success message in JSON format
            echo json_encode(array("message" => "Order created successfully.", "orderID" => $orderID));
        } else {
            // Echo error message in JSON format
            echo json_encode(array("message" => "Your cart is empty."));
        }
    } else {
        // Echo error message in JSON format if the user ID does not exist
        echo json_encode(array("message" => "Invalid UserID. User not found."));
    }
} else {
    // Echo error message in JSON format if UserID is not set
    echo json_encode(array("message" => "Please provide a valid UserID in the request."));
}



?>
