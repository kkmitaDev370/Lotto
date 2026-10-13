<?php 

include 'connect.php';

/*
$test = $_REQUEST["data"];
*/
$wytypowane0 = $_REQUEST["wytypowane0"];
$wytypowane1 = $_REQUEST["wytypowane1"];
$wytypowane2 = $_REQUEST["wytypowane2"];
$wytypowane3 = $_REQUEST["wytypowane3"];
$wytypowane4 = $_REQUEST["wytypowane4"];
$wytypowane5 = $_REQUEST["wytypowane5"];
$wytypowane6 = $_REQUEST["wytypowane6"];



$sql = "INSERT INTO wytypowane (ID, pierwsza, druga, trzecia, czwarta, piata, szosta)
VALUES ($wytypowane0,$wytypowane1,$wytypowane2,$wytypowane3,$wytypowane4,$wytypowane5,$wytypowane6)";

if ($conn->query($sql) === TRUE) {
    /*echo "New record created successfully";*/
} else {
    /*echo "Error: " . $sql . "<br>" . $conn->error;*/
}

$conn->close();


?>