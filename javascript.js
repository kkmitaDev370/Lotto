var wylosowane = [];
var data_to_send;
var liczby = [];
var losowanie = [];
var suma = [];
    var results = [];
var zliczenie;
var arr;
var sortable_more=[];
var sortable_less=[];
var wytypowane = [];

for(var i=0;i<6;i++){

    wylosowane.push(parseInt(document.getElementsByClassName('wynik_lotto')[i].innerHTML));

	console.log(document.getElementsByClassName('wynik_lotto')[i].innerHTML);
}

function spr_POST(){
    for(var i=0;i<6;i++){
        if (wylosowane[i]!=losowanie[losowanie.length-1][i])
            return false;
    }
    return true;
}


function post_losy() {
        console.log('POST LOSY');
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            }
        };
        xmlhttp.open("GET", "pehap.php?pierwsza="+wylosowane[0]+"&druga="+wylosowane[1]+"&trzecia="+wylosowane[2]+"&czwarta="+wylosowane[3]+"&piata="+wylosowane[4]+"&szosta="+wylosowane[5], true);
        xmlhttp.send();

}


function check_day() {
    var date = new Date();
    if (date.getDay() == 3 || 5 || 7 ){
        if (!spr_POST()) {
            losowanie.push(wylosowane);
            post_losy();
        }
    }
}



$( document ).ready(function() {
   
       $.getJSON('get.php', function(data) {

            losowanie = data;
            console.log(losowanie);
            check_day(); 
            start();



        });

});



function start() {

/*=====                     ZSUMOWANIE                   =====*/   
/*=====      sumowanie wszystkich losowan do tabeli      =====*/   

        for(var i=0;i<losowanie.length;i++){

            suma.push(parseInt(losowanie[i][0]));
            suma.push(parseInt(losowanie[i][1]));
            suma.push(parseInt(losowanie[i][2]));
            suma.push(parseInt(losowanie[i][3]));
            suma.push(parseInt(losowanie[i][4]));
            suma.push(parseInt(losowanie[i][5]));
        }
        console.log(suma);


/*=====                 ZLICZENIE                 =====*/   
/*=====      ile jest danej liczby w zbiorze      =====*/   


     zliczenie = suma.reduce(function(prev, cur) {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});

    console.log('zliczenie= '+zliczenie);

/*=====                     SORT                   =====*/   
/*=====        posortowanie na dwie tabele         =====*/   


for(var key in zliczenie)
        if(zliczenie.hasOwnProperty(key) && zliczenie[key]>1)
            sortable_more.push([key, zliczenie[key]]); 
        else
            sortable_less.push([key, zliczenie[key]]); 


    sortable_more.sort(function(a, b)
    {
            return b[1]-a[1];
    });
    sortable_less.sort(function(a, b)
    {
            return a[0]-b[0];
    });


console.log("sortable_more= "+sortable_more);
console.log("sortable_less= "+sortable_less);

/*=====                     WYTYPOPWANE                   =====*/   
/*=====               przeslanie wytypowanych             =====*/   


for (var i = 0; i < sortable_more.length ; i++){
    if(i<6)
        wytypowane.push(sortable_more[i]);

    

}

if (wytypowane.length < 6) {
    var liczba_losowa = Math.floor((Math.random() * sortable_less.length) + 1);
    wytypowane.push(liczba_losowa);

    /*... SKONCZYC.....
            dopelnic WYTYPOWANE o brakujace elementy
    */

}




wytypowane.sort(function(a, b)
{
        return a[0]-b[0];
});



/*=====                 DISPLAY                      =====*/   
/*=====        wyswietlenie zbiorow w tabeli/DIV        =====*/   


/*    for (var i = 0; i < sortable_more.length; i++){
            var table = document.getElementById("table");
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = sortable_more[i][0];
            cell2.innerHTML = sortable_more[i][1];   
    }

    for (var i = 0; i < sortable_less.length; i++){
            var table = document.getElementById("table2");
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = sortable_less[i][0];
            cell2.innerHTML = sortable_less[i][1];
    }
*/



for (var i = 0; i < wytypowane.length ; i++){
    var elem = document.getElementById("display_losy");
    var button = document.createElement("DIV");
    button.setAttribute("class", "col-md-2");
    button.innerHTML = wytypowane[i][0];
    elem.appendChild(button);

    var elem_2 = document.getElementById("display_losy_ile");
    var button_2 = document.createElement("DIV");
    button_2.setAttribute("class", "col-md-2");
    button_2.innerHTML = wytypowane[i][1];
    elem_2.appendChild(button_2);
}


var elem = document.getElementById("last_losowanie");
var button = document.createElement("DIV");
button.innerHTML = losowanie[losowanie.length-1];
elem.appendChild(button);








}



/*
function loop(){
    console.log('loop');
    setTimeout(function(){ 
    check_day();
    loop();
    }, 86400000);
}
*/






/*



function sortProperties(obj)
{
  // convert object into array
    var sortable=[];
    for(var key in obj)
        if(obj.hasOwnProperty(key))
            sortable.push([key, obj[key]]); // each item is an array in format [key, value]

    // sort items by value
    console.log("sortable = "+sortable);


    sortable.sort(function(a, b)
    {
        if (a[1]==1) {
            return b[0]-a[0]; // compare numbers
            }
        else
            return b[1]-a[1]; // compare numbers
    });


    return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}





sort = sortProperties(zliczenie,true);
console.log('sort= '+sort);


*/