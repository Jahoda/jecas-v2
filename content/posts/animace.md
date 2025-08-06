---
title: "Animace"
headline: "Animace na webových stránkách"
description: "Jak na webu vytvářet animace a přechody v HTML, CSS a JS."
date: "2013-08-02"
last_modification: "2013-08-04"
status: 1
tags: ["css", "hotova-reseni", "js", "webove-animace"]
format: "html"
---

<p>O animování v samotném CSS pojednává článek <a href="/transition">animace pomocí <code>transition</code></a>. S tím si nevystačíme vždy (lze používat jen <a href="/transition#udalosti">pár událostí</a>). Pro zajímavější výtvory je třeba zkombinovat CSS se špetkou JavaScriptu.</p>

<h2 id="js-css">JavaScript + CSS <code>transition</code></h2>
<p>Je to relativně jednoduché, postupuje se podobně jako u čistého CSS a událostí (<code>:hover</code>, <code>:focus</code> apod.), jen se reaguje na změnu třídy (<code>.zmena</code>), kterou <a href="/zobrazit-skryt">prohazuje JavaScript</a>.</p>
<style>
.barva button {background: red; transition: background 1s}
.barva button.zmena {background: green}
</style>
<div class="live barva">
  <button onclick='this.className=this.className=="zmena" ? "": "zmena"'>
  Přebarvit kliknutím
</button>
</div>
<h3>CSS</h3>
<pre><code>button {<i>background</i>: red; <b>transition</b>: <i>background</i> 1s}
button.zmena {<i>background</i>: green}</code></pre>

<p>Vytvořit lze ledasco.</p>

<p><a class="button" href="http://h5bp.github.io/Effeckt.css/">Více CSS 3 animací ovládaných JavaScriptem</a></p>

<h2 id="js">Čistý JavaScript</h2>
<p>Nesmíme zapomínat, že CSS přechody fungují až od Internet Exploreru 10, tedy návštěvníci starších prohlížečů budou o takové animační efekty ochuzeni.</p>
<ol>
  <li>Jedna možnost je smířit se s tím — animace většinou nebývají pro web klíčové.</li>
  <li>Další možnost je animovaný obrázek GIF (půjde použít jen někdy).</li>
  <li>Nakonec zbývá řízení celé animace JavaScriptem (tomu se věnuje zbytek článku).</li>
</ol>

<p>Podstata řešení je vytvořit časovač, který za danou dobu v daných intervalech bude měnit určitou CSS vlastnost. Tento časovač bude ve funkci a zároveň bude tuto funkci rekursivně volat.</p>

<!-- Kód ukázky -->
<div class="live">
<script>
function zmena(tlacitko) {
  tlacitko.style.opacity = Math.round((tlacitko.style.opacity-0.1) * 100) / 100;
  if (tlacitko.style.opacity) {
    setTimeout(function() { zmena(tlacitko) }, 30);
  }
}
</script>
  <button onclick="zmena(this)" style="opacity: 1">Plynule</button>
  <button onclick="zmena(this)" style="opacity: 1">skrýt</button>
  <button onclick="zmena(this)" style="opacity: 1">změnou</button>
  <button onclick="zmena(this)" style="opacity: 1">průhlednosti</button>
</div>
<!-- konec ukázky -->

<h3>JS funkce</h3>
<pre><code>function <b>zmena</b>(tlacitko) {
  tlacitko.style.opacity = Math.round((tlacitko.style.opacity-0.1) * 100) / 100;
  if (tlacitko.style.opacity) 
    setTimeout(function() { <b>zmena</b>(tlacitko) }, 30);
}</code></pre>

<ol>
  <li>Tato funkce se spustí třeba po kliknutí na tlačítko (<code>onclick="zmena(this)"</code>).</li>
  <li>Nejprve se vezme současná hodnota <code>opacity</code>,</li>
  <li>odečte se <code>0.1</code> (tj. 10 %),</li>
  <li>provede se zaokrouhlení a již zaokrouhlená hodnota se použije jako nová hodnota průhlednosti,</li>
  <li>pokud průhlednost není nula/<code>false</code>, spustí se funkce časovačem znovu.</li>
</ol>

<p>Detailněji popsaná universálnější technika animování v JS je na:</p>
<p><a href="http://javascript.info/tutorial/animation" class="button">javascript.info</a></p>

<h3>JS frameworky</h3>
<p>Většina JS frameworků (jako <a href="http://api.jquery.com/animate/">třeba jQuery</a>) taktéž nabízejí pohodlné hotové funkce pro animování nebo dokonce hotové základní animace jako zmizení, odlétnutí, zmenšení a podobně.</p>