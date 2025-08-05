---
title: "Styl seznamu list-style"
headline: "Styl odrážkového seznamu"
description: "CSS vlastnost <code>list-style</code> upravuje vzhled seznamů <code>&lt;ul></code> a <code>&lt;ol></code>."
date: "2015-01-21"
last_modification: "2015-02-23"
status: 1
tags: ["css", "css-pravidla", "css-vlastnosti", "hotova-reseni", "stylovani"]
format: "html"
---

<p>Pro lepší přehlednost se obsah webových stránek kromě do nadpisů a odstavců zadává i do <b>seznamů</b>.</p>

<div class="soft">
  <p>Pokročilejší čtenáři mohou v klidu přeskočit na:</p>
  <ul>
    <li><a href="#counter-style-symbols">Pravidlo <code>@counter-style</code> a <code>symbols</code></a></li>
  </ul>
</div>

<p>Používají se dva základní typy odrážkových seznamů:</p>

<ol>
  <li>
    <p><code>&lt;ul></code> (<i>unordered list</i>) – nečíslovaný seznam</p>
    
    <div class="live">
      <ul>
        <li>Položka</li>
        <li>Položka</li>
        <li>Položka</li>
      </ul>
    </div>
  </li>
  <li>
    <p><code>&lt;ol></code> (<i>ordered list</i>) – číslovaný seznam</p>
    
    <div class="live">
      <ol>
        <li>Položka</li>
        <li>Položka</li>
        <li>Položka</li>
      </ol>
    </div>    
  </li>
</ol>

<p>Kromě toho existují ještě značky <code>&lt;menu></code> a <code>&lt;dir></code>. Obě se v prohlížečích chovají přibližně stejně jako <code>&lt;ul></code>. Element <code>&lt;dir></code> je „<i>obsolete</i>“ – zastaralý, překonaný. Značku <code>&lt;menu></code> původně čekal stejný osud, ale nakonec byla znovuzrozena pro <a href="/menuitem">kontextovou nabídku</a> s využitím značky <code>&lt;menuitem></code>.</p>

<p><a href="http://kod.djpw.cz/dwkb">Srovnání</a> seznamů <code>&lt;ul></code>, <code>&lt;menu></code> a <code>&lt;dir></code>.</p>

<p>Nakonec existujte ještě seznam definiční – <code>&lt;dl></code>, ten ale ve výchozím stylu žádné odrážky nemá.</p>



<h2 id="stylovani">Stylování</h2>

<p>Pro jiný než výchozí styl seznamů existuje vlastnost <code>list-style</code>. Pomocí <code>list-style</code> v kombinaci s <code>display: list-item</code> jde také vytvořit odrážky z jiných elementů než <code>&lt;li></code> (<a href="http://kod.djpw.cz/bvkb">ukázka</a>).</p>

<h3 id="zapis">Zápis</h3>

<pre><code>ul {
  list-style: <b>typ</b> <b>umístění</b> <b>obrázek</b>;
}</code></pre>




<p>Vlastnost <code>list-style</code> je zkratkou pro další <code>list-style-*</code> vlastnosti:</p>

<ul>
  <li><code>list-style-type</code> (typ),</li>
  <li><code>list-style-position</code> (umístění),</li>
  <li><code>list-style-image</code> (obrázek)</li>
</ul>

<p>Vzhled stylu seznamu jde nastavovat pro <b>celý seznam</b> (<code>&lt;ul></code>/<code>&lt;ol></code>) nebo pro <b>jednotlivé položky</b> <code>&lt;li></code> (položky mají vyšší váhu).</p>





<h3 id="type"><code>list-style-type</code></h3>

<p>Stanovuje typ odrážky. Pro nečíslovaný seznam (<code>&lt;ul></code>) připadají v úvahu.</p>

<ul>
<li style="list-style-type: disc">puntík – <code>list-style-type: disc</code></li>
<li style="list-style-type: circle">kolečko – <code>list-style-type: circle</code></li>
<li style="list-style-type: square">čtvereček – <code>list-style-type: square</code></li>  
</ul>

<p>Pro <b>číslované seznamy</b> je potom plno několik stylů čísel.</p>

<ol>
<li style="list-style-type: decimal">číslo – <code>list-style-type: decimal</code></li>
<li style="list-style-type: decimal-leading-zero">číslo s nulou na začátku – <code>list-style-type: decimal-leading-zero</code></li>
<li style="list-style-type: lower-roman">římské číslice – <code>list-style-type: lower-roman</code></li>
<li style="list-style-type: upper-roman">velké římské číslice – <code>list-style-type: upper-roman</code></li>
<li style="list-style-type: lower-greek">malá řecká písmena – <code>list-style-type: lower-greek</code></li>
<li style="list-style-type: lower-latin">malá písmena – <code>list-style-type: lower-latin</code></li>
<li style="list-style-type: upper-latin">velká písmena – <code>list-style-type: upper-latin</code></li>
<li style="list-style-type: lower-alpha">malá písmena – <code>list-style-type: lower-alpha</code></li>
<li style="list-style-type: upper-alpha">velká písmena – <code>list-style-type: upper-alpha</code></li>  
</ol>

<p>Existuje jich ještě mnohem víc pro různé exotické jazyky (např. <code>hiragana</code>, <code>katakana</code>, <code>mongolian</code> atd.).</p>

<p>Zajímavé je, že <code>list-style-type</code> je <b>nezávislý</b> na typu seznamu (<code>&lt;ul></code>/<code>&lt;ol></code>). Číslovaný seznam se tak může stát nečíslovaným a obráceně.</p>

<p>V případě <b>zanoření více seznamů</b> do sebe se typicky (dle výchozích stylů prohlížečů) mění styly jednotlivých úrovní.</p>

<p>U <b>nečíslovaných seznamů</b> (<code>&lt;ul></code>) se v prvních třech úrovních vyskytne tečka, kolečko a čtvereček. V následujících úrovních už je pouze čtvereček.</p>


<p><img src="/files/list-style/zmena-odrazek.png" alt="Rozdílný styl odrážek v zanořeném seznamu" class="border"></p>








<p>Nastavit pro všechny úrovně to samé (puntík – <code>disc</code>) dokáže prostý kód:</p>

<pre><code>ul {
    list-style: disc;
}</code></pre>




<p>Nastavit si vlastní styl pro <b>jednotlivé úrovně</b> jde nějak takto:</p>

<pre><code>ul {
    list-style: circle;
}
ul ul {
    list-style: square;
}
ul ul ul {
    list-style: disc;
}</code></pre>










<p>U <b>číslovaných seznamů</b> se podobná změna stylu na základě úrovně ve všech rozšířenějších prohlížečích nekoná.</p>

<div class="external-content">
  <p><a href="http://kod.djpw.cz/zukb">Ukázka</a> – testovací stránka zanořených seznamů</p>
</div>



<h3 id="position">Umístění <code>list-style-position</code></h3>

<p>Odrážky položek seznamu mohou mít dvojí umístění.</p>

<ul>
<li style="list-style-position: outside">mimo – <code>list-style-position: outside</code></li>
<li style="list-style-position: inside">uvnitř – <code>list-style-position: inside</code></li>  
</ul>

<p>Rozdíl <code>outside</code> (výchozí) a <code>inside</code> je zvlášť patrný u víceřádkových položek, kde vypadá <code>inside</code> většinou špatně.</p>

<p><img src="/files/list-style/umisteni.png" alt="Rozdílné umístění odrážek seznamu" class="border"></p>











<p>Odrážka/číslo v případě umístění venku (<code>outside</code>) se zobrazuje <b>mimo element</b> <code>&lt;li></code>, je tedy nutné, aby byl okolo prostor, má-li se odrážka zobrazit. Ve výchozím CSS proto mají prohlížeče pro seznamy levý <code>padding</code> o hodnotě 40 pixelů.</p>



<h3 id="image">Obrázková odrážka <code>list-style-image</code></h3>

<p>Jako odrážku jde použít i obrázek.</p>

<pre><code>ul {
  list-style-image: url(odrazka.png);
}</code></pre>




<p>V drtivé většině případů ale není <code>list-style-image</code> k užitku, protože chybí <b>kontrola nad umístěním</b> obrázku. Pokud není obrázek odrážky ve velikosti řádku, nebude správně zarovnaný. Jelikož písmo může být <b>různě velké</b>, nejde na to spoléhat, takže je lepší <code>list-style-image</code> vůbec <b>nepoužívat</b>.</p>

<p>Pro <b>obrázkové odrážky</b> se proto používá využívá běžné pozadí (<code>background</code>) pro <code>&lt;li></code> nebo absolutně posicované <a href="/css-selektory#before-after"><code>:before</code>/<code>:after</code></a> elementy, kde si jde s požadovaným umístěním vyhrát.</p>

<div class="external-content">
  <ul>
    <li><a href="http://teststranek.kvalitne.cz/odrazky1/">Obrázkové odrážky stejné ve všech prohlížečích</a> – srovnání odrážek přes <code>list-style-image</code> a <code>background</code></li>
  </ul>
</div>



<h2 id="counter-style-symbols">Pravidlo <code>@counter-style</code> a <code>symbols</code></h2>

<p>Pro možnost si nadefinovat vlastní styl odrážek a číslování bez používání různých hacků v podobě <code>:before</code>/<code>:after</code>, obrázků a posicování jde od <b>Firefoxu 33</b> používat <code>@counter-style</code> a <code>symbols</code>.</p>



<h3 id="counter-style"><code>@counter-style</code></h3>

<p>Zápis celého stylu může vypadat následovně:</p>

<pre><code>@counter-style <b>cisla</b> {
/* opakování symbolů (cyclic, fixed, …) */
  system: cyclic;
/* symboly */
  symbols: 'tři' 'dva';
/* znaky před symbolem */
  prefix: "";
/* znaky po symbolu */
  suffix: ") ";
/* rozsah, kde se symboly použijí */
  range: 2 3;
/* co má číst hlasová čtečka */
  speak-as: numbers;
}</code></pre>














<p>Styl se potom připojí podle svého názvu do <code>list-style</code>:</p>

<pre><code>ul {
  list-style: <b>cisla</b>;
}</code></pre>




<p>Výsledek bude následovný:</p>

<p><img src="/files/list-style/counter-style.png" alt="Upravený styl odrážek seznamu" class="border"></p>







<p><a href="http://kod.djpw.cz/vukb">Živá ukázka</a> – <b>Firefox 33</b>+</p>




<h3 id="symbols">Funkce <code>symbols</code></h3>

<p>Symbols je potom funkce, která se dá použít přímo v <code>list-style</code> bez nutnosti deklarovat styl pomocí <code>@counter-style</code>. Stejných výsledků jde dosáhnout oběma způsoby – <code>@counter-style</code> se hodí pro deklaraci stylů v rámci celého CSS, aby se styly nemusely v kódu opakovat a šly snadno <b>změnit na jednom místě</b>.</p>

<p>Příklad použití <code>smybols</code>:</p>

<pre><code>ul {
    list-style: symbols(cyclic '✔');
}</code></pre>







<p><a href="http://kod.djpw.cz/wukb">Živá ukázka</a> – použití <code>symbols</code></p>

<p><a href="http://kod.djpw.cz/tukb">Živá ukázka</a> – totéž s <code>@counter-style</code></p>

<div class="external-content">
<ul>
  <li>Hacks.mozilla.org: <a href="https://hacks.mozilla.org/2015/02/introducing-counter-styles/">Introducing @counter-style</a> – kompletní přehled vlastností použitelných v <code>@counter-style</code>/<code>symbols</code></li>
</ul>  
</div>




<h2 id="vlastni">Vlastní styl odrážky</h2>

<p>Ve starších prohlížečích jde vlastní textové odrážky dosáhnout <a href="/position#absolute">absolutním posicováním</a> pseudo-elementu <code>:before</code> nebo <code>:after</code>.</p>

<div class="live">
<style>
ul.fajfka {
    list-style: none;
}

.fajfka li {
    position: relative;
}

.fajfka li:before {
    position: absolute;
    content: "✔";
    left: -1.5em;
}
</style>
  <ul class="fajfka">
    <li>Odrážka</li>
    <li>Odrážka</li>
  </ul>
</div>

<p><a href="http://kod.djpw.cz/xukb">Samostatná živá ukázka</a></p>


<h3 id="odlisna-barva">Odlišná barva odrážky</h3>

<p>Ani pro <b>jinou barvu odrážky a obsahu položky</b> neexistuje elegantní řešení. Jedna možnost je <b>obalit</b> obsah v <code>&lt;li></code>:</p>

<div class="live">
  <ul>
    <li style="color: #DA3F94">
      <span style="color: #0D6AB7">
        Text položky
      </span>
    </li>
  </ul>
</div>

<p><b>Barva odrážky</b> se bere z barvy (<code>color</code>) položky. Takže není možné nastavit jednu barvu pro <code>&lt;ul></code>/<code>&lt;ul></code> a druhou pro <code>&lt;li></code>.</p>

<p>Pokud je komplikované měnit HTML kód (aby byl kolem obsahu v <code>&lt;li></code> další element), nezbývá něž opět odrážku vytvořit pomocí <code>:before</code> a vhodně ji naposicovat.</p>

<div class="live">
<style>
ul.ruzna-barva {
    list-style: none;
}

.ruzna-barva li {
    position: relative;
    color: #0D6AB7;
}

.ruzna-barva li:before {
    position: absolute;
    content: "•";
    left: -1em;
    color: #DA3F94;
}
</style>
  <ul class="ruzna-barva">
    <li>Odrážka</li>
    <li>Odrážka</li>
  </ul>
</div>


<h3 id="cislovani">Odlišný styl a číslování</h3>

<p>S využitím CSS vlastnosti <a href="/counter"><code>counter</code></a> (<b>IE8</b>+) jde postup s <code>:before</code> odrážkou použít i pro číslování v odlišném stylu.</p>

<div class="live">
<style>
ol.ruzna-barva-cislo {
    list-style: none;
    counter-reset: seznam;
}

.ruzna-barva-cislo li {
    position: relative;
    color: #0D6AB7;
}

.ruzna-barva-cislo li:before {
    counter-increment: seznam;
    content: counter(seznam);  
    position: absolute;
    left: -1em;
    color: #DA3F94;
}
</style>
  <ol class="ruzna-barva-cislo">
    <li>Odrážka</li>
    <li>Odrážka</li>
  </ol>
</div>


<p><a href="http://kod.djpw.cz/yukb">Samostatná živá ukázka</a> – zajímavější styl číslování</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>MDN: <a href="http://devdocs.io/css/list-style"><code>list-style</code></a></li>
  
  <li>Jak psát web: <a href="http://www.jakpsatweb.cz/css/list-style.html">Vlastnost <code>list-style</code></a>, <a href="http://www.jakpsatweb.cz/html/seznamy.html">Seznamy v HTML</a></li>
</ul>