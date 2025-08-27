---
title: "Jak „focusovat“ správně díky :focus-visible"
headline: "Jak „focusovat“ správně díky <code>:focus-visible</code>"
description: "Jak správně řešit označený (<code>:focus</code>) stav formulářových prvků."
date: "2020-03-21"
last_modification: "2025-08-28"
status: 1
tags: ["css", "formulare", "selektory-css", "ux"]
format: "html"
---

<p>Pseudotřída <code>:focus-visible</code> je novější způsob, jak správně stylovat <a href="/focus"><code>:focus</code></a> stav prvků. Řeší problémy s tradičním <code>:focus</code>, který se chová neprakticky při kliknutí na tlačítko.</p>

<p>Zatímco <code>:focus</code> se aktivuje při jakémkoliv zaměření prvku (klávesnicí i myší), <code>:focus-visible</code> se zobrazí pouze tehdy, když je to <b>visuálně žádoucí</b> – typicky při navigaci klávesnicí.</p>

<p>U <code>:focus-visible</code> rozhoduje prohlížeč, jestli zvláštní styl pro <i>focus</i> stav zobrazit.</p>

<p>Smyslem existence je řešení často nežádoucího označování focusovaných prvků při kliknutí na ně – typicky tlačítka, kdy uživatel s myší typicky nepotřebuje vidět focus indikátor.</p>


<p>Například tlačítka v <b>Chrome</b> a <b>Firefox</b> zobrazují výchozí outline pouze při navigaci klávesnicí, ale textová pole ho zobrazují i po kliknutí myší.</p>

<p>Ukázka s obyčejným <code>focus</code>em. Tlačítko má po kliknutí zbytečně výrazný efekt:</p>

<div class="live">
  <style>
    .focus-demo button:focus {
      outline: 3px solid red;
    }
    .focus-demo input:focus {
      outline: 3px solid blue;
    }
  </style>
  <div class="focus-demo">
    <p><button>Klikněte na tlačítko</button></p>
    <p><input type="text" placeholder="Klikněte do pole"></p>
  </div>
</div>

<h2 id="reseni">Řešení s <code>:focus-visible</code></h2>

<p>Pseudotřída <code>:focus-visible</code> se aktivuje pouze tehdy, když prohlížeč považuje za vhodné zobrazit focus indikátor. Typicky to znamená:</p>

<ul>
  <li>Navigace klávesnicí (<kbd>Tab</kbd>, <kbd>Shift</kbd>+<kbd>Tab</kbd>).</li>
  <li>Zaměření prvku JavaScriptem.</li>
  <li>Některé speciální případy dotykového ovládání – například při použití externí klávesnice na tabletu nebo při přepnutí do režimu přístupnosti.</li>
</ul>

<pre><code>button:focus-visible {
  outline: 3px solid #007acc;
  outline-offset: 2px;
}</code></pre>

<div class="live">
  <style>
    .focus-visible-demo button:focus-visible {
      outline: 3px solid #007acc;
      outline-offset: 2px;
    }
    .focus-visible-demo input:focus-visible {
      outline: 3px solid #007acc;
      outline-offset: 2px;
    }
  </style>
  <div class="focus-visible-demo">
    <p><button>Zkuste Tab a kliknutí</button></p>
    <p><input type="text" placeholder="Zkuste Tab a kliknutí"></p>
  </div>
</div>

<h2 id="podpora">Podpora prohlížečů</h2>

<p>Nativní podpora <code>:focus-visible</code> je dobrá.</p>

<div class="external-content">
  <ul>
    <li><a href="https://caniuse.com/css-focus-visible">Can I use: <code>:focus-visible</code></a></li>
  </ul>
</div>

<p>Pro starší prohlížeče je možné použít polyfill nebo fallback řešení.</p>

<h2 id="polyfill">Polyfill pro starší prohlížeče</h2>

<p>Existuje oficiální polyfill, který přidává třídu <code>.focus-visible</code> prvkům, které by měly zobrazit focus indikátor:</p>

<pre><code>&lt;script src="https://unpkg.com/focus-visible@5/dist/focus-visible.min.js">&lt;/script></code></pre>

<p>Poté můžete stylovat takto:</p>

<pre><code>button:focus-visible,
button.focus-visible {
  outline: 3px solid #007acc;
  outline-offset: 2px;
}</code></pre>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/WICG/focus-visible">focus-visible polyfill</a> – oficiální polyfill na GitHubu</li>
    <li><a href="https://wicg.github.io/focus-visible/demo/">Živá ukázka polyfillu</a> – testování různých scénářů</li>
  </ul>
</div>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible">MDN: :focus-visible</a> – dokumentace</li>
  <li><a href="/focus">Proč a jak používat :focus stav</a> – související článek</li>
  <li><a href="/formulare">Formuláře</a> – další informace o formulářích</li>
</ul>
