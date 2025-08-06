---
title: "Aktivování/deaktivování okna"
headline: "Zachycení aktivování a deaktivování okna v JS"
description: "V JavaScriptu lze relativně snadno reagovat na aktivování nebo deaktivování okna/záložky/tabu."
date: "2013-05-13"
last_modification: "2013-05-13"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p>Vše, co je <a href='https://kod.djpw.cz/dpcb-'>potřeba</a>, jsou vlastnosti <code>onfocus</code> a <code>onblur</code>.</p>

<pre><code>window.<b>onfocus</b> = function () {
    // co se má dělat po aktivování
};

window.<b>onblur</b> = function () {
    // co se má dělat po <i>de</i>aktivování
};</code></pre>

<p>Pokud se má něco spustit <b>hned po načtení</b>, slouží k tomu událost <code>onload</code>.

<h2>Podpora</h2>
<p>Funkční napříč prohlížeči.

<h2>A k čemu je to dobré?</h2>
<p>Jestliže se na stránce něco <a href="/odpocitavani">JS časovačem</a> přes <a href="/ajax">AJAX</a> <b>automaticky obnovuje</b>, může dávat smysl při deaktivování stránky (<code>onblur</code>) akci pozastavit a při aktivování (<code>onfocus</code>) ji opět pustit.
  <p>Ovšem chce to udělat z rozmyslem. Měla-li by se při deaktivování okna například <b>přerušit přehrávaná hudba</b>, kterou chce návštěvník poslouchat na pozadí, asi ho to moc nepotěší…