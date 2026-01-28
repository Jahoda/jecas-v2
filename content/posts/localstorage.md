---
title: "JavaScript localStorage – úložiště v prohlížeči"
headline: "JavaScript <code>localStorage</code> – úložiště v prohlížeči"
description: "Jak používat localStorage v JavaScriptu. Ukládání, čtení a mazání dat v prohlížeči klienta. Rozdíl oproti sessionStorage a cookies."
date: "2015-03-13"
last_modification: "2015-09-16"
status: 1
tags: ["js"]
format: "html"
---

<p>Lokální úložiště má využití v případě, kdy je potřeba návštěvníkovi uložit nějaká data, která <b>není potřeba přenášet na server</b>.</p>

<p>To je třeba případ <b>průběžného ukládání obsahu formulářů</b>, které se díky lokálnímu úložišti může provádět velmi často, takže v případě nějakého problému přijde uživatel maximálně o pár znaků textu.</p>

<div class="internal-content">
  <ul>
    <li><a href="/zalohovani-formularu">Automatické zapamatování formulářů</a></li>
  </ul>
</div>

<p>Někdy se <code>localStorage</code> používá i pro <b>ukládání nastavení</b>, ale to může být lepší vázat na uživatelský profil, aby bylo přenositelné mezi různými zařízeními, které uživatel používá.</p>




<h2 id="cookies">Cookies</h2>


<p>Dříve se pro ukládání používaly zpravidla <b>cookies</b> – ty mají ale jistá omezení a problémy:</p>

<ol>
  <li>
    <p>Při všech HTTP požadavcích se <b>odesílají na server</b>, což limituje jejich velikost a zvětšuje objem přenášených dat.</p>
    
    <p>Bezpečná velikost napříč prohlížeči je <b>4 kB</b> pro všechny cookies na dané doméně, bezpečný maximální počet sušenek je <b>20</b>. Novější prohlížeče mají limity velkorysejší. Do velikosti se započítává i název cookie, nastavení expirace a podobně.</p>
    
    <div class="external-content">
      <ul>
        <li><a href="http://browsercookielimits.squawky.net/">Browser Cookie Limits</a> – limity v současných prohlížečích</li>
      </ul>
    </div>
    
    <p>Kvůli nepotřebnosti přenášení cookie se někdy servírují statické soubory (styly, skripty, obrázky), které sušenky k ničemu nevyžadují, z jiné domény.</p>
  </li>
  
  
  <li>
    <p>Práce s cookies není v JavaScriptu úplně pohodlná.</p>
    
    <p>Nastavování cookie probíhá prostřednictvím <code>document.cookie</code>. Přidání 2 sušenek vypadá následovně:</p>
    
    <pre><code>document.cookie = "nazev=hodnota";
document.cookie = "nazev2=hodnota2";</code></pre>
    
    <p>Pro <b>získání všech cookies a jejich hodnot</b> se musí řetězec z <code>document.cookie</code> rozsekávat podle středníku a rovnítka, protože obsah <code>document.cookie</code> bude po předchozím použití následující:</p>
    
    <pre><code>nazev=hodnota; nazev2=hodnota2</code></pre>
    
    <p>Aby byla manipulace s cookies pohodlnější, lze použít nějakou sadu funkcí:</p>
    
    <div class="external-content">
      <ul>
        <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/API/document/cookie#A_little_framework_a_complete_cookies_readerwriter_with_full_unicode_support">A little framework: a complete cookies reader/writer with full unicode support</a></li>
      </ul>
    </div>
  </li>
</ol>

<h2 id="ukladani">Ukládání větších dat do cookie</h2>

<p>Pro ukládání větších dat pomocí cookie tak bylo před <code>localStorage</code> nutné používat hybridní způsob, kdy je v cookie pouze identifikátor, ke kterému se data ukládají na server.</p>


<h2 id="localStorage">Lokální úložiště</h2>

<p>Lokální úložiště funguje od <b>Internet Exploreru 8</b>. Z aktuálních rozšířených prohlížečů chybí podpora v mobilním prohlížeči <b>Opera Mini</b>.</p>

<p>Použití je elegantní:</p>

<h3 id="setItem">Uložení hodnoty <code>setItem</code></h3>

<pre><code>localStorage.setItem("nazev-polozky", "hodnota");</code></pre>




<h3 id="getItem">Přečtení hodnoty <code>getItem</code></h3>

<pre><code>var obsah = localStorage.getItem("nazev-polozky");</code></pre>



<h3 id="removeItem">Odstranění položky <code>removeItem</code></h3>

<pre><code>localStorage.removeItem("nazev-polozky");</code></pre>




<h3 id="clear">Odstranění všech dat <code>clear</code></h3>

<pre><code>localStorage.clear();</code></pre>




<h2 id="platnost">Platnost dat v <code>localStorage</code></h2>

<p>Data v lokálním úložišti zpravidla vydrží hodně dlouho. Nemají <b>omezenou dobu platnosti</b> jako <code>cookie</code> a běžní uživatelé je většinou nemažou.</p>




<h2 id="velikost">Velikost úložiště</h2>

<p>Do <code>localStorage</code> se ve většině prohlížečů vejde 10 MB dat (<b>Chrome 40</b>, <b>Firefox 34</b>, <b>IE 9, 10, 11</b>). Prohlížeče <b>Safari</b> podporují 5 MB a <b>Android Browser 4.3</b> jen 2 MB.</p>

<p>Bezpečná velikost je tedy <b>2 megabyty</b>.</p>

<div class="external-content">
  <ul>
    <li>HTML5 Rocks: <a href="http://www.html5rocks.com/en/tutorials/offline/quota-research/">Working with quota on mobile browsers</a> – přehled velikosti úložišť v prohlížečích</li>
  </ul>
</div>



<h2 id="json">Ukládání JSONu</h2>

<p>Někdy se hodí ukládat do <code>localStorage</code> celé <a href="/json">JS objekty</a>. Lokální úložiště je velmi <i>hloupé</i> a umí ukládat pouze <b>řetězce</b>. Takže se objekt musí na řetězec převést.</p>



<h3 id="ulozeni">Uložení JSONu</h3>

<p>JavaScriptový objekt se převede pomocí <code>JSON.stringify</code>:</p>

<pre><code>var objekt = {
  "klic" : "hodnota",
  "klic 2" : "hodnota 2"
}
localStorage.setItem(
  "nazev-polozky", 
  <b>JSON.stringify</b>(objekt)
);</code></pre>










<h3 id="ziskani">Získání JSONu</h3>

<p>Pro převodu řetězce zpět na JSON se použije <code>JSON.parse</code>:</p>

<pre><code>var data = localStorage.getItem("nazev-polozky");
if (data) {
  var objekt = <b>JSON.parse</b>(data);
}</code></pre>







<h2 id="anonymni-rezim">Anonymní režim</h2>

<p>V privátním/anonymním režimu <b>Safari</b>, <b>iOS Safari</b> a <b>Android browser</b> nepodporují nastavování položek do <code>localStorage</code> (stejně tak do <code>sessionStorage</code>).</p>

<p>Aplikace používající úložiště by s tím měla počítat.</p>

<p>Ostatní prohlížeče data uchovají pouze <b>do zavření</b> anonymního okna.</p>

<div class="external-content">
  <ul><li><a href="http://arbitraryreason.com/dont-forget-to-check-private-browsing-mode-when-testing/">Don’t Forget to Check Private Browsing Mode when Testing</a></li></ul>
</div>





<h2 id="prochazeni">Zobrazení <code>localStorage</code> v prohlížeči</h2>

<p>Pro testování se může hodit podívat, jaké položky v lokálním úložišti jsou.</p>

<p>Ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a> (klávesa <kbd>F12</kbd>) jsou všechna úložiště dostupná na záložce <i lang="en">Resources</i>/<i>Zdroje</i>:</p>

<p><img src="/files/localstorage/local-storage.png" alt="Procházení lokálního úložiště v Dev Tools" class="border"></p>

























<h2 id="cache">Lokální úložiště jako cache</h2>

<p>Ukládáním potřebných souborů do <code>localStorage</code> lze v některých případech <b>zrychlit načítání stránky</b> oproti standardnímu cacheování v prohlížeči:</p>

<div class="external-content">
  <ul>
    <li><a href="http://www.mobify.com/blog/smartphone-localstorage-outperforms-browser-cache/">Smartphone Browser localStorage is up to 5x Faster than Native Cache (New Research)</a></li>
  </ul>
</div>

<p>Je ale nutné řešit, aby se případná neaktuální data při změně obnovovala a podobně.</p>



<h2 id="starsi">Starší prohlížeče</h2>

<p>Pro starší prohlížeče nepodporující <code>localStorage</code> je dobré <b>testovat podporu</b>, aby volání metod nad <code>localStorage</code> zbytečně nevyhazovalo chyby.</p>



<pre><code>if (window.localStorage) {
  // prohlížeč podporuje lokální úložiště
}</code></pre>





<h3 id="ie7">Internet Explorer 7</h3>

<p>Starší <b>IE</b> dokáží místo <code>localStorage</code> používat <code>userData</code>. <a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=8&amp;topic=151480#4"><b>Chamurappiho</b></a> <a href="/polyfill">polyfill</a> pro starší <b>Explorery</b>:</p>

<pre><code>if(!window.localStorage &amp;&amp; document.documentElement.addBehavior) window.localStorage = (function(name)
{
  var prefix = "storage-";
  var link = document.createElement("link");
  link.addBehavior("#default#userData");
  document.documentElement.firstChild.appendChild(link);
  return {
    setItem: function(key, value)
    {
      link.setAttribute(prefix + key, value);
      link.save(name);
    },
    getItem: function(key)
    {
      try { link.load(name); } catch(exc) {}
      return link.getAttribute(prefix + key);
    },
    removeItem: function(key)
    {
      link.removeAttribute(prefix + key);
      link.save(name);
    }
  };
})("localStorage");</code></pre>





















<h2 id="sessionstorage">Session storage</h2>

<p>Kromě <code>localStorage</code> existuje ještě velmi podobné <code>sessionStorage</code>.</p>

<p>Liší se tím, že se jeho obsah <b>smaže po zavření prohlížeče</b>. Prohlížeče <b>Safari</b> a <b>Android Browser</b> ho navíc nelimitují maximální velikostí dat.</p>


<p>Použití v JavaScriptu je potom obdobné. Jen se <code>localStorage</code> přepíše na <code>sessionStorage</code>:</p>

<pre><code><b>sessionStorage</b>.setItem("nazev-polozky", "hodnota");</code></pre>


<p>Pro přečtení obsahu potom:</p>

<pre><code>var obsah = sessionStorage.getItem("nazev-polozky");</code></pre>





<h2 id="odkazy">Odkazy jinam</h2>

<ul> 
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/API/window/localStorage">Window.localStorage</a></li>
  
  <li>Sitepoint: <a href="http://www.sitepoint.com/html5-local-storage-revisited/">HTML5 Local Storage Revisited</a></li>  
</ul>