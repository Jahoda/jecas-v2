---
title: "Odeslání formuláře tlačítkem mimo něj"
headline: "Odeslání formuláře tlačítkem mimo něj"
description: "Jak odeslat formulář tlačítkem, které je mimo formulář."
date: "2020-09-01"
last_modification: "2025-08-12"
status: 0
tags: ["html", "html-atributy", "formulare"]
format: "html"
---

<p>V dřívějších dobách muselo být tlačítko pro odeslání formuláře uvnitř něj.</p>

<p>To znamená uvnitř značky <code>&lt;form></code>. Někdy tak celé stránky bývaly jedním velkým formulářem s jedním odesílacím tlačítkem.</p>

<p>V dnešní době je tomu jinak.</p>

<p>Tlačítko může být mimo element <code>&lt;form></code> a přesto může formulář odeslat. Stačí použít atribut <code>form</code>, který odkazuje na <code>id</code> příslušného formuláře.</p>

<pre><code>&lt;form id="kontakt" action="/odeslano" method="post">
  &lt;label>
    E‑mail
    &lt;input name="email" type="email" required>
  &lt;/label>
&lt;/form>

&lt;button type="submit" form="kontakt">Odeslat&lt;/button></code></pre>

<h3 id="kdy-se-hodi">Kdy se to hodí</h3>

<ul>
  <li>Akční lišta nebo sticky hlavička/patička stránky s tlačítkem pro odeslání.</li>
  <li>Modální dialog s potvrzením, který spouští odeslání formuláře na pozadí.</li>
  <li>Více CTA na stránce (např. „Uložit“, „Uložit jako koncept“, „Náhled“) cílených na jeden formulář.</li>
  <li>Rozdělený layout: formulář v obsahu, ovládací prvky v sidebaru nebo toolbaru.</li>
  <li>Designové komponenty, kde tlačítko žije v jiné komponentě než formulář, ale má jej ovládat.</li>
  <li>Umístění primární akce blízko shrnutí/validace mimo samotný formulář.</li>
  
  </ul>

<h3 id="pretizeni">Přetížení atributů formuláře</h3>

<p>Atributy na tlačítku mohou přepsat chování formuláře pro konkrétní odeslání.</p>

<pre><code>&lt;button type="submit" form="kontakt" formmethod="get" formaction="/odeslat">
    Náhled
&lt;/button>
&lt;button type="submit" form="kontakt" formnovalidate>
    Odeslat bez validace
&lt;/button></code></pre>

<ul>
  <li><code>form</code> funguje i na <code>&lt;input type="submit"></code> nebo <code>&lt;input type="image"></code>.</li>
  <li><code>type="submit"</code> je nutné; <code>type="button"</code> neodešle nic.</li>
  <li>Tlačítko uvnitř elementu <code>&lt;form></code> atribut <code>form</code> nepotřebuje.</li>
</ul>
<h3 id="podpora">Podpora v prohlížečích</h3>

<p>Atribut <code>form</code> je podporován ve všech moderních prohlížečích včetně mobilních. Nepodporuje jej pouze starý Internet Explorer (včetně verse&nbsp;11).</p>
<div class="external-content">
<ul>
<li><a href="https://caniuse.com/form-attribute">Can I use: HTML5 form attribute</a></li>
</ul>

</div>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://til.hashrocket.com/posts/v2s2gxgifj-submit-a-form-with-a-button-outside-the-form">Submit a form with a button outside the form (Hashrocket TIL)</a></li>
  <li><a href="https://developer.mozilla.org/docs/Web/HTML/Element/button#attr-form">MDN: button – atribut <code>form</code></a></li>
  <li><a href="https://developer.mozilla.org/docs/Web/HTML/Element/input#attr-form">MDN: input – atribut <code>form</code></a></li>
</ul>
