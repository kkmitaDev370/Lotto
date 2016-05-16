var wylosowane = [];
var data_to_send;
var liczby = [];
var losowanie = [];
var suma = [];
    var results = [];
    var zliczenie;

var arr;


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
            if (results.indexOf(sorted_suma[i]) == -1)     
                results.push(sorted_suma[i]);
        }
    }

    console.log('results= '+results);




    zliczenie = suma.reduce(function(prev, cur) {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});

    console.log('zliczenie= '+zliczenie);







function sortObject(obj) {
    var arr = [];
    var prop;
    for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'int': prop,
                'value': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) {
        return a.int - b.int;
    });
    arr.sort(function(a, b) {
        return b.value - a.value;
    });

    return arr; // returns array
}



sort = sortObject(zliczenie);
console.log('sort= '+sort);
























    for (var i = 0; i < sort.length; i++){

        if(sort[i]['value'] > 1){

            var table = document.getElementById("table");
            var row = table.insertRow(i);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = sort[i]['int'];
            cell2.innerHTML = sort[i]['value'];
        }

         if(sort[i]['value'] == 1){

            var table = document.getElementById("table2");
            var row = table.insertRow(i);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = sort[i]['int'];
            cell2.innerHTML = sort[i]['value'];
        }
       
    }






}






