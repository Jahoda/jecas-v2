---
title: "Kontextová nabídka s menuitem"
headline: "Kontextová nabídka <code>&lt;menuitem></code>"
description: "HTML značka <code>&lt;menuitem></code> umožňuje vytvořit <i>nativní</i> kontextovnou nabídku."
date: "2014-10-07"
last_modification: "2014-10-07"
status: 1
tags: ["html", "html-tagy"]
format: "html"
---

<p>Stručně řečeno umí značka <code>&lt;menuitem></code> vytvořit nabídku, která se objeví po stisknutí <b>pravého tlačítka myši</b>, bez nutnosti používat JavaScript.</p>

<p class="rel"><a href="/kontextova-nabidka">Kontextová nabídka v JavaScriptu</a> je popsána v samostatném článku.</p>


<h2 id="podpora">Podpora</h2>

<p>Zatím funguje jen ve <b>Firefoxu</b> (od verse 8).</p>

<p><img src="/files/menuitem/kontextove-menu.png" alt="Nativní vlastní kontextová nabídka ve Firefoxu" class="border"></p>





















<h2 id="zapis">Zápis</h2>

<p>Nejjednodušší příklad, který vytvoří <i>kontextové menu</i> o jedné položce, vypadá následovně.</p>

<pre><code>&lt;menu <b>type="context"</b> id="<i>kontextove-menu</i>">
  &lt;menuitem label="Popisek" onclick="alert(1)">
  &lt;/menuitem>
&lt;/menu></code></pre>

<ul>
  <li>Jako <i>obal</i> se používá stará dobrá značka <code>&lt;menu></code>.</li>
  
  <li>Atribut <code>type</code> nastavený na <code>context</code> určuje, že se jedná o kontextovou nabídku, což v <b>podporovaných prohlížečích</b> skryje vnitřek <code>&lt;menu></code>.</li>
  
  <li>Identifikátor (<code>id</code>) je důležitý pro pozdější <b>navázání kontextové nabídky</b> ke kontextu (nějakému elementu, kde se má menu zobrazit).</li>
</ul>


<h3 id="pripojeni">Připojení k elementu</h3>

<pre><code>&lt;div <b>contextmenu</b>="<i>kontextove-menu</i>">
  Obsah
&lt;/div></code></pre>

<p><a href="https://kod.djpw.cz/xdgb">Živá ukázka</a> (funkční ve <b>Firefoxu 8+</b>)</p>



<h2 id="menuitem">Značka <code>&lt;menuitem></code></h2>

<p>Element <code>&lt;menuitem></code> má řadu atributů.</p>


<dl>
  <dt id="label"><code>label</code></dt>
  <dd>
    <p>Popisek nabídky.</p>
  </dd>
  
  <dt id="onclick"><code>onclick</code></dt>
  <dd>
    <p>JavaScriptová akce, co se provede po kliknutí. Kvůli přehlednosti je lepší <b>volat nějakou funkci</b> než přímo od atributu psát složitější JS kód.</p>
  </dd>
  
  <dt id="icon"><code>icon</code></dt>
  <dd>
    <p>URL ikonky pro danou akci.</p>
  </dd>
  
  <dt id="disabled"><code>disabled</code></dt>
  <dd>
    <p>Deaktivuje položku.</p>
  </dd>
</dl>


<h2 id="urovne">Více úrovní</h2>

<p>Do značky <code>&lt;menu></code> se dajší zanořovat další <code>&lt;menu></code>. Když se vnořené značce <code>&lt;menu></code> přidá atribut <code>label</code>, její obsah se stane nižší úrovní.</p>

<pre><code>&lt;menu type="context" id="kontextove-menu">
  &lt;menu <b>label="Více"</b>>
    &lt;menuitem label="Popisek" onclick="alert(1)">
    &lt;/menuitem>
  &lt;/menu>
&lt;/menu></code></pre>

<p><img src="/files/menuitem/vnorena-nabidka.png" alt="Vnořená kontextová nabídka ve Firefoxu" class="border"></p>

<p><a href="https://kod.djpw.cz/ydgb">Živá ukázka</a></p>



<h2 id="oddeleni">Oddělení nabídek</h2>

<p>Použitím <code>&lt;menu></code> bez <code>label</code> atributu potom může vzniknout <b>nová sekce</b> oddělená vodorovným rámečkem.</p>

<p><img src="/files/menuitem/oddeleni.png" alt="Oddělení nabídek ve Firefoxu" class="border"></p>


<pre><code>&lt;menu type="context" id="kontextove-menu">
  &lt;menu>
    &lt;menuitem label="Popisek" onclick="alert(1)">
    &lt;/menuitem>
  &lt;/menu>
  &lt;menu>
    &lt;menuitem label="Popisek oddělený" onclick="alert(1)">
    &lt;/menuitem>
  &lt;/menu>
&lt;/menu></code></pre>



<p><a href="https://kod.djpw.cz/zdgb">Živá ukázka</a></p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  
  <li>DevDocs: <a href="http://devdocs.io/html/element/menuitem">&lt;menuitem></a></li>
  <li>Mozilla Hacks: <a href="https://hacks.mozilla.org/2011/11/html5-context-menus-in-firefox-screencast-and-code/">HTML5 context menus in Firefox</a></li>
</ul>