---
title: "Ping atribut"
headline: "Atribut <code>ping</code>"
description: "HTML atribut <code>ping</code> umožňuje <i>pingnout</i> nějakou další stránku při prokliknutí odkazu."
date: "2014-04-22"
last_modification: "2014-05-21"
status: 1
tags: ["html", "html-atributy"]
format: "html"
---

<pre><code>&lt;a 
  href="http://jecas.cz"
  <b>ping</b>="zaznamenat.php?url=homepage"
>
  Odkaz
&lt;/a></code></pre>

<h2 id="vyuziti">Využití</h2>

<p>Atribut <code>ping</code> v zásadě nenabízí nic, co by nebylo řešitelné bez něj. Hlavní využití by mohl mít pro <b>sledování uživatelů</b> – konkrétně zjišťování <b>prokliknutých odkazů</b>.</p>

<p>U odkazu, který chceme sledovat, atribut <code>ping</code> zajistí, že před samotným přechodem na cíl (<code>href</code>) dostane informaci i náš <b>měřicí skript</b>.</p>


<h2 id="podpora">Podpora</h2>

<p>Zatím <code>ping</code> funguje ve Webkitu (<b>Chrome</b>, nová <b>Opera</b>). Ve Firefoxu jde <i>pingování</i> povolit v nastavení, ale ve výchozí podobě je vypnuté.</p>

<p><img src="/files/html-ping/ping.png" alt="Zobrazení požadavku ping" class="border"></p>

<p>Ping se posílá metodou <code>POST</code> s typem <code>text/ping</code>, jak je možné vyčíst z <a href="/vyvojarske-nastroje">vývojářských nástrojů</a>.</p>

<h2 id="js">JS náhrada</h2>

<p><a href="/ajax#pingnout">Pingnout v JavaScriptu</a> jde velmi jednoduše vytvořením obrázku se <code>src</code> odkazujícím na měřicí skript.</p>

<pre><code>var obrazek = new Image();
obrazek.src = "zaznamenat.php?url=homepage";</code></pre>