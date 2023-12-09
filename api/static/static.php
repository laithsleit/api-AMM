<?php

include "../include.php";
include "DashboardInfo.php";

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Create an instance of the DashboardInfo class
$dashboardInfo = new DashboardInfo($mysqli);

// Check the request method and perform the corresponding action
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get the dashboard information
    $result = $dashboardInfo->getDashboardInfo();

    // Echo the result in JSON format
    echo json_encode($result);
} else {
    // Handle other request methods (if needed)
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}

// Close the database connection
$mysqli->close();
?>
