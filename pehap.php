<?php 

include 'connect.php';

/*
$test = $_REQUEST["data"];
*/
$ID = $_REQUEST["ID"];
$pierwsza = $_REQUEST["pierwsza"];
$druga = $_REQUEST["druga"];
$trzecia = $_REQUEST["trzecia"];
$czwarta = $_REQUEST["czwarta"];
$piata = $_REQUEST["piata"];
$szosta = $_REQUEST["szosta"];






$sql = "INSERT INTO losy (ID, pierwsza, druga, trzecia, czwarta, piata, szosta)
VALUES ($ID, $pierwsza, $druga, $trzecia, $czwarta, $piata, $szosta)";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}





$conn->close();


?>