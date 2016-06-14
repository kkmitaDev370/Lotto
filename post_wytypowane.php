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






$data_array = array();
$n = 0;



$sql = "SELECT ID, pierwsza, druga, trzecia, czwarta, piata, szosta FROM wytypowane";
$result = $conn->query($sql);


if ($result->num_rows > 0) {

     while($row = $result->fetch_assoc()) {

		$data_array[$n][0] = $row['ID'];
		$data_array[$n][1] = $row['pierwsza'];
		$data_array[$n][2] = $row['druga'];
		$data_array[$n][3] = $row['trzecia'];
		$data_array[$n][4] = $row['czwarta'];
		$data_array[$n][5] = $row['piata'];
		$data_array[$n][6] = $row['szosta'];

		$n++;
      	
     }
} 

echo json_encode($data_array);








$sql = "INSERT INTO wytypowane (ID, pierwsza, druga, trzecia, czwarta, piata, szosta)
VALUES ($wytypowane0,$wytypowane1,$wytypowane2,$wytypowane3,$wytypowane4,$wytypowane5,$wytypowane6)";

if ($conn->query($sql) === TRUE) {
    /*echo "New record created successfully";*/
} else {
    /*echo "Error: " . $sql . "<br>" . $conn->error;*/
}

$conn->close();


?>