<?php

class Cart
{
    private $mysqli;

    public function __construct($mysqli)
    {
        $this->mysqli = $mysqli;
    }

    public function addToCart($userID, $productID, $quantity)
    {
        try {
            $existingCartItem = $this->getCartItem($userID, $productID);

            if ($existingCartItem) {
                $newQuantity = $existingCartItem['Quantity'] + $quantity;
                $this->updateCartItem($userID, $productID, $newQuantity);

                return ["success" => true, "message" => "Product quantity updated in the cart."];
            } else {
                $this->insertCartItem($userID, $productID, $quantity);

                return ["success" => true, "message" => "Product added to the cart."];
            }
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }

    public function subtractFromCart($userID, $productID)
    {
        try {
            $existingCartItem = $this->getCartItem($userID, $productID);

            if ($existingCartItem) {
                $newQuantity = $existingCartItem['Quantity'] - 1;

                if ($newQuantity > 0) {
                    $this->updateCartItem($userID, $productID, $newQuantity);
                    return ["success" => true, "message" => "Product quantity updated in the cart."];
                } else {
                    $this->deleteCartItem($userID, $productID);
                    return ["success" => true, "message" => "Product deleted from the cart."];
                }
            } else {
                return ["success" => false, "message" => "Product not found in the cart."];
            }
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }

    public function getProductsInCart($userID)
    {
        $query = "SELECT p.ProductID, p.Name AS ProductName, p.Description, p.Price, p.StockQuantity, p.Image, c.Quantity
                  FROM cart c
                  JOIN product p ON c.ProductID = p.ProductID
                  WHERE c.UserID = ?";
        $statement = $this->mysqli->prepare($query);

        if (!$statement) {
            return ["success" => false, "message" => "Database error."];
        }

        $statement->bind_param('i', $userID);
        $statement->execute();
        $result = $statement->get_result();

        if ($result) {
            $products = [];
            while ($row = $result->fetch_assoc()) {
                $products[] = [
                    "ProductID" => $row['ProductID'],
                    "ProductName" => $row['ProductName'],
                    "Description" => $row['Description'],
                    "Price" => $row['Price'],
                    "StockQuantity" => $row['StockQuantity'],
                    "Image" => $row['Image'],
                    "Quantity" => $row['Quantity']
                ];
            }

            return ["success" => true, "message" => "Products in the cart retrieved successfully.", "data" => $products];
        } else {
            return ["success" => false, "message" => "Error retrieving products from the cart."];
        }
    }

    private function getCartItem($userID, $productID)
    {
        try {
            $query = "SELECT * FROM cart WHERE UserID = ? AND ProductID = ?";
            $statement = $this->mysqli->prepare($query);

            if (!$statement) {
                throw new Exception("Failed to prepare statement.");
            }

            $statement->bind_param('ii', $userID, $productID);
            $statement->execute();
            $result = $statement->get_result();

            return $result->fetch_assoc();
        } catch (Exception $e) {
            throw new Exception("Error: " . $e->getMessage());
        }
    }

    private function insertCartItem($userID, $productID, $quantity)
    {
        try {
            $query = "INSERT INTO cart (UserID, ProductID, Quantity) VALUES (?, ?, ?)";
            $statement = $this->mysqli->prepare($query);

            if (!$statement) {
                throw new Exception("Failed to prepare statement.");
            }

            $statement->bind_param('iii', $userID, $productID, $quantity);
            $statement->execute();
        } catch (Exception $e) {
            throw new Exception("Error: " . $e->getMessage());
        }
    }

    private function updateCartItem($userID, $productID, $quantity)
    {
        try {
            $query = "UPDATE cart SET Quantity = ? WHERE UserID = ? AND ProductID = ?";
            $statement = $this->mysqli->prepare($query);

            if (!$statement) {
                throw new Exception("Failed to prepare statement.");
            }

            $statement->bind_param('iii', $quantity, $userID, $productID);
            $statement->execute();
        } catch (Exception $e) {
            throw new Exception("Error: " . $e->getMessage());
        }
    }

    public function deleteCartItem($userID, $productID)
    {
        try {
            $query = "DELETE FROM cart WHERE UserID = ? AND ProductID = ?";
            $statement = $this->mysqli->prepare($query);

            if (!$statement) {
                throw new Exception("Failed to prepare statement.");
            }

            $statement->bind_param('ii', $userID, $productID);
            $statement->execute();
        } catch (Exception $e) {
            throw new Exception("Error: " . $e->getMessage());
        }
    }
    public function getTotalCartPrice($userID)
    {
        try {
            $query = "SELECT SUM(p.Price * c.Quantity) AS TotalPrice
                      FROM cart c
                      JOIN product p ON c.ProductID = p.ProductID
                      WHERE c.UserID = ?";
            $statement = $this->mysqli->prepare($query);

            if (!$statement) {
                throw new Exception("Database error.");
            }

            $statement->bind_param('i', $userID);
            $statement->execute();
            $result = $statement->get_result();

            if ($result) {
                $totalPrice = $result->fetch_assoc()['TotalPrice'];
                return ["success" => true, "message" => "Total cart price retrieved successfully.", "data" => $totalPrice];
            } else {
                return ["success" => false, "message" => "Error retrieving total cart price."];
            }
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }

    public function getTotalProductCount($userID) {
        try {
            $query = "SELECT SUM(Quantity) AS TotalQuantity FROM cart WHERE UserID = ?";
            $statement = $this->mysqli->prepare($query);

            if (!$statement) {
                throw new Exception("Database error.");
            }

            $statement->bind_param('i', $userID);
            $statement->execute();
            $result = $statement->get_result();

            if ($result) {
                $totalQuantity = $result->fetch_assoc()['TotalQuantity'];
                return ["success" => true, "message" => "Total product count retrieved successfully.", "data" => $totalQuantity];
            } else {
                return ["success" => false, "message" => "Error retrieving total product count."];
            }
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }
    
}
?>
