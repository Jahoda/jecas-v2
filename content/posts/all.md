---
title: "CSS vlastnost all"
headline: "CSS vlastnost <code>all</code>"
description: "Resetování CSS pravidel vlastností <code>all</code>."
date: "2013-12-15"
last_modification: "2013-12-15"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<p>Zatím vlastnost <code>all</code> funguje od <b>Firefoxu 27</b>. Umožňuje <b>resetovat</b> vzhled libovolných elementů.</p>

<p>To se může hodit pro hotová řešení třetích stran, kde je risiko, že cizí elementy zdědí nežádoucí styly. Nyní je v takovém případě nutné <a href="/css-reset">přebíjet</a> obvyklé vlastnosti <b>defaultní hodnotou</b>.</p>

<p>Vlastnost <code>all</code> je zkratka (níže uvedené hodnoty je možné zadávat přímo jako hodnotu všech CSS vlastností). Slouží pro resetování všech CSS vlastností určitého elementu <b>jedním příkazem</b>. Může nabývat tří hodnot.</p>

<dl>
  <dt id="initial"><code>initial</code></dt>
  <dd>
    <p>Vyresetuje úplně všechno včetně hodnot z <b>uživatelských stylů</b> nebo výchozích stylů prohlížeče. <a href="https://kod.djpw.cz/iox">Ukázka</a> — text nebude červený ani modrý, ale černý.</p>
  </dd>
  
  <dt id="inherit"><code>inherit</code></dt>
  <dd>
    <p>Vlastnost se zdědí. <a href="https://kod.djpw.cz/jox">Ukázka</a> — text nebude modrý, ale červený (zdědí hodnotu od rodiče).</p>
  </dd>
  
  <dt id="unset"><code>unset</code></dt>
  <dd>
    <p>V případě, že existuje hodnota k dědění, chová se jako <code>inherit</code>, jinak jako <code>initial</code>. <a href="https://kod.djpw.cz/kox">Ukázka</a>.</p>
  </dd>
</dl>

<p>Při <b>resetování</b> stále platí pravidla kaskádování. Proto odstavec v následujícím kódu bude modrý.</p>

<pre><code>&lt;style>
  p {color: red}
  p#text {color: blue}
  p {all: initial}
&lt;/style>
&lt;p id="text">Text&lt;/p></code></pre>

<p>Protože ID přebije obyčejný kontext. Podobně to dopadne i s <code>!important</code> (<a href="https://kod.djpw.cz/nox">ukázka</a>).</p>