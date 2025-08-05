---
title: "Text-align"
headline: "Text-align"
description: "CSS vlastnost <code>text-align</code> nastavuje zarovnání písma."
date: "2014-11-26"
last_modification: "2014-11-27"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<p>Ve své základní podobě (zarovnání vlevo, vpravo, na střed či do bloku) je široce podporovaná napříč prohlížeči.</p>


<h2 id="co">Co jde zarovnat</h2>

<p>V aktuálních prohlížečích funguje <code>text-align</code> pouze na řádkové (<code><a href="/display">display</a>: inline</code>) nebo řádkově-blokové (<code>display: inline-block</code>) prvky.</p>

<p>Dříve šlo v <b>IE</b> v <a href="/doctype#quirk">QUIRK režimu</a> přes <code>text-align</code> zarovnávat i bloky. Ve <b>Firefoxu</b> a <b>Chrome</b> jde toto chování simulovat hodnotami s <a href="/css-prefixy">CSS prefixy</a>. <a href="http://kod.djpw.cz/gcib">Ukázka</a>.</p>

<p>Různým způsobům centrování se věnuje samostatný článek.</p>

<div class="internal-content">
  <ul>
    <li><a href="/centrovani">Centrování v CSS</a></li>
  </ul>
</div>


<h2 id="dedicnost">Dědičnost</h2>

<p>Zarovnání pomocí <code>text-align</code> od rodiče <b>dědí</b> jeho potomci.</p>

<pre><code>&lt;div>Bude vlevo (výchozí)&lt;/div>
&lt;div style="text-align: <b>center</b>">
  &lt;div>Bude uprostřed&lt;/div>
  &lt;div style="text-align: <b>right</b>">
    &lt;div>Bude vpravo&lt;/div>
  &lt;/div>
&lt;/div></code></pre>

<p><a href="http://kod.djpw.cz/jdib">Ukázka</a></p>


<h2 id="zakladni">Základní zarovnávání</h2>

<dl>
  <dt id="left"><code>left</code></dt>
  <dd>
    <pre><code>text-align: left</code></pre>
      
    <p style="text-align: left">Výchozí chování u textu psaného zleva doprava (<code>ltr</code> – <i>left to right</i>).</p>    
  </dd>


  <dt id="right"><code>right</code></dt>
  <dd>
    <pre><code>text-align: right</code></pre>
      
    <p style="text-align: right">Zarovnání textu k pravé straně.</p>    
  </dd>  




  <dt id="center"><code>center</code></dt>
  <dd>
    <pre><code>text-align: center</code></pre>
      
    <p style="text-align: center">Zarovnání textu na střed.</p>    
    
  </dd>  

  <dt id="justify"><code>justify</code></dt>
  <dd>
    <pre><code>text-align: justify</code></pre>
      
    <p style="text-align: justify">Zarovnání textu do bloku jako je tomu běžné například u <b>novinových sloupků</b>. Používání <code>text-align: justify</code> je trochu problematické s ohledem na fakt, že ne všechny prohlížeče umí <b>dělit text uprostřed slova</b>. Při <b>zarovnání do bloku</b> tak snadno vznikají tzv. <b>řeky</b>, kdy jsou mezi jednotlivými slovy nepřirozeně velké mezery.</p>  
    
    <p>Rozdělování slov spojovníkem na konci řádku jde v něterých prohlížečích zapnout CSS vlastností <a href="/hyphens"><code>hyphens</code></a>.</p>
    
  </dd>    
</dl>


<h2 id="start-end">Začátek a konec</h2>

<p>Mimo <b>IE</b> fungují dále hodnoty označující <b>začátek a konec řádku</b> (v závislosti na směru psaní textu).</p>

<dl>
  <dt id="start"><code>start</code></dt>
  <dd>
    <pre><code>text-align: start</code></pre>
      
    <p style="text-align: start">V případě u nás běžného psaní zleva doprava je <code>start</code> ekvivalentem <code>text-alight: left</code>.</p>    
  </dd>


  <dt id="end"><code>end</code></dt>
  <dd>
    <pre><code>text-align: end</code></pre>
      
    <p style="text-align: end">Zarovnání textu na konec řádku, což se chová v podporovaných prohlížečích jako <code>right</code>.</p>    
  </dd>  
</dl>


<h2 id="last">Zarovnání posledního řádku</h2>

<p>Zvlášť v případě zarovnání do bloku <code>(text-align: justify</code>) je většinou cílem, aby se <b>poslední řádek</b> do bloku nezarovnával.</p>

<p>Prohlížeče tak činí – poslední řádek zarovnávají na začátek řádku. Vlastností <code>text-align-<b>last</b></code> je možné toto chování změnit a poslední řádek bloku například <b>vycentrovat</b>.</p>

<p>Nastavení zarovnání posledního řádku funguje ve všech <b>IE</b> (od <b>IE 5.5</b>) a ve <b>Firefoxu</b> s prefixem.</p>

<p><a href="http://kod.djpw.cz/mcib">Ukázka</a> centrovaného posledního řádku.</p>


<h2 id="specifikace">Specifikace</h2>

<p>CSS specifikace do budoucna počítá, že <code>text-align</code> bude zkratka pro:</p>

<ul>
  <li><code>text-align-<b>last</b></code> – zarovnání posledního řádku</li>
  
  <li><code>text-align-<b>all</b></code> – zarovnání všech řádků</li>
</ul>


<h2 id="znak">Zarovnání podle znaku</h2>

<p>CSS specifikace dále počítá s možností zarovnávat podle <b>určitého znaku</b> – třeba podle <b>desetinné čárky</b> nebo <b>jednotek</b>.</p>

<pre><code>text-align: ".";
text-align: start ".";
text-align: "." end;</code></pre>

<p>U následujícího seznamu by se to velmi hodilo:</p>

<ul>
    <li>10,1</li>
    <li>5,55</li>
    <li>105,55</li>
    <li>5,525</li>
</ul>

<p>Bohužel to v žádném prohlížeči <b>nefunguje</b>.</p>


<h3 id="pevny-pocet">Pevný počet desetinných míst</h3>

<p>Nejrychlejší řešení, jak se o takové zarovnání pokusit, je zajistit <b>pevný počet desetinných míst</b>, nastavit šířku a zarovnat obsah doprava.</p>

<div class="live">
<ul style="text-align: right; width: 5em">
    <li>10,018</li>
    <li>5,550</li>
    <li>105,550</li>
    <li>5,111</li>
</ul>
</div>

<p>Dobře bude fungovat ale jen u <b>neproporcionálních písem</b>, která mají všechny číslice stejně široká.</p>



<h3 id="tabulka">Tabulka</h3>

<p>Další možnost je <b>tabulka</b>. Ať už klasická nebo v CSS s využitím <a href="/display#tabulkove">tabulkových hodnot</a> vlastnosti <code>display</code>.</p>


<div class="live">
<style>
  .desetinne-zarovnani {
      display: table;
      border-collapse: collapse;
  }
  
  .desetinne-zarovnani li {
      display: table-row;
  }
  
  .desetinne-zarovnani span {
      display: table-cell;
  }
  
  .desetinne-zarovnani .cislo {
      text-align: right;
  }  
</style>
<ul class="desetinne-zarovnani">
    <li><span class="cislo">10</span><span class="carka">,</span><span class="desetiny">518</span></li>
    <li><span class="cislo">0</span><span class="carka">,</span><span class="desetiny">8</span></li>
    <li><span class="cislo">5810</span><span class="carka">,</span><span class="desetiny">58</span></li>
    <li><span class="cislo">10</span><span class="carka">,</span><span class="desetiny">18</span></li>
</ul>  
</div>

<p><a href="http://kod.djpw.cz/jcib">Samostatná ukázka</a></p>


<p>To funguje zdánlivě hezky, ale jen do chvíle, kdy bude nutné <b>text kopírovat</b> — rozdělení do sloupců totiž způsobí vložení tabulátorů mezi ně.</p>

<pre><code>10	,	518</code></pre>


<h3 id="pevna-sirka">Pevná šířka celého čísla</h3>

<p>Jako funkční postup se zdá obalení <b>celého čísla</b> <code>&lt;span></code>em a nastavení jeho <b>šířky a zarovnání doprava</b>:</p>

<div class="live">
<style>
  .pevna-sirka .cele-cislo {
      display: inline-block;
      text-align: right;
      width: 2em;
  }
</style>  
<ul class="pevna-sirka">
    <li><span class="cele-cislo">10</span>,518</li>
    <li><span class="cele-cislo">0</span>,8</li>
    <li><span class="cele-cislo">810</span>,58</li>
    <li><span class="cele-cislo">10</span>,18</li>
</ul>  
</div>

<p><a href="http://kod.djpw.cz/kcib">Samostatná ukázka</a></p>

<p>Potřebný HTML kód pro správné zarovnání je potom ideální <b>generovat na straně serveru</b>.</p>

<p>Další nevýhoda kromě úprav HTML je, že pevná šířka není universální pro různě dlouhá čísla. To by mohl vyřešit kousek JavaScriptu, co <b>čísla přeměří</b> a šířku nastaví podle toho nejdelšího.</p>

<div class="live">
<style>
  .zarovnat-cisla .cele-cislo {
      display: inline-block;
      text-align: right;
  }
</style>
<p>První blok:</p>
<ul class="zarovnat-cisla">
    <li><span class="cele-cislo">10</span>,518</li>
    <li><span class="cele-cislo">0</span>,8</li>
    <li><span class="cele-cislo">810</span>,58</li>
    <li><span class="cele-cislo">10</span>,18</li>
</ul>
<p>Druhý blok:</p>
<ul class="zarovnat-cisla">
    <li><span class="cele-cislo">1</span>,8</li>
    <li><span class="cele-cislo">100 010</span>,518</li>
    <li><span class="cele-cislo">0</span>,8</li>
    <li><span class="cele-cislo">1 810</span>,58</li>
    <li><span class="cele-cislo">10</span>,18</li>
</ul>

<script>
  var kZarovnani = document.querySelectorAll(".zarovnat-cisla");
  
  for (var i = kZarovnani.length; i--; ) {
      var cisla = kZarovnani[i].querySelectorAll(".cele-cislo");
      
      var sirka = 0;
      for (var j = cisla.length; j--; ) {
          var sirkaCisla = cisla[j].offsetWidth;
          sirka = (sirkaCisla > sirka) ? sirkaCisla : sirka;
      }
      
      for (var j = cisla.length; j--; ) {
          cisla[j].style.width = sirka + "px";
      }    
  }
</script>
</div>

<p><a href="http://kod.djpw.cz/ncib">Samostatná ukázka</a></p>


<h2 id="odkazy">Odkazy</h2>

<ul>
  <li>DevDocs: <a href="http://devdocs.io/css/text-align"><code>text-align</code></a></li>
  
  <li>W3C: <a href="http://dev.w3.org/csswg/css-text/#justification">Text Alignment: the ‘text-align’ shorthand</a></li>
</ul>