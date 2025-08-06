---
title: "Jak zabránit kopírování"
headline: "Jak zabránit zkopírování obsahu"
description: "Dá se kopírování textů, obrázků a zdrojových kódů z webu zabránit? Jak kopírování využít ve svůj prospěch."
date: "2013-11-23"
last_modification: "2015-11-21"
status: 1
tags: ["napady"]
format: "html"
---

<p>Ze své podstaty je webová stránka velmi <b>lehce zkopírovatelná</b>. Veškerý obsah (<b>texty</b>, <b>obrázky</b>, <b>videa</b>), které se mají zobrazit návštěvníkovi, si totiž jeho prohlížeč <b>musí nejprve stáhnout</b> (uložit na disk / do operační paměti).</p>

<p><b>Zkopírování celé stránky</b> proto v podstatě proběhne při každém jejím načtení. A proto je jediná možnost, jak kopírování zabránit, <b>nedávat obsah na internet</b>.</p>

<p>Existují ale způsoby, jak <b>kopírování ztížit</b> nebo použít ve <b>svůj prospěch</b>…</p>





<h2 id="text">Kopírování textu</h2>

<p>Asi nejjednodušší je zkopírovat text. Označit ho myší a stisknout <kbd>Ctrl</kbd> + <kbd>C</kbd>. Nebo na něj kliknout pravým tlačítkem a zvolit <i>Kopírovat</i>.</p>

<p>Ve snaze kopírování zabránit proto může někoho napadnout zakázat:</p>

<ul>
  <li>Klávesovou zkratku <kbd>Ctrl</kbd> + <kbd>C</kbd> (popř. <kbd>Ctrl</kbd> + <kbd>Insert</kbd>),</li>
  <li>zakázat <b>pravé tlačítko myši</b>, které vyvolává <a href="/kontextova-nabidka">kontextovou nabídku</a>,</li>
  <li>zakázat <b>označování textu</b> na stránce.</li>
</ul>




<h3 id="js-blokovani">JS blokující kopírování</h3>

<p>Pro zamezení kopírování jde vystornovat události <code>oncopy</code> a <code>oncut</code>:</p>

<pre><code>&lt;body oncopy="return false" oncut="return false"></code></pre>

<p>Zakázat kontextovou nabídku zase přes <code>oncontextmenu</code>:</p>

<pre><code>&lt;body oncontextmenu="return false"></code></pre>

<p><a href="https://kod.djpw.cz/kxt">Ukázka</a> se všemi těmito překážkami.</p>

<p>Zásadní problém těchto <b>blokací</b> (kromě otravného nabourání výchozích funkcí prohlížeče) je skutečnost, že všechny může uživatel vypnout prostým <a href="/vyvojarske-nastroje#zakazani">zakázáním JS</a>. Případně si stránku uložit na disk a tam text získat ze <b>zdrojového kódu</b>.</p>






<h3 id="text-obrazek">Text jako obrázek</h3>

<p>Všechny tyto problémy by teoreticky řešil text, který <b>se umístí do obrázku</b>. Problém je, že takové řešení je <b>silně nepřístupné</b> (vyhledávače nejspíš text z obrázku analysovat nebudou).</p>

<p>Kromě toho ani takový postup nezabrání použít na obrázek <a href="http://cs.wikipedia.org/wiki/OCR">optické rozpoznávání znaků</a>.</p>



<h3 id="vyuziti-kopirovani">Jak kopírování textu využít</h3>

<p>Zajímavé <a href="http://diskuse.jakpsatweb.cz/?action=vthread&forum=8&topic=118171">řešení</a> je, když se k většímu množství označeného textu přidá „Zdroj: http://example.com/stranka“.</p>

<ul>
  <li>Při kopírování <b>pár slov</b> to nijak neobtěžuje (zdroj se nepřidá).</li>
  <li>Zkopírováním získá stránka <b>zpětný odkaz</b>.</li>
  <li>Může to <b>potěšit</b> i návštěvníka, který by zdroj chtěl uvádět.</li>
</ul>


<h2 id="obrazky">Kopírování obrázků</h2>

<p>V případě obrázků může rovněž pro málo zkušené návštěvníky fungovat <b>blokace pravého tlačítka</b> případně <b>překrytí</b> dalším průhledným obrázkem (nebo vložení obrázku jako <b>CSS pozadí</b>).</p>



<h3>Překrytí obrázku</h3>

<p>Logo je překryto <a href="/position#absolute">absolutně posicovaným</a> <code>&lt;div></code>em. Kontextová nabídka pro obrázek by se neměla objevovat.</p>

<div class="live">
  <style>
    .obrazek {position: relative}
    .prekryt {width: 135px; height: 35px; background: #fff; opacity: 0; filter: alpha(opacity=0); position: absolute;}
  </style>
  <div class="obrazek">
    <div class="prekryt"></div>
    <img src="/images/logo2.png" width="135" height="35">
  </div>
</div>

<p>Zkušenější člověk to snadno obejde. Buď si <b>vypne CSS</b>, uloží celou stránku s obrázky, najde adresu obrázku ve zdrojovém kódu a tak dále.</p>

<p>Řešení není ani nepřístupný obsah typu <b>Flashe</b>. Když už obrázek na obrazovce je, není problém ji <i>vyfotit</i> klávesou <kbd>Print Screen</kbd>. Případně skutečně vyfotit <b>fotoaparátem</b> (ideálně ze <span title='Nebo s použitím strouhanky.'>stativu</span>).</p>

<h3 id="vodoznak">Vodoznak</h3>
<p>Možný způsob, jak alespoň trochu <b>využít</b> kopírování obrázků, je jejich označení vodoznakem / adresou webu. <a href="http://php.vrana.cz/vodotisk.php">Řešení v PHP</a>.</p>

<h2 id="hotlinkovani-obrazku">Hotlinkování obrázků</h2>
<p>Hotlinkování je technika, kdy se <b>cizí objekt</b> (obrázek, video, JavaScript) připojí na vlastní web. Nevýhodné je být ten, z jehož webu se obrázky připojují jinam.</p>

<p>Nevýhodné je to z důvodu, že to majiteli v zásadě nic nepřináší, ale stojí ho to přenosovou kapacitu. Využít hotlinkování ve svůj prospěch je možné nabídnutí <b>jiného obsahu obrázku</b> (reklamy na svůj web) pro návštěvy z <b>cizího webu</b>.</p>

<h3 id="htaccess">Využití <code>.htaccess</code></h3>
<p>Zakázat zobrazování obrázků mimo vlastní web je možné přes:</p>

<pre><code>RewriteEngine on
RewriteCond %{HTTP_REFERER} !^$
RewriteCond %{HTTP_REFERER} !^http(s)?://(www\.)?<b>example.com</b> [NC]
RewriteRule \.(jpg|jpeg|png|gif)$ <b>novy-obrazek.jpg</b> [NC,R,L]</code></pre>

<p>Druhý řádek zajišťuje, aby se obrázek řádně načetl i při <b>vypnutém <a href="/referer">refereru</a></b>.</p>

<h2 id="js">Kopírování JavaScriptu</h2>
<p>Opět: Má-li se na stránce provést JS kód, musí se stáhnout a prohlížeč ho pochopit. Jediná možnost, jak někomu jinému <b>ztížit využívání skriptu</b>, je jeho <b>znečitelnění</b> (tzv. <i>obfuskace</i>). Tam spadá například:</p>

<ol>
  <li>Odstranění <b>formátování</b> kódu (mezer a tabulátorů),</li>
  <li>odstranění vysvětlujících <b>komentářů</b>,</li>
  <li><b>přejmenování</b> identifikátorů (názvu proměnných a funkcí) na nesrozumitelné nesmysly,</li>
  <li>vytvoření <b>samoúčelných funkcí</b>, které různé komprimují kód.</li>
</ol>

<p>Existují různé <a href="http://jsbeautifier.org/">online</a> <a href="http://www.jspretty.com/">nástroje</a> (nebo <a href="https://addons.mozilla.org/cs/firefox/addon/javascript-deobfuscator/">doplněk do Firefoxu</a>) pro opětovné zkrášlení kódu. Ovšem <b>komentáře</b> a <b>smysluplné názvy</b> proměnných a funkcí plně zrekonstruovat nelze.</p>

<p>Doplnění názvů proměnných (a mnohdy úspěšně) zkouší dělat nástroj <a href="http://www.jsnice.org/">JS NICE</a>.</p>

<p>Použití několika různých obfuskátorů vytvoří tak nečitelný kód, že se často spíš vyplatí napsat ho znovu od nuly. <a href="https://kod.djpw.cz/ycu">Takto</a> může vypadat funkce pro <a href="/prepinani-trid">přepínání tříd</a>.</p>

<p>O <b>dekódování obfuskovaného kódu</b> jsou zajímavé postřehy na <a href="http://diskuse.jakpsatweb.cz/?action=vthread&forum=8&topic=153249">diskusi</a>.</p>

<h3 id="obfuskatory">Obfuskátory JavaScriptu</h3>

<p>Kompilátory, co dokáží výrazně zmenšit datovou velikost skriptu při zachování stejného výkonu.</p>

<div class="external-content">
  <ul>
    <li><a href="http://closure-compiler.appspot.com/home">Closure Compiler</a></li>
    <li><a href="http://marijnhaverbeke.nl/uglifyjs">UglifyJS</a></li>
    <li><a href="http://siorki.github.io/regPack.html">RegPack</a></li>
  </ul>
</div>

<p>Další nástroje se snaží primárně kódu <b>snížit čitelnost</b>. Třeba i na úkor výkonu nebo datové velikosti.</p>

<div class="external-content">
  <ul>
    <li><a href="http://javascriptobfuscator.com/">Javascript Obfuscator</a></li>
    <li><a href="http://www.jsobfuscate.com/index.php">Obfuscator Tool</a></li>
    <li><a href="http://obfuscatorjavascript.com/">Free online javascript and html obfuscator</a></li>
  </ul>
</div>
  
<h2 id="html-css">Kopírování HTML a CSS kódu</h2>
<p>Co se týče HTML a CSS kódu, je situace dost složitá. V zásadě lze jen obfuskovat názvy <a href="/id-class">identifikátorů a tříd</a>. Jinak je možné odstranit jen <b>komentáře</b> a <b>bílé znaky</b> (mezery a tabulátory), třeba nástrojem <a href="http://www.cleancss.com/">Clean CSS</a> — ty je ale možné snadno navrátit (v <a href="http://www.dirtymarkup.com/">HTML</a> i v <a href="http://cssbeautify.com/">CSS</a>). Umí to i <a href="/vycisteni-kodu">Texy! nebo HTML Purifier</a>.</p>

<h3 id="zakodovani-css">Zakódování CSS</h3>
<p>CSS jde trochu <b>znečitelnit zakódováním</b> do <a href="http://www.freeformatter.com/base64-encoder.html">Base64</a> při použití <a href="/data-uri">data URI</a>, jde použít <code>&lt;link></code> nebo <code>@import</code> (<a href="https://kod.djpw.cz/ihu">živé</a> <a href="https://kod.djpw.cz/mhu">ukázky</a>):</p>

<pre><code>@import url("data:text/css;<b>base64</b>,<i>zakódovanýŘetězec</i>");</code></pre>

<pre><code>&lt;link rel="stylesheet" type="text/css" href="data:text/css;<b>base64</b>,<i>zakódovanýŘetězec</i>"></code></pre>

<p>Ale má to nevýhody:</p>

<ul>
  <li>každý vidí, čím je <b>zakódováno</b>,</li>
  <li>funguje až v <b>IE 8</b>,</li>
  <li>kód je <b>delší</b>,</li>
  <li><a href="/vyvojarske-nastroje">vývojářské nástroje</a> použité styly odhalí,</li>
  <li>při použití <code>@import</code>u musí být data <b>v jednom řádku</b>, dlouhý řádek přitahuje pozornost,</li>
  <li>v některých prohlížečích mohou být problémy s obrázky na pozadí (možná při použití relativních cest).</li>
</ul>
