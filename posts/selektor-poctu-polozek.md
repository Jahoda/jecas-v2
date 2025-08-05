---
title: "Selektor elementů podle jejich počtu"
headline: "Styl elementů podle jejich počtu"
description: "Jak pomocí CSS odlišně stylovat položky v závislosti na jejich počtu."
date: "2015-03-06"
last_modification: "2015-03-06"
status: 1
tags: ["css", "napady", "selektory-css"]
format: "html"
---

<p>Kromě přizpůsobování obsahu stránky šířce prohlížeče (<a href="/responsive">responsivní design</a>) je jedním z oříšků při navrhování CSS vypořádání se s <b>proměnlivým počtem položek</b> – například ve vodorovné navigaci.</p>

<p>Pokud se nastavením velikostí písma, odsazením a podobně připraví horisontální <a href="/menu">menu</a> pro čtyři položky, může nastat problém při přidávání dalších položek.</p>

<p>V případě, že na variabilní počet tvůrce webu <b>nemyslel</b>, stane se něco z následujících případů:</p>

<ol>
  <li>Jednotlivé odkazy na sebe budou nepěkně nalepeny.</li>
  
  <li>Nabídka se rozuteče na více řádků, což nemusí zase tolik vadit. Položky budou pořád srozumitelně čitelné.</li>
</ol>

<p>Tyto možnosti znázorňuje obrázek (optimální se zdá poslední způsob, kde se zmenší velikost písma):</p>

<p><img src="/files/selektor-poctu-polozek/menu.png" alt="Menu s hodně položkami" class="border"></p>

















<p>Také se může stát, že se menu do prostoru zkrátka nevejde, takže buď vyleze ze svého rodičovského elementu, nebo bude oříznuté (<code>overflow: hidden</code>).</p>

<p>Nejsnazší je nejspíš počítat s přetečením do více řádků. K lepšímu výsledku ale povede stylování <b>na základě počtu položek</b>.</p>




<h2 id="css">CSS selektor pro počet</h2>

<p>Jedna možnost je počet položek spočítat JavaScriptem a nastavit podle toho společnému rodiči třídu. Nebo přímo skriptem přeměřovat rozměry a podle toho velikost písma upravovat.</p>

<p>Existuje ale i způsob čistě v CSS pomocí <a href="/css-selektory">selektorů</a> funkčních od <b>IE 9</b>.</p>




<h2 id="jedna">Jedna položka</h2>

<p>Pro příklad se bude vycházet z HTML kódu následující podoby:</p>

<pre><code>&lt;div class="polozky">
  &lt;div class="polozka">1&lt;/div>
  &lt;div class="polozka">2&lt;/div>
  …
&lt;/div></code></pre>


<p>Že je položka jen jedna, jde určit selektorem <code>only-child</code> nebo <code>only-of-type</code> (pro zohlednění jen totožných názvů HTML značek).</p>

<pre><code>.polozka:only-child {
  /* jen jedna */
}</code></pre>





<p>Na základě toho není problém v případě jediné položky zvětšit její rozměr. První položka je větší jen proto, že je v rodičovském elementu osamocená.</p>

<div class="live">
  <style>
    .polozka {
        width: 5em;
    }    
    .polozka:only-of-type {
        width: 10.4em;
    }    
  </style>
  <div class="polozky">
      <div class="polozka">jediná položka</div>
  </div>
  <div class="polozky">
      <div class="polozka">dvě</div>
      <div class="polozka">položky</div>
  </div>      
</div>


<h2 id="vice">Přesný počet položek</h2>

<p>Pro sestavení selektoru pro přesně stanovený počet elementů poslouží selektor <code>nth-last-child</code>.</p>

<p>Ten zaměří <i>n</i> elementů od konce. Protože je cílem reagovat na přesný počet, použije se ještě <code>:first-child</code> (aby <i>n</i>-tá položka od konce byla zároveň první).</p>


<pre><code>.polozka:nth-last-child(3):first-child {
  /* styly pro první položku ze 3 */
}</code></pre>

<p>Nakonec stačí přes selektor <a href="/css-selektory#libovolny-sourozenec">libovolného sourozence</a> zaměřit i ostatní položky:</p>

<pre><code>.polozka:nth-last-child(3):first-child,
.polozka:nth-last-child(3):first-child <b>~</b> .polozka {
  /* styly pro položky, když jsou 3 */
}</code></pre>


<p>Pro vyzkoušení zkuste pár položek přidat.</p>

<p>
    <button onclick="pridat()">+ Přidat</button>
    <button id="odebratBtn" style="display: none" onclick="odebrat()">Odebrat</button>
</p>

<div class="live no-source">
<div class="polozky" id="polozky">
    <div class="polozka">Položka</div>
</div>  
</div>


<p>Velikost písma položek by se měla dynamicky měnit podle toho, jestli je jen jedna, dvě, tři nebo čtyři.</p>




<h2 id="vice-mene">Více nebo méně než <i>n</i></h2>

<p>Nastavovat speciální styl pro každý přesný počet by nemuselo být úplně elegantní, naštěstí jde snadno selektor upravit, aby se vztahoval na počet položek od do.</p>

<h3 id="vice">Počet položek <i>n</i> a více</h3>

<pre><code>.polozka:nth-last-child(<b>n</b> + 4):first-child,
.polozka:nth-last-child(<b>n</b> + 4):first-child <b>~</b> .polozka {
  /* styly pro položky, když jsou 4 a více */
}</code></pre>


<h3 id="mene">Položek <i>n</i> a méně</h3>

<pre><code>.polozka:nth-last-child(<b>-n</b> + 3):first-child,
.polozka:nth-last-child(<b>-n</b> + 3):first-child <b>~</b> .polozka {
  /* styly pro položky, když jsou 3 a více */
}</code></pre>


<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/melb">Samostatná ukázka závislosti písma na počtu položek</a></li>
  </ul>
</div>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>A List Apart Article: <a href="http://alistapart.com/article/quantity-queries-for-css">Quantity Queries for CSS</a></li>
</ul>

<style>
  .polozky {
    overflow: hidden;
  }
  .polozka {
    text-align: center;
    line-height: 2em;
    background: #1081DD;
    color: #fff;
    float: left;
    margin: .2em;  
    font-size: 150%;    
  }
</style>


<style>
.polozka:only-of-type {
    width: 10.4em;
}

.polozka:nth-last-child(3):first-child,
.polozka:nth-last-child(3):first-child ~ .polozka {
    font-size: 120%;
}

.polozka:nth-last-child(4):first-child,
.polozka:nth-last-child(4):first-child ~ .polozka {
    font-size: 100%;
}
</style>
<script>
var polozky = document.getElementById('polozky');
var odebratBtn = document.getElementById("odebratBtn");

function pridat() {
    var klon = polozky.firstElementChild.cloneNode(true);
    polozky.appendChild(klon);
    if (polozky.childElementCount > 1) {
        odebratBtn.style.display = "";
    }    
}

function odebrat() {
    if (polozky.childElementCount > 1) {
        polozky.removeChild(polozky.firstElementChild);
    }
    if (polozky.childElementCount == 1) {
        odebratBtn.style.display = "none";
    }    
}
  
</script>