<?php

class OrderItem
{
    private $mysqli;

    public function __construct($mysqli)
    {
        $this->mysqli = $mysqli;
    }

    /**
     * Get order item details based on Order ID
     *
     * @param int $orderID Order ID
     * @return array Result of the operation (success, orderItemDetails or message)
     */
    public function getOrderItemDetails($orderID)
    {
        try {
            // Validate the presence of Order ID
            if ($orderID === null) {
                return ["success" => false, "message" => "Order ID is required"];
            }

            // Check if the Order ID exists
            if (!$this->orderExists($orderID)) {
                return ["success" => false, "message" => "Order with ID $orderID does not exist"];
            }

            // Perform the database query to retrieve order item details
            $query = "SELECT oi.*, p.Name AS ProductName
                      FROM orderitems oi
                      JOIN product p ON oi.ProductID = p.ProductID
                      WHERE oi.OrderID = ?";
            $stmt = $this->mysqli->prepare($query);
            $stmt->bind_param("i", $orderID);
            $stmt->execute();
            $result = $stmt->get_result();

            // Check if the query was successful
            if ($result) {
                // Fetch the order item details
                $orderItemDetails = $result->fetch_all(MYSQLI_ASSOC);
                return ["success" => true, "orderItemDetails" => $orderItemDetails];
            } else {
                return ["success" => false, "message" => "Failed to retrieve order item details"];
            }
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }

    /**
     * Check if the order with the given ID exists
     *
     * @param int $orderID Order ID
     * @return bool True if the order exists, false otherwise
     */
    private function orderExists($orderID)
    {
        $checkQuery = "SELECT * FROM orders WHERE OrderID = ?";
        $checkStmt = $this->mysqli->prepare($checkQuery);
        $checkStmt->bind_param("i", $orderID);
        $checkStmt->execute();
        $checkResult = $checkStmt->get_result();
        return $checkResult->num_rows > 0;
    }
}

?>
