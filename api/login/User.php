<?php

/**
 * Class User
 *
 * Represents a user with signup and login functionality.
 */
class User
{
    private $mysqli;
    private $UserID;
    private $RoleID;

    public function __construct($mysqli)
    {
        $this->mysqli = $mysqli;
    }

    /**
     * Signup function to register a new user.
     *
     * @param string $username
     * @param string $password
     * @param string $email
     * @return array
     */
    /**
 * Signup function to register a new user.
 *
 * @param string $username
 * @param string $password
 * @param string $email
 * @return array
 */
public function signup($username, $password, $email)
{
    // Check if the username or email is already registered
    if ($this->isUserExists($username, $email)) {
        return ["success" => false, "message" => "Username or email already exists."];
    }

    // Hash the password before saving to the database
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert user details into the database
    $query = "INSERT INTO users (Username, Password, Email) VALUES (?, ?, ?)";
    $statement = $this->mysqli->prepare($query);
    $statement->bind_param('sss', $username, $hashedPassword, $email);

    if ($statement->execute()) {
        $signupSuccessful = true;
        $response = ["success" => true, "message" => "Signup successful"];

        // Include additional information in the response
        if ($signupSuccessful) {
            // Set UserID and RoleID after successful signup
            $this->setUserID($this->mysqli->insert_id);
            $this->setRoleID(2);

            $response['UserID'] = $this->getUserID();
            $response['RoleID'] = $this->getRoleID();
        }

        return $response;
    } else {
        return ["success" => false, "message" => "Signup failed."];
    }
}


/**
 * Login function to authenticate a user.
 *
 * @param string $username
 * @param string $password
 * @return array
 */
public function login($username, $password)
{
    // Check if the username exists
    if ($this->isUsernameExists($username)) {
        // Get the hashed password from the database
        $query = "SELECT Password, UserID, RoleID FROM users WHERE Username = ?";
        $statement = $this->mysqli->prepare($query);
        $statement->bind_param('s', $username);
        $statement->execute();
        $result = $statement->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $hashedPassword = $row['Password'];

            // Verify the password
            if (password_verify($password, $hashedPassword)) {
                // Include additional information in the response
              
                return ["success" => true, "message" => "Login successful.", "UserID" =>$row['UserID'], "RoleID" => $row['RoleID']];
            } else {
                return ["success" => false, "message" => "Incorrect password."];
            }
        } else {
            return ["success" => false, "message" => "An unexpected error occurred."];
        }
    } else {
        return ["success" => false, "message" => "Username not found."];
    }
}

    /**
     * Get the User ID.
     *
     * @return int
     */
    public function getUserID()
    {
        return $this->UserID;
    }

    /**
     * Get the Role ID.
     *
     * @return int
     */
    public function getRoleID()
    {
        return $this->RoleID;
    }
    

    /**
     * Check if a user with the given username or email already exists.
     *
     * @param string $username
     * @param string $email
     * @return bool
     */
    private function isUserExists($username, $email)
    {
        // Check if the username or email is already registered
        $query = "SELECT * FROM users WHERE Username = ? OR Email = ?";
        $statement = $this->mysqli->prepare($query);
        $statement->bind_param('ss', $username, $email);
        $statement->execute();
        $result = $statement->get_result();

        return $result->num_rows > 0;
    }

    /**
     * Check if a user with the given username exists.
     *
     * @param string $username
     * @return bool
     */
    private function isUsernameExists($username)
    {
        // Check if the username exists
        $query = "SELECT * FROM users WHERE Username = ?";
        $statement = $this->mysqli->prepare($query);
        $statement->bind_param('s', $username);
        $statement->execute();
        $result = $statement->get_result();

        return $result->num_rows > 0;
    }

    /**
 * Set the UserID of the authenticated user.
 *
 * @param int $userID
 */
private function setUserID($userID)
{
    $this->UserID = $userID;
}

/**
 * Set the RoleID of the authenticated user.
 *
 * @param int $roleID
 */
private function setRoleID($roleID)
{
    $this->RoleID = $roleID;
}

}

?>
