---
title: "Zvýraznění syntaxe kódu"
headline: "Obarvení zdrojového kódu"
description: "Barvení zdrojových kódů na webových stránkách."
date: "2014-03-12"
last_modification: "2014-03-12"
status: 0
tags: []
format: "html"
---

<p>Na webech, kde se <b>objevuje zdrojový kód</b>, bývá zvykem, že je pro lepší přehlednost obarven jako při používání programátorského textového editoru.</p>

<blockquote>
  <p>Zvýrazňování zdrojového kódu se anglicky nazývá spojením <i lang="en">Syntax Highlighting</i>, nástroj pro zvýraznění potom obvykle jako <i lang="en">Syntax Highlighter</i>.</p>
</blockquote>


<p>Kód s barevně odlišenou syntaxí potom může vypadat následovně:</p>

<p><img src="/files/barveni-kodu/barveni-kodu.png" alt="Obarvení HTML značek a CSS" class="border"></p>



















<h2 id="jak">Jak zvýraznit kód</h2>

<p>Existuje řada možností, jak dosáhnout obarveného kódu:</p>

<ol>
  <li>
    <p><b>Zvýrazňování na straně serveru</b> (například v PHP).</p>
  </li>  
  <li>
    <p>Barvení <b>v prohlížečí návštěvníka pomocí JavaScriptu</b>.</p>
  </li>  
  <li>
    <p><b>Export obarveného kódu z programátorského editoru</b>.</p>
  </li>  
  <li>
    <p>Vložení <a href="/screenshot">screenshotu</a> s kódem z programátorského editoru (značně nepraktické kvůli obtížnému kopírování).</p>
  </li>
</ol>


<h2 id="js">Zvýrazňování syntaxe v JS</h2>

<p>Existuje řada hotových řešení pro obarvení kódu v prohlížeči návštěvníka (tzv. na straně klienta).</p>

<p>Výhoda je ve <b>snadné instalaci</b> – obvykle stačí připojit jeden JS soubor, jedno CSS a barvení může začít.</p>

<p>Zdrojový kód článku tak neobsahuje hromady obalujících značek pro zvýraznění jeho jednotlivých částí.</p>


<h3 id="jush">JUSH – JavaScript Syntax Highlighter</h3>

<p><a href="http://jush.sourceforge.net/" class="button">JavaScript Syntax Highlighter</a></p>

<p>Hlavní schopností je zvýrazňování bloků kódu, kde se <b>míchá několik různých programovacích jazyků</b> (např. HTML, PHP, SQL, CSS a JavaScript).</p>


<p><img src="/files/barveni-kodu/jush.png" alt="Obarvení HTML, CSS, JS, PHP a SQL" class="border"></p>















<p>Další zajímavá vlastnost je vytváření <b>odkazů do dokumentace</b> z klíčových slov. Kvůli tomu je ale JUSH trochu datově větší (cca 60 kB při GZIP kompresi).</p>

<h3 id="prism">Prism.js</h3>

<p><a href="http://prismjs.com/" class="button">prismjs.com</a></p>


<h2 id="php">Barvení kódu v PHP</h2>

<p>I zvýrazňování na straně serveru má své výhody. Především odstraňuje nehospodárné zvýrazňování stále té stejné stránky při každém načtení.</p>

<p>U delších kódů může být <b>znatelná prodleva</b>, než se pomocí JavaScriptu obarví; to se při zvýrazňování na straně serveru nestane – tedy v případě, že je výsledné HTML s obarveným kódem ukládáno do cache, aby se nemuselo stále znovu a znovu zvýrazňovat na serveru při <b>každém načtení stránky</b>.</p>





http://scotch.io/bar-talk/get-beautiful-syntax-highlighting-for-your-website-code

<ul>
  <li>Sitepoint.com: <a href="http://www.sitepoint.com/everything-need-know-html-pre-element/">Everything You Need to Know About HTML’s ‘pre’ Element</a></li>
  
  <li><a href="http://webdesign.tutsplus.com/articles/25-syntax-highlighters-tried-and-tested--cms-23931">25 Syntax Highlighters: Tried and Tested</a> – nástroje pro barvení kódu na webu i v editorech</li>
  
  <li>Martin Zlámal: <a href="http://zlml.cz/pouziti-texy-s-fshl">Použití Texy s FSHL</a></li>
</ul>