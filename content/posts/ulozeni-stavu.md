---
title: "Uložení stavu před opuštěním stránky"
headline: "Uložení stavu před opuštěním stránky"
description: "Jakým způsobem uložit stav aplikace/formuláře před opuštěním stránky."
date: "2015-11-24"
last_modification: "2015-12-13"
status: 1
tags: ["formulare", "js", "napady"]
format: "html"
---

<p>Ideální webová aplikace by měla <b>automaticky ukládat všechny změny stavu</b>, aby při přerušení jejího používání šlo následně navázat přesně ve stavu, kde uživatel skončil.</p>


<p>Není nic otravnějšího, než když kvůli nějaké chybě nebo třeba kvůli automatickému zavření prohlížeče na mobilu, zmizí rozepsaný text ve formuláři.</p>





<h2 id="kam">Kam ukládat</h2>

<p>Nejspolehlivější je časté ukládání v prohlížeči návštěvníka do lokálního úložiště pomocí JavaScriptu, které se případně občas může sesynchronisovat se serverem.</p>

<p>Použití lokálního úložiště je snadné:</p>

<pre><code>localStorage.setItem("nazev-polozky", "hodnota");</code></pre>


<div class="internal-content">
  <ul>
    <li><a href="/localstorage">Úložiště <code>localStorage</code></a> – přehled lokálního úložiště v JS</li>
  </ul>
</div>



<h2 id="kdy">Kdy ukládat</h2>

<ol>
  <li><p>Ukládat <i>stav</i> je ideální už při jeho změně (stisknutí klávesy, kliknutí myší) či sadě změn provedených v krátkém časovém úseku.</p>
  
    <p>Aby se hodnota v úložišti nepřepisovala pořád, jde ukládat až po nějaké době nečinnosti od poslední změny – třeba 300 milisekund. Docílit toho jde <a href="/odpocitavani#js">časovačem</a>:</p>
    
    <pre><code>var prodleva;
function spustitUlozeni() {
  clearTimeout(prodleva);
  prodleva = setTimeout(ulozitZmenu, 300);
}</code></pre>
    
    
    
    
    
    
    
    <p>Funkce <code>spustitUlozeni</code> se potom zavolá po každé změně, funkce pro uložení <code>ulozitZmenu</code> se ale provede až po 300 ms nečinnosti.</p>
  </li>
  
  
  <li><p>Druhá možnost je provádět uložení automaticky každých X vteřin/minut. Tento postup vede k řadě zbytečných uložení, kdy se stav uloží, aniž by se něco změnilo.</p></li>
  
  
  
  <li><p>Třetí možnost je <b>uložení při ukončení stránky</b> (třeba událostí <a href="/onbeforeunload"><code>onbeforeunload</code></a>), ale to není tolik spolehlivé, protože některá ukončení aplikace mohou nastat dřív, než se stihne stav uložit – třeba u desktopového PC bez záložního zdroje a výpadku elektřiny.</p>
  
    <p>Různé způsoby provádění akcí před opuštěním stránky popisuje následující článek:</p>
  <div class="external-content">
  <ul>
    <li><p>Ilya Grigorik: <a href="https://www.igvita.com/2015/11/20/dont-lose-user-and-app-state-use-page-visibility/">Don't lose user and app state, use Page Visibility</a></p></li>
  </ul>
</div>
  </li>
</ol>



<h2 id="spolehlivost">Spolehlivost lokálního úložiště</h2>

<p>Z mnohaletých zkušeností na 3 webech jsem vypozoroval, že trvanlivost dat v <code>localStorage</code> je perfektní. Položky v lokálním úložišti nemají omezenou dobu platnosti, takže vydrží klidně roky.</p>

<p>Kvůli dlouhé trvanlivosti je dobré již nepotřebná data, která se odeslala na server a nejsou dále potřeba, odstranit. Při ukládání velkého množství dat se jinak vyčerpá dostupný <a href="/localstorage#velikost">datový limit</a> (v některých prohlížečích jen 2 MB).</p>



<h3 id="smazani">Smazání <code>localStorage</code> v prohlížeči</h3>
<p>Smazat položky z úložiště jde v <b>Chrome</b> spolu s <i>cookies</i> v <i>Nastavení → Historie → Vymazat údaje o prohlížení</i>:</p>

<p><img src="/files/ulozeni-stavu/smazani-uloziste.png" alt="Smazání cookies a localStorage" class="border"></p>


























<h3 id="selhani">Selhání úložiště</h3>

<p>K selhání uložení dat dojde v případě, že se prohlížeč nebo operační systém zasekne či je <b>neplánovaně ukončen</b> (např. výpadek elektřiny).</p>

<p>V tomto případě se může stát následující:</p>

<ol>
  <li>
    <p>Neuloží se změny od posledního uložení. Z textového pole třeba zmizí poslední slovo. To je lepší případ.</p>
  </li>
  <li>
    <p>Celý obsah položky zmizí. To je hodně nepříjemné a bohužel se to může stát.</p>
    
    <p>Jde tomu trochu předcházet dělením ukládaných hodnot do více položek nebo jejich duplikováním. Pokud se na střídačku ukládá do dvou položek, měla by alespoň jedna z nich přežít.</p>
  </li>
</ol>


<h2 id="vyprazdneni">Vyprázdnění úložiště</h2>

<p>Ze slušnosti k uživatelům je dobré nepotřebné zálohy z úložiště odstraňovat.</p>

<p>Je ale nutné to dělat až v případě, kdy se data povedlo uložit na straně serveru. Dobře udělané odstranění dat z úložiště tak <b>nemůže</b> probíhat v <code>onsubmit</code>u formuláře (v tu dobu není jasné, jestli se data dostanou na server).</p>

<ol>
  <li><p>Jedno řešení je formulář odesílat <a href="/ajax">AJAXem</a> a obsah úložiště smazat až v případě úspěšného uložení.</p></li>
  <li>
    <p>Druhá možnost je na stránce, kam se přesměruje po odeslání formuláře, zavolat JS funkci pro smazání klíče z <code>localStorage</code>.</p>
  </li>
</ol>



<h2 id="obnoveni">Obnovení hodnoty</h2>

<p>Lehce záludné je i obnovování hodnot z úložiště. V takovém případě je typicky nutné nastavit příslušné hodnoty z <code>localStorage</code> do formulářových prvků.</p>

<div class="internal-content">
  <ul>
    <li><a href="/zalohovani-formularu">Automatické zapamatování formulářů</a></li>
  </ul>
</div>



<p>Nastavení hodnot by mělo proběhnout co nejdříve po vykreslení prvku. V opačném případě může návštěvník začít do políčka psát a po načtení obnovovacího skriptu se mu obsah pod rukou přepíše.</p>

<pre><code>&lt;form name="formular">
  &lt;input name="jmeno">
  &lt;script>
    obnovitPole(document.forms.formular.jmeno);
  &lt;/script>
&lt;/form></code></pre>

<!-- Test: https://kod.djpw.cz/ytsb- -->






<h2 id="upozorneni">Upozornění na ukládání/obnovení</h2>

<blockquote>
  <p>Formulář je průběžně ukládán.</p>
</blockquote>

<p>Aby se návštěvník dozvěděl, že jsou formuláře na stránce zálohovány a nemusí se bát, že mu obsah zmizí, jde mu to sdělit nějakou hláškou.</p>



<p>Obnovení hodnot už potom může proběhnout v tichosti.</p>




<h3 id="odstraneni">Odstranění uložených hodnot</h3>

<p>Bez automatického ukládání stavu do <code>localStorage</code> znamená stisk klávesy <kbd>F5</kbd> (reload) nebo zavření stránky automatické vyčištění zadaných hodnot.</p>

<p>S ukládáním může tato <i>funkce</i> chybět.</p>

<p>Na druhou stranu by funkce <i>odstranit zálohu</i> měla mít nějaký potvrzovací mechanismus či možnost návratu, aby si uživatel formulář omylem nenávratně nesmazal.</p>