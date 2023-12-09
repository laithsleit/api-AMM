<?php

class User
{
    private $mysqli;

     /**
     * User constructor.
     *
     * @param mysqli $mysqli Database connection
     */

    public function __construct($mysqli)
    {
        $this->mysqli = $mysqli;
    }

   /**
     * Search users by username or email.
     *
     * @param string $searchInput
     * @return array Result of the search operation (success, message, users)
     */

    public function searchUsers($searchInput)
    {
        $query = "SELECT * FROM users WHERE Username LIKE ? OR Email LIKE ?";
        $stmt = $this->mysqli->prepare($query);

        if ($stmt) {
            $searchInput = "%" . $searchInput . "%";
            $stmt->bind_param('ss', $searchInput, $searchInput);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result) {
                $users = $result->fetch_all(MYSQLI_ASSOC);
                return ["success" => true, "users" => $users];
            } else {
                return ["success" => false, "message" => "Failed to retrieve users"];
            }
        } else {
            return ["success" => false, "message" => "Database error"];
        }
    }

    
}
?>
