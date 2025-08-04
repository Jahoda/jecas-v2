---
title: "Získání Twitter avataru"
headline: "Zobrazení avataru z Twitteru"
description: "Jak na svém webu zobrazit avatar uživatele z Twitteru, známe-li jeho jméno/přezdívku."
date: "2013-06-17"
last_modification: "2014-01-31"
status: 1
tags: ["Lazy loading", "Twitter"]
---

Před časem byla zrušena jednoduchá možnost, jak dle přezdívky na Twitteru zobrazit **profilový obrázek**. Fungovalo to hezky jednoduše, stačilo vložit:
```
&lt;img src='https://api.twitter.com/1/users/profile_image?screen_name=**Jméno**>
```

A daná URL přesměrovala prohlížeč na konkrétní obrázek. Bohužel už to nejde.

## Vlastní aplikace

Pro obdobnou funkčnost je nutné vytvoření Twitter aplikace. Jde to po přihlášení údaji z Twitteru na dev.twitter.com.

Potom je potřeba nějaká knihovna, které se předají všelijaké klíče a tokeny, ta ověří jejich platnost a skript dostane data v [JSONu](/json).

Stránka pro získávání dat o uživateli je GET users/show.
Jelikož je potřeba skriptu předat tajné klíče, bude muset být na straně serveru. Ověření a získání dat jen JavaScriptem tudíž nebude možné.

## Použití

S třídou Twitter for PHP to jde skoro samo.

```
&lt;?php
if (!isset($_GET["name"])) die();
require_once 'twitter.class.php';
// Údaje vyplnit dle aplikace na dev.twitter.com/apps
$twitter = new Twitter(**$consumerKey**, **$consumerSecret**, **$accessToken**, **$accessTokenSecret**);
$data = $twitter->request('users/show.json?screen_name=' . **$_GET["name"]**, 'GET');
// Vypíše URL obrázku
echo $data->profile_image_url;
```

## Asynchronní načítání JavaScriptem

Protože získávání URL obrázku z cizího severu může trvat delší dobu a zbytečně tak brzdit vygenerování stránky, nabízí se potřebná data stáhnou asynchronně JavaScriptem.

Vytvoříme atrapu s výchozím obrázkem:
```
&lt;img width=48 height=48 src='default_profile_2_normal.png' id=**twitter-avatar**>
```

výše uvedený PHP skript vrátí JS kód pro změnu `src` obrázku:
```
document.getElementById("twitter-avatar").src = '&lt;?=$data->profile_image_url?>';
```

někde na konci stránky se tento skript připojí:
```
&lt;script src='twitter-avatar.php?name=**Jméno**'>&lt;/script>
```

## Cache

  Je-li pravděpodobné, že se Twitter avatar bude zobrazovat pravidelně, je vhodné ho navíc **kešovat na vlastním** serveru.