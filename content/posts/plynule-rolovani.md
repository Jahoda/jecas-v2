---
title: "Plynulé odrolování"
headline: "Plynulé scrollování na obsah"
description: "Jak vytvořit plynulé odrolování na určitou část stránky."
date: "2014-10-03"
last_modification: "2025-04-01"
status: 1
tags: ["css", "js", "scroll"]
format: "html"
---

<p>Na delší stránce, kde se na jednotlivé části odkazuje pomocí kotev (typicky u <b>jednostránkových webů</b>), může být hezké dané přesunutí udělat <b>plynule</b>. Výchozí chování prohlížečů je takové, že po kliknutí na odkaz:</p>

<pre><code>&lt;a href="#nazev">Odkaz&lt;/a></code></pre>

<p>Se okamžitě přeskočí na příslušný obsah.</p>

<pre><code>&lt;div id="nazev">
  …</code></pre>












<h2 id="scroll-behavior">CSS vlastnost <code>scroll-behavior</code></h2>

<p>Dříve se tyto věci řešily relativně složitými JavaScripty, dnes to vyřeší jeden řádek CSS:</p>

<pre><code>html { scroll-behavior: smooth; }</code></pre>





<p>A všechny přesuny na stránce budou plynulé.</p>

<p><a href="https://kod.djpw.cz/dond">Živá ukázka</a></p>


<p>Funguje to dokonce i v dalších scrollovatelných oblastech vytvořených pres <code>overflow: auto</code>. <a href="https://kod.djpw.cz/eond">Ukázka</a>.</p>



<p>Plynulé rolování <b>je plně v režii prohlížeče</b>, takže už nejde nastavovat věci jako rychlost rolování nebo jeho celkovou dobu.</p>




<div class="external-content">
  <ul>
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior"><code>scroll-behavior</code></a></li>
</ul>
</div>







<h3 id="hash">#hash v adresním řádku</h3>

<p>Věc k úvaze je, zda nevadí promítání <code>#hash</code>e do adresy. Někdy to může být nevýhoda, protože méně zkušený návštěvník často nevědomky odkáže na <b>konkrétní část</b> v domnění, že odkazuje celou stránku.</p>


<p>Toto je třeba zvážit s ohledem na typ konkrétní stránky. Na některých stránkách se spoustou odkazů na kotvy dokonce bývá běžné, že se kotvy v adresním řádku <b>automaticky mění</b> během posouvání stránkou, potom to může být žádoucí.</p>

<p>Ale určitě existují případy, kdy je lepší naopak nechávat adresu <i>čistou</i>. Potom přichází do hry JavaScript.</p>




<h2 id="js">Řešení v JavaScriptu</h2>

<p>V JS jde k nejen plynulému rolování použít metodu <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView"><code>scrollIntoView</code></a>:</p>

<pre><code>document.getElementById("dolu").scrollIntoView({ behavior: "smooth" })</code></pre>

<p>Metoda <code>scrollIntoView</code> má řadu možností nastavení.</p>

<ul>
  <li>
    <p>Pomocí <code>{behavior: "instant"}</code> jde změnit rolování na okamžité místo plynulého.</p>
  </li>
  <li>
    <p>Přes <code>block</code>/<code>inline</code> jde nastavovat chování pro vodorovné a svislé rolování, co se týče <i>zarovnání</i>.</p>
    
    <ul>
      <li>
        <code>start</code> – cílový element bude nahoře/vlevo
      </li>
      <li>
        <code>center</code> – uprostřed
      </li>
      <li>
        <code>end</code> - dole/vpravo
      </li>
      <li>
        <code>nearest</code> – zajímavá vlastnost zajišťující, že se zarovná tam, kde bude potřeba méně scrollovat
      </li>
    </ul>
  </li>
</ul>

<p>Příklad může být:</p>

<pre><code>document.getElementById("dolu").scrollIntoView({
  block: "nearest",
  behavior: "smooth"
})</code></pre>


<p>Užitečné jsou i vlastnosti <code>scroll-margin-top</code> a <code>scroll-margin-bottom</code> pro posunutí elementů mimo fixní prvky (např. fixní hlavička webu).</p>



<h2 id="historie">Historie plynulého scrollování v JavaScriptu</h2>

<p>Když tento článek v roce <b>2014</b> vznikal, situace byla dost odlišná. Plynulé scrollování se muselo <b>ručně animovat</b>. Pro zajímavost zde zůstává tento text v původním znění:</p>

<p>S použitím <b>jQuery</b> je to otázka pár řádků kódu.</p>

<p><a href="https://kod.djpw.cz/cjhb">Ukázka</a></p>

<p>V čistém JS není narozdíl od jQuery funkce pro animování. Dá se vytvořit třeba tak, že se na základě požadovaného počtu snímků za vteřinu (například 60) vypočítá počet kroků na základě požadované doby animace.</p>

<pre><code>var dobaAnimace = 200; // 200 milisekund
var delkaKroku = 1000 / 60; // 60 snímků za vteřinu (1000 ms)
var pocetKroku = dobaAnimace / delkaKroku;</code></pre>

<p>Délka jednoho kroku bude přibližně 16 (<code>1000 / 60 = 16,66</code>), kroků pro 200ms animaci potom bude 12 (<code>200 / (1000 / 60) = 12</code>).</p>

<p>Následně je potřeba zjistit o kolik je odrolováno v době kliknutí na odkaz.</p>

<pre><code>var odrolovano = document.documentElement.scrollTop + 
  document.body.scrollTop;</code></pre>

<p>Umístění cíle zjistíme elegantně z vlastnosti <code>top</code> získané metodou <code>getBoundingClientRect</code>, která vrátí kladnou nebou zápornou vzdálenost k cíli od <b>horní hrany</b> (což je předchozí <code>odrolovano</code>).</p>

<pre><code>var souradniceCile = cil.getBoundingClientRect();
var vzdalenostCile = souradniceCile.top;</code></pre>

<p>Nyní stačí na základě počtu kroků spočítat <b>posun pro každý krok</b> – <code>vzdalenostCile</code> se vydělí počtem kroků.</p>

<pre><code>var rozdilKroku = vzdalenostCile / pocetKroku;</code></pre>

<p>V proměnné <code>rozdilKroku</code> tak nyní bude hodnota, kterou je nutné přičítat k hodnotě <code>odrolovano</code>. To nám dá pro každý krok hodnotu pro částečný <b>posun směrem k cíli</b>. Se známou novou hodnotou pro posun už jen použijeme <code>window.scrollTo</code>.</p>

<p><a href="https://kod.djpw.cz/ijhb">Celá ukázka</a></p>


<h3 id="delka">Délka animace</h3>

<p>Doba, za kterou se stránka plynule posune, by neměla být <b>vysoká</b>, protože by takový efekt nepříjemně zdržoval.</p>

<p>Relativně rozumná délka animací mi přijde někde okolo <b>200 milisekund</b>. Animace by měla mít nějaký smysl. V tomto případě například pomůže uživateli odhadnout jakým směrem nebo jak daleko <i>byl odrolován</i>.</p>

<p>Dobré je také nemít průběh animace <b>lineární</b>, ale průběh ke konci zpomalovat.</p>


<h3 id="smooth-scroll">Řešení Smooth Scroll</h3>

<p>Po napsání vlastní funkce jsem objevil pokročilejší hotové řešení.</p>

<a href="https://github.com/cferdinandi/smooth-scroll">Smooth Scroll</a> (<a href="http://cferdinandi.github.io/smooth-scroll/">demo</a>)

<p>Které například nabízí možnost zvolit různý průběh doby animace nebo odrolování přizpůsobit <a href="/fixni-menu">fixní navigaci</a>, kdy nastává problém při <a href="/kotva-fixni-menu">odkazování na kotvu</a> i bez <b>plynulého rolování</b>.</p>
