---
title: "Resize cursor v Safari"
headline: "Proč v Safari nefunguje resize cursor a jak to opravit"
description: "Safari nezobrazuje resize cursor u elementů s CSS resize property a nepodporuje cursor na pseudo-elementech. Článek vysvětluje příčinu a nabízí funkční JavaScript řešení."
date: "2026-01-12"
status: 1
tags: ["css", "css-vlastnosti", "apple", "webove-prohlizece", "js"]
format: "html"
---

<p>Při použití CSS vlastnosti <code>resize</code> pro změnu velikosti elementů narazíte v Safari na nepříjemný problém – prohlížeč <b>nezobrazuje resize cursor</b>, když uživatel najede myší na oblast pro změnu velikosti. Element jde sice stále zvětšovat, ale chybí vizuální zpětná vazba.</p>


<h2 id="problem">V čem je problém</h2>

<p>CSS vlastnost <code>resize</code> umožňuje uživateli měnit velikost elementu tažením za jeho roh. V Chromu a Firefoxu se při najetí na oblast změny velikosti automaticky zobrazí <a href="/cursor">resize cursor</a> (<code>nwse-resize</code>). Safari tento cursor <b>vůbec nezobrazuje</b>.</p>

<pre><code>.resizable {
  resize: both;
  overflow: auto;
}</code></pre>

<p>Zatímco v Chrome a Firefox uživatel vidí šipku pro změnu velikosti, v Safari zůstává výchozí kurzor myši beze změny – i přesto, že změna velikosti funguje.</p>


<h2 id="ukazka-problem">Ukázka problému</h2>

<p>Následující element používá pouze <code>resize: both</code>. <b>V Safari</b> neuvidíte změnu kurzoru při najetí na pravý dolní roh:</p>

<div class="live">
<div style="resize: both; overflow: auto; width: 200px; height: 100px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; padding: 16px; color: white; font-weight: bold; min-width: 100px; min-height: 60px; max-width: 400px; max-height: 300px;">
Táhni za pravý dolní roh
</div>
</div>


<h2 id="proc-pseudo-element-nefunguje">Proč pseudo-element nefunguje</h2>

<p>První nápad, který vás možná napadne, je použít <code>::after</code> pseudo-element s nastaveným cursorem:</p>

<pre><code>.resizable::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  cursor: nwse-resize;
}</code></pre>

<p><b>Toto řešení v Safari nefunguje.</b> Safari dlouhodobě nepodporuje vlastnost <code>cursor</code> na pseudo-elementech. Důvodem je, že pseudo-elementy nejsou skutečné DOM elementy a Safari je nepovažuje za interaktivní.</p>

<p>Podpora pro <code>cursor</code> na pseudo-elementech byla přidána až v <b>Safari Technology Preview 227</b>, takže v budoucích verzích Safari by to mělo fungovat. Do té doby je potřeba použít jiné řešení.</p>


<h2 id="reseni-javascript">Funkční řešení: JavaScript</h2>

<p>Spolehlivé řešení je detekovat pozici myši pomocí JavaScriptu a nastavit cursor přímo na elementu:</p>

<pre><code>function fixSafariResizeCursor(element) {
  element.addEventListener('mousemove', (e) =&gt; {
    const rect = element.getBoundingClientRect();
    const threshold = 16;
    const isNearCorner =
      rect.right - e.clientX &lt; threshold &amp;&amp;
      rect.bottom - e.clientY &lt; threshold;

    element.style.cursor = isNearCorner
      ? 'nwse-resize'
      : '';
  });

  element.addEventListener('mouseleave', () =&gt; {
    element.style.cursor = '';
  });
}</code></pre>

<p>Funkce sleduje pozici myši a když je v oblasti 16×16 px od pravého dolního rohu, nastaví příslušný cursor.</p>


<h2 id="ukazka-reseni">Funkční ukázka</h2>

<p>Tento element má opravenou podporu resize cursoru i pro Safari:</p>

<div class="live">
<style>
.safari-resize-demo {
  resize: both;
  overflow: auto;
  width: 200px;
  height: 100px;
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  border-radius: 8px;
  padding: 16px;
  color: white;
  font-weight: bold;
  min-width: 100px;
  min-height: 60px;
  max-width: 400px;
  max-height: 300px;
}
</style>
<div class="safari-resize-demo" id="safari-resize-demo">
Táhni za pravý dolní roh (funguje i v Safari)
</div>
<script>
(function() {
  const el = document.getElementById('safari-resize-demo');
  if (!el) return;

  el.addEventListener('mousemove', function(e) {
    const rect = el.getBoundingClientRect();
    const threshold = 16;
    const isNearCorner =
      rect.right - e.clientX < threshold &&
      rect.bottom - e.clientY < threshold;

    el.style.cursor = isNearCorner ? 'nwse-resize' : '';
  });

  el.addEventListener('mouseleave', function() {
    el.style.cursor = '';
  });
})();
</script>
</div>


<h2 id="vizualni-indikace">Vizuální indikace resize oblasti</h2>

<p>Pro lepší UX můžete přidat vizuální indikátor, že element lze zvětšovat. Protože pseudo-elementy v Safari nepodporují <code>cursor</code>, ale jiné styly ano, můžete přidat alespoň vizuální nápovědu:</p>

<pre><code>.resizable {
  position: relative;
}

.resizable::after {
  content: '';
  position: absolute;
  right: 4px;
  bottom: 4px;
  width: 8px;
  height: 8px;
  border-right: 2px solid rgba(255,255,255,0.5);
  border-bottom: 2px solid rgba(255,255,255,0.5);
  pointer-events: none;
}</code></pre>


<h2 id="vlastni-resize">Vlastní resize handle</h2>

<p>Pokud potřebujete plnou kontrolu nad resize chováním, můžete CSS <code>resize</code> úplně vynechat a implementovat vlastní resize pomocí JavaScriptu:</p>

<div class="live">
<style>
.custom-resizable {
  position: relative;
  width: 200px;
  height: 100px;
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  border-radius: 8px;
  padding: 16px;
  color: white;
  font-weight: bold;
  min-width: 100px;
  min-height: 60px;
  max-width: 400px;
  max-height: 300px;
  box-sizing: border-box;
}

.resize-handle {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  cursor: nwse-resize;
  background: linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.3) 50%);
  border-radius: 0 0 8px 0;
}
</style>
<div class="custom-resizable" id="custom-resizable">
Vlastní resize handle
<div class="resize-handle" id="resize-handle"></div>
</div>
<script>
(function() {
  const container = document.getElementById('custom-resizable');
  const handle = document.getElementById('resize-handle');
  if (!container || !handle) return;

  let isResizing = false;
  let startX, startY, startWidth, startHeight;

  handle.addEventListener('mousedown', function(e) {
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = container.offsetWidth;
    startHeight = container.offsetHeight;
    e.preventDefault();
  });

  document.addEventListener('mousemove', function(e) {
    if (!isResizing) return;

    const newWidth = Math.min(400, Math.max(100, startWidth + e.clientX - startX));
    const newHeight = Math.min(300, Math.max(60, startHeight + e.clientY - startY));

    container.style.width = newWidth + 'px';
    container.style.height = newHeight + 'px';
  });

  document.addEventListener('mouseup', function() {
    isResizing = false;
  });
})();
</script>
</div>

<p>Tento přístup má výhodu v tom, že <b>cursor na reálném DOM elementu funguje ve všech prohlížečích</b> včetně Safari. Navíc máte plnou kontrolu nad vzhledem a chováním resize handle.</p>


<h2 id="podpora">Podpora prohlížečů</h2>

<table>
<tr>
  <th>Prohlížeč</th>
  <th>CSS resize cursor</th>
  <th>Cursor na pseudo-el.</th>
</tr>
<tr>
  <td>Chrome</td>
  <td>Funguje</td>
  <td>Funguje</td>
</tr>
<tr>
  <td>Firefox</td>
  <td>Funguje</td>
  <td>Funguje</td>
</tr>
<tr>
  <td>Safari</td>
  <td>Nefunguje</td>
  <td>Nefunguje (zatím)</td>
</tr>
<tr>
  <td>Edge</td>
  <td>Funguje</td>
  <td>Funguje</td>
</tr>
</table>


<h2 id="souvisejici">Související</h2>

<ul>
  <li><a href="/cursor">CSS cursor</a> – přehled všech hodnot vlastnosti cursor</li>
</ul>
