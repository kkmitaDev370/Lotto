
var wylosowane = [];
var losowanie = [];
var suma = [];
var results = [];
var sortable_more=[];
var sortable_less=[];
var wytypowane = [];
var schowek = [];
var zliczenie;
var y=0;
var last_losowanie;
var nr_losowanie;
var ost_losowanie = document.getElementsByClassName('wynik')[0].getElementsByTagName('td')[1].innerHTML;


function posting() {

    nr_losowanie = parseInt(last_losowanie[0]);

    while (nr_losowanie <= ost_losowanie) {
        if (nr_losowanie != last_losowanie[0]) {

            wylosowane = [];

            for(var g=1; g<7; g++) {
               wylosowane[g] = document.getElementsByClassName(nr_losowanie+'-rosnaco')[y].getElementsByClassName('wynik_lotto')[g-1].innerHTML;
            }
            wylosowane[0] = nr_losowanie;

            console.log("wylosowane = "+wylosowane);
            losowanie.push(wylosowane);
            post_losy()
        }

        nr_losowanie++;
    }

}

/*=====                     WYSLANIE                   =====*/  

function post_losy() {
        console.log('POST LOSY');
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(data) {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
               
            }
        };
        xmlhttp.open("GET", "pehap.php?ID="+wylosowane[0]+"&pierwsza="+wylosowane[1]+"&druga="+wylosowane[2]+"&trzecia="+wylosowane[3]+"&czwarta="+wylosowane[4]+"&piata="+wylosowane[5]+"&szosta="+wylosowane[6], false);
        xmlhttp.send();

}

/*=====                     POBRANIE                   =====*/  

$( document ).ready(function() {
   
       $.getJSON('get.php', function(data) {

            losowanie = data;
            last_losowanie = losowanie[losowanie.length-1];
            console.log(losowanie);
            posting(); 

            start();
        });

});


function start() {

/*=====                     ZSUMOWANIE                   =====*/   
/*=====      sumowanie wszystkich losowan do tabeli      =====*/   

        for(var i=0;i<losowanie.length;i++){

            suma.push(parseInt(losowanie[i][1]));
            suma.push(parseInt(losowanie[i][2]));
            suma.push(parseInt(losowanie[i][3]));
            suma.push(parseInt(losowanie[i][4]));
            suma.push(parseInt(losowanie[i][5]));
            suma.push(parseInt(losowanie[i][6]));
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
for (var t=1;t<7;t++) {
   button.innerHTML += losowanie[losowanie.length-1][t] + "  "; 
}
elem.appendChild(button);


}







