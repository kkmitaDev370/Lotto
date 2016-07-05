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
        <div class="col-md-5 boxes" id="boxes" style="display:none">
          <div class="boxs">
            <div class="box_1" onclick="change_content(1)"><div>Pokaz <br><small> liczby</small></div></div>
            <div class="box_2"><div>Sprawdz <br>  <small>swoje losowanie</small></div></div>

          </div>
        </div>

        <div class="col-md-5" id="pokaz">
          <h3>Dowiedz sie troche o liczbach w lotto !</h3>
          <p>Wybierz liczbe:</p>
          <input type="text" id="liczba_pokaz"><button type="submit" class="btn btn-primary" onclick="pokaz_liczbe()">Pokaż</button>
          <p>Ze wszystkich zanotowanych losowan <span class="liczba"></span> jest <span class="ile"></span></p>



          <div class="bile">
            <div class="bila">1</div><div class="bila">2</div><div class="bila">3</div><div class="bila">4</div><div class="bila">5</div><div class="bila">6</div><div class="bila">7</div><div class="bila">8</div><div class="bila">9</div><div class="bila">10</div><div class="bila">11</div><div class="bila">12</div><div class="bila">13</div><div class="bila">14</div><div class="bila">15</div><div class="bila">16</div><div class="bila">17</div><div class="bila">18</div><div class="bila">19</div><div class="bila">20</div><div class="bila">21</div><div class="bila">22</div><div class="bila">23</div><div class="bila">24</div><div class="bila">25</div><div class="bila">26</div><div class="bila">27</div><div class="bila">28</div><div class="bila">29</div><div class="bila">30</div><div class="bila">31</div><div class="bila">32</div><div class="bila">33</div><div class="bila">34</div><div class="bila">35</div><div class="bila">36</div><div class="bila">37</div><div class="bila">38</div><div class="bila">39</div><div class="bila">40</div><div class="bila">41</div><div class="bila">42</div><div class="bila">43</div><div class="bila">44</div><div class="bila">45</div><div class="bila">46</div><div class="bila">47</div><div class="bila">48</div><div class="bila">49</div>
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





