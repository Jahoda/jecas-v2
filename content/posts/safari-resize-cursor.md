---
title: "Resize cursor v Safari"
headline: "Proč v Safari nefunguje resize cursor a jak to opravit"
description: "Safari nezobrazuje resize cursor u elementů s CSS resize property. Článek vysvětluje příčinu problému a nabízí funkční řešení."
date: "2026-01-12"
status: 1
tags: ["css", "css-vlastnosti", "apple", "webove-prohlizece"]
format: "html"
---

<p>Při použití CSS vlastnosti <code>resize</code> pro změnu velikosti elementů narazíte v Safari na nepříjemný problém – prohlížeč <b>nezobrazuje resize cursor</b>, když uživatel najede myší na oblast pro změnu velikosti. Element jde sice stále zvětšovat, ale chybí vizuální zpětná vazba.</p>


<h2 id="problem">V čem je problém</h2>

<p>CSS vlastnost <code>resize</code> umožňuje uživateli měnit velikost elementu tažením za jeho roh. V Chromu a Firefoxu se při najetí na oblast změny velikosti automaticky zobrazí <a href="/cursor">resize cursor</a> (<code>nwse-resize</code>). Safari tento cursor <b>vůbec nezobrazuje</b>.</p>

<p>Klasický zápis vypadá takto:</p>

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


<h2 id="reseni">Řešení pro Safari</h2>

<p>Řešením je explicitně nastavit <code>cursor</code> na oblast, kde se nachází úchyt pro změnu velikosti. Problém je, že CSS neposkytuje přímý způsob, jak cílit pouze na resize handle.</p>

<p>Můžeme ale využít <b>pseudo-element</b>, který překryje pravý dolní roh elementu a nastaví správný cursor:</p>

<pre><code>.resizable {
  resize: both;
  overflow: auto;
  position: relative;
}

.resizable::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  cursor: nwse-resize;
}</code></pre>

<p>Pseudo-element <code>::after</code> vytvoří neviditelnou oblast v pravém dolním rohu, která má nastavený správný cursor. Velikost 16×16 px odpovídá přibližně velikosti resize handle ve většině prohlížečů.</p>


<h2 id="ukazka-reseni">Funkční ukázka</h2>

<p>Tento element má opravenou podporu resize cursoru i pro Safari:</p>

<div class="live">
<style>
.safari-resize-fix {
  resize: both;
  overflow: auto;
  position: relative;
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

.safari-resize-fix::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  cursor: nwse-resize;
}
</style>
<div class="safari-resize-fix">
Táhni za pravý dolní roh (funguje i v Safari)
</div>
</div>


<h2 id="alternativy">Alternativní řešení</h2>

<h3 id="vizualni-indikace">Vizuální indikace</h3>

<p>Pokud chcete uživateli jasně ukázat, že element lze zvětšovat, můžete přidat vizuální indikátor:</p>

<pre><code>.resizable::after {
  content: '';
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 12px;
  height: 12px;
  cursor: nwse-resize;
  background:
    linear-gradient(135deg,
      transparent 50%,
      rgba(255,255,255,0.5) 50%);
  border-radius: 0 0 6px 0;
  pointer-events: none;
}</code></pre>


<h3 id="javascript">JavaScript řešení</h3>

<p>Pro složitější případy můžete detekovat pozici myši a nastavit cursor dynamicky:</p>

<pre><code>element.addEventListener('mousemove', (e) => {
  const rect = element.getBoundingClientRect();
  const isNearCorner =
    rect.right - e.clientX < 16 &&
    rect.bottom - e.clientY < 16;

  element.style.cursor = isNearCorner
    ? 'nwse-resize'
    : 'default';
});</code></pre>


<h2 id="podpora">Podpora prohlížečů</h2>

<table>
<tr>
  <th>Prohlížeč</th>
  <th>Resize cursor</th>
</tr>
<tr>
  <td>Chrome</td>
  <td>Funguje automaticky</td>
</tr>
<tr>
  <td>Firefox</td>
  <td>Funguje automaticky</td>
</tr>
<tr>
  <td>Safari</td>
  <td>Vyžaduje workaround</td>
</tr>
<tr>
  <td>Edge</td>
  <td>Funguje automaticky (Chromium)</td>
</tr>
</table>


<h2 id="souvisejici">Související</h2>

<ul>
  <li><a href="/cursor">CSS cursor</a> – přehled všech hodnot vlastnosti cursor</li>
</ul>
