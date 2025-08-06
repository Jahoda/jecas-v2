---
title: "Oříznutí víceřádkového obsahu"
headline: "Oříznutí víceřádkového obsahu"
description: "Jak oříznout dlouhý text po stanoveném počtu řádek."
date: "2014-09-13"
last_modification: "2014-12-13"
status: 1
tags: ["css", "hotova-reseni"]
format: "html"
---

<p>Zatímco <a href="/oriznuti-textu">oříznutí jednoho řádku textu</a> není zase taková věda, zajistit totéž u <b>delšího odstavce</b> s více řádky je komplikovanější.</p>

<p>Standardní elegantní řešení je poměrně obtížné najít.</p>

<p>Ve staré <b>Opeře 12</b> existuje nestandardní hodnota CSS <code>text-overflow</code> (<a href="https://kod.djpw.cz/wqfb">ukázka</a>):</p>

<pre><code>.tri-tecky-opera {
  text-overflow: <b>-o-ellipsis-lastline</b>;
}</code></pre>

<p>V <b>Chrome</b> je možné využít nestandardní vlastnost <code>-webkit-line-clamp</code> (<a href="https://kod.djpw.cz/yqfb">ukázka</a>):</p>

<pre><code>.tri-tecky-chrome {
  display: -webkit-box;
  -webkit-line-clamp: 8; /* počet řádků */
  -webkit-box-orient: vertical;
}</code></pre>

<p>Toto řešení není úplně <b>šikovné</b>, protože je závislé například na <b>velikosti písma</b> – velké písmo vyplní prostor menším počtem řádků řádku.</p>










<h2 id="reseni">Řešení</h2>

<p>Oříznout obsah tak nezbývá než pomocí <code>overflow: hidden</code>.</p>

<pre><code>.oriznuty {
  max-height: 5em;
  line-height: 1.25em;
  overflow: hidden;
}</code></pre>

<p>Oříznutí vždy <b>po celém řádku</b> zajistí <b>maximální výška</b> (<code>max-height</code>) v hodnotě násobku <b>výšky řádku</b> (<code>line-height</code>). Kvůli <b>zvětšování písma</b> se hodí použít například jednotky <code>em</code>.</p>

<p>Kód z tohoto příkladu tak ořízne obsah po 4 řádcích (<code>1.25em</code> * <b>4 řádky</b> = <code>5em</code>).</p>

<p><a href="https://kod.djpw.cz/doib">Živá ukázka</a></p>











<h3 id="znazorneni">Znázornění oříznutí</h3>

<p>Na řešení výše bude nešikovná skutečnost, že uživatel nepozná, že je <b>obsah oříznutý</b> — zkrátka najednou skončí.</p>

<p>Zde se <b>komplikovanost řešení</b> zásadně liší na základě dvou případů:</p>

<ol>
  <li>Text <b>vždy přeteče</b> výšku elementu.</li>
  
  <li>Text se občas <b>vejde</b>.</li>
</ol>

<p>V prvním případě stačí do <b>pravého dolního rohu</b> <a href="/position#absolute">absolutně naposicovat</a> překryvný element s <b>výpustkou</b> (<code>…</code>).</p>

<p>Aby byla jistota, že text neskončí kvůli <b>zalomení řádku</b> příliš brzy, je dobré překryvnému elementu nastavit větší šířku.</p>

<p><img src="/files/oriznuti-radek/oriznuti.png" alt="Oříznutí a překrytí" class="border"></p>


















<p>Jediný potenciální problém je tak <b>useknutí uprostřed písmena</b>.</p>

<p><a href="https://kod.djpw.cz/coib">Živá ukázka</a></p>

<p>Problémem useknutí uprostřed písmena netrpí překrytí <b>plynulým obrázkových přechodem</b> do ztracena – jde toho docílit pomocí <a href="/gradient">CSS gradientu</a>.</p>

<p><a href="https://kod.djpw.cz/foib">Živá ukázka</a></p>





<h3 id="neznama-delka">Neznámá délka textu</h3>

<p>V případě, že se obsah někdy vejde a někdy ne, je situace komplikovanější. Chování vylepší naposicování <b>překryvného elementu</b> shora na poslední řádek. Když potom bude obsah vlivem krátkého obsahu nižší, element s <b>výpustkou</b> bude mimo oříznutý element a <b>nebude vidět</b>.</p>

<p><a href="https://kod.djpw.cz/moib">Živá ukázka s výpustkou</a> / <a href="https://kod.djpw.cz/noib">přechodem</a></p>

<!--https://kod.djpw.cz/goib / https://kod.djpw.cz/hoib -->



<h2 id="zobrazit-vice">Zobrazit více</h2>

<p>Je-li dobré, aby se <b>návštěvník</b> k oříznutému obsahu <b>mohl dostat</b>, hodí se přidat odkaz <i>Zobrazit více</i>.</p>

<p>S trochou snahy by to šlo od <b>IE 9</b> s využitím <a href="/stylovani-checked"><code>checkboxu</code></a> a selektoru <code>:checked ~ element</code> vytvořit čistě v CSS:</p>

<p><a href="https://kod.djpw.cz/ooib">Živá ukázka</a></p>

<p>Elegantnější ale vypadá řešení s trochou JavaScriptu:</p>

<p><a href="https://kod.djpw.cz/koib">Živá ukázka</a></p>

<p>Jediným nedostatkem je zobrazení <b>zbytečného odkazu</b> v případě, že text vyjde přesně na stanovený počet řádků. Tomu by šlo předejít zobrazením <i>Zobrazit více</i> přes celý <b>poslední řádek</b>.</p>

<p><a href="https://kod.djpw.cz/loib">Živá ukázka</a></p>



<h2 id="odkazy">Odkazy jinam</h2>

<!--https://kod.djpw.cz/zqfb-->

<ul>
  <li><a href="http://www.mobify.com/blog/multiline-ellipsis-in-pure-css/">Řešení čistě v CSS</a> – využívá triku s pomocí obtékání
  </li>
  
  <li><a href="http://pvdspek.github.io/jquery.autoellipsis/">jquery.autoellipsis</a> – Plugin do jQuery</li>
  
  <li><a href="http://diskuse.jakpsatweb.cz/?action=vthread&forum=4&topic=159021">Diskuse na JPW</a></li>
</ul>