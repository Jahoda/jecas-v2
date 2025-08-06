---
title: "Plynule zobrazit/skrýt obsah"
headline: "Plynulé rozbalení obsahu"
description: "Jak pomocí CSS animace a JavaScriptu plynule rozbalit původně skrytý obsah."
date: "2015-03-22"
last_modification: "2015-03-22"
status: 1
tags: ["hotova-reseni", "prepinani-vzhledu", "webove-animace"]
format: "html"
---

<p><img src="/files/rozbaleni/odkryti.gif" alt="Plynulé odkrytí obsahu" class="border"></p>









<p>Méně důležitý obsah na stránce může být užitečné nejprve skrýt a následně zobrazit až na vyžádání uživatele.</p>

<p>Skutečně by se mělo jednat o <b>méně důležitý obsah</b>, protože <a href="/google">Google</a> mu může <a href="/skryty-text">snížit váhu</a>.</p>

<div class="internal-content">
  <ul>
    <li><a href="/prepinani-vzhledu">Přepínání vzhledu</a> – různé způsoby změny vzhledu</li>
  </ul>
</div>

<p>Nejjednodušší je při kliknutí na tlačítko „Zobrazit více“ <a href="/prepinani-trid">přepnout CSS třídu</a> nebo <a href="/toggle-data-atributy">vlastní atribut</a> a na základě toho nastavit (ne)viditelnost:</p>

<ul>
  <li><code>display: none</code> pro skrytí,</li>
  <li><code>display: block</code> (nebo jinou hodnotu vlastnosti <a href="/display"><code>display</code></a>) pro zobrazení</li>
</ul>

<h2 id="animace">Animace rozkrytí</h2>

<p>Jeden z populárních efektů je <i>rozbalení</i> obsahu postupným přidáváním výšky. Od <b>IE 10</b> jde výšku (<code>height</code>) animovat přímo v CSS pomocí vlastnosti <a href="/transition"><code>transition</code></a>.</p>

<p>Jde tak docílit plynulého zobrazování jen v CSS.</p>

<div class="internal-content">
  <ul>
    <li><a href="/animace-skryt">Animované skrytí obsahu</a> – příklady čistě CSS animací pro zobrazení/skrytí textu</li>
  </ul>
</div>

<p>Bohužel zrovna při animování výšky je u CSS problém v tom, že ji není možné <b>animovat přesně</b>. Nejde plynule animovat z neznámé výšky na nulu.</p>

<p>Jde to obejít použitím <code>max-height</code> – pro zobrazený stav nastavit <code>max-height</code> na hodnotu zaručeně vyšší než je skutečná výška. Nevýhoda je <b>závislost na výšce</b> a fakt, že animace nepoběží <b>přesně stanovenou dobu</b> (část doby animace proběhne bez viditelné změny, protože je obsah nižší než aktuální <code>max-height</code>).</p>

<p><img src="/files/animace-skryt/max-height.png" alt="Rozdíl mezi height a max-height" class="border"></p>

















<h2 id="js">Kombinace JS a CSS</h2>

<p>Pro lepší výsledek je proto nutné si výšku přeměřit a nastavit JavaScriptem. Její plynulou změnu už zajistí klasické CSS <code>transition</code>. Při <a href="/vypnuty-js">zapnutém JS</a> (<code>&lt;body></code> bude mít třídu <code>js</code>) bude přepínatelný obsah neviditelný (<code>display: none</code>).</p>

<pre><code>.js .toggle-content {
  overflow: hidden;
  display: none;
  transition: height .2s;
}</code></pre>






<h3 id="zobrazit">Zobrazení</h3>

<p>JS kód pro <b>zobrazení</b> obsahu:</p>

<pre><code>// zobrazení elementu
content.style.display = "block";
// vynulování výšky, aby se přizpůsobila obsahu
content.style.height = "";
// <a href="/zjisteni-rozmeru#rozmery-elementu">zjištění výšky elementu</a> v pixelech
var height = content.offsetHeight;
// nastavení výšky na nulu
content.style.height = 0;
// <a href="/vykreslovani#optimalisace">překreslení</a>
content.offsetHeight;
// nastavení výšky pro animaci
content.style.height = height + "px";
// přidání atributu s informací, že je otevřeno
content.setAttribute("data-open", "1"); </code></pre>














<p>Za pozornost stojí hlavně řádek:</p>

<pre><code>// překreslení
content.offsetHeight;</code></pre>

<p>To slouží k tomu, aby prohlížeče element v každém případě překreslily a animace se projevila. Bez toho by ve <b>Firefoxu</b> nebylo první rozkliknutí plynulé.</p>







<h3 id="skryti">Skrytí obsahu</h3>

<p>Skrytí už je úplně prosté. Stačí nastavit výšku na <code>0</code> a odebrat atribut znázorňující otevření.</p>

<pre><code>content.style.height = 0;
content.removeAttribute("data-open");</code></pre>

<p>Přidávat/odebírat data-atribut není nutné, ale je to snadný způsob jak později určit, jestli je obsah zobrazený nebo skrytý.</p>

<pre><code>if (content.getAttribute("data-open")) {
  hide(content);
}
else {
  show(content);
}</code></pre>









<h2 id="demo">Demo</h2>

<p>Celá ukázka potom může vypadat následovně:</p>

<div class="external-content">
  <ul>
    <li><a href="https://kod.djpw.cz/yolb">Ukázka plynulé změny výšky</a></li>
  </ul>
</div>

<p>V prohlížečích nepodporujících <code>transition</code> není zobrazení/skrytí plynulé.</p>