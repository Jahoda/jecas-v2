---
title: "Onclick z klávesnice"
headline: "Událost <code>onclick</code> na různých elementech"
description: "Test události <code>onclick</code> na různých elementech při vyvolání myší i klávesnicí."
date: "2013-10-17"
last_modification: "2013-10-17"
status: 1
tags: ["formulare", "js", "webove-prohlizece"]
format: "html"
---

<p>Při začleňování nějaké JS události vyvolávané kliknutím (<code>onclick</code>) je třeba brát v úvahu, že uživatel <b>navigující se klávesnicí</b> (což například u <b>formulářů</b> nemusí být marginální procento) některé <code>onclick</code>y běžně nevyvolá nebo je <b>dokonce vůbec vyvolat nemůže</b>.</p>

<div class="live">
  <ol>
    <li><span tabindex=1 onclick="alert('kliknuto')"><code>&lt;span&gt;</code> s <code>tabindex</code>em</span>, 
    <li><span onclick="alert('kliknuto')"><code>&lt;span&gt;</code> <b>bez</b> <code>tabindex</code>u</span>, 
    <li><a href="#" onclick="alert('kliknuto')">odkaz <code>&lt;a&gt;</code> <b>bez</b> <code>tabindex</code>u</a>.


<li><label><code>&lt;input&gt;</code><input onclick="alert('kliknuto')"></label>
<li><label><code>&lt;input type=checkbox&gt;</code><input onclick="alert('kliknuto')" type=checkbox></label>
<li><label><code>&lt;input type=submit&gt;</code><input onclick="alert('kliknuto')" type=submit></label>
<li><label><code>&lt;input type=radio&gt;</code><input onclick="alert('kliknuto')" type=radio></label>
<li><label><code>&lt;input type=button&gt;</code><input onclick="alert('kliknuto')" type=button></label>
  <li><label><code>&lt;input type=image&gt;</code><input type=image src="http://jecas.cz/images/logo2.png" onclick="alert('kliknuto')"></label></li>
<li><label><code>&lt;select onclick&gt;</code> s <code>tabindex</code>em + <code>&lt;option onclick&gt;</code>
<select onclick="alert('kliknuto')" tabindex=1>
<option onclick="alert('kliknuto')">— volba —
<option onclick="alert('kliknuto')">2
<option onclick="alert('kliknuto')">3
</select></label></li>
<li><label><code>&lt;option onclick&gt;</code>
<select>
<option onclick="alert('kliknuto')">— volba —
<option onclick="alert('kliknuto')">2
<option onclick="alert('kliknuto')">3
</select></label></li>


<li><label><code>&lt;textarea onclick&gt;</code>
<textarea onclick="alert('kliknuto')"></textarea></label></li>

<li><label><code>&lt;textarea onclick&gt;</code>
<button onclick="alert('kliknuto')">Button</button></label></li>

  
<li><label><code>&lt;img tabindex&gt;</code>
<img src="http://jecas.cz/images/logo2.png" tabindex=1></label></li>
 </ol>
<form action="#" onclick='alert("Baf")'>
<ol start=15>
<li><label><code>&lt;form onclick&gt;</code><input></label></li>
</ol>
  </form>
 
</div>

<h2 id="poznamky">Poznámky</h2>
<ul>
  <li>Při <b>přechodu mezi políčky</b> klávesou <kbd>Tab</kbd> se <code>onclick</code> nevyvolá. Při <i>skočení</i> do políčka se ale vyvolá <code>onfocus</code>.</li>
  <li>Běžné (neformulářové) elementy jde roz<code>onclick</code>ovat přidáním <code>tabindex</code>u.</li>
  <li><b>Opera</b> umí vyvolat <code>onclick</code> z klávesnice snad úplně na čemkoliv mimo elementů, <b>kam se píše text</b> (<code>&lt;input type=text></code>, <code>&lt;textarea></code>) nebo <code>&lt;select&gt;</code>u. (Při procházení <code>Tab</code>em (když je element o<code>tabindex</code>ovaný) i přes <code>Shift</code>.) Dokonce ten <code>onclick</code> vyvolá na <code>&lt;option&gt;</code>u, i když se jen vybere šipkami ze <code>&lt;select&gt;</code>u (bez nějakého výběru z roletového seznamu).
    <li><b>IE v <a href="/doctype#quirk">quirku</a></b> to umí snad na všem, čemu se přidá <code>tabindex</code>. A na většině <code>&lt;input&gt;</code>ů (snad mimo <code>radio</code> a <code>checkbox</code>). Na <code>&lt;select&gt;</code>u ne.
  <li><b>Explorer ve standardním režimu</b> navíc <code>onclick</code>uje i na <code>&lt;input type=text&gt;</code>.</li>
      <li><b>Firefox a Chrome</b> se chovají víceméně podobně. <code>Onclick</code>ují na odesílacích prvcích (<code>&lt;input type=image|submit|button&gt;</code>, <code>&lt;button&gt;</code>) a odkazech.

<li><b>Chrome</b> nekliká na <code>&lt;option></code>ech.</li>  
</ul>