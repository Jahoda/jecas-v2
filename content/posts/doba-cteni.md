---
title: "Doba čtení stránky"
headline: "Doba čtení stránky"
description: "Jak zobrazit přibližnou dobu, kterou zabere čtení stránky."
date: "2015-08-22"
last_modification: "2015-09-11"
status: 1
tags: ["hotova-reseni", "js", "php"]
format: "html"
---

<p>Aby se čtenář nezalekl příliš <b>dlouhého článku</b>, lze mu pomoci zobrazením <b>přibližné doby</b>, kterou bude k přečtení potřebovat.</p>

<p class="soft">Čtení tohoto článku zabere přibližně <b id="doba">5 minut</b>.</p>

<p>Jak na to?</p>

<p>Je potřeba zjistit:</p>

<ol> 
  <li>Přibližnou <b>rychlost čtení</b>.</li>
  
  <li><b>Počet slov</b>, které článek obsahuje.</li>
</ol>





<h2 id="rychlost">Jak rychle člověk čte?</h2>

<p>Podle různých propagátorů rychločtení přečte běžný člověk <b>125–250 slov za minutu</b>. Většina lidí totiž čte text slovo po slově zvlášť, což vede ke zmíněnému tempu.</p>

<p>Rychločtenáři potom zvládají číst za minutu třeba <b>600 slov</b>.</p>

<p>Pro výpočet doby čtení tedy může posloužit třeba <b>200 slov</b>.</p>






<h2 id="pocet-slov">Počet slov v textu</h2>

<p>Počet slov ze souvislého textu jde zjistit počítáním bílých znaků / mezer.</p>

<div class="internal-content">
  <ul>
    <li>
      <p><a href="/pocet-znaku">Počet znaků a slov v textu</a> – počítání znaků a slov v JavaScriptu</p>   
    <pre><code>var slov = text.match(/\b/g).length/2;</code></pre></li>
  </ul>
</div>

<p>Pokud se mají slova počítat v HTML stránce, je třeba nejprve <b>odstranit HTML značky</b>:</p>

<p>V <b>PHP</b> k tomu existuje funkce <code>strip_tags</code>:</p>

<pre><code>$bezZnacek = strip_tags("HTML kód");</code></pre>


<p>V <b>JavaScriptu</b> jde využít vlastností <code>textContent</code> (funkční od <b>IE 9</b>) a <code>innerText</code> (funkční ve starých <b>Internet Explorerech</b>):</p>

<pre><code>var obsah = document.getElementById("obsah");
var bezZancek = obsah.textContent || obsah.innerText || "";</code></pre>


<h3 id="js">Hotové řešení v JavaScriptu</h3>

<p>Když se výše uvedené techniky spojí a přidá se ještě <a href="/sklonovani">české skloňování</a>, výsledek je na světě:</p>

<div class="live">
 Čtení tohoto článku zabere <b id="doba2">5 minut</b>.
<script>
  function sklonovani(pocet, slova) {
    pocet = Math.abs(pocet);
    if (pocet == 0) return slova[0];
    if (pocet == 1) return slova[1];
    if (pocet < 5 && pocet > 0) return pocet + " " + slova[2];
    return pocet + " " + slova[3];
  }  
  
  function dobaCteni(doba) {
    var content = doba.parentNode.parentNode;
    var RYCHLOST_CTENI = 200;
  
    var bezZnacek = content.textContent || content.innerText || "";
    var slov = bezZnacek.match(/\b/g).length/2;
    var minut = Math.round(slov / RYCHLOST_CTENI);
  
    doba.innerHTML = sklonovani(minut, ["chvilku", "minutu", "minuty", "minut"]);    
  }
  dobaCteni(document.getElementById("doba"));
  dobaCteni(document.getElementById("doba2"));
</script>
</div>

<h3 id="php">Doba čtení článku v PHP</h3>

<p>V PHP jde nad obsahem vyčištěným od HTML značek použít funkci <code>str_word_count</code>. Pro použití na <b>český text</b> je nutné předat navíc české znaky jako třetí argument.</p>

<pre><code>$string = "Příliš žluťoučký kůň úpěl ďábelské ódy.";
$pocetSlov = str_word_count(
  $string, 
  0, 
  "ěščřžýáíéůúďňóť"
);</code></pre>

<p>Celý kód:</p>

<pre><code>define("RYCHLOST_CTENI", 200);
$bezZnacek = strip_tags("HTML kód");
$slov = str_word_count($bezZnacek, 0, "ěščřžýáíéůúďňóť");
$minut = round($slov / RYCHLOST_CTENI);
echo $minut;
</code></pre>


<h2 id="zbyva">Zbývá X minut četní</h2>

<p>Zajímavé by mohlo být navíc průběžně zobrazovat, kolik minut ještě <b>bude čtení trvat</b>.</p>

<p><img src="/files/doba-cteni/zbyvajici-doba.png" alt="Zbývající doba čtení" class="border"></p>

















<div class="external-content">
  <p><a href="https://kod.djpw.cz/fbqb">Živá ukázka</a> – průběžné zobrazování zbývajícího času</p>
</div>


<p>Jde to udělat tak, že se <b>spočítá počet slov pro každý element</b>. A následně se počet už přečteného určí podle posledního elementu, který je ve viewportu (je viditelný).</p>

<p>Jestli element už byl ve <i>viewportu</i>, jde zjistit třeba takto:</p>

<pre><code>function inViewPort(el) {
  var coords = el.getBoundingClientRect();
  return (
    coords.top >= 0 &amp;&amp; coords.left >= 0 &amp;&amp; coords.top
  ) 
  &lt;= (
    window.innerHeight || document.documentElement.clientHeight
  );
}</code></pre>












<p>Případně by <b>přečtené procento článku</b> šlo počítat z počtu odrolovaných pixelů a celkových pixelů výšky článku. V případě používání vysokých obrázků nebo podobných prvků to ale <b>nebude moc přesné</b>.</p>



<h3 id="problem">Problém</h3>

<p>Ukazovat výše uvedeným způsobem zbývající čas je problematické. Z toho, kam návštěvník odroloval, přesně nevypovídá, kam až dočetl. Různí lidé čtou obsah webů různým způsobem a možnost, jak <b>sledovat, kam návštěvník zrovna kouká</b>, není běžně dostupná.</p>

<p>Zobrazování přesného času tak může být matoucí.</p>





<h2 id="mereni">Měření doby čtení</h2>

<p>Dobu čtení stránky by také šlo odhadovat na základě průměrné doby čtení <b>ostatních uživatelů</b>.</p>

<p>Aby toto měření nezkreslovali uživatelé, co si <b>stránku otevřou a odejdou pryč</b>, muselo by se testovat, jestli <a href="/aktivni-stranka">je stránka aktivní</a>.</p>


<p>Uložit dobu čtení by se potom nabízelo před <a href="/onbeforeunload">opuštěním stránky</a>. V podporovaných prohlížečích pomocí <a href="/beacon">Beacon API</a>.</p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://thenewcode.com/1038/A-Better-Reading-Time-Counter-for-Web-Pages-Part-1">A Better Reading Time Counter for Web Pages</a></li>
</ul>