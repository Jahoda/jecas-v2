---
title: "Plynulý přesun focusu"
headline: "Plynulý přesun <code>focus</code>u"
description: "Plynulé přesouvání <code>focus</code>u mezi jednotlivými položkami formuláře."
date: "2013-10-24"
last_modification: "2013-12-09"
status: 1
tags: ["formulare", "hotova-reseni", "js", "napady"]
format: "html"
---

<p>Části návštěvníků, která se mezi formulářovými položkami přesouvá klávesou <kbd>Tab</kbd>, lze zvýšit pohodlí při přeskakování mezi položkami <b>plynulým přesouváním „<code>focus</code> efektu“</b>.</p>
<p>Běžný formulář (zvlášť potom v případě, že pro <a href="/css-selektory#uzivatelske-akce">pseudotřídu <code>:focus</code></a> jeho položek není nastaven výrazný styl) může být pro uživatele nepřehledný tím, že po od<kbd>Tab</kbd>ování <b>není na první pohled jasné, kam se kursor přesunul</b>.</p>
<p>Zajímavým řešením je plynulé přesunutí orámování tlačítka, políčka nebo jiného prvku na další/předchozí — tj. po stisknutí klávesy <kbd>Tab</kbd>, respektive <kbd>Shift</kbd> + <kbd>Tab</kbd>.</p>

<div class="live">
  <script src="/files/focus-transition/flying-focus.js"></script>
  <p><input type="text"> <label><input type="checkbox"> Checkbox</label>
  <label><input type="radio"> Radio</label>
  <p><label><select><option>CSS<option>HTML<option>JavaScript</select> Select</label>
  <p><button>Tlačítko</button>
</div>

<h2 id="reseni">Hotové řešení</h2>
<p><a href="http://n12v.com/focus-transition/" class="button">Web</a></p>
<p>Stačí přilinkovat na stránku:</p>
<pre><code>&lt;script src="<a href="http://n12v.com/focus-transition/flying-focus.js">flying-focus.js</a>">&lt;/script></code></pre>
<p>(Možné je i použití jako uživetelský skript / plugin do prohlížeče.)</p>

<div class="soft">
  <p>Druhá verse <a href="http://n12v.com/focus-transition-2/">Flying focusu</a> nabízí nové druhy zvýrazňovacích animací.</p>
  <p><img src="/files/focus-transition/flying-focus-efekty.png" alt="Různé efekty přesouvání focusu" class="border"></p>
</div>

<h2 id="odkazy">Odkazy</h2>
<ul>
  <li><a href="http://www.heydonworks.com/article/shrinking-button-outlines">Shrinking Button Outlines</a> — zvýraznění <code>:focus</code> efektu <a href="/transition">animací</a>.</li>
</ul>