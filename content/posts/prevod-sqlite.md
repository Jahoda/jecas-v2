---
title: "Přechod na SQLite z MySQL"
headline: "Přechod na SQLite z MySQL"
description: "Jak převést data z MySQL do SQLite."
date: "2023-01-07"
last_modification: "2023-01-07"
status: 0
tags: []
format: "html"
---

<h2 id="konverse-dat">Konverse dat</h2>

<p>Zkonvertovat MySQL do SQLite jde poměrně snadno.</p>

<p>Základem je udělat dump původní MySQL database. K tomu může posloužit klidně populární <a href="https://www.adminer.org/cs/">Adminer</a> nebo phpMyAdmin.</p>

<p>Po získání souboru typu <code>dump_mysql.sql</code> přichází na řadu převod.</p>


<p>Osvědčil se mi skript <a href="https://github.com/dumblob/mysql2sqlite">mysql2sqlite</a>, jehož použití je následovné:</p>

<pre><code>./mysql2sqlite dump_mysql.sql | sqlite3 mysqlite3.db</code></pre>

<p>Selže-li pokus, možná bude potřeba nastavit práva.</p>

<pre><code>chmod 755 mysql2sqlite</code></pre>



<p>Výsledkem by měl být nový soubor <code>mysqlite3.db</code>.</p>


<h2 id="sveltekit">Používání SQLite se SvelteKitem</h2>

<p>Pro práci s SQLite se hodí použít balíček <a href="https://github.com/WiseLibs/better-sqlite3">better-sqlite3</a>.</p>

<p><a href="https://github.com/kisaragi-hiu/demo-sveltekit-sqlite">Demo: a SvelteKit project that reads from a local SQLite database</a></p>


<h2 id="prohlizeni">Prohlížení dat</h2>


<p><a href="https://sqlitebrowser.org">DB Browser for SQLite</a></p>

<p><img src="/files/prevod-sqlite/db-browser-for-sqlite.png" alt="DB Browser for SQLite" class="border"></p>


<ul>
  <li>
    <a href="https://phiresky.github.io/blog/2021/hosting-sqlite-databases-on-github-pages/">Hosting SQLite databases on Github Pages</a>
  </li>
</ul>