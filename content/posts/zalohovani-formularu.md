---
title: "Zapamatování formulářových polí"
headline: "Automatické zapamatování formulářů"
description: "Při vyplňování delších formulářů se je hodí obsah průběžně ukládat. Jak na to?"
date: "2013-08-16"
last_modification: "2013-09-23"
status: 1
tags: ["formulare", "hotova-reseni", "js"]
format: "html"
---

<h2 id="uloziste">Vhodné úložiště</h2>
<p>V první řadě je třeba rozhodnout, kam se budou dočasná data ukládat. K disposici je:</p>

<ol>
  <li>Na <b>straně serveru</b>:
    <ol>
      <li>database,</li>
      <li>soubory,</li>
      <li>session</li>
    </ol>
  </li>
  <li>Na <b>straně klienta</b>:
    <ol>
      <li>sušenky (cookies),</li>
      <li>lokální úložiště (<code>localStorage</code>)</li>
    </ol>
  </li>
</ol>

<h3>Na straně serveru</h3>
<p>Výhoda v ukládání na straně serveru je <b>lepší trvanlivost a přenositelnost dat</b>, pochopitelně v případě, že má uživatel nějaký identifikátor (je na webu přihlášen). Potom není problém formulář rozepsat a dopsat (po přihlášení) na úplně jiném zařízení.</p>
<p>Komfortní (časté) <b>ukládání na serveru</b> bude vytvářet jistou zátěž, což může být v případě hodně uživatelů problém. Proto může být vhodné řešení, kdy se pravidelně v nízkých časových intervalech zálohuje u klienta; a na server se ukládají jen významnější změny nebo po uplynutí delší doby.</p>

<h3>Na straně klienta</h3>
<p>Ukládání <b>na straně klienta</b> má nepochybnou výhodu v nezatěžování našeho serveru a rychlosti (jenom zaslání a zpracování HTTP požadavku může zabrat desítky milisekund). Zátěž spojená s průběžným ukládáním se zcela <b>přenese na klienta</b>.</p>
<p>Použít je možné <b>cookies</b>, tam se ale větší obsah nemusí vejít (většinou se uvádí <b>maximální velikost cookies</b> okolo 4 kB), proto se nabízí <b>lokální úložiště</b> (<code>localStorage</code>).</p>

<h2 id=local-storage>Lokální úložiště</h2>
<p>Lokální úložiště funguje od <b>Exploreru 8</b>, pro starší prohlížeče lze dodělat <a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=8&amp;topic=151480#4">podporu</a> přes <code>behavior: url(#default#userData)</code>:</p>
<pre style="max-height: 200px; overflow-y: auto"><code>if(!window.localStorage && document.documentElement.addBehavior) window.localStorage = (function(name)
{
  var prefix = "storage-";
  var link = document.createElement("link");
  link.addBehavior("#default#userData");
  document.documentElement.firstChild.appendChild(link);
  return {
    setItem: function(key, value)
    {
      link.setAttribute(prefix + key, value);
      link.save(name);
    },
    getItem: function(key)
    {
      try { link.load(name); } catch(exc) {}
      return link.getAttribute(prefix + key);
    },
    removeItem: function(key)
    {
      link.removeAttribute(prefix + key);
      link.save(name);
    }
  };
})("localStorage");</code></pre>

<h3>Použití</h3>
<table>
  <tr>
    <th>Uložení obsahu</th>
    <td><pre><code>localStorage.<b>set</b>Item("nazev-polozky", "hodnota");</code></pre>
    <p>Může se používat s určitým časovým opakováním nebo po nějaké akci (zaškrtnutí políčka ve formuláři, stisknutí klávesy).</p>
    </td>
  </tr>    
  <tr>    
    <th>Přečtení obsahu</th>
    <td><pre><code>var obsah = localStorage.<b>get</b>Item("nazev-polozky");</code></pre>
    <p>Proběhne při načtení stránky.</p>
    </td>    
  </tr>
  <tr>    
    <th>Odstranění obsahu</th>
    <td><pre><code>localStorage.<b>remove</b>Item("nazev-polozky");</code></pre>
    <p>Proběhne při <b>úspěšném</b> odeslnání formuláře.</p>
    </td>    
  </tr>
</table>

<p>Před <i>používáním</i> <code>localStorage</code> je ještě vhodné <b>testovat jeho dostupnost</b>:</p>
<pre><code>if (window.localStorage) …</code></pre>

<h3 id="hotove-reseni">Hotové řešení</h3>
<p><b>Hotové řešení</b> průběžného ukládání celých formulářů je například:</p>
<p><a href="http://sisyphus-js.herokuapp.com/" class=button>Sisyphus.js</a>
  
<h2 id="odkazy">Odkazy</h2>
<ul>
  <li><a href="http://toddmotto.com/vault-js-html5-local-session-web-storage-api-with-automatic-json-support/">Vault.js</a> — Web Storage API s automatickou podporou JSONu</li>
</ul>