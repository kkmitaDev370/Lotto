<?php 

include 'connect.php';

$data_array = array();
$n = 0;



$sql = "SELECT pierwsza, druga, trzecia, czwarta, piata, szosta FROM losy";
$result = $conn->query($sql);


if ($result->num_rows > 0) {

     while($row = $result->fetch_assoc()) {

		$data_array[$n][0] = $row['pierwsza'];
		$data_array[$n][1] = $row['druga'];
		$data_array[$n][2] = $row['trzecia'];
		$data_array[$n][3] = $row['czwarta'];
		$data_array[$n][4] = $row['piata'];
		$data_array[$n][5] = $row['szosta'];

		$n++;
      	
     }
} 

echo json_encode($data_array);

$conn->close();



?>



