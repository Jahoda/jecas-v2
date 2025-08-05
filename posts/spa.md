---
title: "Single page aplikace"
headline: "Single page application"
description: "Co je to SPA (single page application). Na jakém principu funguje."
date: "2015-02-04"
last_modification: "2015-02-05"
status: 1
tags: ["js", "js-ajax", "napady"]
format: "html"
---

<p><b>Single page application</b> (někdy také <i>one page application</i>) je typ webové aplikace, která většinou používá server pouze jako zdroj a úložiště dat. Data jsou potom kompletně vykreslována JavaScriptem.</p>

<p>Při prvním příchodu na stránku se tedy:</p>

<ol>
  <li>stáhnou potřebné JavaScripty,</li>
  
  <li>vykonají se a určí, jaký obsah se má zobrazit,</li>
  
  <li>stáhnou se požadovaná data,</li>
  
  <li>vypíší se do HTML kostry aplikace,</li>
  
  <li>naváží se události na ovládací prvky.</li>
</ol>

<p>Při dalších interakcích se potom stahuje pouze samotný obsah. Bez podpory JavaScriptu je stránka <b>nefunkční</b>.</p>



<h2 id="server">Co dělá server</h2>


<p>Serverová část SPA je obvykle jen jednoduché rozhraní, které zpracovává <a href="/ajax">AJAXové</a> požadavky ze strany klienta. Průběh akce vypadá může vypadat následovně:</p>


<p><img class="border" src="/files/spa/single-page-app.png" alt="Diagram single page aplikace"></p>











<ol>
  <li>
    <p>Uživatel <b>klikne na tlačítko</b> a JS obsluha události <a href="/udalosti-mysi#onclick"><code>onclick</code></a> vyšle <b>požadavek na server</b>:</p>
    <pre><code>example.com/?zobrazit=kontakt</code></pre>
  </li>
  
  <li>
    <p>Server najde příslušná data a <b>vypíše je</b> v <a href="/json">JSONu</a> (výsledek mohou být obyčejné textové řetězce, čísla nebo HTML kód):</p>
    
    <pre><code>{
  "titulek" : "Kontakt",
  "komentaru" : 5,  
  "obsah" : "&lt;p>Kontaktujte nás&lt;/p>  
}</code></pre>
    
    
    
    
    <p>Používat JSON není podmínkou, ale většinou je to nejsnazší způsob, jak později pohodlně pracovat s jednotlivými položkami.</p>
  </li>
  
  <li>
    <p>JavaScript získaná <code>data</code> <b>vloží</b> na příslušná místa do stránky (titulek, nadpis, obsah atd.).</p>
    <pre><code>document.title = data.titulek;
document.getElementsByTagName("h1")[0].innerHTML = data.titulek;
document.getElementById("obsah").innerHTML = data.obsah;
document.getElementById("pocet-komentaru").innerHTML = data.komentaru;</code></pre>
  </li>
</ol>





<h2 id="push-state">Historie <code>history.pushState</code></h2>

<p>Aby v SPA fungovala funkce <i>Zpět</i> v prohlížečích, používá se fiktivní změna URL a do objektu <code>history</code> se ukládá obsah, který se potom může zobrazit bez nutnosti něco dál načítat.</p>

<div class="internal-content">
  <ul>
    <li><a href="/zmena-url">Změna URL bez obnovení stránky</a> – popis ukládání a obnovování dat z historie</li>
  </ul>
</div>


<h2 id="vyhody">Proč používat SPA</h2>

<p>Hlavní výhoda SPA je rychlá odezva (po prvotním načtení a inicialisaci skriptů), protože se ze serveru následně <b>nestahuje celý HTML kód</b>, ale jen data, která se mění.</p>

<p>Kromě datové úspory nemusí prohlížeč neustále <a href="/vykreslovani#prubeh">překreslovat</a> celou stránku, ale pouze <b>změněné části</b>.</p>

<p>Tento způsob stahování obsahu AJAXem jde využít i k <a href="/lazy-loading">lazy-loadingu</a>, kdy se obsah finální stránky vykreslí v několika krocích. U náročných stránek tím jde docílit rychlého zobrazení nejdůležitějšího obsahu – a další části (náročnější na výpočty) se načtou <b>nezávisle až později</b>.</p>

<p>Nakonec je SPA relativně jednoduchá na vytvoření, jelikož se logika aplikace vytváří pouze v JavaScriptu. Kód se nepíše jednou pro klienta a jednou pro server.</p>








<h2 id="nevyhody">Nevýhody</h2>

<p>Zásadní nevýhodou <i>Single-page application</i> je v některých případech nefunkčnost bez JavaScriptu, což je pro určitý typ webů <b>zásadní překážka</b>.</p>

<p>Obsahový web vytvořený tímto způsobem bude obtížně zpracovatelný pro <b>roboty vyhledávačů</b>.</p>

<p>Problematický je obvykle i <b>delší čas prvního načtení</b> (musí se stáhnout potřebné skripty a až potom se začne stahovat vlastní obsah).</p>

<p>U některých typů webových aplikací tyto nevýhody ale nemusí vadit, případně je převýší výhody.</p>