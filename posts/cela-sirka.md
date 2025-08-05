---
title: "Hlavička a patička přes celou šířku"
headline: "Části webu přes celou šířku"
description: "Jak jen některé části webu roztáhnout přes celou šířku."
date: "2015-02-24"
last_modification: "2015-02-27"
status: 1
tags: ["css", "hotova-reseni", "layout"]
format: "html"
---

<p>Rozlišení monitorů často nabízí mnohem <b>větší šířku</b>, než by pro webovou stránku stačila – pokud je na stránce hodně textového obsahu, stejně není s ohledem na čitelnost rozumné mít text v dlouhých řádcích.</p>

<div class="internal-content">
  <ul>
    <li>Responsivní design webu: <a href="/responsivni-web#typografie">Maximální délka řádků</a> kolem 80 znaků</li>
  </ul>
</div>

<p>Proto se maximální šířka zpravidla omezuje. Slouží k tomu CSS vlastnost <code>max-width</code>.</p>

<p>Někdy se pro atraktivnější vzhled roztahují hlavička, patička nebo nějaká jiná část přes celou šířku s tím, že samotný obsah má šířku omezenou a je <a href="/centrovani">vycentrován</a>.</p>

<p><img src="/files/cela-sirka/cela-sirka.png" alt="Roztažení hlavičky a patičky přes celou šířku" class="border"></p>





















<h2 id="css">CSS řešení</h2>

<p>Docílit roztažení mimo hlavní centrovaný blok jde více způsoby.</p>

<p>Jako výchozí bod může posloužit tento obyčejný centrovaný layout s maximální šířkou:</p>

<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/dzkb">Obyčejná centrovaná stránka</a></li>
  </ul>
</div>


<h3 id="pozadi">Obrázkové pozadí</h3>

<p>Na vršek a spodek webu se nastaví barevné pozadí o výšce hlavičky/patičky. Právě kvůli nutnosti <b>pevné výšky</b> se jedná o řešení hodně nepraktické.</p>

<p>Nastavování výšky na pevnou hodnotu ve většině případů nevěstí nic dobrého.</p>






<h3 id="posicovani">Posicování</h3>

<p>Vytvořit <i>barevné pozadí</i> pomocí <a href="/position#absolute">absolutního posicování</a> se hodí zvlášť v případě, kdy by bylo problematické upravovat HTML kód.</p>

<p>Toto řešení využívá toho, že se na základě výšky patičky/hlavičky vytvoří element s hodně velkou šířkou, nastaví se mu levá záporná posice a pomocí <code>z-index</code>u se zastrčí za obsah.</p>

<p>Aby posicované pozadí <b>nevytvořilo vodorovný posuvník</b>, ořízne se stránka ve vodorovném směru (<code>overflow-x: hidden</code>).</p>

<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/azkb">Ukázka s využitím posicování</a></li>
  </ul>
</div>


<h3 id="obal">Použití obalu</h3>

<p>Nejlepší řešení se zdá použít pro každou část stránky, která má mít pozadí přes celou šířku, další obalový element a každou část <b>centrovat samostatně</b>.</p>

<pre><code>&lt;div style="background: blue">
  &lt;div style="max-width: 900px; margin: auto">
    Hlavička
  &lt;/div>
&lt;/div></code></pre>

<p>Obalový element potom má nastavenou pouze barvu pruhu <i>mimo obsah</i> a veškeré další stylování (centrování, nastavení maximální šířky a podobně) se provádí u vnitřního elementu.</p>

<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/czkb">Ukázka s využitím obalového elementu</a></li>
  </ul>
</div>