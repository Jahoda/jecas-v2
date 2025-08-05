---
title: "Složení jednoduchého webu v PHP"
headline: "Jednoduchý web v PHP"
description: "I web o pár stránkách je vhodné skládat automatisovaně. Jak na to v PHP?"
date: "2013-09-05"
last_modification: "2013-09-08"
status: 1
tags: ["hotova-reseni", "php"]
format: "html"
---

<p>Pro některé <b>malé weby</b> může být jednodušší a z hlediska výkonu (zátěž serveru + rychlost načítání) výhodnější nepoužívat nějaký rozsáhlý redakční systém. Psát vše v <b>čistém HTML</b> a <b>ručně kopírovat společné části</b> není také nic moc. Nabízí se třetí cesta… skládání stránky v PHP.</p>

<h2>Vložení společných částí</h2>
<p>Jako nejelegantnější se mi jeví společné části uložit jako funkce do společného souboru, který se na každé stránce připojí a společné funkce se zavolají.</p>
<p>Můžeme vycházet z toho, že výsledný HTML kód každé stránky sestává z:</p>
<ol>
  <li>společného obsahu <b>před</b> samotným obsahem — typicky <code>&lt;!doctype html&gt;</code>, <code>&lt;meta&gt;</code> značky, hlavička, popřípadě menu,</li>
  <li>společného obsahu <b>za</b> samotným obsahem — typicky patička nebo další sloupec</li>
</ol>

<p>Samotná stránka <code>nejaka-stranka.php</code> potom bude vypadat nějak takto:</p>
<pre><code>&lt;?php
include "spolecne.php";
hlavicka("Titulek stránky");
?&gt;

&lt;!-- samotný obsah --&gt;
&lt;h1&gt;Nadpis stránky&lt;/h1&gt;
&lt;p&gt;Obsah stránky&lt;/p&gt;
&lt;!-- konec samotného obsahu --&gt;

&lt;?php 
paticka();
?&gt;
</code></pre>

<p>Soubor <code>spolecne.php</code> bude v začátku jen definovat funkce <code>hlavicka</code> a <code>paticka</code>.</p>

<h3>Hlavička</h3>
<pre><code>&lt;?php
function hlavicka($title, $description = "") {
?>
&lt;!doctype html>
&lt;meta charset="utf-8">
&lt;title>&lt;?=empty($title) ? "Název webu" : $title . " – Název webu"?>&lt;/title>
&lt;?php if (!empty($description)) { ?>
&lt;meta name="description" content="&lt;?=$description?&gt;">
&lt;?php } ?>
&lt;rel="stylesheet" type="text/css" href="styl.css">
…
&lt;div class=container>

  &lt;div class=menu>
    &lt;a href="./">Hlavní strana&lt;/a>
    &lt;a href="./druha.php">Druhá&lt;/a>
    &lt;a href="./treti.php">Třetí&lt;/a>
  &lt;/div>

&lt;div class=content>
&lt;?php } ?></code></pre>

<p>Tato funkce provede následující:
  <ol>
    <li>vypíše <code>&lt;!doctype></code>, <li><code>&lt;meta></code> značku pro <b>kódování</b>, <li>pokud bude předán <b>titulek</b>, tak nastaví <code>&lt;title></code> na <i>Název stránky – Název webu</i> <li>pokud se funkci předá <b>popisek</b>, nastaví se <code>&lt;meta name=description></code>,
    <li>připojí CSS a vůbec všechen <b>společný obsah</b> (hlavička, navigace, obal z <code>&lt;div></code>u pro samotný obsah.</li>
    </ol>

<p>Některé HTML značky v rámci této funkce <b>zůstanou neuzavřené</b> — uzavře je až funkce <code>paticka</code>.</p>

<h3>Patička</h3>
<p>Tato funkce bude o poznání jednodušší. Stačí v ní v podstatě akorát vypsat běžné HTML (uzavření otevřených značek, vypsání patičky, připojení měřicích skriptů).</p>

<pre><code>&lt;?php
function paticka() {
?>
&lt;/div>
&lt;p>Web vytvořil XXX
&lt;/div>
&lt;?php } ?></code></pre>

<h2 id="hezke-adresy">Hezké adresy</h2>
<p>Tento postup řešení <b>skládání stránek</b> sám o sobě nabízí relativně rozumnou podobu adres, tj. <code>example.com/<b>adresa-stranky.php</b></code>. Nicméně, můžeme adresy ještě trochu vylepšit přepisem v <code>.htaccess</code> na podobu <code>example.com/adresa-stranky</code>:</p>
<pre><code>RewriteEngine On
# podstrčení PHP, přepsat pouze na existující skript
RewriteCond %{REQUEST_FILENAME}.php -f
RewriteRule ^([^.]+)$    $1.php    [L]</code></pre>

<h3>Přesměrování <code>*.php</code> adres</h3>
<p>Zamezit duplicitě lze:
  <ol><li><a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=31&amp;topic=97246#bez-pripony">přesměrováním</a> v <code>.htaccess</code>,
    <li><i>čisticí</i> funkcí v PHP, která se přidá do hlavičky (do funkce <code>hlavicka</code>):
    <pre><code>function presmerovat() {
	$redir = str_replace(array("index.php", ".php"), "", $_SERVER['REQUEST_URI']);
	 if ($_SERVER['REQUEST_URI'] != $redir) {
	 	header("Location: $redir", 301);
	 }
}</code></pre></li></ol>

<h2 id="menu">Menu se zvýrazněním aktuální položky</h2>
<p>Ve společném souboru (<code>spolecny.php</code>) můžeme statické menu <i>oživit</i>, aby se aktuální položka zvýraznila.</p>
<p>Asi nejpohodlnější bude nadefinovat si jednotlivé stránky jako pole:</p>
<pre><code>$menu = array(
    "Název stránky" => "url-stranky",
    "Název další stránky => "url-dalsi-stranky",
  );
</code></pre>
<p>A potom jen zajistit výpis.</p>
<pre><code>&lt;?php
function menu($title) {
?>
  &lt;div class=menu>
&lt;?php
  $menu = array(…);
  foreach ($menu as $nazev => $odkaz) { ?>
    &lt;a href="./&lt;?=$odkaz?>"&lt;?=($nazev == $title) ? " class='active'" : ""?>>&lt;?=$nazev?>&lt;/a>
&lt;?php } ?>
  &lt;/div>
&lt;?php } ?></code></pre>

<p>Tato funkce <code>menu</code> se zavolá z funkce <code>hlavicka</code> a předá se zadaný titulek, ten se porovná a v případě schody s některou z položek se přidá CSS třída <code>active</code>.</p>

<h2 id="stahnout">Stáhnout</h2>
<p><a href="/files/include/web.rar" class="button">Hotová ukázka ke stažení</a> <a href="/files/include/demo" class="button">Demo</a></p> 
<p>Pro vyzkoušení na svém počítači je třeba mít <a href="http://pehapko.cz/sprava-serveru/instalace">nainstalován webserver</a> s podporou PHP.</p>