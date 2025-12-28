<?php
// Database connection
$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'library';

$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$book_no = $_POST['book_no'];
$author = $_POST['author'];
$edition = $_POST['edition'];
$publisher = $_POST['publisher'];

// Insert data into table
$sql = "INSERT INTO books (book_no, author, edition, publisher)
        VALUES ('$book_no', '$author', '$edition', '$publisher')";

if (mysqli_query($conn, $sql)) {
    echo "<h3>Book details stored successfully!</h3>";
} else {
    echo "Error: " . mysqli_error($conn);
}

// Close connection
$conn->close();
?>
