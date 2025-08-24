---
title: "Má smysl měnit kursor tlačítek?"
headline: "Má smysl měnit kursor tlačítek?"
description: "Tlačítka mají na webu po najetí jiný kursor než odkazy."
date: "2025-08-24"
last_modification: "2025-08-24"
status: 1
tags: ["css", "odkazy", "ux"]
format: "html"
---

<p>Existuje názor, že tlačítka by měla mít <code>cursor: pointer</code>. Stejně tak existuje pohled, že je to zbytečné.</p>

<p>Kde je pravda?</p>

<h2 id="standardni-chovani-prohlizecu">Standardní chování prohlížečů</h2>

<p>Prohlížeče mají předdefinované chování <a href="/cursor">kursoru</a> pro různé elementy:</p>

<ul>
  <li><strong>Odkazy (<code>&lt;a&gt;</code>)</strong> – automaticky zobrazují pointer cursor (ruku) <img src="/files/kursor-tlacitek/pointer.png" class="inline-flex !my-0" /></li>
  <li><strong>Tlačítka (<code>&lt;button&gt;</code>)</strong> – zobrazují default cursor (šipku) <img src="/files/kursor-tlacitek/arrow.png" class="inline-flex !my-0" /></li>
  <li><strong>Input elementy</strong> – zobrazují text cursor <img src="/files/kursor-tlacitek/text.png" class="inline-flex !my-0" /></li>
</ul>

<h2 id="proc-nekteri-vyvojari-preferuji-pointer-cursor">Proč někteří vývojáři preferují <code>cursor: pointer</code></h2>

<p>Argumenty pro změnu cursoru na tlačítkách:</p>

<ul>
  <li><strong>Konsistence</strong> – všechny interaktivní elementy mají stejný kursor</li>
  <li><strong>Intuitivnost</strong> – uživatelé očekávají ručičku u klikatelných prvků</li>
  <li><strong>Přístupnost</strong> – jasnější indikace interaktivity</li>
</ul>

<h2 id="proc-jini-preferuji-default-cursor">Proč jiní preferují <code>cursor: default</code></h2>

<p>Argumenty proti změně kursoru:</p>

<ul>
  <li><strong>UX principy</strong> – neporušovat očekávání uživatelů, kdy ve výchozím stavu mají tlačítka kursor šipky</li>
  <li><strong>Přehlednost</strong> – rozlišení mezi odkazy a tlačítky</li>  
</ul>

<h2 id="css">CSS zápis</h2>

<h3 id="css-pro-pointer-cursor">CSS pro ruku <img src="/files/kursor-tlacitek/pointer.png" class="inline-flex !my-0" /></h3>

<pre><code>button {
  cursor: pointer;
}</code></pre>

<h3 id="css-pro-default-cursor">CSS pro výchozí kursor <img src="/files/kursor-tlacitek/arrow.png" class="inline-flex !my-0" /></h3>

<pre><code>button {
  cursor: default;
}</code></pre>

<h2 id="tlacitko-nebo-odkaz">Tlačítko, nebo odkaz?</h2>

<p>V moderních aplikacích se často stírá rozdíl mezi tlačítky a odkazy. Mnoho komponent vypadá jako tlačítka, ale chová se jako odkazy (případně i naopak):</p>

<ul>
  <li><strong>navigační tlačítka</strong> – přecházejí na jinou stránku,</li>
  <li><strong>akční odkazy</strong> – spouští JavaScript funkce,</li>
  <li><strong>hybridní komponenty</strong> – kombinují obě chování</li>
</ul>

<p>V takových případech je <code>cursor: pointer</code> často vhodnější, protože uživatel očekává klikatelnost. Klíčové je být konsistentní v rámci celé aplikace.</p>

<p>Obvykle nemá smysl se moc řídit tím, jestli je dané tlačítko <code>&lt;a href></code> nebo <code>&lt;button></code>. Takže je potřeba chování sjednotit. Ať už na jednu, nebo druhou variantu.</p>

<h2 id="doporučení">Doporučení</h2>

<p>Důležité je, aby uživatel pochopil, že na něco může kliknout. K tomu může sloužit:</p>

<ul>
  <li><strong>visuální design</strong> – jasné rozlišení tlačítek od textu,</li>
  <li><strong>hover efekty</strong> – změna barvy, stínu, nebo pozadí,</li>
  <li><strong>ikony</strong> – vizuální indikace akce</li>
</ul>

<p>Měnit kursor tak už ani nemusí být potřeba.</p>

<h2 id="zaver">Závěr</h2>

<p>Neexistuje univerzální odpověď. Klíčové je být konsistentní v rámci celé aplikace a zvážit očekávání vašich uživatelů. Pokud se rozhodnete pro <code>cursor: pointer</code>, aplikujte ho na všechna tlačítka. Pokud ne, držte se výchozího chování prohlížečů.</p>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://ux.stackexchange.com/questions/12726/correct-cursor-for-content-cannot-be-interacted-with">Correct cursor for "content cannot be interacted with"</a></li>
  <li><a href="https://uxdesign.cc/buttons-shouldnt-have-a-hand-cursor-part-2-4a6e1c8423a5">Buttons shouldn't have a hand cursor part 2</a></li>
</ul>