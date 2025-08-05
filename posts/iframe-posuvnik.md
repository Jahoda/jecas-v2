---
title: "Jak skrýt posuvník v <iframe>"
headline: "Jak skrýt posuvník v <code>&lt;iframe></code>"
description: "Jak pomocí CSS skrýt scrollbar u stránky vložené přes <code>&lt;iframe></code>."
date: "2022-12-20"
last_modification: "2022-12-21"
status: 1
tags: ["hotova-reseni", "scroll"]
format: "html"
---

<p>Element <a href="/ramy#iframe"><code>&lt;iframe></code></a> se v minulosti používal ke skládání stránek, v dnešní době se zpravidla používá pro <b>vkládání služeb třetích stran</b> na vlastní stránky.</p>

<p>Typicky věci jako:</p>

<ul>
  <li>chatovací okno,</li>
  <li>nápověda,</li>
  <li>platební brána,</li>
  <li>dotazník,</li>
  <li>reservační kalendáře</li>
</ul>




<p>Výhoda rámu je v tomto případě hlavně v tom, že jsou obě stránky od sebe <b>isolované</b>.</p>

<p>Nepřepisují si tak styly nebo skripty. Komunikace mezi stránkou A a stránkou B obvykle probíhá jen přes <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage"><code>postMessage</code></a>.</p>


<p>Z isolovanosti stránky načítané v <code>&lt;iframe></code> vyplývá, že scrollbar nejde ovlivňovat. Nebo by alespoň neměl jít, protože jde o část stránky v rámu načítané.</p>



<h2 id="zakaz">Zákaz scrollování</h2>

<p>Jedna možnost, jak se scrollbaru zbavit, je zabránit rolování HTML atributem <code>scrolling="no"</code>.</p>

<p>To může být trochu nepraktické, protože se potom nejde dostat k případnému obsahu, který se nevejde.</p>




<h2 id="skryti">Skrytí scrollbaru</h2>

<p>Při zachování možnosti rolovat jde využít CSS triku, kdy se pro <code>&lt;iframe></code> nastaví šířka o šířku posuvníku větší (pomocí <a href="/calc"><code>calc</code></a>).</p>

<p>To se ořízne přes <code>overflow: hidden</code> pro obal rámu.</p>

<p><a href="/sirka-posuvniku">Šířka posuvníku</a> bývá zpravidla do <b>17 px</b>.</p>

<pre><code>.no-scrollbar {
    width: 100%;
    overflow: hidden;
}
.no-scrollbar__iframe {
  width: calc(100% + 17px);
}
</code></pre>

<p><a href="http://kod.djpw.cz/gkid">Živá ukázka</a></p>