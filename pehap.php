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
$data = $_REQUEST["data"];


echo "data= ".$data;


$sql = "INSERT INTO losy (ID, pierwsza, druga, trzecia, czwarta, piata, szosta, data)
VALUES ($ID, $pierwsza, $druga, $trzecia, $czwarta, $piata, $szosta, $data)";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}





$conn->close();


?>


