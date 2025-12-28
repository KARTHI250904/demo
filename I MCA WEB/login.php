<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

$result = $conn->query("SELECT * FROM users WHERE email='$email'");

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    if (password_verify($password, $row['password'])) {
        echo "Login Successful";
    } else {
        echo "Invalid Password";
    }
} else {
    echo "User Not Found";
}
?>
