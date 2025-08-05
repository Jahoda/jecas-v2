---
title: "Průběh načítání AJAXu"
headline: "Průběh načítání AJAXu"
description: "Při odesílání dat AJAXem je dobré dát uživateli vědět, že se něco děje."
date: "2014-03-10"
last_modification: "2014-12-23"
status: 1
tags: ["hotova-reseni", "js", "js-ajax"]
format: "html"
---

<p>Vytvořit obyčejnou stránku, která načítá obsah pomocí <a href="/ajax">AJAXu</a>, není příliš složité.</p>

<pre><code>function nacist(url) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      // vypsaní obsahu;
      document.getElementById("obsah").innerHTML = xhr.responseText;
    }
  }
  xhr.open('GET', url);
  xhr.send();
}</code></pre>








<p>Udělat to <b>lépe</b> ale už dá trochu práce. Zásadní problémy uvedeného prostého řešení existují dva. Když funguje všechno jak má, tak se nemusí projevit.</p>

<ol>
  <li>Znázornění uživateli, <b>že se něco děje</b>. U standardního požadavku, kdy se načítá nová stránka to <b>řeší prohlížeč</b>.</li>
  
  <li><b>Vícenásobné provedení požadavku</b>, když uživatel klikne na daný odkaz <b>vícekrát</b>.</li>
</ol>




<h2 id="indikace">Indikace načítání</h2>

<p>Když uživatel klikne a <b>delší dobu se nic nestane</b>, <b>ztrácí důvěru v aplikaci</b> – vypadá to, že je něco rozbité, takže bude akci provádět znovu nebo stránku opustí, protože mu web <i>nefunguje</i>.</p>

<p>Řešení je po vykonání akce vytvořit signalisaci, že se něco děje. Při normálním běhu webu by obsloužení požadavku <b>mělo být tak rychlé</b> (desítky až nízké stovky milisekund), že se provedení obejde i bez <b>indikace načítání</b>.</p>

<p>Načítání tedy potřebujeme znázornit až po <b>určité době – např. po 0,5 vteřiny</b>. Jelikož se může stát, že se tato indikační animace <b>objeví jen na chvíli</b>, mělo by z ní být <b>co nejrychleji</b> patrné, že signalisuje načítání (tj. se vyhnout slovním popisům).</p>

<div class="internal-content">
  <ul>  
    <li><a href="/animace-nacitani">CSS animace průběhu načítání</a> – <i>progress bar</i> jako je na YouTube</li>
    
    <li><a href="/progress">HTML značka <code>&lt;progress></code></a> – element znázorňující načítání (<b>IE 10</b>+), <a href="http://kod.djpw.cz/wxib">ukázka</a></li>
    
    <li><a href="/css-spinner">CSS spinner</a> – točící se kolečko</li>
  </ul>
</div>

<p>Jednoduché řešení je i využít <a href="/cursor#wait">kursoru <code>wait</code></a>, ale nebude fungovat na <b>dotykových zařízeních</b>, kde žádný kursor není.</p>

<p>Technické řešení animace potom bude fungovat tak, že se při <b>vyvolání akce</b> například <a href="/prepinani-trid">změnou třídy</a> <b>zobrazí indikační prvek</b> a při dokončení akce se změnou třídy změní na původní zase <b>skryje</b>.</p>

<p>Pokud chceme při načítání stránku ovlivnit nějak komplexněji, hodí se třídu „<code>nacitam</code>“ přidat pro <a href="/documentelement-body"><code>&lt;body></code> nebo <code>&lt;html></code></a>.</p>



<h2 id="vice-pozadavku">Vícenásobné požadavky</h2>

<p>Následkem <b>absence zobrazení načítání</b>, <b>netrpělivosti uživatele</b> (dvojitý klik místo jednoho) nebo vlastností <b>asynchronních požadavků</b> se může stát, že se na tutéž akci vytvoří více požadavků než jeden.</p>



<h3 id="prvni">První vyhrává</h3>

<p>Výsledkem jsou potom dost komické situace, kdy se třeba při uložení dat nejprve zobrazí hláška, že bylo úspěšné, a následovat bude varovná hláška, že nebylo co měnit (změny provedl první požadavek).</p>

<p>Pokud jsou určité uživatelské akce <b>limitovány nějakým počtem změn</b>, netrpělivý uživatel si takto <i>vyplácá</i> pokusy.</p>

<p>Cílové chování je, aby první požadavek <b>zabránil do doby svého dokončení</b> v provádění dalších požadavků.</p>

<p>Řešení je zavedení proměnné znázorňující stav.</p>

<pre><code>var odesilaSe = false;</code></pre>

<p>V akci pro AJAX se potom v případě, že se nic neodesílá vyšle požadavek a <code>odesilaSe</code> se nastaví na <code>true</code>.</p>

<pre><code>function nacist(url) {
  if (odesilaSe) return;
  odesilaSe = true;
  // poslání požadavku
}</code></pre>







<p>Ve funkci, která dostane data, se kromě výpisu <i>odemkne</i> odesílání pro další akce:</p>

<pre><code>odesilaSe = false;</code></pre>





<h3 id="pozdejsi">Pozdější vyhrává</h3>

<p>Jiná situace nastane například při zobrazení obsahu z <b>našeptávače</b> reagující na každý stisk klávesy. Na první pohled by zde neměl být problém – je cílem, aby pozdější požadavek <b>přepsal dřívější</b>.</p>

<p>Bohužel zde máme jev <b>předběhnutí požadavků</b>. Ono se totiž může stát, že později zavolaný požadavek bude dokončen dříve než ten dřívější.</p>

<p><img src="/files/nacitani-ajax/predbehnuti.png" alt="Předběhnutí požadavku" class="border"></p>












<p>Výsledkem je potom zobrazení aktuálních dat z posledního požadavku, které následně nahradí data <b>neaktuální</b> z požadavku staršího, který se pozdržel.</p>

<p>Řešení je <b>zrušení ajaxového požadavku</b> před vytvořením nového.</p>

<pre><code>if (xhr) xhr.abort();</code></pre>




<p>K podobným případům může docházet i při volání akcí <a href="/odpocitavani">časovačem <code>setInterval</code></a>. Kromě použití <code>abort()</code> jde místo <code>setInterval</code> použít <code>set<b>Timeout</b></code> při každém úspěšném získání dat. Tedy nepoužívat časovou smyčku (<code>setInterval</code>), ale nový požadavek si opakovaně vytvářet jednorázově.</p>

<pre><code>var casovac;
function nacist(url) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      // vypsaní obsahu;
      document.getElementById("obsah").innerHTML = xhr.responseText;
      // zavolání dalšího požadavku
      casovac = setTimeout(function() {
        nacist(url);
      }, 10 * 1000);
    }
  }
  xhr.open('GET', url);
  xhr.send();
}</code></pre>



















<h2 id="reseni">Hotové řešení</h2>

<p><a href="http://kod.djpw.cz/jwib">Živá ukázka</a> řešení, kdy je před novým požadavkem nutné čekat na ten předchozí.</p>
<!-- ukázka bez zpožděné animace: http://kod.djpw.cz/iwib -->

<o>Animace se spouští <b>s prodlevou 0,5 vteřiny</b>, aby v případě rychlého načtení neobtěžovala. Během načítání <b>nejde vytvořit nový požadavek</b>.</o>

<p><img src="/files/nacitani-ajax/nacitani.gif" alt="Načítání s animací" class="border"></p>












<p>V plném rozsahu se ukázka projeví při <b>pomalé odezvě serveru nebo pomalém připojení</b>. Simulovat vysokou odezvu připojení je snadno možné ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a> v <b>Chrome</b> při emulaci mobilních zařízení.</p>

<p><img src="/files/nacitani-ajax/pomale-pripojeni.png" alt="Simulace pomalého připojení" class="border"></p>









<p>Nasimulovat si <b>dlouhou odezvu serveru</b> jde obvykle použitím funkce <code>sleep</code>.</p>



<h2 id="vytuhnuti">Vytuhnutí</h2>

<p>Relativně problematické je řešení stavu, kdy <b>ajaxový požadavek</b> nebude hodně <b>dlouhou dobu reagovat</b>.</p>

<p>Zde můžeme při zavolání požadavku vytvořit další časovač, který po delší době zkontroluje, jestli se na požadavek <b>ještě čeká</b> (když požadavek skončí dřív, kontrolující časovač odstraní).</p>

<p>V případě neúspěchu se nabízí zkusit požadavek <b>odeslat znovu</b> nebo uživatele vyzvat ke <b>klasickému obnovení stránky</b> (zde je ovšem nutné předcházet <a href="/zalohovani-formularu">zapomenutí dat</a>).</p>

<!--
http://adactio.com/journal/6705/
-->