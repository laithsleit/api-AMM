<?php

// File: updateProduct.php

// Purpose:
// This file updates an existing product in the "product" table in the database.

// Usage:
// Use POST method to update an existing product.
// Send updated product details as form data, which may include an image file.
// The form data should include fields such as ProductID, CategoryID, Name, Description, Price, StockQuantity, and an optional image file.
// Example form data: 
//   ProductID: 1,
//   CategoryID: 1,
//   Name: "Updated Laptop",
//   Description: "New description",
//   Price: 999.99,
//   StockQuantity: 10,
//   image: [file]

// If an image file is provided, it will replace the existing product image.
// If no image file is provided, the existing image will be retained.

// Example response: {"message":"Product updated successfully."}

// Additional Information:
// - Handles file uploads for product images.
// - Supports multipart/form-data for receiving form data and files.
// - If a new image is not uploaded, the existing image for the product is kept.
// - Returns a JSON response with a success or error message.

include "../include.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    function updateProduct($data)
    {
        global $mysqli;

        $productID = $data['ProductID'];
        $categoryID = $data['categoryID'];
        $name = $data['name'];
        $description = $data['description'];
        $price = $data['price'];
        $stockQuantity = $data['stockQuantity'];
        $image = isset($_FILES['image']) ? $_FILES['image'] : null;

        if ($image && $image['error'] == UPLOAD_ERR_OK) {
            $image_name = $image['name'];
            $image_tmp_name = $image['tmp_name'];
            $upload_path = '../../New folder (3)/images/' . $image_name;
            move_uploaded_file($image_tmp_name, $upload_path);
        } else {
            $currentImageData = $mysqli->query("SELECT Image FROM product WHERE ProductID = $productID")->fetch_assoc();
            $upload_path = $currentImageData['Image'];
        }

        $query = "UPDATE product SET CategoryID = ?, Name = ?, Description = ?, Price = ?, StockQuantity = ?, Image = ? WHERE ProductID = ?";
        $statement = $mysqli->prepare($query);
        $statement->bind_param('issdisi', $categoryID, $name, $description, $price, $stockQuantity, $upload_path, $productID);
        $statement->execute();

        echo json_encode(array("message" => "Product updated successfully."));
    }

    $inputData = $_POST;
    updateProduct($inputData);
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Invalid request method. Use POST."));
}
?>
    