---
title: "Plynulé posouvání :hover efektu"
headline: "Plynule se posouvající :hover efekt"
description: "Jak v CSS/JS vytvořit u navigace plynule přesouvaný hover efekt."
date: "2014-09-26"
last_modification: "2014-09-28"
status: 1
tags: ["css", "hotova-reseni", "js", "webove-animace"]
format: "html"
---

<p><img src="/files/hover-posun/menu.gif" alt="Plynulé přesouvání hoveru" class="border"></p>

<p>Cílem je vytvořit <code>:hover</code> efekt, který se bude <b>plynule</b> přesouvat mezi jednotlivými položkami ve <b>vodorovném menu</b>.</p>



<h2 id="css">Čisté CSS</h2>

<p>HTML kostra bude vypadat následovně:</p>

<pre><code>&lt;div class="menu">
    &lt;a href="">Odkaz&lt;/a>
    &lt;a href="">Odkaz&lt;/a>
    &lt;a href="">Odkaz&lt;/a>
    &lt;span>&lt;/span>
&lt;/div></code></pre>

<p>Zvýrazňující prvek bude prázdný element (<code>&lt;span></code>) například (záleží na fantasii při tvorbě) s nastaveným pozadím (<code>background</code>) a spodním rámečkem (<code>border-bottom</code>), který se <a href="/position#absolute">absolutně</a> naposicuje za odkaz (pomocí <code>z-index</code>u).</p>

<p>Rozměry se mu nastaví s ohledem na velikost jednotlivých odkazů v menu. To tedy implikuje, že <b>šířka odkazů bude pevná</b>.</p>

<pre><code>.menu a {
  width: 100px;
  float: left;
  position: relative;
  z-index: 1;
}
/* zvýrazňovač */
.menu span {
  position: absolute;
  width: 100px;
  background: #1081DD;
}
</code></pre>


<h3 id="css-hover"><code>:hover</code></h3>

<p>Při najetí na odkaz (<code>.menu a:hover</code>) nastavíme zvýrazňovacímu <code>&lt;span></code>u posici dle odkazu, na který se najelo.</p>

<p>Pro zaměření konkrétní položky využijeme od <b>IE 9</b> <a href="/css-selektory#n-ty-potomek">selektor <code>nth-child</code></a> (případně obyčejné třídy pro starší prohlížeče):</p>

<pre><code>.menu a:nth-child(1) {/* první odkaz */}</code></pre>  
  
<p>Pro zaměření zvýrazňovacího <code>&lt;span></code>u potom poslouží <a href="/css-selektory#libovolny-sourozenec">selektor libovolného sourozence</a> (od <b>IE 7</b>) – to je ta vlnovka (<a href="/ceska-klavesnice#pravy-alt">takto ji lze napsat</a>):</p>

<pre><code>.menu a:nth-child(1):hover <b>~</b> span {
  /* zvýrazňovací span při hoveru 1. odkazu */
}</code></pre>

<p>Tato pravidla se musí vytvořit pro <b>každý jeden odkaz</b>, lišit se budou jen hodnotou <code>left</code>, která umístí <i>zvýrazňovač</i> na požadovanou posici.</p>


<h3 id="animace">Animace</h3>

<p>Nyní zbývá už jen zajisti plynulý přechod k čemuž využijeme <a href="/transition"><code>transition</code></a> vlastnosti <code>left</code>.</p>

<pre><code>.menu span {
  transition: left .2s;
}</code></pre>


<p><a href="https://kod.djpw.cz/byfb">Živá ukázka</a></p>



<h2 id="js">Řešení v JavaScriptu</h2>

<p>Jelikož řešení v <i>čistém CSS</i> trpí <b>řadou problémů</b>:</p>

<ul>
  <li><b>pevná šířka</b>,</li>
  <li><b>neelegantní CSS kód</b>,</li>
  <li>nemožnost mít odkazy ve <b>více řádcích</b>,</li>
  <li>při odjetí a najetí z/na menu <i>zvýrazňovač</i> přiletí z levé záporné posice.</li>
</ul>

<p>Hodí se pro jejich odstranění využít špetky <b>JS</b>.</p>

<p>Stačí jen při najetí na odkaz (<code>onmouseover</code>) <i>překopírovat</i> výšku, šířku, umístění zleva a umístění shora od odkazu do zvýrazňovacího <code>&lt;span></code>u.</p>

<pre><code>zvyraznovac.style.left = this.offsetLeft + "px";
zvyraznovac.style.top = this.offsetTop + "px";
zvyraznovac.style.width = this.offsetWidth + "px";
zvyraznovac.style.height = this.offsetHeight + "px";</code></pre>

<p>Původní <code>transition</code> zajistí <b>plynulý přesun</b>.</p>

<p><a href="https://kod.djpw.cz/cyfb">Živá ukázka</a></p>


<p>Tento JS kód bude fungovat i pro <b>navigaci svislou</b> – <a href="https://kod.djpw.cz/dyfb">ukázka</a> či <b>víceřádkovou</b> – <a href="https://kod.djpw.cz/eyfb">ukázka</a>.</p>