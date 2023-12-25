<?php

class Order
{
    private $mysqli;

    public function __construct($mysqli)
    {
        $this->mysqli = $mysqli;
    }

    public function getOrdersWithUsername($userID = null)
    {
        try {
            $query = "SELECT o.*, u.Username FROM
             orders o JOIN users u ON u.UserID = o.UserID
              ORDER BY o.OrderDate DESC";

            // If a specific userID is provided, filter the results for that user
            if ($userID !== null) {
                $query .= " WHERE o.UserID = ?";
            }

            $statement = $this->mysqli->prepare($query);

            if (!$statement) {
                throw new Exception("Error preparing the query: " . $this->mysqli->error);
            }

            // If a specific userID is provided, bind the parameter
            if ($userID !== null) {
                $statement->bind_param('i', $userID);
            }

            $statement->execute();
            $result = $statement->get_result();

            if (!$result) {
                throw new Exception("Error fetching orders: " . $this->mysqli->error);
            }

            $orders = [];
            while ($row = $result->fetch_assoc()) {
                $orders[] = $row;
            }

            return ["success" => true, "orders" => $orders];
        } catch (Exception $e) {
            return ["success" => false, "message" => $e->getMessage()];
        }
    }
}

?>
