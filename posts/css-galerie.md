---
title: "CSS obrázková galerie"
headline: "Jednoduchá galerie v CSS"
description: "Galerie obrázků bez JavaScriptu pomocí CSS."
date: "2013-10-10"
last_modification: "2013-10-10"
status: 1
tags: ["CSS", "Hotová řešení", "Obrázky"]
---

Pro **obrázkovou galerii** o pár obrázcích může stačit prosté řešení čistě v HTML a CSS.

  .large a:hover {background: none}
  .large div:target {outline: none}  

  /* zrušení orámování odkazu v Exploreru */
  img {border: 0;}
  a:focus {outline: 0}
  .large {height: 400px; overflow: hidden; position: relative;}
  .large div {height: 400px; width: 600px; position: relative;}
  .large div a {position: absolute; top: 0; height: 100%; width: 50%; text-decoration: none; background: url('http://img.dummy-image-generator.com/abstract/dummy-600x400-Circus-plain.jpg') -1000px -1000px no-repeat; /* nějaký obrázek, jinak plocha nekliká v Exploreru */}
  .large div a span {position: absolute; top: 190px; padding: 10px; line-height: 20px; width: 30px; background: #fff; color: #000; visibility: hidden}
  .large div a:hover span {visibility: visible;}
  .large div a.next, .large div a.next span {right: 0}
  .large div a.prev, .large div a.prev span {left: 0}
  
  .thumb {margin-top: 1em}  
  .thumb a {margin-right: 10px; border: 5px solid #000; display: inline-block;}
  .thumb img {display: block; width: 120px; height: 80px}
  .thumb a:hover {border-color: red;}  

		[&gt;](#druhy)

		[&lt;](#prvni)
		
		[&gt;](#treti)

		[&lt;](#druhy)

Galerie využívá obalu s nastavenou výškou a `overflow: hidden`, ve kterém jsou obrázky, na které lze odkázat `#kotvou` — v takovém případě prohlížeč *odroluje* na požadovaný obrázek. V novějších prohlížečích (od **IE9**) by šlo použít [selektor](/css-selektory#zamereni) [`:target`](/zvyrazneni-kotvy).

Jelikož jsou všechny obrázky **v plné velikosti přímo na stránce**, načtou se všechny při vstupu na stránku a nemá tedy příliš smysl řešit vytváření náhledů (maximálně kvůli lepší ostrosti miniatur).

Tento postup je výhodný v tom, že při prohlížení **budou všechny obrázky už načtené**, nevýhoda je **plýtvání daty** v případě, kdy návštěvník všechny obrázky zvětšit nechce.

Pro **více obrázků na jedné stránce** je proto nejspíš vhodnější [lightbox galerie](/magnific-popup) — Magnific Popup umí dokonce řídit, kolik obrázků se má přednačítat.