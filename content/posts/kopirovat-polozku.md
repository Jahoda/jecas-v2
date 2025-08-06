---
title: "Duplikování položek formuláře v JS"
headline: "Přidání dalšího textového pole"
description: "Jak umožnit kopírování/přidávání dalších textových polí do formuláře."
date: "2014-02-21"
last_modification: "2014-11-23"
status: 1
tags: ["formulare", "hotova-reseni", "js"]
format: "html"
---

<p>V případě, že ve webové aplikaci potřebujeme umožnit zadat <b>více položek stejného typu</b>, hodí se k tomu možnost JavaScriptem jednotlivá políčka <b>duplikovat</b>.</p>

<p>Alternativou je zobrazit předpokládaný počet políček rovnou a při zpracování formuláře brát v úvahu jen ta vyplněná. Dynamická změna počtu položek vypadá ale jako lepší volba.</p>

<div class="live">
<form>
    <div class="polozky" id="polozky">
        <div class="polozka" id="sablona">
            <label>Jméno: <input type="text" name="policko1[]" placeholder="Zadejte jméno"></label>
            <label>Věk: <input type="number" name="policko2[]" value="20" size="4"></label>
            <label>VIP: <input type="checkbox" name="checkbox[]"></label>
            
            <button class="odebrat" onclick="odebrat(this)">× Odebrat</button>
        </div>
    </div>
    <button type="button" onclick="pridatPole()">+ Přidat</button>
</form>
<script>
var prvniPolozka = document.getElementById('sablona');
var sablona = prvniPolozka.cloneNode(true);

function pridatPole() {
    var kopie = sablona.cloneNode(true);
    document.getElementById('polozky').appendChild(kopie);
    kopie.getElementsByTagName("input")[0].focus();
}

function odebrat(el) {
    var polozka = el.parentNode;
    polozka.parentNode.removeChild(polozka);
}
</script>
  
</div>

<p><a href="https://kod.djpw.cz/azhb">Samostatná živá ukázka</a></p>




<h2 id="cloneNode">Metoda <code>cloneNode</code></h2>

<p>Základem je JS metoda <code>cloneNode</code>, která naklonuje první položku, a metoda <code>appendChild</code>, která ji později vloží.</p>

<pre><code>var prvniPolozka = document.getElementById('sablona');
var sablona = prvniPolozka.<b>cloneNode</b>(true);</code></pre>

<p>Pro snadné klonování více <a href="/input"><code>&lt;input></code>ů</a> či jiných formulářových prvků v rámci jedné položky je ideální všechno obalit nějakým elementem – nejspíš <code>&lt;div></code>em.</p>

<pre><code>&lt;div class="polozka" id="sablona">
  &lt;input name="policko1[]">
  &lt;input name="policko2[]">
&lt;/div></code></pre>

<p>Za pozornost dále stojí, že klonování proběhne nadvakrát:</p>

<ul>
  <li>Ihned po <b>načtení stránky</b> se naklonuje první položka.</li>
  
  <li>Při <b>kliknutí na tlačítko</b> <i>Přidat</i> se naklonuje tato kopie.</li>
</ul>

<p>Proč? Kdyby se klonovala přímo <i>živá</i> první položka, promítl by se do klonu <b>její stav</b> (vyplněné hodnoty a podobně), což většinou není žádoucí. Další výhoda je v tom, že nemusíme řešit stav, kdy uživatel odstraní <b>úplně všechny</b> položky. I po odstranění všeho půjde přidat položku novou.</p>

<p>Pokud bychom chtěli zabránit odebrání i první položky, můžeme odebírací tlačítko <b>skrýt pomocí CSS</b> (<a href="/display#none"><code>display: none</code></a>) s využitím CSS selektoru <a href="/first-last-child"><code>:first-child</code></a> (<b>IE 7+</b>).</p>

<pre><code>.polozka:first-child .odebrat {
  display: none;
}</code></pre>




<h2 id="odebrani">Odebrání <code>removeChild</code></h2>

<p>Odebrání bude velmi snadné. Tlačítko <b>Odebrat</b> bude v každém <code>&lt;div></code>u s položkami. V případě, že tlačítko bude přímo v tomto obalu, stačí si najít jeho rodiče (<code>parentNode</code>) a provést <code>removeChild</code>.</p>

<pre><code>function odebrat(el) {
  var polozka = el.parentNode;
  polozka.parentNode.removeChild(polozka);
}</code></pre>

<p>Funkci <code>odebrat</code> se pro <b>zjištění rodiče</b> předá odebírací tlačítko prostřednictvím <code>this</code>.</p>

<pre><code>&lt;button onclick="odebrat(this)">
  × Odebrat
&lt;/button></code></pre>




<h2 id="focus">Udělení <code>focus</code>u</h2>

<p>Po kliknutí na <i>Přidat</i> je vhodné rovnou označit první políčko přidané položky, aby do něj šlo <b>rovnou psát</b>:</p>

<pre><code>kopie.getElementsByTagName("input")[0].<b>focus()</b>;</code></pre>



<h2 id="dalsi">Možná vylepšení</h2>

<p>V závislosti na konkrétním použití je k úvaze případné vylepšení:</p>

<ul>
  <li>
    <p>Novou položku přidávat místo <b>na konec</b> za položkou naposledy upravenou.</p>
    
    <p>K tomu poslouží metoda <code>insertBefore</code> v kombinaci s <code>nextSibling</code>.</p>
    
    <pre><code>polozky.insertBefore(kopie, aktualniPolozka.nextSibling);</code></pre>
  </li>
  
  <li>
    <p>Novou položku <b>přidávat automaticky</b>, když je předchozí (částečně) vyplněná. Tedy mít stále o jednu více položek, než je potřeba.</p>
  </li>
  
  <li>
    <p>Někdy se může hodit možnost <i>Vytvořit na základě předchozí</i>, kde se naopak bude <b>kopírovat</b> obsah předchozí položky včetně <b>vyplněných hodnot</b>.</p>
  </li>
  
  <li>
    <p>Pohrát si s <a href="/tabindex"><code>tabindex</code>em</a>, aby po vyplnění posledního políčka položky klávesa <kbd>Tab</kbd> aktivovala tlačítko <i>Přidat</i> namísto <i>Odebrat</i>.</p>
    <p>Špatné pořadí políček je <a href="/chyby-formularu#klavesnice">častou chybou formulářů</a>.</p>
    
    <p><a href="https://kod.djpw.cz/bzhb">Upravená ukázka</a></p>
  </li>
  
  <li>
    <p>Tlačítko <i>Přidat</i> umístit na místo, kde se <b>nebude pohybovat</b> v závislosti na počtu položek. Případně ho přidat ihned za položku před tlačítko <i>Odebrat</i>.</p>
  </li>
</ul>


<h2 id="zpracovani">Zpracování na serveru</h2>

<p>Pro pohodlné <b>zpracování na serveru</b> je ideální dávat prvkům formuláře názvy s hranatými závorkami <code>[]</code>, aby se s nimi dalo snadno pracovat jako s polem.</p>