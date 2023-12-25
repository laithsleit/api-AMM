<?php

class Review
{
    private $mysqli;

    public function __construct($mysqli)
    {
        $this->mysqli = $mysqli;
    }

    /**
     * Insert a new review
     *
     * @param int $userID User ID
     * @param int $productID Product ID
     * @param string $reviewText Review text
     * @param int $rating Rating
     * @return array Result of the operation (success, message)
     */
    public function insertReview($userID, $productID, $reviewText, $rating)
    {
        try {
            // Validate the presence of required data
            if ($userID === null || $productID === null || $reviewText === null || $rating === null) {
                return ["success" => false, "message" => "Missing or invalid data."];
            }

            // Perform the database query to insert the review
            $query = "INSERT INTO reviewsandratings (UserID, ProductID, ReviewText, Rating) VALUES (?, ?, ?, ?)";
            $stmt = $this->mysqli->prepare($query);
            $stmt->bind_param("iisi", $userID, $productID, $reviewText, $rating);
            $querySuccess = $stmt->execute();

            // Check if the query was successful
            if ($querySuccess) {
                return ["success" => true, "message" => "Review added successfully"];
            } else {
                return ["success" => false, "message" => "Failed to add review"];
            }
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }

    /**
     * Get reviews with user details (join with user table)
     *
     * @param int $productID Product ID
     * @return array Result of the operation (success, reviews or message)
     */
    public function getReviewsWithUserDetails()
    {
        try {
            // Perform the database query to retrieve reviews with user details
            $query = "SELECT r.*, u.Username,p.Name AS ProductName
            FROM reviewsandratings r
            JOIN users u ON r.UserID = u.UserID
            JOIN product p on r.ProductID = p.ProductID
                      ";
            $stmt = $this->mysqli->prepare($query);
            // $stmt->bind_param("i", $productID);
            $stmt->execute();
            $result = $stmt->get_result();

            // Check if the query was successful
            if ($result) {
                // Fetch the reviews with user details
                $reviews = $result->fetch_all(MYSQLI_ASSOC);
                return ["success" => true, "reviews" => $reviews];
            } else {
                return ["success" => false, "message" => "Failed to retrieve reviews"];
            }
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }

    /**
     * Delete a review
     *
     * @param int $reviewID Review ID
     * @return array Result of the operation (success, message)
     */
    public function deleteReview($reviewID)
    {
        try {
            // Validate the presence of Review ID
            if ($reviewID === null) {
                return ["success" => false, "message" => "Review ID is required"];
            }

            // Perform the database query to delete the review
            $query = "DELETE FROM reviewsandratings WHERE ReviewID = ?";
            $stmt = $this->mysqli->prepare($query);
            $stmt->bind_param("i", $reviewID);
            $querySuccess = $stmt->execute();

            // Check if the query was successful
            if ($querySuccess) {
                return ["success" => true, "message" => "Review deleted successfully"];
            } else {
                return ["success" => false, "message" => "Failed to delete review"];
            }
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }

    /**
 * Retrieves detailed reviews for a specific product based on the product ID. If no product ID is provided, it returns an error.
 * This method fetches the reviews from the 'reviewsandratings' table and joins with the 'users' and 'product' tables 
 * to include additional details like the username and product name.
 *
 * @param int|null $productID The ID of the product for which reviews are being retrieved. Defaults to null.
 * @return array An associative array containing the operation's success status, and either the reviews data or an error message.
 */


 public function getReviewsWithUserDetailsByID($productID = null)
{
    try {
        // Validate the presence of Product ID
        if ($productID === null) {
            return ["success" => false, "message" => "Product ID is required"];
        }

        // Modify the query to filter by ProductID
        $query = "SELECT r.*, u.Username, p.Name AS ProductName
                  FROM reviewsandratings r
                  JOIN users u ON r.UserID = u.UserID
                  JOIN product p ON r.ProductID = p.ProductID
                  WHERE r.ProductID = ?";
        $stmt = $this->mysqli->prepare($query);
        $stmt->bind_param("i", $productID);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result) {
            // Fetch the reviews with user details
            $reviews = $result->fetch_all(MYSQLI_ASSOC);
            return ["success" => true, "reviews" => $reviews];
        } else {
            // Handle case where no reviews are found
            return ["success" => false, "message" => "No reviews found for this product"];
        }
    } catch (Exception $e) {
        // Return an error message if an exception occurs
        return ["success" => false, "message" => "Error: " . $e->getMessage()];
    }
}

}




?>
