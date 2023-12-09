<?php

class Product
{
    private $mysqli;

    public function __construct($mysqli)
    {
        $this->mysqli = $mysqli;
    }

    /**
     * Search products by parameters (name, category, or price range).
     *
     * @param array $searchParameter The parameters to search for (name, categoryID, minPrice, maxPrice)
     * @return array Result of the search (success, products or message)
     */
    public function searchProducts($searchParameter)
    {
        $query = "SELECT * FROM product WHERE 
                  Name LIKE ? OR 
                  Description LIKE ? ";
        $stmt = $this->mysqli->prepare($query);

        if ($stmt) {
            // Assuming $searchParameter is an associative array
            $name =  "%" . $searchParameter . "%" ;
            $Description = "%" . $searchParameter . "%" ;
            

            $stmt->bind_param('ss', $name, $Description);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result) {
                $products = $result->fetch_all(MYSQLI_ASSOC);
                return ["success" => true, "products" => $products];
            } else {
                return ["success" => false, "message" => "Failed to retrieve products"];
            }
        } else {
            return ["success" => false, "message" => "Database error"];
        }
    }
}
?>
