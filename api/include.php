<?php

$host = "localhost";
$db_name = "aam_store";
$username = "root";
$password = "";

// Create a MySQLi connection
$mysqli = new mysqli($host, $username, $password, $db_name);

// Check the connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

?>
