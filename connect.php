<?php

$servername = "cukiernia.nazwa.pl:3306";
$username = "cukiernia_2";
$password = "Lotto2016";
$dbname = "cukiernia_2";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

?>