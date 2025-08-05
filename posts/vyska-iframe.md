---
title: "Výška iframe podle obsahu"
headline: "Automatická výška <code>&lt;iframe></code> podle obsahu"
description: "Definitivní řešení automatického nastavování velikosti <code>&lt;iframe></code> podle výšky obsahu."
date: "2015-09-01"
last_modification: "2015-09-01"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p>Vnořený <a href="/ramy#iframe">rámec <code>&lt;iframe></code></a> je způsob, jak stránku čistě v HTML <b>sestavit z více samostatných souborů</b>.</p>

<p>Pokud je dostupné skriptování na straně serveru, bývá lepší stránku z kousků sestavit už tam:</p>

<div class="internal-content">
  <ul>
    <li><a href="/include">Jednoduchý web v PHP</a> – složení hlavičky, menu a obsahu v PHP</li>
  </ul>
</div>

<p>Při použití <code>&lt;iframe></code> je problém, že není jasné, jakou mu nastavit výšku, <b>aby se zobrazil obsah celý bez posuvníku</b>.</p>

<p>Nastavování něčeho jako <code>height: auto</code> nemá na funkci vliv.</p>


<h2 id="reseni">Hotové řešení</h2>

<p>Naštěstí jde u stránky v rámu spočítat její výšku a tu následně skriptem nastavit jako výšku rámu.</p>

<p>HTML kód rámu bude vcelku obyčejný:</p>

<pre><code>&lt;iframe 
  src="stranka.html" 
  frameborder="0" 
  <b>id="ram"</b> 
  width="100%" 
  height="500">
&lt;/iframe></code></pre>








<p>Za povšimnutí stojí identifikátor <code>ram</code>, podle kterého se s ním bude dále pracovat. Výška 500 pixelů (<code>height="500"</code>) je pouze záložní pro případ bez JavaScriptu.</p>

<p>Rámeček (<code>frameborder</code>) a stoprocentní šířka (<code>width="100%"</code>) by šla nastavit i přes CSS. Pro <b>IE 8</b> a starší je ale vypnutí rámečku atributem <code>frameborder</code> asi nejrozumnější řešení.</p>




<h3 id="zjisteni">Zjištění výšky v JS</h3>

<p>Kód pro zjištění a nastavení výšky proběhne po načtení obsahu (<code>onload</code>):</p>

<pre><code>var ram = document.getElementById("ram");
ram.scrolling = "no";
ram.onload = function() {
  var obsah = ram.contentDocument || ram.contentWindow.document;
  ram.style.height = obsah.documentElement.scrollHeight + "px";
};</code></pre>




<p>Za povšimnutí stojí:</p>

<ol>
  <li>Zabránění zobrazení posuvníku a rolování pomocí <code>ram.scrolling = "no"</code>. Posuvník by jinak ubíral místo obsahu. Důležité je toto nastavit v JS, aby se bez skriptování dalo k obsahu rámu dostat.</li>
  
  <li>Sjednocení <code>ram.contentDocument || ram.contentWindow.document</code> – druhá část slouží pro <b>IE 7</b> a starší</li>
  
  <li>Pro počítání výšky se používá <code>scrollHeight</code>. Hodnota <code>offsetHeight</code> by ve většině prohlížečů vracela původní výšku.</li>
</ol>


<div class="external-content">
  <p><a href="http://kod.djpw.cz/fupb">Samostatná živá ukázka</a></p>
</div>


<h3 id="resize">Změna velikosti stránky</h3>

<p>Pokud by šířka iframu nebyla fixní, při zúžení/rozšíření okna se výška obsahu v rámu natáhne nebo zmenší.</p>

<p>Pro docílení lepšího výsledku stačí přepočet provést kromě po načtení obsahu i při <code>window.onresize</code>. <a href="http://kod.djpw.cz/gupb">Ukázka</a></p>


<h3 id="animace">Plynulá změna</h3>

<p>Nastavení výšky rámu by navíc ještě šlo <b>animovat</b> pomocí <a href="/transition">CSS transition</a>:</p>

<p><a href="http://kod.djpw.cz/dupb">Živá ukázka</a></p>





<h2 id="externi">Automatická výška externího obsahu</h2>

<p>Problém nastává při <b>vkládání obsahu do rámu z jiné domény</b>. Kvůli bezpečnosti do takové stránky nemá JavaScript přístup. Stránka v rámu se načítá včetně cookies a dalších dat uživatele, takže by bez tohoto omezení bylo možné ovládat libovolnou aplikaci, kde je návštěvník přihlášen.</p>



<h3 id="spoluprace">Spolupráce autora externího obsahu</h3>

<p>Pokud autor obsahu, který se má načítat do rámu, spolupracuje, je možné:</p>

<ol>
  <li>
    <p>Změnit způsob vkládání obsahu na <b>externí JavaScript</b>, který obsah vloží přímo do stránky bez použití <code>&lt;iframe></code>.</p>
    
    <p>Má to svá specifika: obsah převezme styl stránky, která ho vkládá. Pomocí externího JS má jeho správce prakticky <b>neomezenou kontrolu nad webem</b>. Proto by externí JS z neznámého zdroje neměl být načítán u citlivých stránek.</p>    
  </li>
  
  <li>
    <p>Předat informaci o výšce prostřednictvím změny #hashe v URL.</p>
    
    <p>Umístit do stránky následující kód:</p>
    
    <pre><code>window.onload = function() {
  var vyska = document.documentElement.scrollHeight;
  window.top.location = "#vyska=" + vyska;
}</code></pre>
    
    <p>Ten do hostiteské stránky předá výšku v kotvě (<code>location.hash</code>).</p>
    
    <p>V nadřazené stránce stačí už jen výšku přečíst a nastavit rámu:</p>
    
    <pre><code>&lt;iframe src="" width="100%" frameborder="0"
  onload="
    var vyska = window.location.hash.replace('#vyska=', '');
    this.style.height = vyska + 'px';
">
&lt;/iframe></code></pre>
    
    <p>Tento postup funguje v <b>Chrome</b> a <b>Firefoxu</b> pouze při uvedení absolutní adresy. V <b>Internet Exploreru</b> a staré <b>Opeře 12</b> to funguje i při relativní:</p>
    
    <p>Ukázka externí stránky v rámu s automatickou výškou:</p>
    
    <div class="live">
      <style>
        #ram {
          height: 0; 
          transition: .2s height;
          border: 0;
          width: 100%;
        }</style>
      <iframe id="ram"
  onload="nastavitVysku">
</iframe>
      <script>
        function nastavitVysku() {
          var vyska = window.location.hash.replace('#vyska=', '');
          if (vyska) {
            ram.style.height = vyska + 'px';
          }          
        }
        window.onhashchange = nastavitVysku;          
      </script>
</div>

        
    
    <p>
      <button onclick="ram.src='http://kod.djpw.cz/udrb-'">Připojit stránku s absolutní URL</button>
      <button onclick="ram.src='http://kod.djpw.cz/mdrb-'">Připojit stránku s relativní změnou #hashe</button>
    </p>

  </li>
</ol>














<h3 id="bez-spoluprace">Vlastní řešení</h3>

<p>Pokud autor stránky nespolupracuje, je nejspíš jediná možnost stáhnout jeho stránku serverovým skriptem.</p>

<p>V PHP k tomu slouží funkce <code>file_get_contents</code>:</p>

<div class="internal-content">
  <ul>
    <li><a href="/stazeni-stranky">Získání obsahu cizí stránky</a></li>
  </ul>
</div>


<h3 id="subdomeny">Přístup k subdoméně</h3>

<p>Je-li stránka A na jiné subdoméně než stránka B, měl by pomoci následující JS kód na obou stránkách:</p>

<pre><code>document.domain = 'example.com';</code></pre>

<p>Více v článku:</p>

<div class="external-content">
  <ul>
    <li><a href="http://madskristensen.net/post/iframe-cross-domain-javascript-calls">Iframe cross domain JavaScript calls</a></li>
  </ul>
</div>