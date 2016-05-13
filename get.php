<?php 

include 'connect.php';

$data_array = array();
$n = 0;



$sql = "SELECT pierwsza, druga, trzecia, czwarta, piata, szosta FROM losowania";
$result = $conn->query($sql);


if ($result->num_rows > 0) {

     while($row = $result->fetch_assoc()) {

		$data_array[$n]['pierwsza'] = $row['pierwsza'];
		$data_array[$n]['druga'] = $row['druga'];
		$data_array[$n]['trzecia'] = $row['trzecia'];
		$data_array[$n]['czwarta'] = $row['czwarta'];
		$data_array[$n]['piata'] = $row['piata'];
		$data_array[$n]['szosta'] = $row['szosta'];

		$n++;
      	
     }
} 

echo json_encode($data_array);

$conn->close();



?>



