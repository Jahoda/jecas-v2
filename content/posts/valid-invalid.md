---
title: "Selektory :valid a :invalid"
headline: "CSS selektory <code>:valid</code> a <code>:invalid</code>"
description: "CSS selektory <code>:valid</code> a <code>:invalid</code> umí rozpoznat správně nebo špatně vyplněné formulářové políčko."
date: "2014-04-30"
last_modification: "2014-04-30"
status: 1
tags: ["css", "formulare", "selektory-css"]
format: "html"
---

<p>Pomocí různých typů <a href="/input"><code>&lt;input></code>u</a> nebo <a href="/atribut-pattern">atributem <code>pattern</code></a> je možné ve všech prohlížečích kromě <b>IE 9</b> a starších používat tzv. <a href="/css-selektory#validace">selektory validace</a>.</p>

<h2 id="pouziti">Použití</h2>

<pre><code>:valid {
  color: green;
}
:invalid {
  color: red;
}</code></pre>

<p>Prohlížeč potom kontroluje, zda zadaný obsah odpovídá příslušnému <b>typu</b> nebo <b>regulárnímu výrazu</b>.</p>

<p>Tj. třeba <code>&lt;input type="email"></code> bude testovat přítomnost zavináče, <code>&lt;input type="number"></code> zase přítomnost pouze čísel.</p>

<div class="live">
  <style>
  input:valid {
    color: green;
  }
  input:invalid {
    color: red;
  }
  </style>
  <form action="?" onsubmit="return false">
    <p>
      <label>E-mail:<br>
        <input type="email" required>
      </label>
    </p>
    <p>
      <label>Číslo:<br>
        <input type="number" required>
      </label>
    </p>
    <p>
      <label>Malá písmena:<br>
        <input type="text" pattern="[a-z]*" required>
      </label>
    </p>
    <p><button>Odeslat</button></p>
  </form>
</div>

<h2 id="vlastni-hlaska">Vlastní hláška</h2>

<p>Při nastavení pravidel <code>&lt;input></code>u se potom při odeslání objeví chybová hláška. Výchozí universální rada pro <code>pattern</code> je poněkud knížecí (pro známé typy jako je e-mail jsou v prohlížečích hlášky ale relativně slušné).</p>

<p><img src="/files/valid-invalid/ivalid-hlaska.png" alt="Výchozí zpráva o špatném formátu políčka" class="border"></p>

<p>Upravit text hlášky do vlastní podoby jde přes funkci <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#dom-cva-setcustomvalidity"><code>setCustomValidity</code></a> nebo atribut <code>title</code>.</p>

<h3 id="custom-validity">Přes <code>setCustomValidity</code></h3>

<p>Jednoduchá funkce pro kontrolu může vypadat následovně. Při změně políčka (<code>oninput</code>) se této funkci předá odkaz na políčko (<code>el</code>) a vlastní hláška (<code>hlaska</code>).</p>

<pre><code>function kontrola(el, hlaska) {
    if (el.validity.patternMismatch) {
        el.setCustomValidity(hlaska);
    }    
    else {
        el.setCustomValidity('');
    }
}</code></pre>

<p><a href="http://kod.djpw.cz/rycb">Ukázka</a></p>

<h3 id="title">Přes <code>title</code></h3>

<p>Použití atributu <code>title</code> je sice úplně triviální, ale vlastní hláška se zobrazí až pod tou universální.</p>

<pre><code>&lt;input pattern="[a-z]*" title='Zadejte pouze malá písmena'></code></pre>

<p><a href="http://kod.djpw.cz/qycb">Ukázka</a></p>


<h2 id="praxe">Použití v praxi</h2>

<p>V podporovaných prohlížečích (<b>Opera</b>, <b>Firefox</b>, <b>Chrome</b>, <b>Internet Explorer 10</b>) je využití:</p>

<ul>
  <li>pseudo-tříd <code>:valid</code>/<code>:invalid</code>,</li>
  <li>zvláštních typů <code>&lt;input></code>ů,</li>
  <li>atributů <code>pattern</code> nebo <code>required</code></li>
</ul>
<p>Spolu s nastavením <b>vlastní hlášky</b> docela jednoduchý nástroj, jak vytvořit uživatelsky relativně příjemnou validaci dat bez komplikovaných JavaScriptů.</p>

<p>Hlavní nevýhoda je asi grafická a i funkční nejednotnost napříč prohlížeči. A chybějící 100% kontrola na výsledkem jako v případě čistě javascriptových řešení.</p>