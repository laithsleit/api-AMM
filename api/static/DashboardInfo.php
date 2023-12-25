<?php

class DashboardInfo
{
    private $mysqli;

    public function __construct($mysqli)
    {
        $this->mysqli = $mysqli;
    }

    /**
     * Get dashboard information.
     *
     * @return array Result of the dashboard information (success, data or message)
     */
    public function getDashboardInfo()
    {
        $data = array();

        // Get new orders count
        $newOrderCount = $this->getNewOrderCount();
        $data[] = ["icon" => "bx bxs-calendar-check", "count" => $newOrderCount, "label" => "New Order"];

        // Get Users count
        $UsersCount = $this->getUsersCount();
        $data[] = ["icon" => "bx bxs-group", "count" => $UsersCount, "label" => "Users"];

        // Get total sales
        $totalSales = $this->getTotalSales();
        $data[] = ["icon" => "bx bxs-dollar-circle", "count" => $totalSales, "label" => "Total Sales"];

        return ["success" => true, "data" => $data];
    }

    private function getNewOrderCount()
    {
        // Implement logic to get new order count from the database
        $query = "SELECT COUNT(*) as count FROM orders WHERE OrderDate > NOW() - INTERVAL 7 DAY;
        ";
        $result = $this->mysqli->query($query);

        if ($result) {
            $row = $result->fetch_assoc();
            return isset($row['count']) ? $row['count'] : 0;
        } else {
            return 0;
        }
    }

    private function getUsersCount()
    {
        // Implement logic to get Users count from the database
        $query = "SELECT COUNT(*) as count FROM users WHERE RoleID = 2";
        $result = $this->mysqli->query($query);

        if ($result) {
            $row = $result->fetch_assoc();
            return isset($row['count']) ? $row['count'] : 0;
        } else {
            return 0;
        }
    }

    private function getTotalSales()
    {
        // Implement logic to get total sales from the database
        $query = "SELECT SUM(TotalOrderAmount) as total_sales FROM orders";
        $result = $this->mysqli->query($query);

        if ($result) {
            $row = $result->fetch_assoc();
            return isset($row['total_sales']) ? $row['total_sales'] : 0;
        } else {
            return 0;
        }
    }
}

?>
