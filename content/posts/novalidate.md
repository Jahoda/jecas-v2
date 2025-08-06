---
title: "Atribut novalidate"
headline: "Atribut <code>novalidate</code>"
description: "HTML atribut <code>novalidate</code> zabrání výchozí HTML 5 validaci formulářů."
date: "2015-01-29"
last_modification: "2015-01-30"
status: 1
tags: ["formulare", "html", "html-atributy"]
format: "html"
---

<p>Při používání pokročilejších pokročilejších typů značky <a href="/input"><code>&lt;input></code></a> je ve výchozím stavu přítomna jistá <b>automatická validace</b>.</p>

<p>Například políčko <code>&lt;input type="email"></code> požaduje platnou e-mailovou adresu. Ověření proběhne při <b>odeslání formuláře</b>.</p>

<div class="live">
  <form onsubmit="alert('Jakože odesláno'); return false">
    <p>
      <label>E-mail: <input type="email" required></label>
      <button>Odeslat</button>
    </p>
  </form>
</div>

<p>Atributem <code>novalidate</code> jde toto výchozí chování <b>vypnout</b>:</p>

<pre><code>&lt;form novalidate>
&lt;/form></code></pre>

<p><a href="https://kod.djpw.cz/bzjb">Živá ukázka</a> – test formuláře s/bez výchozí validace</p>


<h2 id="vypnout">Proč validaci vypnout</h2>

<p>Výchozí HTML 5 validace není úplně optimální. Lepšího výsledku jde zpravidla dosáhnout <b>vlastní validací v JavaScriptu</b>, která nemá následující nedostatky:</p>

<ol>
  <li>
    <p><b>Nedostatečná podpora napříč prohlížeči</b>. U HTML 5 validace je například políčko pro e-mail podporované až v <b>IE 10</b>.</p>
  </li>
  
  <li>
    <p><b>Nejistá kontrola</b> nad výsledkem. Někdy se zvláštní typy políček používají hlavně k tomu, aby na mobilních zařízeních byla nabídnuta <a href="/chyby-formularu#type">lepší podoba klávesnice</a>. To je dobré chování, které ale doprovází i <b>výchozí validace</b>, která nemusí vyhovovat.</p>
  </li>
</ol>

<h2 id="validace">Výchozí validace</h2>

<p><a href="/valid-invalid#vlastni-hlaska">Text hlášek</a> výchozí validace změnit jde. Problematická může být přílišná nebo nedostatečná <b>benevolence k zadaným datům</b>.</p>

<p>Například u e-mailu si lze představit tři stupně <i>přísnosti</i>:</p>

<ol>
  <li>Vyžadovat přesný tvar „<mark>email@example.com</mark>“.</li>
  
  <li>Tolerovat a oříznout  tzv. <i>bílé znaky</i>, tedy akceptovat i „ <mark>email@example.com</mark>“.</li>
  
  <li>Spokojit se s výskytem e-mailu, tj. akceptovat i „cokoliv <mark>email@example.com</mark>“. Takový případ může nastat při nešikovném kopírování.</li>
</ol>

<p>Výchozí validace formulářů používá většinou první nebo druhý způsob.</p>


<h3 id="vyhoda">Výhoda</h3>

<p>Výhoda HTML 5 validace je ale ve své jednoduchosti nasazení a se selektory <a href="/valid-invalid"><code>:valid</code> a <code>:invalid</code></a> jde provádět i něco jako primitivní <b>ověřování během psaní</b>.</p>