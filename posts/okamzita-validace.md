---
title: "Okamžitá validace po zadání znaku"
headline: "Validace po zadávání znaků"
description: "Jak okamžitě reagovat na zadávání znaků do pole během psaní."
date: "2015-03-02"
last_modification: "2015-03-03"
status: 1
tags: ["formulare", "napady"]
format: "html"
---

<p>Postupem času se vyvíjí způsob validování <a href="/formulare">formulářů</a> s cílem <b>zkracovat dobu</b> mezi vyplněním pole a ověřením hodnoty. Zpravidla platí, že čím dříve dostane návštěvník zpětnou vazbu od vyplnění, tím lépe.</p>

<ol>
  <li>
    <p><b>Zpracování na straně serveru</b> po odeslání formuláře je od vyplnění políčka úplně nejdál.</p>
  </li>
  
  <li>
    <p><b>Validace v JS</b> při odeslání formuláře (<code>onsubmit</code>) na straně klienta se trochu přibližuje (nemusí se čekat na odpověď serveru).</p>
  </li>
  
  <li>
    <p>Zpracování pole při <b>přeskočení</b> na další (událost <code>onblur</code>) už následuje bezprostředně po vyplnění.</p>
  </li>
  
  <li>
    <p>Reagovat na každé <b>zadané písmeno</b> je nejspíš cestou k úplně nejrychlejší odezvě.</p>
  </li>
</ol>


<h2 id="okmazita">Okamžitá validace</h2>

<p><b>Výhoda</b> okamžité validace na základě každého zadaného písmena tkví v tom, že uživatel aplikace získá zpětnou vazbu ještě v momentě, kdy <b>má ruce na klávesnici</b> a zrovna vyplňuje dané políčko, takže případné opravy nejsou tolik obtěžující.</p>

<p>Pohodlnější a přívětivější chování formulářů vede k <b>vyššímu počtu vyplnění</b> a <b>vyšší kvalitě získaných dat</b>.</p>

<p><b>Nevýhoda</b>: Pokud je pro ověření dat nutná součinnost se serverem, způsobí odeslání obsahu po každém znaku <b>vyšší zátěž serveru</b>. Není-li server schopný <b>rychle</b> a pokud možno v <b>konstantní době</b> odbavovat požadavky, aplikace se bude chovat nepředvídatelně.</p>


<h3 id="jmeno">Uživatelské jméno</h3>

<p>Příklad na obrázku ukazuje validaci <b>uživatelského jména</b>, kde se po zadání každého znaku objeví, jestli má jméno dostatečnou délku a je obsazené nebo k disposici.</p>

<p><img src="/files/okamzita-validace/validace.png" alt="Příklad validace" class="border"></p>
<!-- k-o-d: http://kod.djpw.cz/iclb -->















<h2 id="reseni">Technické řešení</h2>

<p>Pro okamžitou reakci na vstup do políček existuje událost <a href="/oninput"><code>oninput</code></a>, jde použít na úrovni samotného <a href="/input"><code>&lt;input></code>u</a> či celého formuláře:</p>

<pre><code>&lt;form <b>oninput="zpracuj(this)"></b></code></pre>



<p>Tato událost funguje od <b>IE 9</b> a zachytí i operace se schránkou (pomocí klávesových zkratek i přes kontextové menu) nebo drag &amp; drop přesunutí textu do políčka. Pro prohlížeče neznalé události <code>oninput</code> je odchytávání trochu komplikovanější. Konstrukce řešící většinu případů vypadá následovně.</p>

<pre><code>&lt;input
  onpaste="var that = this; setTimeout(function(){akce(that.value)})"
  oncut="var that = this; setTimeout(function(){akce(that.value)})"
  onkeyup="akce(this.value)"
  onkeypress="akce(this.value)"
  onfocus="var that = this; setTimeout(function(){akce(that.value)})"
 ></code></pre>









<p>Často se využívá <a href="/onpaste#prodleva">trik s časovačem</a>, protože bez něj by v momentě vyvolání události ještě nedošlo ke změně.</p>



<h3 id="ajax">AJAXové požadavky</h3>

<p>Požadavky na server se potom odesílají <a href="/ajax">AJAXem</a>. Důležité je, aby se před novým požadavkem zrušil ten předcházející, jinak může dojít k <a href="/nacitani-ajax#pozdejsi">předběhnutí požadavků</a>, kdy dříve vytvořený požadavek doběhne později a přepíše tak novější výsledek.</p>

<p>K přerušení AJAX požadavku slouží metoda <code>abort</code>.</p>

<pre><code>if (xhr) xhr.abort();</code></pre>





<h2 id="optimalisace">Optimalisace zátěže</h2>

<p>Aby <b>zátěž okamžité validace</b> nebyla tak velká, jde si pomoci několika triky.</p>


<h3 id="klient">Validace bez serveru</h3>

<p>Dobré je validovat co <b>nejvíce věcí v JS</b> na straně klienta. Pro testování počtu znaků nebo použití povolených znaků si lze vystačit s JS a na server nic neposílat.</p>




<h3 id="zmena">Kontrolovat změnu</h3>

<p>V případě použití více událostí zachycujících změnu pole se mohou volání ověřovací funkce se stejnou hodnotou pole provádět zbytečně zároveň. Není-li pravděpodobné, že by se výsledek ověření <b>měnil rychle v čase</b>, není ani potřeba požadavek se stejnými vstupními daty odesílat opakovaně.</p>





<h3 id="prodleva">Prodleva</h3>

<p>Značné <b>úspory požadavků</b> jde docílit přidáním časové prodlevy, po které se validace provede. Validace se potom neprovádí po stisknutí každého znaku, ale až v momentě, kdy uživatel chvíli nic nenapíše.</p>

<p>Dělá se to tak, že se po každé změně <b>vytvoří nový časovač</b>, který má v plánu spustit validaci. Před tím se případně zruší ten předchozí.</p>

<p>Následující kód tak zavolá funkci <code>validaceNaServeru</code> až po 300 milisekundách nečinnosti. Když návštěvník napíše daný řetězec rychle, provede se jen jeden požadavek.</p>

<pre><code>var prodleva;
functin akce(hodnota) {
  clearTimeout(prodleva);
  prodleva = setTimeout(function() {
    <b>validaceNaServeru</b>(hodnota)
  }, 300);
}</code></pre>








<p>Zvyšování této prodlevy <b>zhoršuje dojem okamžité reakce</b>, ale někdy není s ohledem na výkon na výběr.</p>