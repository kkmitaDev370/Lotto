<?php 

include 'connect.php';


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

$conn->close();


?>