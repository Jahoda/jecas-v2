---
title: "Změna location.hash bez odrolování stránky"
headline: "Změna <code>location.hash</code> bez posunu stránky"
description: "Jak změnit <code>location.hash</code> bez posunutí stránky."
date: "2014-01-02"
last_modification: "2014-01-02"
status: 1
tags: ["hotova-reseni", "js", "scroll"]
format: "html"
---

<p>V případě, že se na stránce mění <code>location.hash</code> (#mřížka a obsah za ní v URL), prohlížeč zkusí <b>najít element</b> s odpovídajícím ID a <b>odscrollovat k němu</b>.</p>

<p>Tato funkčnost nemusí být vždy žádoucí. Třeba u <a href="/zobrazit-skryt">přepínání obsahu</a>, kdy chceme umožnit odkazování na příslušnou kotvu, ale poskočení je <b>zbytečně rušivé</b>.</p>

<h2>Řešení</h2>
<p>Postupů, jak změnit <code>hash</code>, ale neodrolovat, existuje několik.</p>

<ol>
  <li><b>Změnit hash</b> na něco, co žádný <code>&lt;element id="idecko"></code> nezachytí. Nevýhoda je, že tato vygenerovaná adresa nebude bez JavaScriptu fungovat. Kromě toho nepůjde použít CSS selektor <a href="/zvyrazneni-kotvy">:target</a>.</li>
  
  <li>
    <p><b>Změnit ID elementu</b> — po vyvolání akce (typicky <a href="/udalosti-mysi#onclick">kliknutí</a>) se uloží do dočasné proměnné odkaz na element, změní se mu ID, změní se <code>location.hash</code>, vrátí se původní ID.</p>
    <pre><code>var element = document.getElementById(obsahHashe);
var puvodniId = element.id;
element.id = puvodniId + "-nesmysl";
location.hash = "#" + puvodniId;
element.id = puvodniId;
</code></pre>
    <p><a href="http://kod.djpw.cz/zuab">Ukázka</a></p>
    <p>Problém s <code>:target</code> selektorem ale přetrvává.</p>
  </li>
  <li>
    <p><b><a href="/odrolovani">Odrolovat</a> na původní posici</b> změnou <code>scrollTop</code> — uloží se o kolik je odrolováno, změní se <code>hash</code> a odroluje se zpátky.
    </p>
    <pre><code>var top = document.documentElement.scrollTop + document.body.scrollTop;
location.hash = "#" + idElementu;
document.body.scrollTop = document.documentElement.scrollTop = top;</code></pre>
    <p>V některých prohlížečích je třeba <a href="/zvyrazneni-odrolovani#quirk">používat</a> <code>body.scrollTop</code> a jinde <code>documentElement.scrollTop</code>.</p>
    <p><a href="http://kod.djpw.cz/avab">Ukázka</a></p>
  </li>
</ol>


