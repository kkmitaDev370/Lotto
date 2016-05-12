var wylosowane = [];



for(var i=0;i<10;i++){

	wylosowane[i] = document.getElementsByClassName('wynik_lotto')[i].innerHTML

	console.log(document.getElementsByClassName('wynik_lotto')[i].innerHTML);
}
document.getElementById('losowane').innerHTML = wylosowane;




function pokaz() {

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
            }
        };
        xmlhttp.open("GET", "pehap.php?zmienna=" + wylosowane, true);
        xmlhttp.send();

}
