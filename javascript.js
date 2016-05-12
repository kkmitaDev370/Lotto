var wylosowane = [];




/*
for(var i=0;i<6;i++){

	wylosowane[i] = document.getElementsByClassName('wynik_lotto')[i].innerHTML

	console.log(document.getElementsByClassName('wynik_lotto')[i].innerHTML);

}

document.getElementById('losowane').innerHTML = wylosowane;


*/


var variableToSend = 'foo';




function test() {
    $http({
        url: "pehap.php",
        method: "POST",
        data: {
            data: variableToSend
        }
    }).success(function(response) {
    console.log(response);
});


  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      document.getElementById('losowane').innerHTML = xhttp.responseText;
    }
  };
  xhttp.open("GET", "pehap.php?fname=Henry&lname=Ford", true);
  xhttp.send();
}



