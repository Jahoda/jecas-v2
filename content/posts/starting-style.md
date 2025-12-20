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

    .starting-demo:not(.is-visible) {
      opacity: 0;
      transform: translateY(20px);
    }
  </style>
  <button onclick="document.querySelector('.starting-demo').classList.toggle('is-visible')">Zobrazit / Skrýt</button>
  <div class="starting-demo">Animovaný element</div>
</div>

<h2 id="tooltip">Animovaný tooltip</h2>

<p>Tooltip, který se plynule objeví při najetí myší:</p>

<div class="live">
  <style>
    .tooltip-wrapper {
      position: relative;
      display: inline-block;
    }

    .tooltip-trigger {
      padding: 0.5em 1em;
      background: #333;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .tooltip-content {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(-8px);
      background: #222;
      color: #fff;
      padding: 0.5em 1em;
      border-radius: 6px;
      font-size: 0.875em;
      white-space: nowrap;
      opacity: 1;
      display: none;
      transition:
        opacity 0.2s ease-out,
        transform 0.2s ease-out,
        display 0.2s allow-discrete;
    }

    .tooltip-content::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 6px solid transparent;
      border-top-color: #222;
    }

    .tooltip-wrapper:hover .tooltip-content {
      display: block;

      @starting-style {
        opacity: 0;
        transform: translateX(-50%) translateY(-4px);
      }
    }

    .tooltip-wrapper:not(:hover) .tooltip-content {
      opacity: 0;
      transform: translateX(-50%) translateY(-4px);
    }
  </style>
  <div class="tooltip-wrapper">
    <button class="tooltip-trigger">Najeď na mě</button>
    <div class="tooltip-content">Animovaný tooltip!</div>
  </div>
</div>

<h2 id="notifikace">Notifikace / Toast</h2>

<p>Notifikace, která přijede ze strany:</p>

<div class="live">
  <style>
    .toast-container {
      position: relative;
      height: 80px;
      overflow: hidden;
    }

    .toast {
      position: absolute;
      right: 0;
      top: 10px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      padding: 1em 1.5em;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      display: none;
      opacity: 1;
      transform: translateX(0);
      transition:
        opacity 0.4s ease-out,
        transform 0.4s ease-out,
        display 0.4s allow-discrete;
    }

    .toast.is-visible {
      display: block;

      @starting-style {
        opacity: 0;
        transform: translateX(100%);
      }
    }

    .toast:not(.is-visible) {
      opacity: 0;
      transform: translateX(100%);
    }
  </style>
  <button onclick="let t = document.querySelector('.toast'); t.classList.add('is-visible'); setTimeout(() => t.classList.remove('is-visible'), 2000)">Zobrazit notifikaci</button>
  <div class="toast-container">
    <div class="toast">Zpráva byla odeslána</div>
  </div>
</div>

<h2 id="karta">Animovaná karta</h2>

<p>Karta, která se při zobrazení „rozbalí“:</p>

<div class="live">
  <style>
    .card-demo {
      display: none;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      padding: 1.5em;
      margin-top: 1em;
      max-width: 300px;
      opacity: 1;
      transform: scale(1) rotateX(0deg);
      transition:
        opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
        transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
        display 0.5s allow-discrete;
      transform-origin: top center;
    }

    .card-demo.is-visible {
      display: block;

      @starting-style {
        opacity: 0;
        transform: scale(0.8) rotateX(-15deg);
      }
    }

    .card-demo:not(.is-visible) {
      opacity: 0;
      transform: scale(0.8) rotateX(15deg);
    }

    .card-demo h3 {
      margin: 0 0 0.5em;
      color: #333;
    }

    .card-demo p {
      margin: 0;
      color: #666;
      font-size: 0.9em;
    }
  </style>
  <button onclick="document.querySelector('.card-demo').classList.toggle('is-visible')">Zobrazit / Skrýt kartu</button>
  <div class="card-demo">
    <h3>Animovaná karta</h3>
    <p>Obsah karty s efektem rozbalení a mírného natočení.</p>
  </div>
</div>

<h2 id="seznam">Animovaný seznam</h2>

<p>Položky seznamu s postupným zobrazením:</p>

<div class="live">
  <style>
    .list-demo {
      list-style: none;
      padding: 0;
      margin: 1em 0;
    }

    .list-demo li {
      display: none;
      background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
      color: #fff;
      padding: 0.75em 1em;
      margin: 0.5em 0;
      border-radius: 6px;
      opacity: 1;
      transform: translateX(0);
      transition:
        opacity 0.3s ease-out,
        transform 0.3s ease-out,
        display 0.3s allow-discrete;
    }

    .list-demo.is-visible li {
      display: block;

      @starting-style {
        opacity: 0;
        transform: translateX(-30px);
      }
    }

    .list-demo.is-visible li:nth-child(2) { transition-delay: 0.1s; }
    .list-demo.is-visible li:nth-child(3) { transition-delay: 0.2s; }
    .list-demo.is-visible li:nth-child(4) { transition-delay: 0.3s; }

    .list-demo:not(.is-visible) li {
      opacity: 0;
      transform: translateX(-30px);
    }

    .list-demo:not(.is-visible) li:nth-child(1) { transition-delay: 0.3s; }
    .list-demo:not(.is-visible) li:nth-child(2) { transition-delay: 0.2s; }
    .list-demo:not(.is-visible) li:nth-child(3) { transition-delay: 0.1s; }
    .list-demo:not(.is-visible) li:nth-child(4) { transition-delay: 0s; }
  </style>
  <button onclick="document.querySelector('.list-demo').classList.toggle('is-visible')">Zobrazit / Skrýt seznam</button>
  <ul class="list-demo">
    <li>První položka</li>
    <li>Druhá položka</li>
    <li>Třetí položka</li>
    <li>Čtvrtá položka</li>
  </ul>
</div>

<h2 id="exit">Zpětná animace (exit)</h2>

<p>Pravidlo <code>@starting-style</code> definuje jen <b>vstupní stav</b>. Pro animaci při skrytí musíte definovat <b>výstupní stav</b> pomocí selektoru:</p>

<pre><code>.element {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.3s, display 0.3s allow-discrete;
}

/* Vstupní animace */
.element.is-visible {
  display: block;

  @starting-style {
    opacity: 0;
    transform: translateY(-20px);
  }
}

/* Výstupní animace */
.element:not(.is-visible) {
  opacity: 0;
  transform: translateY(20px);
}</code></pre>

<p>Prohlížeč animuje přechod <b>do</b> stavu <code>:not(.is-visible)</code>. Vlastnost <code>display</code> se přepne <b>na konci</b> animace, takže element zůstane viditelný po celou dobu přechodu.</p>

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

<div class="live">
  <style>
    .popover-demo {
      background: #1a1a2e;
      color: #eee;
      border: none;
      border-radius: 12px;
      padding: 1.5em;
      box-shadow: 0 10px 40px rgba(0,0,0,0.4);
      opacity: 1;
      transform: scale(1);
      transition:
        opacity 0.25s ease-out,
        transform 0.25s ease-out,
        display 0.25s allow-discrete,
        overlay 0.25s allow-discrete;
      /* Centrování */
      inset: 0;
      margin: auto;
      width: fit-content;
      height: fit-content;
    }

    .popover-demo:popover-open {
      @starting-style {
        opacity: 0;
        transform: scale(0.9);
      }
    }

    .popover-demo:not(:popover-open) {
      opacity: 0;
      transform: scale(0.9);
    }
  </style>
  <button popovertarget="muj-popover">Otevřít popover</button>
  <div popover id="muj-popover" class="popover-demo">
    <p><b>Animovaný popover</b></p>
    <p>Zavře se kliknutím mimo nebo na Escape.</p>
  </div>
</div>

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
      /* Centrování */
      inset: 0;
      margin: auto;
      width: fit-content;
      height: fit-content;
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

<h2 id="drive">Jak se to řešilo dříve</h2>

<p>Před <code>@starting-style</code> existovalo několik workaroundů:</p>

<h3>1. @keyframes animace</h3>

<p>Nejběžnější řešení — definovat animaci s explicitním počátkem:</p>

<pre><code>@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.element {
  animation: fadeIn 0.3s ease-out;
}</code></pre>

<p><b>Nevýhody:</b></p>
<ul>
  <li>Animace běží vždy, i když element už byl viditelný</li>
  <li>Pro exit animaci potřebujete další keyframes a JavaScript</li>
  <li>Složitější správa stavů</li>
</ul>

<h3>2. JavaScript s requestAnimationFrame</h3>

<p>Přidání třídy až po vykreslení:</p>

<pre><code>element.style.display = 'block';
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    element.classList.add('is-visible');
  });
});
</code></pre>

<p>Dvojité <code>requestAnimationFrame</code> zajistí, že prohlížeč stihne vykreslit počáteční stav před přidáním třídy.</p>

<h3>3. setTimeout hack</h3>

<pre><code>element.style.display = 'block';
setTimeout(() => {
  element.classList.add('is-visible');
}, 10);</code></pre>

<p><b>Nevýhody:</b></p>
<ul>
  <li>Nespolehlivé — závisí na rychlosti prohlížeče</li>
  <li>Může způsobit probliknutí</li>
  <li>Není deklarativní</li>
</ul>

<h3>Proč je @starting-style lepší</h3>

<ul>
  <li><b>Čistě v CSS</b> — žádný JavaScript</li>
  <li><b>Deklarativní</b> — jasně říká „toto je počáteční stav“</li>
  <li><b>Spolehlivé</b> — prohlížeč garantuje správné pořadí</li>
  <li><b>Funguje s display</b> — díky <code>allow-discrete</code></li>
</ul>

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

<p>Pro starší prohlížeče element jednoduše nebude animovaný — zobrazí se okamžitě. Přijatelná degradace.</p>

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
