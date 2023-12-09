<?php

class Wishlist
{
   /**
 * Add product to the wishlist
 *
 * @param mysqli $db Database connection
 * @param int $userId User ID
 * @param int $productId Product ID
 * @return array Result of the operation (success, message)
 */
public function addToWishlist($db, $userId, $productId)
{
    try {
        // Validate the presence of productId
        if ($productId === null) {
            return ["success" => false, "message" => "Product ID is required"];
        }

        // Check if the product is already in the wishlist for the user
        $checkQuery = "SELECT * FROM wishlist WHERE UserID = ? AND ProductID = ?";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->bind_param("ii", $userId, $productId);
        $checkStmt->execute();
        $checkResult = $checkStmt->get_result();

        // If the product is already in the wishlist, return an error message
        if ($checkResult->num_rows > 0) {
            return ["success" => false, "message" => "This product is already in the wishlist"];
        }

        // Perform the database query to add the product to the wishlist
        $query = "INSERT INTO wishlist (UserID, ProductID) VALUES (?, ?)";
        $stmt = $db->prepare($query);
        $stmt->bind_param("ii", $userId, $productId);
        $querySuccess = $stmt->execute();

        // Check if the query was successful
        if ($querySuccess) {
            return ["success" => true, "message" => "Product added to wishlist successfully"];
        } else {
            return ["success" => false, "message" => "Failed to add product to wishlist"];
        }
    } catch (Exception $e) {
        return ["success" => false, "message" => "Error: " . $e->getMessage()];
    }
}


    /**
     * Get user's wishlist
     *
     * @param mysqli $db Database connection
     * @param int $userId User ID
     * @return array Wishlist data or error message
     */
    public function getWishlist($db, $userId)
    {
        try {
            // Perform the database query to retrieve the user's wishlist
            $query = "SELECT * FROM wishlist WHERE UserID = ?";
            $stmt = $db->prepare($query);
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $result = $stmt->get_result();

            // Check if the query was successful
            if ($result) {
                // Fetch the wishlist data
                $wishlistData = $result->fetch_all(MYSQLI_ASSOC);
                return ["success" => true, "wishlist" => $wishlistData];
            } else {
                return ["success" => false, "message" => "Failed to retrieve wishlist"];
            }
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }

/**
 * Remove product from the wishlist
 *
 * @param mysqli $db Database connection
 * @param int $userId User ID
 * @param int $productId Product ID
 * @return array Result of the operation (success, message)
 */
public function removeFromWishlist($db, $userId, $productId)
{
    try {
        // Validate the presence of productId
        if ($productId === null) {
            return ["success" => false, "message" => "Product ID is required"];
        }

        // Check if the product is in the wishlist for the user
        $checkQuery = "SELECT * FROM wishlist WHERE UserID = ? AND ProductID = ?";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->bind_param("ii", $userId, $productId);
        $checkStmt->execute();
        $checkResult = $checkStmt->get_result();

        // If the product is not in the wishlist, return an error message
        if ($checkResult->num_rows === 0) {
            return ["success" => false, "message" => "This product is not in the wishlist"];
        }

        // Perform the database query to remove the product from the wishlist
        $query = "DELETE FROM wishlist WHERE UserID = ? AND ProductID = ?";
        $stmt = $db->prepare($query);
        $stmt->bind_param("ii", $userId, $productId);
        $querySuccess = $stmt->execute();

        // Check if the query was successful
        if ($querySuccess) {
            return ["success" => true, "message" => "Product removed from wishlist successfully"];
        } else {
            return ["success" => false, "message" => "Failed to remove product from wishlist"];
        }
    } catch (Exception $e) {
        return ["success" => false, "message" => "Error: " . $e->getMessage()];
    }
}

}

?>
