---
title: "S-Rank"
headline: "S-Rank"
description: "Co je to S-Rank? Jak ho zjistit, z čeho se počítá a jak ovlivňuje výsledky vyhledávání / SEO."
date: "2015-02-13"
last_modification: "2015-02-18"
status: 1
tags: ["seo", "seznam"]
format: "html"
---

<h2 id="zjistit">Zjištění S-Ranku</h2>

<p>Rank určitého webu jde zjistit například tímto formulářem.</p>

<div class="live no-source">
<form name="rank" oninput="coKdyby(this)" onsubmit="zjistit(this); return false" novalidate>
  <p>
    <label>Doména/URL: <input name="domena" onpaste="vlozit(this)" type="url"></label>
  </p>
</form>  
</div>

<div class="vysledek">
  <p class="vysledek-ukazatel"><span id="ukazatel" class="ukazatel"><b>?</b><span></span><i></i></span></p>
 
  <p id="vysledek"></p>
</div>

<div id="popis"></div>



<h2 id="co">Co je to S-Rank?</h2>

<p>S-Rank je hodnota, kterou webům přiděluje vyhledávací algoritmus, co používá <a href="/seznam">Seznam.cz</a>. Metodika <b>výpočtu ranku</b> není veřejně známá. S-Rank je obdobou tzv. <b>pageranku</b>, který používá <a href="/google">Google</a>.</p>

<p>Podle <a href="http://napoveda.seznam.cz/cz/fulltext-hledani-v-internetu/hledani-fulltext-algoritmus-vyhledavani-razeni-vysledku-faq-dotazy/">nápovědy Seznamu</a> se S-Rank počítá zejména z odkazů. A to jak z odkazů, co na web míří z jiných stránek, tak z odkazů odchozích.</p>

<blockquote cite="http://napoveda.seznam.cz/cz/fulltext-hledani-v-internetu/hledani-fulltext-algoritmus-vyhledavani-razeni-vysledku-faq-dotazy/">
  <p>Počítá se zejména z odkazové sítě algoritmem, který zohledňuje jednak odkazy, které na stránku míří, ale i to, kam ze stránky odkazy vedou.</p>
</blockquote>

<p>Pro <b>vysoký S-Rank</b> je tedy nutné mít na stránku kvalitní zpětné odkazy a zároveň odkazovat na hodnotné zdroje.</p>

<p>Hodnoty S-Ranku se pohybují na stupnici <b>0 až 10</b>. Čím vyšší rank je, tím významnější stránka je. Například stránka <code>seznam.cz</code> má 10.</p>

<p>Nejvyšší hodnotu má většinou <b>hlavní stránka</b> webu, ale nemusí to být pravidlem.</p>









<h2 id="cisla">Význam hodnot</h2>

<dl>
  <dt id="srank-0">S-Rank 0</dt>
  <dd>
    <p>Nulový rank mají stránky, u kterých ještě neproběhl přepočet (typicky se jedná o <b>nově vytvořené</b> weby a stránky).</p>
    
    <p>Má-li nulový rank stránka starší, může to být tím, že na ni nevede žádný odkaz nebo se tváří jako duplicitní.</p>
  </dd>
  
  <dt id="srank-1">S-Rank 1</dt>
  <dd>
    <p>Minimálně jedničku by měla mít v podstatě každá stránka, na kterou vede nějaký odkaz a robot Seznamu si jí už všiml.</p>
    
    <p>SR 1 mohou mít i méně významné podstránky webů s vyšším rankem, na které nevedou externí odkazy a pomocí interních odkazů jsou až v několikáté úrovni.</p>
    
    <p>Jedničku často mají jednostránkové osobní stránky.</p>
  </dd>
  
    <dt id="srank-2">S-Rank 2</dt>
  <dd>
      <p>Dosáhnout hodnoty 2 není zvlášť obtížné. Mívají ji obyčejné málo známé firemní nebo osobní stránky. Případné podstránky důležitějších webů.</p>
  </dd>
  
  <dt id="srank-3">S-Rank 3</dt>
  <dd>
      <p>Pro získání hodnocení 3 už musí web zpravidla disponovat nějakým užitečnějším obsahem. Nebo se jednat o podstránky či kategorie významnějšího webu.</p>
    
    <p>Trojku mají také různé webové služby jako kod.djpw.cz, Fakturoid.cz nebo jdem.cz.</p>
  </dd>
  
  
  <dt id="srank-4">S-Rank 4</dt>
  <dd>
      <p>Čtyřku mají známější blogy, populárnější stránky nebo weby některých poskytovatelů hostingu – například Subreg.cz či eBola.cz.</p>
  </dd>
  
  
  <dt id="srank-5">S-Rank 5</dt>
  <dd>
      <p>SR 5 dosahují zpravidla weby s větším množstvím unikátního obsahu (například matematika.cz nebo jecas.cz).</p>
    
    <p>S-Rank 5 mají také lepší firemní weby nebo stránky známých politických stran.</p>
  </dd>
  
  <dt id="srank-6">S-Rank 6</dt>
  <dd>
      <p>Hodnotu 6 má řada tématických zpravodajských serverů – Lupa.cz, Root.cz, Smartmania.cz, Zdrojak.cz, Games.cz.</p>
    
    <p>Šestku mají taktéž webové stránky větších českých vysokých škol.</p>
  </dd>
  
  <dt id="srank-7">S-Rank 7</dt>
  <dd>
      <p>Dosáhnout na sedmičku už není jen tak. Mají ji už poměrně známé stránky, například blog dfens-cz.com nebo videoserver VideaCesky.cz.</p>
  </dd>
  
  <dt id="srank-8">S-Rank 8</dt>
  <dd>
    <p>Srank 8 má třeba Yahoo.com nebo hlavní stránka <a href="/twitter">Twitteru</a>.</p>
  </dd>
  
  <dt id="srank-9">S-Rank 9</dt>
  <dd>
      <p>Rank 9 mají hodně významné a zavedené české stránky – třeba web České televise, Ihned.cz, Lidovky.cz, Slunecnice.cz, měřicí služba Toplist (kam vede spoustu odkazů z webů s počitadly), herní portál Webgames.cz nebo stránky o tvorbě webu jakpsatweb.cz.</p>
    
    <p>Ze zahraničních webů má devítku obsah Twitteru.</p>
  </dd>
  
  
  
  
  <dt id="srank-10">S-Rank 10</dt>
  <dd>
    <p>SR 10 mají weby, které zná skoro každý, především <b>weby Seznamu</b>. Tedy hlavní stránka a další stránky Seznamu jako Novinky.cz, Sport.cz, Stream.cz a podobně.</p>
    <p>Kromě Seznamu mají desítku i zpravodajské weby jako Idnes.cz, portál Centrum.cz, erotický portál freevideo.cz, CSFD.cz nebo obchod Alza.cz. Ze <b>zahraničních webů</b> má SR 10 Wikipedie, <a href="/facebook">Facebook</a>, <a href="/youtube">YouTube</a> nebo Google.</p>    
  </dd>  
</dl>



<h2 id="listicka">Jiný způsob zjištění ranku</h2>

<p>Kromě použití <i>online checkeru</i> S-Ranku existuje speciální lišta do prohlížeče přímo od Seznamu:</p>

<div class="external-content">
  <ul>
    <li><a href="http://software.seznam.cz/listicka">Seznam Lištička</a></li>
  </ul>
</div>

<p>Lištička může nabízet lehce odlišné hodnoty, protože zobrazuje až rank stránky po případných <b>přesměrováních</b>. Je dostupná jako rozšíření do webových prohlížečů (<b>Internet Explorer</b>, <b>Chrome</b> (tam ale nezobrazuje S-Rank) a <b>Firefox</b>) kromě zobrazení ranku nabízí i další funkce (notifikace e-mailů na Seznamu, slovník atd.).</p>

<p>S-Rank se zobrazuje vpravo vedle URL webu.</p>

<figure>
  <img class="border" src="/files/srank/firefox-s-rank.png" alt="Zobrazení S-Ranku ve Firefoxu">
  <figcaption>Znázornění S-Ranku ve <b>Firefoxu</b></figcaption>
</figure>



<figure>
  <img class="border" src="/files/srank/s-rank-ie.png" alt="Zobrazení S-Ranku v Internet Exploreru">
  <figcaption>Zobrazení S-ranku v <b>IE 11</b></figcaption>
</figure>


<p>Ve <b>Firefoxu</b> se po najetí myší na „S-Rank“ objeví číselně vyjádřená hodnota.</p>

<p><img src="/files/srank/zobrazeni-ranku.gif" alt="Zobrazení číselného ranku po najetí myší" class="border"></p>






<p>Jelikož <b>Lištička</b> v podstatě monitoruje všechny stránky, které s ní člověk navštíví, může existovat i jako jeden ze způsobů, jak dát Seznamu vědět o nové stránce.</p>

<div class="internal-content">
  <ul>
    <li><a href="/pridat-url">Přidat URL na Seznam, Google a Bing</a> – formulář pro ruční přidání webu</li>
  </ul>
</div>




<h2 id="prepocet">Přepočet ranku</h2>

<p>S-Rank se čas od času <b>přepočítává</b>. Zajímavé je, že snížení hodnocení vlastní stránky nemusí nutně znamenat, že se stránka zhoršila. Hodnocení je poměrné, takže se rank sníží i v případě, kdy se „zlepší“ stránka s hodnocením 10.</p>

<div class="external-content">
  <ul>
    <li><time datetime="2015-02-11">2015, únor</time>: <a href="http://fulltext.sblog.cz/2015/02/11/zmena-algoritmu-vypoctu-s-ranku/">Změna algoritmu výpočtu S-Ranku</a></li>
  </ul>
</div>



<h2 id="seo">Vliv na SEO</h2>

<p>Hodnota S-Ranku je pouze jeden z mnoha faktorů pro výsledné umístění dané stránky <b>ve výsledcích hledání</b> (tzv. SERP – <i>Search engine results page</i>). Vysoký rank tedy automaticky nezaručuje úspěch a vyšší posice oproti webů s rankem nižším.</p>

<p><b>Pořadí výsledků</b> ovlivňují i další faktory (například <b>relevance obsahu</b>), takže běžně může být stránka s nižším rankem umístěná lépe, jak je vidět na obrázku při hledání „css selektory“:</p>

<p><img src="/files/srank/vysledky-hledani.png" alt="Umístění ve vyhledávání a S-Rank" class="border"></p>





























<h2 id="zvysit">Jak rank zvýšit</h2>

<p>Protože se hodnota S-Ranku odvíjí hlavně od odkazů, jde ho zvýšit:</p>

<ol>
  <li>získáváním zpětných odkazů z <b>kvalitních webů</b>,</li>
  
  <li><b>nezískáváním</b> nekvalitních zpětných odkazů,</li>
  
  <li><b>odkazováním</b> na kvalitní weby,</li>
  
  <li><b>neodkazováním</b> na nekvalitní weby,</li>
  
  <li>vhodným <b>interním prolinkování stránek</b> (pokud většina externích odkazů směřuje na hlavní stránku, jde zvýšit význam podstránky, když na ni bude odkaz přímo na homepage)</li>
</ol>

<p>Tato pravidla ale platí obecně pro odkazování, takže vysoký S-Rank by měl být přirozeným výsledkem kvalitní práce s obsahem a odkazy webu.</p>




<h2 id="odinstalace">Odstranění S-Ranku</h2>

<p>Pokud už není cílem, aby se u všech stránek díky instalaci Lištičky zobrazovalo pole s S-Rankem, dá se odinstalovat v případě Lištičky pro <b>Internet Explorer</b>, případně odstranit příslušný plugin ve <b>Firefoxu</b>.</p>

<p>Také se jednotlivé části Lištičky dají vypnout.</p>




<h3 id="odebrani">Odinstalace</h3>

<p>Lištičku pro <b>IE</b> se dá standardně odinstalovat po názvem <b>Seznam Software</b> v Ovládacích panelech (<code>Ovládací panely\Programy\Programy a funkce</code>).</p>

<p><img src="/files/srank/odinstalovat.png" alt="Odinstalovaní Seznam lišty" class="border"></p>
















<p>Ve <b>Firefoxu</b> je třeba vypnout/odstranit příslušný doplněk. Ke správě doplňků je snadný přístup po napsání (nakopírování) <code>about:addons</code> do adresního řádku.</p>

<p><img src="/files/srank/odebrat.png" alt="Odebrání pluginu Seznam lišty" class="border"></p>

















<h3 id="vypnuti">Vypnutí S-Ranku</h3>

<p>Po kliknutí pravým tlačítkem na ovládací prvky lištičky jde vyvolat <i>Nastavení</i>, kde se dají jednotlivé součásti povypínat.</p>

<p><img src="/files/srank/vypnuti.png" alt="Vypnutí S-Ranku" class="border"></p>




<script>
  function coKdyby(form) {
    var domena = form.domena.value;
    if (domena.match(/\.(cz|com|net|info|org|biz|sk|eu)$/)) {
        zjistit(form);
    }
  }
  
  function bezHttp(url) {
    return url.replace(/https?:\/\//, '');
  }
  
  function http(url) {
      if (url.match(/https?:\/\//)) {
          return url;
      }
      else {
          return "http://" + url;
      }
  }  
  
  function domain(url) {
      var adresa = http(url);
      var odkaz = document.createElement("a");
      odkaz.href = adresa;    
      return odkaz.protocol + "//" + odkaz.hostname;
  }  
  
  function vlozit(el) {
    setTimeout(function(){
        zjistitRank(el)
    }, 0)  
  }      
  
  function zjistit(form) {
    zjistitRank(form.domena);
  }
  
  function zjistitRank(el) {
    var url = encodeURIComponent(bezHttp(el.value));
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) zobrazit(eval('(' + xhr.responseText + ')'), el.value);
    }
    xhr.open('GET', "/rank/?domena=" + url);
    xhr.send();    
  }
  
  function popisRanku(rank) {
    var popisek = document.getElementById("srank-" + rank);
    if (popisek) {
      return "<div class='soft'>" + popisek.nextElementSibling.innerHTML + "</div>";
    }
    return "";
  }
  
  function zmenitHash(url) {
    window.location.hash = "#url=" + url;
  }
  
  function h(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
    
    return text.replace(/[&<>"']/g, function(m) { 
      return map[m]; 
    });
  }  
  
  var obal = document.getElementById("ukazatel");
  var popis = document.getElementById("popis");
  var vysledek = document.getElementById("vysledek");
  var cislo = obal.getElementsByTagName("b")[0];
  var prubeh = obal.getElementsByTagName("span")[0];
  var ikona = obal.getElementsByTagName("i")[0];
  
  function vypsatVysledek(url) {
    var kod = "<ul><li>Měřená URL: <code><a href='" + h(http(url)) + "'>" + h(url) + "</a></code>";
    kod += "<li><a href='/srank#url=" + h(url) + "'>Odkaz na výsledek</a></ul>";
    kod += "<a class='button' href='/srank'>Zrušit</a>";
    return kod;
  }
  
  function zobrazit(data, url) {
    if (data.status == 200) {
      zmenitHash(url);
      cislo.innerHTML = data.rank;
      popis.innerHTML = popisRanku(data.rank);
      ukazatel.style.background = "url(http://fimg.seznam.cz/?spec=ft100x75&url=" + (domain(url)) + ") no-repeat top left";
      ikona.style.backgroundImage = "url(" + domain(url) + "/favicon.ico)";
      ukazatel.style.backgroundSize = "contain";
      prubeh.style.width = ((parseInt(data.rank) / 10) * 100) + "%";
      //document.forms["rank"].domena.focus();
      //document.forms["rank"].domena.select();
      vysledek.innerHTML = vypsatVysledek(url);      
    }
    else {
      cislo.innerHTML = "?";
      prubeh.style.width = 0;
      vysledek.innerHMTL = "";
    }
  }
  
  if (window.location.hash.match(/^#url\=/)) {
    var adresa  = window.location.hash.replace(/^#url\=/, "");
    document.forms["rank"].domena.value = (adresa);
    zjistitRank(document.forms["rank"].domena);
  }
</script>

<style>
  .ukazatel {
    line-height: 85px;
    width: 100px;
    font-size: 300%;
    border: 1px solid #000;
    display: inline-block;
    text-align: center;
    position: relative;
    font-family: sans-serif;
    font-weight: normal;
    color: #000;
    text-shadow: 0px 0px 5px #ffffff, 0px 0px 5px #ffffff;
  }
  .ukazatel span {
    background: #DE0000;
    height: 10px;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    transition: width .5s;
  }
    
  .ukazatel i {
    position: absolute;
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
    background-size: 100% 100%;
  }
  
  .vysledek {
    overflow: hidden;
  }
  .vysledek-ukazatel {
    float: left;
    margin-right: 2em;
  }
</style>