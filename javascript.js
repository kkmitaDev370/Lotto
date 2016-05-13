var wylosowane = [];
var data_to_send;
var liczby = [];
var losowanie = [];
for(var i=0;i<6;i++){

	wylosowane[i] = document.getElementsByClassName('wynik_lotto')[i].innerHTML

	console.log(document.getElementsByClassName('wynik_lotto')[i].innerHTML);
}
document.getElementById('losowane').innerHTML = wylosowane;

function post_losy() {


        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("post_losy").innerHTML = xmlhttp.responseText;
            }
        };
        xmlhttp.open("GET", "pehap.php?pierwsza="+wylosowane[0]+"&druga="+wylosowane[1]+"&trzecia="+wylosowane[2]+"&czwarta="+wylosowane[3]+"&piata="+wylosowane[4]+"&szosta="+wylosowane[5], true);
        xmlhttp.send();

}

function get_losy() {

    $.getJSON('get.php', function(losowanie) {

        document.getElementById("get_losy").innerHTML = losowanie;

        for(var i=0;i<losowanie.length;i++){
            console.log(losowanie[i]);


        }

    });

}






/*
object 15[3] 28[2] 23[2]
*/





