---
title: "Aktivní element v JavaScriptu"
headline: "Aktivní element v JavaScriptu"
description: "Jak zjistit element, který vyvolal JS událost."
date: "2015-01-24"
last_modification: "2015-01-24"
status: 1
tags: ["js", "js-udalosti"]
format: "html"
---

<p>Kromě přístupu, kdy se na jednotlivé elementy <a href="/pripojeni-udalosti">připojují události</a>, existuje ještě jedna možnost. Události odchytávat na celém dokumentu a až následně zkoumat, který element <b>událost vyvolal</b>.</p>

<p>Zjistit takový element jde z objektu <code>event</code>.</p>

<p>Aktivní element se potom nachází v <code>event.<b>target</b></code> nebo <code>event.<b>srcElement</b></code> ve starších prohlížečích. Kromě toho je nutné sjednotit i práci se samotným <code>event</code>em.</p>

<pre><code>function akce(e, el) {
  e = window.event || e;
  var aktivni = (e.target || e.srcElement);
}
document.onclick = akce;</code></pre>

<p><a href="https://kod.djpw.cz/jvjb">Živá ukázka</a></p>









<h2 id="vyuziti">Využití</h2>

<p>Občas může použití tohoto způsobu zpracovávání událostí <b>usnadnit práci</b>. Není potřeba připojovat obsluhu události pro jednotlivé elementy, ale naopak se až v připojené funkci rozhodne, že se má <i>něco dělat</i>.</p>

<p>Třeba při používání <a href="/klavesy">klávesových zkratek</a> se tak snadno vytvoří výjimka pro formulářová pole.</p>

<style>
  *[data-oznacen] {
    outline: 5px solid #0D6AB7;
  }</style>
<script>
function akce(e, el) {
  e = window.event || e;
  var target = (e.target || e.srcElement);
  if (target.hasAttribute("data-oznacen")) {
    target.removeAttribute("data-oznacen");
  }
  else {
    target.setAttribute("data-oznacen", "");
  }
}

document.onclick = akce;  
</script>
