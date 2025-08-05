---
title: "Získání Twitter avataru"
headline: "Zobrazení avataru z Twitteru"
description: "Jak na svém webu zobrazit avatar uživatele z Twitteru, známe-li jeho jméno/přezdívku."
date: "2013-06-17"
last_modification: "2014-01-31"
status: 1
tags: ["lazy-loading", "twitter"]
format: "html"
---

<p>Před časem byla zrušena jednoduchá možnost, jak dle přezdívky na Twitteru zobrazit <b>profilový obrázek</b>. Fungovalo to hezky jednoduše, stačilo vložit:
<pre><code>&lt;img src='https://api.twitter.com/1/users/profile_image?screen_name=<b>Jméno</b>></code></pre>
<p>A daná URL přesměrovala prohlížeč na konkrétní obrázek. Bohužel už to nejde.

<h2>Vlastní aplikace</h2>
<ol><li>Pro obdobnou funkčnost je nutné vytvoření Twitter aplikace. Jde to po přihlášení údaji z Twitteru na <a href='https://dev.twitter.com/apps'>dev.twitter.com</a>.
<p><img class=border src='/files/twitter-avatar/create-app.png' alt='Vytvoření Twitter aplikace'>
<li>Potom je potřeba <a href='http://phpfashion.com/twitter-for-php'>nějaká knihovna</a>, které se předají všelijaké klíče a tokeny, ta ověří jejich platnost a skript dostane data v <a href="/json">JSONu</a>.
<p><img class=border src='/files/twitter-avatar/key-token.png' alt='Klíče a tokeny Twitter aplikace'>
<li>Stránka pro získávání dat o uživateli je <a href='https://dev.twitter.com/docs/api/1.1/get/users/show'>GET users/show</a>.
<li>Jelikož je potřeba skriptu předat tajné klíče, bude muset být na straně serveru. Ověření a získání dat jen JavaScriptem tudíž nebude možné.
</ol>

<h2 id='pouziti'>Použití</h2>
<p>S třídou <a href='https://github.com/dg/twitter-php'>Twitter for PHP</a> to jde skoro samo.

<pre><code>&lt;?php
if (!isset($_GET["name"])) die();
require_once 'twitter.class.php';
// Údaje vyplnit dle aplikace na dev.twitter.com/apps
$twitter = new Twitter(<font color=yellow><b>$consumerKey</b></font>, <font color=red><b>$consumerSecret</b></font>, <font color=blue><b>$accessToken</b></font>, <font color=green><b>$accessTokenSecret</b></font>);
$data = $twitter->request('users/show.json?screen_name=' . <b>$_GET["name"]</b>, 'GET');
// Vypíše URL obrázku
echo $data->profile_image_url;</code></pre>

<h2 id=asynchronni>Asynchronní načítání JavaScriptem</h2>
<p>Protože získávání URL obrázku z cizího severu může trvat delší dobu a zbytečně tak brzdit vygenerování stránky, nabízí se potřebná data stáhnou asynchronně JavaScriptem.

<ol>
<li>Vytvoříme atrapu s <a href='https://si0.twimg.com/sticky/default_profile_images/default_profile_2_normal.png'>výchozím obrázkem</a>:
<pre><code>&lt;img width=48 height=48 src='default_profile_2_normal.png' id=<b>twitter-avatar</b>></code></pre>
<li>výše uvedený PHP skript vrátí JS kód pro změnu <code>src</code> obrázku:
<pre><code>document.getElementById("twitter-avatar").src = '&lt;?=$data->profile_image_url?>';</code></pre>
<li>někde na konci stránky se tento skript připojí:
<pre><code>&lt;script src='twitter-avatar.php?name=<b>Jméno</b>'>&lt;/script></code></pre>
</ol>

<h2 id=cache>Cache</h2>
  <p>Je-li pravděpodobné, že se Twitter avatar bude zobrazovat pravidelně, je vhodné ho navíc <b>kešovat na vlastním</b> serveru.