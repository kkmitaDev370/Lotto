var wylosowane = [];
var data_to_send;
var liczby = [];
var losowanie = [];
var suma = [];
    var results = [];




/*for(var i=0;i<6;i++){

	wylosowane[i] = document.getElementsByClassName('wynik_lotto')[i].innerHTML

	console.log(document.getElementsByClassName('wynik_lotto')[i].innerHTML);
}
document.getElementById('losowane').innerHTML = wylosowane;*/

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





$( document ).ready(function() {
   
       $.getJSON('get.php', function(data) {

            document.getElementById("get_losy").innerHTML = data;
            losowanie = data;
            console.log(losowanie);
            sumuj();
        });

});



function sumuj() {


        for(var i=0;i<losowanie.length;i++){

            console.log('sumowane po raz:'+i);
            suma.push(parseInt(losowanie[i][0]));
            suma.push(parseInt(losowanie[i][1]));
            suma.push(parseInt(losowanie[i][2]));
            suma.push(parseInt(losowanie[i][3]));
            suma.push(parseInt(losowanie[i][4]));
            suma.push(parseInt(losowanie[i][5]));
        }
        console.log(suma);
        powtorka();
}





function powtorka() {


    var sorted_suma = suma.slice().sort();
    console.log('sorted_suma= '+sorted_suma);

    for (var i = 0; i < suma.length; i++) {
        if (sorted_suma[i + 1] == sorted_suma[i]) {
            results.push(sorted_suma[i]);
        }
    }


    console.log('results= '+results);



   
}






/*
object 15[3] 28[2] 23[2]
*/





