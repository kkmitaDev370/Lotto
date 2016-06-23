
var wylosowane = [];
var losowanie = [];
var suma = [];
var results = [];
var sortable_more=[];
var sortable_less=[];
var wytypowane = [];
var schowek = [];
var zliczenie = [];
var y=0;
var last_losowanie;
var nr_losowanie;
var ost_losowanie = document.getElementsByClassName('wynik')[0].getElementsByTagName('td')[1].innerHTML;
var wytypowane_array = [];



/*=====                     POBRANIE                   =====*/  

$( document ).ready(function() {
   
       $.getJSON('get.php', function(data) {

            losowanie = data;
            last_losowanie = losowanie[losowanie.length-1];
            console.log('losowanie = '+losowanie);
            head(); 


        });

});




function head() {

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
        console.log("body");
        body();
    }
    footer();
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












function body() {


    suma = [];
    results = [];
    sortable_more=[];
    sortable_less=[];
    wytypowane = [];
    zliczenie;


    /*=====                     ZSUMOWANIE                   =====*/   
    /*=====      sumowanie wszystkich losowan do tabeli      =====*/   

            suma = [];

            for(var i=0;i<losowanie.length;i++){

                suma.push(parseInt(losowanie[i][1]));
                suma.push(parseInt(losowanie[i][2]));
                suma.push(parseInt(losowanie[i][3]));
                suma.push(parseInt(losowanie[i][4]));
                suma.push(parseInt(losowanie[i][5]));
                suma.push(parseInt(losowanie[i][6]));
            }
            console.log('suma = '+suma);


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


    console.log("wytypowane= "+wytypowane);

    $.post("post_wytypowane.php",
    {
        wytypowane0: nr_losowanie,
        wytypowane1: wytypowane[0][0],
        wytypowane2: wytypowane[1][0],
        wytypowane3: wytypowane[2][0],
        wytypowane4: wytypowane[3][0],
        wytypowane5: wytypowane[4][0],
        wytypowane6: wytypowane[5][0]
    });

console.log("----------------------// BODY -----------------------------");
}



function footer () {
    $.getJSON('get_wytypowane.php', function(data) {
        wytypowane_array = data;
        display();
    });
}



/*=====                 DISPLAY                      =====*/   
/*=====        wyswietlenie zbiorow w tabeli/DIV        =====*/   

function display() {

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

    document.getElementById('losowanie_length').innerHTML += losowanie.length;



    var elem = document.getElementById("podsumowanie");
    var table = document.createElement("table");
        table.className = "table";

    var thdh = document.createElement('thead');
        var tr = document.createElement('tr');
        var th_1 = document.createElement('th');
            th_1.innerHTML = "Losowanie";
        var th_2 = document.createElement('th');
            th_2.innerHTML = "Wytypowane";
             tr.appendChild(th_1)
             tr.appendChild(th_2)
             thdh.appendChild(tr);

    var tbdy = document.createElement('tbody');

        for (var i = 0; i < wytypowane_array.length-1 ; i++){

            var y = 0;
            while (losowanie[y][0] != wytypowane_array[i][0]) {
                y++;
            }

            var tr = document.createElement('tr');
            var td_1 = document.createElement('td');
            for (var x=1;x<7;x++) {
                var div = document.createElement('div');
                div.className = "ball";
                div.style.backgroundColor = check_number_repetition(losowanie[y][x]);
                div.title = zliczenie[losowanie[y][x]];
                div.innerHTML += losowanie[y][x];
                div.onclick = function() { popup(this.title,this.innerHTML); };
                td_1.appendChild(div)
            }
            var td_2 = document.createElement('td');
            for (var z=1;z<7;z++) {
                var div_2 = document.createElement('div');
                for(var w=1;w<7;w++){
                    if (wytypowane_array[i][z] == losowanie[y][w])
                        div_2.className = "repeat";
                }
                div_2.className += " ball";
                div_2.innerHTML +=  wytypowane_array[i][z];
                td_2.appendChild(div_2)
            }
            tr.appendChild(td_1)
            tr.appendChild(td_2)
            tbdy.appendChild(tr);
        }

    table.appendChild(thdh);
    table.appendChild(tbdy);
    elem.appendChild(table);




}




function check_number_repetition(num){
    var max = check_max();
    if(zliczenie[num] == max-6)
        return "#d2ff4d";
    if(zliczenie[num] == max-5)
        return "#33cc33";
    if(zliczenie[num] == max-4)
        return "#4da6ff";
    if(zliczenie[num] == max-3)
        return "#4d4dff";
    if(zliczenie[num] == max-2)
        return "#ff4da6";
    if(zliczenie[num] >= max-1)
        return "#ff4d4d";

}


function check_max() {
    var max = 0;
    for(var i=1;i<50;i++){
        if (zliczenie[i] > max)
            max = zliczenie[i];
    }
    return max;
}




function popup(count,content) {

           


            var x = event.clientX;
            var y = event.clientY;
            var coords = "X coords: " + x + ", Y coords: " + y;

            x -= 30;
        

            var popup = document.getElementById('popup');
            popup.style.top = y+"px";
            popup.style.left = x+"px";
            popup.style.display = "block";
            popup.innerHTML = content+" wystąpiło/ła "+count+" razy";
}

 function hide(el){
                el.style.display="none";
}





















