<?php

class OrderSearch
{
    /**
     * Search orders within a date range.
     *
     * @param mysqli $db Database connection
     * @param string $startDate Start date (yyyy-mm-dd)
     * @param string $endDate End date (yyyy-mm-dd)
     * @return array Result of the operation (success, orders or message)
     */
    public function searchOrdersByDateRange($db, $startDate, $endDate)
    {
        try {
            // Validate date format
            if (!($this->isValidDateFormat($startDate) && $this->isValidDateFormat($endDate))) {
                return ["success" => false, "message" => "Invalid date format"];
            }
    
            // Perform the database query to retrieve orders within the date range
            $query = "SELECT o.*, u.Username FROM orders o JOIN users u ON u.UserID = o.UserID 
                      WHERE o.OrderDate BETWEEN ? AND ?";
            $stmt = $db->prepare($query);
            $stmt->bind_param("ss", $startDate, $endDate);
            $stmt->execute();
            $result = $stmt->get_result();
    
            // Check if the query was successful
            if ($result) {
                // Fetch and process each row one by one
                $orderData = [];
                while ($row = $result->fetch_assoc()) {
                    $orderData[] = $row;
                }
                $stmt->close(); // Close the statement to free up resources
    
                return ["success" => true, "orders" => $orderData];
            } else {
                return ["success" => false, "message" => "Failed to retrieve orders"];
            }
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }
    

    /**
     * Validate date format (yyyy-mm-dd).
     *
     * @param string $date Date to validate
     * @return bool Whether the date is in the correct format
     */
    private function isValidDateFormat($date)
    {
        $pattern = "/^\d{4}-\d{2}-\d{2}$/";
        return preg_match($pattern, $date);
    }
}
