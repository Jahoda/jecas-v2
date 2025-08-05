---
title: "Zakázat rolování stránky"
headline: "Jak zakázat scrollování na stránce"
description: "Někdy se hodí zamezit uživateli v rolování, jaké existují možnosti?"
date: "2013-08-09"
last_modification: "2013-08-09"
status: 1
tags: ["hotova-reseni", "js", "lightbox", "scroll"]
format: "html"
---

<p class="warn soft"><b>Upozornění</b>: Bránit a pozměňovat výchozí běžné uživatelské akce je vhodné jen výjimečně a v odůvodnitelných případech.</p>

<p>U různých <a href='/vstupni-stranka'>lightbox</a> <a href="/magnific-popup">skriptů</a> se takové chování může hodit — originální podklad (stránka) je překrytý a rolování jeho obsahu by <i>každého akorát otravovalo</i>.</p>

<!-- Kód ukázky -->
<div class="live">
<style>
  .dialog-background {width: 100%; height: 100%; background: #000; opacity: .85; position: absolute; left: 0; top: 0; display: none}
  .dialog {width: 50%; position: fixed; left: 50%; margin-left: -25%; background: #fff; color: #000; display: none;}
  .show .dialog, .show .dialog-background {display: block;}
</style>

<script>
function openDialog(id) {
	document.getElementById(id).className+= " show";
	document.documentElement.style.overflow = "hidden";
}

function closeDialog(id) {
	document.getElementById(id).className = "dialog-cover";
	document.documentElement.style.overflow = "visible";	
}
</script>

<div id="okno" class="dialog-cover">
  <div class="dialog-background"></div>
  <div class="dialog">
    <div style="padding: 1em">
      <h2>Dialog</h2>
  
      <p>Vyskakovací dialog, než se zavře, nelze se stránkou rolovat.</p>
      <button onclick='closeDialog("okno")'>Zavřít</button>
    </div>
  </div>
</div>
<button onclick='openDialog("okno")'>Otevřít dialog</button>
</div>
<!-- konec ukázky -->

<h2 id="reseni">Řešení</h2>
<p>Leckoho by možná nepadlo bránit rolování <b>stornováním všech možných událostí</b> jako je</p>

<ul>
  <li>rolování kolečkem (<code>onmousewheel</code>),</li>
  <li><a href="/zablokovani-klaves">mačkání kláves</a> <kbd>↑</kbd> a <kbd>↓</kbd> (<code>onkeypress</code>)</li>
  <li>a podobně.</li>
</ul>

<p>Leč <b>elegantnější řešení a funkčnější</b> mi přijde pro <code>&lt;html&gt;</code> nastavit <code>overflow: hidden</code>, čímž se možnost posouvání stránky dokonale zablokuje.</p>

<ol>
  <li>Jedna možnost je <a href="/zobrazit-skryt">prohazovat třídu</a>, která <code>overflow: hidden</code> zajistí,</li> 
  <li>druhá měnit skriptem přímo <code>document.documentElement.style.<b>overflow</b></code> na <code>hidden</code>/<code>visible</code>.</li>
</ol>

<p>Drobná nevýhoda <code>overflow: hidden</code> řešení je, že zároveň zmizí posuvník, což vytvoří lehké poskočení stránky. Řešení je:</p>
<ol>
  <li>vycházet z toho, že posuvník má většinou cca 16 pixelů (v reálu tak většině uživatelům stránka poskočí maximálně nějak nepatrně),</li>
  <li>změřit JavaScriptem šíři <b>scrollbaru</b> a stránku odšťouchnout — existuje <a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=7&amp;topic=149954#10">hotové řešení</a> od pana <a href="http://webylon.info"><b>Chamurappiho</b></a>,</li>
  <li><b>neřešit to</b> — při překrytí černým pozadím si toho člověk stejně nejspíš nevšimne.</li>
</ol>

<!-- http://kod.djpw.cz/knb -->