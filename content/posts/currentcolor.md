---
title: "CSS barva currentColor"
headline: "CSS barva <code>currentColor</code>"
description: "Klíčové slovo <code>currentColor</code> obsahuje aktuální barvu elementu."
date: "2014-11-27"
last_modification: "2014-11-28"
status: 1
tags: ["css", "napady"]
format: "html"
---

<p>„Barva“ <code>currentColor</code> se používá jako jiné hodnoty pro <b>nastavení barvy v CSS</b>.</p>

<pre><code>element {
  border: 1px solid <b>currentColor</b>; 
}</code></pre>

<p>Element bude mít rámeček v <i>aktuální barvě</i>. Hodnota <code>currentColor</code> bývá u řady vlastností výchozí, takže je možné její uvedení vypustit. Následující konstrukce se proto zobrazí stejně jako ta předchozí.</p>

<pre><code>element {
  border: 1px solid; 
}</code></pre>


<h2 id="podpora">Podpora</h2>

<p>Klíčové slovo / „barva“ <code>currentColor</code> funguje od <b>IE 9</b>. Ve starších prohlížečích je možné využít <b>výchozí barvy</b> (bez přímého uvedení).</p>


<h2 id="vyuziti">Využití</h2>

<p>Použitím <code>currentColor</code> si můžeme usnadnit práci při kopírování barev. Typický příklad nastane u tlačítka, kterému chceme při <code>:hover</code>u a <code>:focus</code>u změnit barvu písma i rámečku:</p>

<div class="live">
  <style>
    .zmenaBarvy {
      color: #0D6AB7;
      border: 2px solid #0D6AB7;
      background: #fff;
      font-weight: bold;
    }
    .zmenaBarvy:hover {
      color: #DA3F94;
      border-color: #DA3F94;
      background: #fff;
    }
    .zmenaBarvy:focus, .zmenaBarvy:active {
      color: #0B8A14;
      border-color: #0B8A14;
      background: #fff;
    }    
  </style>
  <button class="zmenaBarvy">Tlačítko</button>
</div>

<p>V CSS pro každý stav budeme deklarovat tutéž barvu pro písmo (<color>color</color>) i rámeček (<code>border-color</code>).</p>

<pre><code>button {
  color: <b>blue</b>;
  border: 2px solid <b>blue</b>;
}
button:hover {
  color: <b>red</b>;
  border-color: <b>red</b>;
}
button:focus, button:active {
  color: <b>green</b>;
  border-color: <b>green</b>;
}</code></pre>

<p>Zabránit nutnosti duplikovat barvy mohou <a href="/var">CSS proměnné</a> nebo <b>proměnné v preprocesorech</b>. Použití <code>currentColor</code> ale umožní udělat totéž <b>mnohem elegantněji</b> – nastavit jako barvu <code>currentColor</code> (nebo <i>nic</i> – vůbec ji neuvést) a měnit pouze <code>color</code>.</p>

<pre><code>button {
  color: <b>blue</b>;
  border: 2px solid <b>currentColor</b>;
}
button:hover {
  color: <b>red</b>;
}
button:focus, button:active {
  color: <b>green</b>;
}</code></pre>


<div class="live">
  <style>
    .currentColor {
      color: #0D6AB7;
      border: 2px solid currentColor;
      background: #fff;
      font-weight: bold;
    }
    .currentColor:hover {
      color: #DA3F94;
      background: #fff;
    }
    .currentColor:focus, .currentColor:active {
      color: #0B8A14;
      background: #fff;
    }    
  </style>
  <button class="currentColor">Tlačítko</button>
</div>

<p>Jelikož se barva (<code>color</code>) <b>dědí</b>, lze tohoto chování využít i pro <b>vnořené elementy</b> nebo <a href="/css-selektory#before-after">pseudo-elementy</a>.</p>

<p><a href="https://kod.djpw.cz/aeib">Samostatná ukázka</a> využití <code>currentColor</code></p>

<p>Klíčové slovo <code>currentColor</code> je u řady vlastností <b>zbytečné uvádět</b>. Kvůli podpoře pro <b>IE 8</b> a starších dokonce nežádoucí.</p>

<ul>
  <li><code>border: 1px solid</code></li>
  <li><code>outline: 1px solid</code></li>
  <li><code><a href="/box-shadow">box-shadow</a>: 10px 5px 5px</code></li>
  <li><code><a href="/text-shadow">text-shadow</a>: 10px 10px 5px</code></li>
</ul>

<p><a href="https://kod.djpw.cz/vfib">Živá ukázka</a> bez uvádění barev</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://blogs.adobe.com/dreamweaver/2015/02/extending-the-color-cascade-with-the-css-currentcolor-variable.html">Extending the Color Cascade with the CSS currentColor Variable</a></li>
</ul>