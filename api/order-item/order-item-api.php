    <?php

    include "../include.php";
    include "order-item.php";

    // CORS headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET,POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    // Get the JSON data from the request body
    $inputData = json_decode(file_get_contents("php://input"), true);

    // Assuming you have the following data from the API request
    $orderID = $inputData['OrderID'] ?  $inputData['OrderID'] : null;

    // Create an instance of the OrderItem class
    $orderItem = new OrderItem($mysqli);

    // Check for missing or invalid data
    if ($orderID === null) {
        echo json_encode(["success" => false, "message" => "Missing or invalid data."]);
        exit;
    }

    // Check the request method and perform the corresponding action
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Get order item details based on Order ID
        $result = $orderItem->getOrderItemDetails($orderID);

        // Echo the result in JSON format
        echo json_encode($result);
    } else {
        // Handle invalid request method
        echo json_encode(["success" => false, "message" => "Invalid request method for this endpoint."]);
    }

    // Close the database connection
    $mysqli->close();
    ?>
