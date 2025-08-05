---
title: "CSS resize"
headline: "CSS resize"
description: "Možnost roztahovat element pomocí CSS vlastnosti <code>resize</code>."
date: "2013-11-20"
last_modification: "2013-11-22"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<p>V <b>Opeře 12</b> funguje <code>resize</code> nejspíš jen u značek <code>&lt;textarea></code> a <code> &lt;input></code>; v <b>Opeře 17</b> založené na Webkitu už <code>resize</code> funguje všude. Ve <b>Firefoxu</b> a <b>Chrome</b> také není problém. <b>IE</b> (včetně <a href="/ie11">IE 11</a>) se zatím vůbec nechytá.</p>

<p>Co umí? Umožňuje bez JavaScriptu uživateli <b>měnit rozměry</b> libovolného elementu (třeba <code>&lt;div></code>u).</p>

<div class="live">
  <div style="resize: both; border: 1px solid #000; width: 200px; padding: 1em; overflow: auto;">
    <p>Tento element je možné ve <b>Firefoxu</b>, <b>Chromu</b> a <b>Webkit Opeře</b> roztahovat.</p>
  </div>
</div>

<p>CSS změna rozměrů bude fungovat jen při <b>nastaveném</b> <code>overflow</code> na libovolnou hodnotu (<code>auto</code>, <code>scroll</code>), pochopitelně kromě výchozího <code>overflow: visible</code>.</p>

<p>Stanovit maximální a minimální <b>rozměry</b> roztahování jde vlastnostmi <code>min-width</code> a <code>max-width</code> / <code>min-height</code> a <code>max-height</code>. Samotné <code>height</code> nebo <code>width</code> platí zároveň jako <b>minimální možný rozměr</b>.</p>

<h2 id="zapis">Zápis</h2>
<p>Zápis vlastnosti <code>resize</code> je dost jednoduchý.</p>
<pre><code>element {
  resize: both;
}</code></pre>

<p>Může nabývat <b>čtyřech hodnot</b>:</p>

<ul>
  <li><code>both</code> — roztahování do <b>obou</b> stran,</li>
  <li><code>horizontal</code> — roztahování <b>do strany</b>,</li>
  <li><code>vertical</code> — roztahování <b>do výšky</b>,</li>  
  <li><code>none</code> — <b>zruší</b> možnost změn rozměrů (má smysl třeba pro <code>&lt;textarea></code>, kde bývá výchozí <code>resize: both</code>).</li>  
</ul>

<div class="live">
  <div style="resize: horizontal; border: 1px solid #000; width: 200px; padding: 1em; overflow: auto;">
    <p>Tento element je možné ve <b>Firefoxu</b>, <b>Chromu</b> a <b>Webkit Opeře</b> roztahovat jen <b>vodorovně</b>.</p>
    <p><code> ↔ </code></p>
  </div>

  <div style="resize: vertical; border: 1px solid #000; width: 200px; padding: 1em; overflow: auto;">
    <p>Tento element je možné ve <b>Firefoxu</b>, <b>Chromu</b> a <b>Webkit Opeře</b> roztahovat jen <b>svisle</b>.</p>
    <p><code> ↕ </code></p>
  </div>
</div>

<h2 id="formularove-prvky">Roztahování formulářových prvků</h2>
<p>Doplnění od <b>Kolesovy plavkyně</b>:</p>
<div class="live">
  <textarea cols="30" rows="10">Textareu lze ve výchozím nastavení roztahovat (jako by měla resize: both).</textarea>
  <textarea style="resize: none" cols="30" rows="10">Nebo roztahování zakázat.</textarea>
  <textarea disabled cols="30" rows="10" style="resize: both">Textarea s „disabled“ v Opeře 12 roztahovat nejde, ale „roztahovátko“ se ukazuje. V jiných prohlížečích roztahování funguje.</textarea>
  <input type="text" style="resize: both" value="input s resize: both">
</div>
<p>Textový <code>&lt;input></code> jde v <b>Opeře</b> roztahovat jen vodorovně i při nastavení <code>resize: both</code>, v <b>Chrome</b> nejde roztáhnout vůbec, přestože se symbol pro roztažení ukazuje.</p>

<h2 id="kursor">Resize kursor (<code>cursor</code>)</h2>
<p>Kursor do <b>resizovací podoby</b> je možné změnit následovně:</p>
<pre><code>element {
  <span style="cursor: se-resize">cursor: se-resize; /* both */</span>
  <span style="cursor: e-resize">cursor: e-resize; /* vodorovně */</span>
  <span style="cursor: n-resize">cursor: n-resize; /* svisle */</span>
}</code></pre>