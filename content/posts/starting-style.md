---
title: "CSS @starting-style"
headline: "CSS <code>@starting-style</code>"
description: "Jak animovat elementy při jejich prvním zobrazení pomocí at-pravidla <code>@starting-style</code>."
date: "2025-12-20"
last_modification: "2025-12-20"
status: 1
tags: ["css", "webove-animace"]
format: "html"
---

<p>Animace při <b>vstupu elementu</b> do stránky byla dlouho problém. CSS přechody fungovaly jen při změně stavu, ne při prvním vykreslení. Pravidlo <code>@starting-style</code> tento problém řeší.</p>

<h2 id="problem">Problém s animacemi při vstupu</h2>

<p>Představte si, že chcete animovat dialog při jeho otevření. S klasickým <code>transition</code> to nefunguje:</p>

<pre><code>dialog {
  opacity: 1;
  transition: opacity 0.3s;
}

dialog:not([open]) {
  opacity: 0;
}</code></pre>

<p>Dialog při otevření <b>neanimuje</b> — prohlížeč ho rovnou vykreslí s <code>opacity: 1</code>. Přechod funguje jen při změně z jednoho stavu do druhého, ne při prvním zobrazení.</p>

<h2 id="reseni">Řešení pomocí @starting-style</h2>

<p>Pravidlo <code>@starting-style</code> definuje <b>počáteční styl</b>, ze kterého element přechází při prvním vykreslení:</p>

<pre><code>dialog[open] {
  opacity: 1;
  transition: opacity 0.3s;

  @starting-style {
    opacity: 0;
  }
}</code></pre>

<p>Teď prohlížeč ví, že má začít s <code>opacity: 0</code> a plynule přejít na <code>opacity: 1</code>.</p>

<h2 id="syntaxe">Syntaxe</h2>

<p>Existují dva způsoby zápisu — vnořený a samostatný:</p>

<h3>Vnořený zápis</h3>

<pre><code>.element {
  opacity: 1;
  transform: scale(1);
  transition: all 0.3s;

  @starting-style {
    opacity: 0;
    transform: scale(0.9);
  }
}</code></pre>

<h3>Samostatný zápis</h3>

<pre><code>.element {
  opacity: 1;
  transform: scale(1);
  transition: all 0.3s;
}

@starting-style {
  .element {
    opacity: 0;
    transform: scale(0.9);
  }
}</code></pre>

<p>Vnořený zápis je přehlednější a udržuje související styly pohromadě.</p>

<h2 id="ukazka">Ukázka</h2>

<div class="live">
  <style>
    .starting-demo {
      display: none;
      opacity: 1;
      transform: translateY(0);
      transition: opacity 0.4s, transform 0.4s, display 0.4s allow-discrete;
      background: #DA3F94;
      color: #fff;
      padding: 1em;
      border-radius: 8px;
      margin-top: 1em;
    }

    .starting-demo.is-visible {
      display: block;

      @starting-style {
        opacity: 0;
        transform: translateY(-20px);
      }
    }
  </style>
  <button onclick="document.querySelector('.starting-demo').classList.toggle('is-visible')">Zobrazit / Skrýt</button>
  <div class="starting-demo">Animovaný element</div>
</div>

<h2 id="display">Animace vlastnosti display</h2>

<p>Vlastnost <code>display</code> není běžně animovatelná. S <code>@starting-style</code> a klíčovým slovem <code>allow-discrete</code> to ale jde:</p>

<pre><code>.tooltip {
  display: none;
  opacity: 0;
  transition:
    opacity 0.3s,
    display 0.3s allow-discrete;
}

.tooltip.is-visible {
  display: block;
  opacity: 1;

  @starting-style {
    opacity: 0;
  }
}</code></pre>

<p>Klíčové slovo <code>allow-discrete</code> říká prohlížeči, že má animovat i diskrétní vlastnosti jako <code>display</code>. Prohlížeč přepne <code>display</code> na začátku přechodu (při zobrazení) nebo na konci (při skrytí).</p>

<h2 id="popover">Použití s Popover API</h2>

<p>Kombinace <code>@starting-style</code> s <a href="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API">Popover API</a> umožňuje animované vyskakovací prvky bez JavaScriptu:</p>

<pre><code>[popover] {
  opacity: 1;
  transform: scale(1);
  transition:
    opacity 0.2s,
    transform 0.2s,
    display 0.2s allow-discrete,
    overlay 0.2s allow-discrete;

  @starting-style {
    opacity: 0;
    transform: scale(0.95);
  }
}

[popover]:not(:popover-open) {
  opacity: 0;
  transform: scale(0.95);
}</code></pre>

<p>Vlastnost <code>overlay</code> zajišťuje, že element zůstane v top layer po dobu animace při zavírání.</p>

<h2 id="dialog">Animovaný dialog</h2>

<div class="live">
  <style>
    .animated-dialog {
      border: none;
      border-radius: 12px;
      padding: 2em;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      opacity: 1;
      transform: translateY(0) scale(1);
      transition:
        opacity 0.3s ease-out,
        transform 0.3s ease-out,
        display 0.3s allow-discrete,
        overlay 0.3s allow-discrete;
    }

    .animated-dialog[open] {
      @starting-style {
        opacity: 0;
        transform: translateY(-30px) scale(0.95);
      }
    }

    .animated-dialog:not([open]) {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }

    .animated-dialog::backdrop {
      background: rgba(0, 0, 0, 0.5);
      opacity: 1;
      transition: opacity 0.3s, display 0.3s allow-discrete;
    }

    .animated-dialog[open]::backdrop {
      @starting-style {
        opacity: 0;
      }
    }

    .animated-dialog:not([open])::backdrop {
      opacity: 0;
    }
  </style>
  <button onclick="document.querySelector('.animated-dialog').showModal()">Otevřít dialog</button>
  <dialog class="animated-dialog">
    <p>Animovaný modální dialog</p>
    <button onclick="this.closest('dialog').close()">Zavřít</button>
  </dialog>
</div>

<h2 id="rozdil">Rozdíl oproti @keyframes</h2>

<p>Pravidlo <code>@starting-style</code> není náhrada za <code>@keyframes</code>. Každý přístup má své využití:</p>

<table>
  <tr>
    <th></th>
    <th>@starting-style</th>
    <th>@keyframes</th>
  </tr>
  <tr>
    <td>Použití</td>
    <td>Vstupní přechody</td>
    <td>Komplexní animace</td>
  </tr>
  <tr>
    <td>Kroky</td>
    <td>Jeden (počátek → konec)</td>
    <td>Libovolný počet</td>
  </tr>
  <tr>
    <td>Opakování</td>
    <td>Ne</td>
    <td>Ano</td>
  </tr>
  <tr>
    <td>Výstupní animace</td>
    <td>Přes :not() selektor</td>
    <td>Přes animation-direction</td>
  </tr>
</table>

<p>Pro jednoduché přechody při zobrazení je <code>@starting-style</code> čistší řešení. Pro složitější animace s více kroky použijte <code>@keyframes</code>.</p>

<h2 id="podpora">Podpora v prohlížečích</h2>

<p>Pravidlo <code>@starting-style</code> podporují:</p>

<ul>
  <li><b>Chrome</b> od verze 117</li>
  <li><b>Edge</b> od verze 117</li>
  <li><b>Safari</b> od verze 17.5</li>
  <li><b>Firefox</b> od verze 129</li>
</ul>

<p>Pro starší prohlížeče element jednoduše nebude animovaný — zobrazí se okamžitě. To je přijatelný fallback.</p>

<h2 id="tipy">Tipy</h2>

<ul>
  <li><b>Používejte vnořený zápis</b> — je přehlednější a souvisí s CSS Nesting</li>
  <li><b>Nezapomeňte na allow-discrete</b> při animaci <code>display</code></li>
  <li><b>Přidejte overlay</b> pro elementy v top layer (dialogy, popovers)</li>
  <li><b>Definujte i výstupní stav</b> pomocí <code>:not([open])</code> nebo podobného selektoru</li>
</ul>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style">MDN: @starting-style</a></li>
  <li><a href="https://developer.chrome.com/blog/entry-exit-animations">Chrome: Entry and exit animations</a></li>
</ul>
