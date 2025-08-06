---
title: "Změna adresy v JS"
headline: "Změna adresy JavaScriptem"
description: "JavaScript může měnit URL. Jak a v jakých případech toho využívat."
date: "2014-04-14"
last_modification: "2015-07-16"
status: 1
tags: ["ga", "hotova-reseni", "js"]
format: "html"
---

<p>Prohlížeče podporující <b>stav</b> (<i lang="en">state</i>) v objektu <code>window.history</code> dokáží měnit tvar URL bez nutnosti přecházet na jinou stránku nebo vůbec dělat cokoliv dalšího.</p>


<p><img src="/files/js-zmena-url/zmena-url.png" alt="Změna adresy bez načtení jiné stránky" class="border"></p>





<p>Tuto funkci podporuje <b>IE 10</b>, <b>Firefox 4</b>, <b>Chrome 5</b>, <b>Opera 11.5</b> a novější. Naopak podpora chybí ještě i v <b>Opeře Mini 8</b>.</p>

<p>U <a href="/ajax">AJAXových</a> aplikací jde díky tomu zajistit, že se dá na aktuální stránku odkázat a ta se může <b>přímo načíst ze serveru</b>. Zároveň to umožňuje plnohodnotnou funkci <b>tlačítka Zpět</b>.</p>

<p>Více v článku:</p>

<div class="internal-content">
  <ul>
    <li><a href="/zmena-url">Změna URL bez obnovení stránky</a></li>
  </ul>
</div>



<h2 id="zmena">Změna URL</h2>

<p>Tento článek se zabývá samostatnou změnou URL bez dalších navazujících činností. K prosté změně se hodí použít metodu <code>replaceState</code> – změna adresy se potom <b>neuloží do historie</b>.</p>

<p>Použití je prosté:</p>

<pre><code>history.replaceState(
  {}, 
  '', 
  <b>'nova-url'</b>
);</code></pre>






<p>Metoda <code>replaceState</code> má tři parametry:</p>

<ol>
  <li><code>{}</code> – objekt stavu, v tomto případě není potřeba</li>
  <li><b>titulek</b> – nikde se nezobrazuje, může být prázdný</li>
  <li><b>adresa</b> – adresa, která nahradí tu stávající</li>
</ol>

<p>Vyzkoušejte:</p>

<div class="live no-source">
  <form onsubmit="return zmenitUrl()">
    <p>
      <label for="zmena-url">Změnit zdejší URL na:</label>
      <input type="text" id="zmena-url" value="css">
      <button>Nastavit</button>
    </p>
  </form>
</div>


<h2 id="vyuziti">Využití</h2>

<p>Měnit takto URL se hodí třeba k jejich <b>čištění</b> různých sledovacích parametrů. Případně pro přidávání parametrů jiných.</p>



<h3 id="utm">Odstranění UTM parametrů z URL</h3>

<p>Asi nejčastěji se používají UTM parametry.</p>

<div class="external-content">
  <ul>
    <li>Zaklik.cz: <a href="http://www.zaklik.cz/ppc-ucty/utm-parametry/">Tagování zdroje UTM parametry</a></li>
  </ul>
</div>

<p>Jedná se o řetězce typu:</p>

<pre><code>?utm_source=rss&amp;utm_medium=feed&amp;utm_campaign=nazev</code></pre>



<p>Případně místo otazníku může být UTM část adresy za mřížkou:</p>

<pre><code><b>#</b>utm_source=rss&amp;utm_medium=feed&amp;utm_campaign=nazev</code></pre>



<p>Pro odstranění UTM trackovacích parametrů poslouží následující funkce:</p>

<pre><code>var odstranitUtm = function() {
    var puvodniAdresa = window.location + "";
    var bezUtm = puvodniAdresa.replace(/([#&amp;?])utm([_a-z0-9\.=]+)/ig, "");
    
    if (puvodniAdresa !== bezUtm &amp;&amp; history.replaceState) {
        history.replaceState({}, '', bezUtm);
    }  
};</code></pre>











<p><a href="https://kod.djpw.cz/afob-?utm_source=rss&utm_medium=feed&utm_campaign=jecas">Samostatná ukázka</a></p>

<p>Při používání <a href="/ga">Google Analytics</a> se hodí funkci pro odstranění parametrů zavolat až jako <i lang="en">callback</i> po započítání návštěvy:</p>

<p>Tedy rozšířit standardní:</p>

<pre><code>ga('send', 'pageview');</code></pre>


<p>O zavolání funkce <code>odstranitUtm</code>.</p>

<pre><code>ga('send', 'pageview', <b>{'hitCallback': odstranitUtm}</b>);</code></pre>

<p>Sledovací parametry se tak z URL odstraní až po jejich <b>započtení do Google Analytics</b>.</p>





<script>
  function zmenitUrl() {
    var url = document.getElementById("zmena-url").value;
    history.replaceState({}, '', url);
    return false;
  }
</script>