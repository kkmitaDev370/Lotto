<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Lotto</title>

    <link href="style.css" rel="stylesheet">
    <link rel="shortcut icon" href="http://lottocdn.directtraffic.pl/sites/default/files/basic_favicon_1.ico" type="image/x-icon" /> 
    <link href='http://fonts.googleapis.com/css?family=Alegreya+Sans&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
  </head>
  <body>
  

<div class="container">
  <div class="row">
    <div class="col-md-12">
      

      <h1>Losowanie na dziś to: </h1>
      <br>

      <div class="show_losy">
        <div id="display_losy">
        </div>
        <div id="display_losy_ile">
        </div>
      </div>
      <div class="clear"></div>







      <div class="row">

        <div class="col-md-7">
          <div class="tabelka">
              <div id="podsumowanie"></div>
              <div class="white_shadow"></div>
          </div>

          <div class="clear"></div>

          <div id="legenda">
            <span>Legenda: <small>(powtórzenia liczb)</small> </span>
            <div id="wykres"></div>
            <span>Rzadko</span><span>Często</span>
          </div>

        </div>
        <div class="col-md-5 boxes" id="boxes">
          <div class="boxs">
            <div class="box_1" onclick="change_content(1)"><div>Pokaz <br><small> liczby</small></div></div>
            <div class="box_2"><div>Sprawdz <br>  <small>swoje losowanie</small></div></div>

          </div>
        </div>

        <div class="col-md-5" id="pokaz" style="display:none">
          <h3>Dowiedz sie troche o liczbach w lotto !</h3>
          <p>Wybierz liczbe:</p>



          <div class="bile">
            <div class="bila" onclick="pokaz_liczbe(this)">1</div><div class="bila" onclick="pokaz_liczbe(this)">2</div><div class="bila" onclick="pokaz_liczbe(this)">3</div><div class="bila" onclick="pokaz_liczbe(this)">4</div><div class="bila" onclick="pokaz_liczbe(this)">5</div><div class="bila" onclick="pokaz_liczbe(this)">6</div><div class="bila" onclick="pokaz_liczbe(this)">7</div><div class="bila" onclick="pokaz_liczbe(this)">8</div><div class="bila" onclick="pokaz_liczbe(this)">9</div><div class="bila" onclick="pokaz_liczbe(this)">10</div><div class="bila" onclick="pokaz_liczbe(this)">11</div><div class="bila" onclick="pokaz_liczbe(this)">12</div><div class="bila" onclick="pokaz_liczbe(this)">13</div><div class="bila" onclick="pokaz_liczbe(this)">14</div><div class="bila" onclick="pokaz_liczbe(this)">15</div><div class="bila" onclick="pokaz_liczbe(this)">16</div><div class="bila" onclick="pokaz_liczbe(this)">17</div><div class="bila" onclick="pokaz_liczbe(this)">18</div><div class="bila" onclick="pokaz_liczbe(this)">19</div><div class="bila" onclick="pokaz_liczbe(this)">20</div><div class="bila" onclick="pokaz_liczbe(this)">21</div><div class="bila" onclick="pokaz_liczbe(this)">22</div><div class="bila" onclick="pokaz_liczbe(this)">23</div><div class="bila" onclick="pokaz_liczbe(this)">24</div><div class="bila" onclick="pokaz_liczbe(this)">25</div><div class="bila" onclick="pokaz_liczbe(this)">26</div><div class="bila" onclick="pokaz_liczbe(this)">27</div><div class="bila" onclick="pokaz_liczbe(this)">28</div><div class="bila" onclick="pokaz_liczbe(this)">29</div><div class="bila" onclick="pokaz_liczbe(this)">30</div><div class="bila" onclick="pokaz_liczbe(this)">31</div><div class="bila" onclick="pokaz_liczbe(this)">32</div><div class="bila" onclick="pokaz_liczbe(this)">33</div><div class="bila" onclick="pokaz_liczbe(this)">34</div><div class="bila" onclick="pokaz_liczbe(this)">35</div><div class="bila" onclick="pokaz_liczbe(this)">36</div><div class="bila" onclick="pokaz_liczbe(this)">37</div><div class="bila" onclick="pokaz_liczbe(this)">38</div><div class="bila" onclick="pokaz_liczbe(this)">39</div><div class="bila" onclick="pokaz_liczbe(this)">40</div><div class="bila" onclick="pokaz_liczbe(this)">41</div><div class="bila" onclick="pokaz_liczbe(this)">42</div><div class="bila" onclick="pokaz_liczbe(this)">43</div><div class="bila" onclick="pokaz_liczbe(this)">44</div><div class="bila" onclick="pokaz_liczbe(this)">45</div><div class="bila" onclick="pokaz_liczbe(this)">46</div><div class="bila" onclick="pokaz_liczbe(this)">47</div><div class="bila" onclick="pokaz_liczbe(this)">48</div><div class="bila" onclick="pokaz_liczbe(this)">49</div>
          </div>

          <div class="clear"></div>

          <div id="opisz">
            <div>Ze wszystkich zanotowanych losowan</div>
            <div class="liczba"></div>
            <div>jest</div>
            <div class="ile"></div>
          </div>

        </div>


      </div>






          <div class="col-md-3">
                <div id="last_losowanie" class="windows">
                  Ostatnie losowanie to : <br>
                </div>
          </div>
          <div class="col-md-3">
                <div id="losowanie_length" class="windows">
                  Ilość losowań w bazie : <br>
                </div>
          </div>


    </div>
  </div>
</div>



    <div id="content"><?php include 'php/content.php';?></div> 
    <div id="popup"></div>

    <script src="http://code.jquery.com/jquery-2.2.3.min.js"></script>
    <script src="javascript.js"></script>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">

  </body>
</html>





